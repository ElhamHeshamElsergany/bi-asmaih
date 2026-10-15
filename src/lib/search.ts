import { topics } from "@/content/topics";
import { normalizeArabic } from "@/lib/arabic";
import type { Topic } from "@/lib/types";

function corpus(topic: Topic): string {
  return normalizeArabic(
    [
      topic.titleArabic,
      topic.question,
      topic.shortExplanation.text,
      topic.tags.join(" "),
      topic.searchKeywords.join(" "),
      topic.bookReferences.map((reference) => reference.excerpt).join(" "),
    ].join(" "),
  );
}

const indexed = topics.map((topic) => ({ topic, corpus: corpus(topic) }));

export function searchTopics(query: string): Topic[] {
  const normalized = normalizeArabic(query);
  if (normalized.length < 2) return [];
  const words = normalized.split(" ").filter((word) => word.length >= 2);
  if (words.length === 0) return [];

  return indexed
    .filter((entry) => words.every((word) => entry.corpus.includes(word)))
    .map((entry) => entry.topic);
}
