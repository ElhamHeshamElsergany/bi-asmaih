"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { featured, intentCopy, pathSteps } from "@/content/learning";
import { getTopic } from "@/content/topics";
import { minutesLabel } from "@/lib/arabic";
import { loadOnboarding } from "@/lib/storage";
import { Pattern } from "@/components/icons";
import { SourceBadge } from "@/components/source-badge";
import { useProgress } from "@/components/use-progress";

export function HomeView({ featuredIndex }: { featuredIndex: number }) {
  const router = useRouter();
  const { progress, ready } = useProgress();
  const [allowed, setAllowed] = useState(false);
  const card = featured[featuredIndex] ?? featured[0];
  const topic = getTopic(card.slug);
  const intent = progress.intent ? intentCopy[progress.intent] : null;
  const nextStep = pathSteps.find((step) => !progress.path.includes(step.id)) ?? pathSteps[0];

  useEffect(() => {
    if (!loadOnboarding()) {
      router.replace("/onboarding");
      return;
    }
    setAllowed(true);
  }, [router]);

  if (!allowed || !topic) {
    return (
      <div className="stack">
        <div className="skeleton title" />
        <div className="skeleton" />
      </div>
    );
  }

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">ماذا سنتعرف عن الله اليوم؟</h1>
        <p className="lead">اعرف ربك… ببساطة، ومن مصدر يمكنك الرجوع إليه.</p>
      </header>

      <form className="search" action="/search">
        <label className="sr-only" htmlFor="home-search">
          ابحث عن اسم أو صفة
        </label>
        <input id="home-search" name="q" placeholder="ابحث عن اسم أو صفة…" enterKeyHint="search" />
        <button className="btn btn-primary" type="submit">
          بحث
        </button>
      </form>

      <article className="card hero stack">
        <Pattern />
        <p className="kicker">{minutesLabel(topic.estimatedMinutes)}</p>
        <h2>{card.question}</h2>
        <p className="label-draft">صياغة مبسطة من نص الكتاب، وليست نص المصدر.</p>
        <p>{card.summary}</p>
        {topic.evidence[0] ? (
          <blockquote className="source-text">{topic.evidence[0].text}</blockquote>
        ) : null}
        <div className="cluster">
          <Link className="btn btn-primary" href={`/topic/${topic.slug}`}>
            تعمّق أكثر
          </Link>
          <SourceBadge books={topic.bookReferences} />
        </div>
      </article>

      {intent ? (
        <section className="card stack">
          <p className="kicker">مقترح لك</p>
          <h2>{intent.label}</h2>
          <p>{intent.hint}</p>
          <Link className="btn btn-soft" href={intent.href}>
            {intent.cta}
          </Link>
        </section>
      ) : null}

      {ready ? (
        <section className="card stack">
          <p className="kicker">ابدأ من هنا</p>
          <h2>{nextStep.title}</h2>
          <Link className="text-btn" href={nextStep.href}>
            أكمل المسار
          </Link>
        </section>
      ) : null}
    </div>
  );
}
