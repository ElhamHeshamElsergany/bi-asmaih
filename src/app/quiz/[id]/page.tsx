import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz-view";
import { quizzes } from "@/content/learning";

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quiz = quizzes.find((item) => item.id === id);
  return { title: quiz ? "اختبر فهمك" : "السؤال" };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!quizzes.some((quiz) => quiz.id === id)) notFound();
  return <QuizView id={id} />;
}
