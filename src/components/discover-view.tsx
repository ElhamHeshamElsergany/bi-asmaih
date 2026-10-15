"use client";

import Link from "next/link";
import { questionGroups, quizzes, sayings } from "@/content/learning";
import { getTopic } from "@/content/topics";
import { ArrowIcon } from "@/components/icons";
import { SayingCard } from "@/components/saying-card";
import { useProgress } from "@/components/use-progress";

export function DiscoverView() {
  const { update } = useProgress();

  return (
    <div className="stack">
      <header className="stack">
        <h1 className="page-title">اكتشف</h1>
        <p className="lead">سؤال أولًا. والقاعدة تأتي حين تريد أن تتعمّق.</p>
      </header>

      {questionGroups.map((group) => (
        <section key={group.id} className="stack">
          <h2>{group.title}</h2>
          <div className="stack">
            {group.slugs.map((slug) => {
              const topic = getTopic(slug);
              if (!topic) return null;
              return (
                <Link key={slug} className="card card-link" href={`/topic/${slug}`}>
                  <strong>{topic.question}</strong>
                  <ArrowIcon />
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section id="sayings" className="stack">
        <h2>عبارات شائعة… هل هي صحيحة؟</h2>
        <p className="quiet">الإجابة لا تظهر إلا ومعها مصدر من الكتاب.</p>
        {sayings.map((saying) => (
          <SayingCard key={saying.id} {...saying} />
        ))}
      </section>

      <section id="quiz" className="stack">
        <h2>اختبر فهمك</h2>
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            className="card card-link"
            href={`/quiz/${quiz.id}`}
            onClick={() =>
              update((current) => ({
                ...current,
                path: current.path.includes("quiz") ? current.path : [...current.path, "quiz"],
              }))
            }
          >
            <strong>{quiz.prompt}</strong>
            <ArrowIcon />
          </Link>
        ))}
      </section>
    </div>
  );
}
