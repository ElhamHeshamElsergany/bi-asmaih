"use client";

import { useState } from "react";
import { book, messages } from "@/content/book";
import type { BookReference, DorarReference } from "@/lib/types";
import { Sheet } from "@/components/sheet";

export function SourceBadge({
  books,
  dorar = [],
}: {
  books: BookReference[];
  dorar?: DorarReference[];
}) {
  const [open, setOpen] = useState(false);
  if (books.length === 0 && dorar.length === 0) return null;

  return (
    <>
      <button className="badge-btn" type="button" onClick={() => setOpen(true)}>
        ✓ {messages.verified}
      </button>
      <Sheet open={open} title={messages.sourcesTitle} onClose={() => setOpen(false)}>
        <div className="stack">
          {books.map((reference) => (
            <article key={`${reference.page}-${reference.excerpt.slice(0, 12)}`} className="stack">
              <p className="meta">كتاب</p>
              <strong>{reference.bookTitle}</strong>
              <p className="meta">الصفحة: {reference.page}</p>
              <blockquote className="source-text">{reference.excerpt}</blockquote>
            </article>
          ))}
          {books.length > 0 ? (
            <a className="btn btn-ghost" href={book.url} target="_blank" rel="noreferrer">
              عرض نسخة الكتاب
            </a>
          ) : null}
          {dorar.map((reference) => (
            <article key={reference.url} className="stack">
              <p className="meta">{messages.dorarName}</p>
              <strong>{reference.title}</strong>
              <p>{reference.sourceText}</p>
              <a className="external" href={reference.url} target="_blank" rel="noreferrer">
                فتح المصدر الأصلي ↗
              </a>
            </article>
          ))}
        </div>
      </Sheet>
    </>
  );
}
