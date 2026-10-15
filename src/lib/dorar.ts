// Paused: Dorar's Aqeedah API requires DORAR_API_TOKEN, so nothing in the UI calls this file.
import type { DorarReference } from "@/lib/types";

/** Official service: https://dorar.net/index.php/api-services/aqeeda */
const DORAR_ORIGIN = "https://dorar.net";
const ENDPOINT = `${DORAR_ORIGIN}/api/v1/aqeeda/search`;
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const MIN_GAP_MS = 400;
const MAX_PER_MINUTE = 20;

type CacheEntry = { expires: number; results: DorarReference[] };

const cache = new Map<string, CacheEntry>();
const recentCalls: number[] = [];
let lastCall = 0;
let chain: Promise<unknown> = Promise.resolve();

export type DorarMatch = "any" | "all" | "phrase";

export type DorarQuery = {
  q: string;
  limit: number;
  in: "title" | "text" | "both";
  match: DorarMatch;
  highlight: 0 | 1;
};

export type DorarResponse = {
  ok: boolean;
  message: string;
  results: DorarReference[];
  code?: string;
  upstream: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = chain.then(task, task);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function throttle() {
  const now = Date.now();
  while (recentCalls.length && now - recentCalls[0] >= 60_000) recentCalls.shift();
  if (recentCalls.length >= MAX_PER_MINUTE) {
    await sleep(60_000 - (now - recentCalls[0]) + 50);
  }
  const gap = Date.now() - lastCall;
  if (gap < MIN_GAP_MS) await sleep(MIN_GAP_MS - gap);
  lastCall = Date.now();
  recentCalls.push(lastCall);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function findRows(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.map(asRecord).filter((row): row is Record<string, unknown> => Boolean(row));
  }
  const record = asRecord(payload);
  if (!record) return [];
  for (const key of ["data", "results", "items", "hits", "aqeeda"]) {
    if (!(key in record)) continue;
    const nested = findRows(record[key]);
    if (nested.length) return nested;
  }
  return [];
}

function pick(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function safeDorarUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = trimmed.startsWith("/")
      ? new URL(trimmed, DORAR_ORIGIN)
      : new URL(trimmed.startsWith("http") ? trimmed : `${DORAR_ORIGIN}/${trimmed.replace(/^\/+/, "")}`);
    if (url.protocol !== "https:" || !url.hostname.endsWith("dorar.net")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function normalize(payload: unknown): DorarReference[] {
  const fetchedAt = new Date().toISOString();
  const results: DorarReference[] = [];
  for (const row of findRows(payload)) {
    const title = pick(row, ["title", "name"]);
    const sourceText = pick(row, ["text", "content", "plain_text", "sourceText"]).replace(/<[^>]+>/g, "");
    const url = safeDorarUrl(pick(row, ["url", "link", "source_url", "sourceUrl"]));
    if (!title || !sourceText || !url) continue;
    results.push({ title, url, sourceText, fetchedAt });
  }
  return results;
}

function unavailable(code: string, message = "تعذّر تحميل المصدر حاليًا."): DorarResponse {
  return { ok: false, message, results: [], code, upstream: ENDPOINT };
}

async function requestOnce(query: DorarQuery, token: string): Promise<Response> {
  const url = new URL(ENDPOINT);
  url.searchParams.set("q", query.q);
  url.searchParams.set("limit", String(query.limit));
  url.searchParams.set("in", query.in);
  url.searchParams.set("match", query.match);
  url.searchParams.set("highlight", String(query.highlight));
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "User-Agent": "bi-asmaih/0.1 (+https://dorar.net/index.php/api-services/aqeeda)",
    },
    cache: "no-store",
  });
}

async function errorCode(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("json")) {
    return response.status === 401 ? "token_invalid" : "unavailable";
  }
  try {
    const body = asRecord(await response.json());
    if (!body) return "unavailable";
    const nested = asRecord(body.error);
    return pick(body, ["code"]) || (nested ? pick(nested, ["code"]) : "") || "unavailable";
  } catch {
    return "unavailable";
  }
}

export async function searchDorar(query: DorarQuery): Promise<DorarResponse> {
  const token = process.env.DORAR_API_TOKEN?.trim();
  if (!token) {
    return unavailable(
      "missing_token",
      "هذا العنوان وسيط داخل التطبيق فقط. البحث يذهب إلى https://dorar.net/api/v1/aqeeda/search بعد وضع DORAR_API_TOKEN في ملف .env.local.",
    );
  }

  const cacheKey = JSON.stringify(query);
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return { ok: true, message: "", results: cached.results, upstream: ENDPOINT };
  }

  return enqueue(async () => {
    const again = cache.get(cacheKey);
    if (again && again.expires > Date.now()) {
      return { ok: true, message: "", results: again.results, upstream: ENDPOINT };
    }

    let response: Response | null = null;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      await throttle();
      try {
        response = await requestOnce(query, token);
      } catch {
        response = null;
      }
      if (response && response.status !== 429 && response.status < 500) break;
      await sleep(1200 * (attempt + 1));
    }

    if (!response || !response.ok) {
      return unavailable(response ? await errorCode(response) : "unavailable");
    }

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      return unavailable("invalid_payload");
    }

    const results = normalize(payload);
    if (cache.size > 100) cache.clear();
    cache.set(cacheKey, { expires: Date.now() + CACHE_TTL_MS, results });
    return { ok: true, message: "", results, upstream: ENDPOINT };
  });
}
