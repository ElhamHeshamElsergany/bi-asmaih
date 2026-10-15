"use client";

import { useState } from "react";
import Link from "next/link";
import { quizzes } from "@/content/learning";
import { getTopic } from "@/content/topics";
import { SourceBadge } from "@/components/source-badge";
import { useProgress } from "@/components/use-progress";

export function QuizView({ id }: { id: string }) {
  const quiz = quizzes.find((item) => item.id === id);
  const [choice, setChoice] = useState<string | null>(null);
  const { update } = useProgress();
  if (!quiz) return null;
  const currentQuiz = quiz;

  const topic = getTopic(currentQuiz.slug);
  const correct = choice === currentQuiz.correctChoiceId;

  function answer(choiceId: string) {
    setChoice(choiceId);
    update((current) => ({
      ...current,
      quizzes: { ...current.quizzes, [currentQuiz.id]: choiceId === currentQuiz.correctChoiceId },
      path: current.path.includes("quiz") ? current.path : [...current.path, "quiz"],
    }));
  }

  return (
    <article className="stack">
      <header className="stack">
        <p className="kicker">اختبر فهمك</p>
        <h1 className="page-title">{currentQuiz.prompt}</h1>
      </header>
      <div className="stack">
        {currentQuiz.choices.map((item) => (
          <button
            key={item.id}
            className={`choice ${choice ? (item.id === currentQuiz.correctChoiceId ? "is-correct" : item.id === choice ? "is-near" : "") : ""}`}
            type="button"
            disabled={choice !== null}
            onClick={() => answer(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {choice ? (
        <section className="card reveal stack">
          <strong>{correct ? "إجابة صحيحة ✨" : "قريب… شوف الفكرة دي"}</strong>
          <p className="label-draft">صياغة مبسطة من نص الكتاب، وليست نص المصدر.</p>
          <p>{currentQuiz.explanation}</p>
          {topic ? <SourceBadge books={topic.bookReferences} /> : null}
          <Link className="btn btn-primary" href={`/topic/${currentQuiz.slug}`}>
            اقرأ المصدر
          </Link>
        </section>
      ) : null}
    </article>
  );
}
