import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { TopicArticle } from "@/components/topic-article";
import { getTopic, topics } from "@/content/topics";
import { typeLabel } from "@/lib/arabic";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import type { Topic } from "@/lib/types";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

function seoTitle(topic: Topic) {
  if (topic.type === "name") return `معنى اسم الله «${topic.titleArabic}»`;
  if (topic.type === "attribute") return `${topic.titleArabic} — صفة من صفات الله`;
  return topic.titleArabic;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return { title: "المادة" };
  const meta = pageMetadata({
    title: seoTitle(topic),
    description: `${topic.question} ${topic.shortExplanation.text}`,
    path: `/topic/${topic.slug}`,
    keywords: [topic.titleArabic, ...topic.searchKeywords, ...topic.tags],
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article" } };
}

function topicSchema(topic: Topic) {
  const url = absoluteUrl(`/topic/${topic.slug}`);
  const section = topic.type === "attribute" ? "/library?type=attribute" : topic.type === "name" ? "/library?type=name" : "/library";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "LearningResource"],
        "@id": `${url}#article`,
        headline: seoTitle(topic),
        description: topic.shortExplanation.text,
        inLanguage: "ar",
        url,
        mainEntityOfPage: url,
        learningResourceType: typeLabel(topic.type),
        timeRequired: `PT${topic.estimatedMinutes}M`,
        keywords: [...topic.searchKeywords, ...topic.tags].join("، "),
        isAccessibleForFree: true,
        publisher: { "@id": absoluteUrl("/#org") },
        citation: topic.bookReferences.map((reference) => ({
          "@type": "Book",
          name: reference.bookTitle,
          author: site.source.authors,
          publisher: site.source.publisher,
          url: site.source.url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "الأسماء والصفات", item: absoluteUrl(section) },
          { "@type": "ListItem", position: 3, name: topic.titleArabic, item: url },
        ],
      },
    ],
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return (
    <>
      <JsonLd data={topicSchema(topic)} />
      <TopicArticle topic={topic} />
    </>
  );
}
