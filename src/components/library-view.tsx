"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { libraryScope } from "@/content/learning";
import { topics } from "@/content/topics";
import { searchTopics } from "@/lib/search";
import { typeLabel } from "@/lib/arabic";
import type { TopicType } from "@/lib/types";
import { Sheet } from "@/components/sheet";
import { SourceBadge } from "@/components/source-badge";

const filters: { id: "all" | TopicType; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "name", label: "الأسماء" },
  { id: "attribute", label: "الصفات" },
];

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
        <div className="cluster">
          <h1 className="page-title">ما ورد في مصادرنا</h1>
          <button className="icon-btn" type="button" aria-label="لماذا لا نقول كل أسماء الله؟" onClick={() => setInfo(true)}>
            i
          </button>
        </div>
        <p className="quiet">أسماء وصفات ورد لها بيان في الكتاب المعتمد. ليست قائمة مغلقة.</p>
      </header>

      <form className="search" action="/search">
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
        <p className="card quiet">لا توجد في النسخة الحالية مادة مراجعة لهذا البحث.</p>
      ) : (
        <div className="stack">
          {results.map((topic) => (
              <Link key={topic.slug} className="card stack" href={`/topic/${topic.slug}`}>
                <div className="cluster">
                  <span className="type-pill">{typeLabel(topic.type)}</span>
                </div>
                <strong>{topic.titleArabic}</strong>
                <span className="quiet">{topic.shortExplanation.text}</span>
              </Link>
            ))}
        </div>
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
