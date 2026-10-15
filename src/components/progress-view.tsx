"use client";

import Link from "next/link";
import { intentCopy, pathSteps, quizzes } from "@/content/learning";
import { getTopic } from "@/content/topics";
import type { Intent } from "@/lib/types";
import { saveOnboarding } from "@/lib/storage";
import { useProgress } from "@/components/use-progress";

const intents = Object.keys(intentCopy) as Intent[];

export function ProgressView() {
  const { progress, ready, update } = useProgress();
  if (!ready) return <div className="skeleton" />;

  const correct = quizzes.filter((quiz) => progress.quizzes[quiz.id]).length;

  return (
    <div className="stack">
      <header className="stack">
        <p className="kicker">مكتبتي</p>
        <h1 className="page-title">تقدمي</h1>
        <p className="quiet">
          خلّصت {progress.read.length} خلاصة، وحفظت {progress.bookmarks.length}. إجابات الأسئلة الصحيحة: {correct} من {quizzes.length}.
        </p>
      </header>

      <section className="card stack">
        <h2>إنت هنا علشان…</h2>
        <p className="quiet">هذا يغيّر الاقتراح فقط، ولا يقفل عليك مستوى.</p>
        <div className="stack">
          {intents.map((intent) => (
            <button
              key={intent}
              className="choice"
              type="button"
              aria-pressed={progress.intent === intent}
              onClick={() => {
                saveOnboarding(intent);
                update((current) => ({ ...current, intent }));
              }}
            >
              {intentCopy[intent].label}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>ابدأ من هنا</h2>
        <div className="path">
          {pathSteps.map((step, index) => {
            const done = progress.path.includes(step.id) || progress.read.some((slug) => step.href.endsWith(slug));
            return (
              <Link
                key={step.id}
                href={step.href}
                onClick={() =>
                  update((current) => ({
                    ...current,
                    path: current.path.includes(step.id) ? current.path : [...current.path, step.id],
                  }))
                }
              >
                <span className={done ? "dot is-done" : "dot"} />
                <span>
                  {index + 1}. {step.title}
                </span>
                <span aria-hidden="true">‹</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="stack">
        <h2>المحفوظ</h2>
        {progress.bookmarks.length === 0 ? <p className="card quiet">لم تحفظ شيئًا بعد. الحفظ للمراجعة، لا للدرجة.</p> : null}
        {progress.bookmarks.map((slug) => {
          const topic = getTopic(slug);
          if (!topic) return null;
          return (
            <Link key={slug} className="card" href={`/topic/${slug}`}>
              <strong>{topic.titleArabic}</strong>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
