import type { DorarReference } from "@/lib/types";

const ENDPOINT = "https://dorar.net/api/v1/aqeeda/search";
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const MIN_GAP_MS = 400;
const MAX_PER_MINUTE = 20;

type CacheEntry = { expires: number; results: DorarReference[] };

const cache = new Map<string, CacheEntry>();
const recentCalls: number[] = [];
let lastCall = 0;
let chain: Promise<unknown> = Promise.resolve();

export type DorarQuery = {
  q: string;
  limit: number;
  in: "title" | "text" | "both";
  highlight: 0 | 1;
};

export type DorarResponse = {
  ok: boolean;
  message: string;
  results: DorarReference[];
  code?: string;
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
  try {
    const url = new URL(value);
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

async function requestOnce(query: DorarQuery, token: string): Promise<Response> {
  const url = new URL(ENDPOINT);
  url.searchParams.set("q", query.q);
  url.searchParams.set("limit", String(query.limit));
  url.searchParams.set("in", query.in);
  url.searchParams.set("highlight", String(query.highlight));
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
}

export async function searchDorar(query: DorarQuery): Promise<DorarResponse> {
  const token = process.env.DORAR_API_TOKEN?.trim();
  if (!token) {
    return { ok: false, message: "تعذّر تحميل المصدر حاليًا.", results: [], code: "missing_token" };
  }

  const cacheKey = JSON.stringify(query);
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return { ok: true, message: "", results: cached.results };
  }

  return enqueue(async () => {
    const again = cache.get(cacheKey);
    if (again && again.expires > Date.now()) {
      return { ok: true, message: "", results: again.results };
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
      return { ok: false, message: "تعذّر تحميل المصدر حاليًا.", results: [], code: "unavailable" };
    }

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      return { ok: false, message: "تعذّر تحميل المصدر حاليًا.", results: [], code: "invalid_payload" };
    }

    const results = normalize(payload);
    if (cache.size > 100) cache.clear();
    cache.set(cacheKey, { expires: Date.now() + CACHE_TTL_MS, results });
    return { ok: true, message: "", results };
  });
}
