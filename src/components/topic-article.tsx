import Link from "next/link";
import { messages } from "@/content/book";
import { getTopic } from "@/content/topics";
import { minutesLabel, typeLabel } from "@/lib/arabic";
import type { Topic } from "@/lib/types";
import { Chevron, Pattern } from "@/components/icons";
import { SourceBadge } from "@/components/source-badge";
import { TopicActions } from "@/components/topic-actions";

const evidenceLabel = {
  quran: "قرآن، كما أورده الكتاب",
  hadith: "حديث أورده الكتاب",
  athar: "أثر أورده الكتاب",
} as const;

export function TopicArticle({ topic }: { topic: Topic }) {
  const related = topic.relatedTopics.map((slug) => getTopic(slug)).filter((item): item is Topic => Boolean(item));

  const section =
    topic.type === "concept"
      ? { href: "/library", label: "الأسماء والصفات" }
      : { href: `/library?type=${topic.type}`, label: topic.type === "name" ? "الأسماء" : "الصفات" };

  return (
    <article className="stack">
      <nav className="crumbs" aria-label="مسار الصفحة">
        <Link href="/">الرئيسية</Link>
        <span aria-hidden="true">/</span>
        <Link href={section.href}>{section.label}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{topic.titleArabic}</span>
      </nav>
      <header className="card hero">
        <Pattern />
        <div className="cluster">
          <span className="type-pill">{typeLabel(topic.type)}</span>
          <span className="meta">{minutesLabel(topic.estimatedMinutes)}</span>
        </div>
        <h1 className={topic.type === "concept" ? "page-title" : "display name-title"}>{topic.titleArabic}</h1>
        <p className="lead">{topic.question}</p>
        {topic.scopeNote ? <p className="quiet">{topic.scopeNote}</p> : null}
        <div className="cluster">
          <SourceBadge books={topic.bookReferences} />
          <TopicActions slug={topic.slug} />
        </div>
      </header>

      <section className="card stack">
        <p className="kicker">الخلاصة</p>
        <h2>ببساطة</h2>
        <p className="label-draft">{messages.simplified}</p>
        <p>{topic.shortExplanation.text}</p>
      </section>

      <details className="fold card">
        <summary>
          <h2>افهم أكثر</h2>
          <Chevron />
        </summary>
        <div className="body">
          <p className="label-draft">{messages.simplified}</p>
          <p>{topic.detailedExplanation.text}</p>
          <h3>الدليل</h3>
          {topic.evidence.length === 0 ? (
            <p className="quiet">{messages.missing}</p>
          ) : (
            topic.evidence.map((item) => (
              <article key={`${item.reference}-${item.text.slice(0, 16)}`} className="evidence">
                <p className="kicker">{evidenceLabel[item.type]}</p>
                <p className="source-text">{item.text}</p>
                <p className="meta">
                  {item.reference}
                  <br />
                  {item.source}
                </p>
              </article>
            ))
          )}
          <h3>ماذا أتعلم من هذا؟</h3>
          {topic.lessons.length === 0 ? (
            <p className="quiet">{topic.emptyLesson ?? messages.missing}</p>
          ) : (
            <ul>
              {topic.lessons.map((lesson) => (
                <li key={lesson.text}>{lesson.text}</li>
              ))}
            </ul>
          )}
        </div>
      </details>

      <details className="fold card">
        <summary>
          <h2>تعمّق أكثر</h2>
          <Chevron />
        </summary>
        <div className="body">
          <p className="label-draft">{messages.simplified}</p>
          <p>{topic.deepExplanation.text}</p>
          <h3>نص الكتاب</h3>
          {topic.bookReferences.map((reference) => (
            <article key={`${reference.page}-${reference.excerpt.slice(0, 18)}`}>
              <p className="meta">
                {reference.bookTitle} — الصفحة {reference.page}
              </p>
              <blockquote className="source-text">{reference.excerpt}</blockquote>
            </article>
          ))}
          {related.length > 0 ? (
            <>
              <h3>مواد قريبة</h3>
              <div className="link-list">
                {related.map((item) => (
                  <Link key={item.slug} href={`/topic/${item.slug}`}>
                    <span className="type-pill">{typeLabel(item.type)}</span> {item.titleArabic}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </details>

      <section className="card stack">
        <h2>المصادر</h2>
        {topic.bookReferences.map((reference) => (
          <p key={`${reference.page}-source`} className="meta">
            كتاب: {reference.bookTitle}
            <br />
            الصفحة: {reference.page}
          </p>
        ))}
      </section>
    </article>
  );
}
