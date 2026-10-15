"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { messages } from "@/content/book";
import { dorarNameList, filterListedNames } from "@/content/dorar-names";
import { searchTopics } from "@/lib/search";
import { typeLabel } from "@/lib/arabic";

export function SearchView() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results = useMemo(() => searchTopics(query), [query]);
  const names = useMemo(() => (query.trim().length >= 2 ? filterListedNames(query) : []), [query]);
  const ready = query.trim().length >= 2;

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">بحث</h1>
        <form className="search" action="/search">
          <label className="sr-only" htmlFor="q">
            ابحث عن اسم أو صفة
          </label>
          <input
            id="q"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن اسم أو صفة…"
            autoFocus
          />
          <button className="btn btn-primary" type="submit">
            بحث
          </button>
        </form>
      </header>

      <section className="stack">
        <h2>من مواد التطبيق</h2>
        {!ready ? <p className="quiet">اكتب حرفين على الأقل.</p> : null}
        {ready && results.length === 0 ? <p className="card quiet">{messages.notInEdition}</p> : null}
        {results.map((topic) => (
          <Link key={topic.slug} className="card stack" href={`/topic/${topic.slug}`}>
            <span className="type-pill">{typeLabel(topic.type)}</span>
            <strong>{topic.titleArabic}</strong>
            <span className="quiet">{topic.shortExplanation.text}</span>
          </Link>
        ))}
      </section>

      {ready ? (
        <section className="stack">
          <h2>{dorarNameList.title}</h2>
          {names.length === 0 ? <p className="card quiet">لم يرد هذا اللفظ في إحصاء الدرر السنية المحفوظ لدينا.</p> : null}
          <div className="name-index">
            {names.map((item) =>
              item.lessonSlug ? (
                <Link key={item.name} className="chip" data-local="true" href={`/topic/${item.lessonSlug}`}>
                  {item.name}
                </Link>
              ) : item.dorarId ? (
                <a key={item.name} className="chip" href={`https://dorar.net/aqeeda/${item.dorarId}`} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              ) : (
                <span key={item.name} className="chip">
                  {item.name}
                </span>
              ),
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
