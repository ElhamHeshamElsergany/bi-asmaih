"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dorarNameList, filterListedNames } from "@/content/dorar-names";
import { libraryScope } from "@/content/learning";
import { topics } from "@/content/topics";
import { searchTopics } from "@/lib/search";
import { typeLabel } from "@/lib/arabic";
import { pagePath } from "@/lib/site";
import type { TopicType } from "@/lib/types";
import { ArrowIcon } from "@/components/icons";
import { Sheet } from "@/components/sheet";
import { SourceBadge } from "@/components/source-badge";

const filters: { id: "all" | TopicType; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "name", label: "الأسماء" },
  { id: "attribute", label: "الصفات" },
];

function NameIndex({ query }: { query: string }) {
  const names = filterListedNames(query);
  if (names.length === 0) {
    return <p className="card quiet">لم يرد هذا اللفظ في إحصاء الدرر السنية المحفوظ لدينا.</p>;
  }
  return (
    <div className="name-index">
      {names.map((item) => {
        const key = `${item.name}-${item.dorarId ?? "text"}`;
        if (item.lessonSlug) {
          return (
            <Link key={key} className="chip" data-local="true" href={`/topic/${item.lessonSlug}`}>
              {item.name}
            </Link>
          );
        }
        if (item.dorarId) {
          return (
            <a key={key} className="chip" href={`https://dorar.net/aqeeda/${item.dorarId}`} target="_blank" rel="noreferrer">
              {item.name}
            </a>
          );
        }
        return (
          <span key={key} className="chip">
            {item.name}
          </span>
        );
      })}
    </div>
  );
}

export function LibraryView() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("type");
  const type = initial === "name" || initial === "attribute" ? initial : "all";
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState(false);

  const results = useMemo(() => {
    const catalog = topics.filter((topic) => topic.type === "name" || topic.type === "attribute");
    const base = type === "all" ? catalog : catalog.filter((topic) => topic.type === type);
    if (query.trim().length < 2) return base;
    const found = new Set(searchTopics(query).map((topic) => topic.slug));
    return base.filter((topic) => found.has(topic.slug));
  }, [query, type]);

  return (
    <div className="stack">
      <header className="stack">
        <p className="kicker">ما ورد في مصادرنا</p>
        <div className="cluster">
          <h1 className="page-title">أسماء الله وصفاته</h1>
          <button className="icon-btn small" type="button" aria-label="لماذا لا نقول كل أسماء الله؟" onClick={() => setInfo(true)}>
            ؟
          </button>
        </div>
        <p className="quiet">المواد المشروحة من الكتاب. وفهرس الأسماء من إحصاء الدرر السنية للكتاب والسنة.</p>
      </header>

      <form className="search" action={pagePath("/search")}>
        <label className="sr-only" htmlFor="library-search">
          ابحث عن اسم أو صفة
        </label>
        <input
          id="library-search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث عن اسم أو صفة…"
        />
        <button className="btn btn-primary" type="submit">
          بحث
        </button>
      </form>

      <div className="cluster" role="group" aria-label="تصفية المواد">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className="chip"
            type="button"
            aria-pressed={type === filter.id}
            onClick={() => router.replace(filter.id === "all" ? "/library" : `/library?type=${filter.id}`, { scroll: false })}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="card quiet">لا توجد في النسخة الحالية مادة مراجعة مشروحة لهذا البحث.</p>
      ) : (
        <div className="stack">
          {results.map((topic) => (
            <Link key={topic.slug} className="card card-link" href={`/topic/${topic.slug}`}>
              <span className="stack tight">
                <span className="type-pill">{typeLabel(topic.type)}</span>
                <strong className="name-title">{topic.titleArabic}</strong>
                <span className="quiet">{topic.shortExplanation.text}</span>
              </span>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      )}

      {type === "attribute" ? null : (
        <section className="stack">
          <h2>{dorarNameList.title}</h2>
          <p className="quiet">{dorarNameList.statement}</p>
          <NameIndex query={query} />
          <p className="meta">
            <a href={dorarNameList.url}>{dorarNameList.sourceTitle}</a>
            <br />
            {dorarNameList.citation}
          </p>
        </section>
      )}

      <Sheet open={info} title={libraryScope.title} onClose={() => setInfo(false)}>
        <div className="stack">
          <p className="label-draft">صياغة مبسطة من نص الكتاب، وليست نص المصدر.</p>
          <p>{libraryScope.body}</p>
          <blockquote className="source-text">{libraryScope.excerpt}</blockquote>
          <p className="meta">
            {libraryScope.bookTitle}
            <br />
            الصفحة: {libraryScope.page}
          </p>
          <SourceBadge
            books={[{ bookTitle: libraryScope.bookTitle, page: libraryScope.page, excerpt: libraryScope.excerpt }]}
          />
        </div>
      </Sheet>
    </div>
  );
}
