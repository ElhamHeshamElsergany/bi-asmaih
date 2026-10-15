import type { MetadataRoute } from "next";
import { quizzes } from "@/content/learning";
import { topics } from "@/content/topics";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/library"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/discover"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
  const topicPages: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: absoluteUrl(`/topic/${topic.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: topic.type === "concept" ? 0.8 : 0.7,
  }));
  const quizPages: MetadataRoute.Sitemap = quizzes.map((quiz) => ({
    url: absoluteUrl(`/quiz/${quiz.id}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));
  return [...pages, ...topicPages, ...quizPages];
}
