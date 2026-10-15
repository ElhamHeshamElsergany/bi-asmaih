"use client";

// Paused with the Dorar API. Not rendered. The book remains the visible source.

import { useEffect, useState } from "react";
import { messages } from "@/content/book";
import type { DorarReference } from "@/lib/types";
import { SourceBadge } from "@/components/source-badge";

export function DorarPanel({ query }: { query: string }) {
  const [results, setResults] = useState<DorarReference[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/dorar/aqeeda?q=${encodeURIComponent(trimmed)}&limit=5`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { ok: boolean; message?: string; results?: DorarReference[] };
        if (!response.ok || !data.ok) {
          setResults([]);
          setError(data.message || messages.dorarDown);
        } else {
          setResults(data.results ?? []);
        }
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError(messages.dorarDown);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <section className="stack" aria-live="polite">
      <h3>{messages.dorarName}</h3>
      {loading ? <div className="skeleton" /> : null}
      {error ? <p className="quiet">{error}</p> : null}
      {!loading && !error && results.length === 0 ? <p className="quiet">{messages.dorarEmpty}</p> : null}
      {results.map((result) => (
        <article key={result.url} className="result stack">
          <div className="cluster">
            <SourceBadge books={[]} dorar={[result]} />
            <span className="meta">{messages.dorarName}</span>
          </div>
          <strong>{result.title}</strong>
          <p>{result.sourceText}</p>
          <a className="external" href={result.url} target="_blank" rel="noreferrer">
            فتح المصدر الأصلي ↗
          </a>
        </article>
      ))}
    </section>
  );
}
