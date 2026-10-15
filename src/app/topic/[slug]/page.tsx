import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicArticle } from "@/components/topic-article";
import { getTopic, topics } from "@/content/topics";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  return { title: topic?.titleArabic ?? "المادة" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return <TopicArticle topic={topic} />;
}
