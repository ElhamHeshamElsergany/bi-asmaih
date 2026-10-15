"use client";

import { useState } from "react";
import Link from "next/link";
import { getTopic } from "@/content/topics";
import { SourceBadge } from "@/components/source-badge";

export function SayingCard({
  prompt,
  correct,
  explanation,
  slug,
}: {
  prompt: string;
  correct: "نعم" | "لا";
  explanation: string;
  slug: string;
}) {
  const [answer, setAnswer] = useState<"نعم" | "لا" | null>(null);
  const topic = getTopic(slug);
  const right = answer === correct;

  return (
    <article className="card stack">
      <h3>{prompt}</h3>
      <div className="cluster">
        {(["نعم", "لا"] as const).map((choice) => (
          <button
            key={choice}
            className={`choice ${answer ? (choice === correct ? "is-correct" : choice === answer ? "is-near" : "") : ""}`}
            type="button"
            disabled={answer !== null}
            onClick={() => setAnswer(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {answer ? (
        <div className="reveal stack">
          <strong>{right ? "إجابة صحيحة ✨" : "قريب… شوف الفكرة دي"}</strong>
          <p className="label-draft">صياغة مبسطة من نص الكتاب، وليست نص المصدر.</p>
          <p>{explanation}</p>
          {topic ? <SourceBadge books={topic.bookReferences} /> : null}
          <Link className="text-btn" href={`/topic/${slug}`}>
            تعمّق أكثر
          </Link>
        </div>
      ) : null}
    </article>
  );
}
