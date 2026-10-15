import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz-view";
import { quizzes } from "@/content/learning";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quiz = quizzes.find((item) => item.id === id);
  if (!quiz) return { title: "السؤال" };
  return pageMetadata({
    title: `اختبر فهمك: ${quiz.prompt}`,
    description: "سؤال قصير في أسماء الله وصفاته، والإجابة معها الدليل ونص الكتاب.",
    path: `/quiz/${quiz.id}`,
  });
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!quizzes.some((quiz) => quiz.id === id)) notFound();
  return <QuizView id={id} />;
}
