import { distinctiveTokens, normalizeArabic } from "./arabic";
import type { BookPassage } from "./passages";

const MINIMUM_SCORE = 4;

export function retrievePassages(question: string, passages: BookPassage[], limit = 4): BookPassage[] {
  const normalizedQuestion = normalizeArabic(question);
  const tokens = distinctiveTokens(question);
  if (!normalizedQuestion || tokens.length === 0) return [];

  const ranked = passages
    .map((passage) => ({ passage, score: scorePassage(normalizedQuestion, tokens, passage) }))
    .filter((item) => item.score >= MINIMUM_SCORE)
    .sort((a, b) => b.score - a.score);

  const chosen: BookPassage[] = [];
  const seen = new Set<string>();
  for (const item of ranked) {
    if (seen.has(item.passage.excerpt)) continue;
    seen.add(item.passage.excerpt);
    chosen.push(item.passage);
    if (chosen.length === limit) break;
  }
  return chosen;
}

function scorePassage(normalizedQuestion: string, tokens: string[], passage: BookPassage): number {
  const haystack = normalizeArabic(
    [passage.section, passage.question, passage.keywords.join(" "), passage.excerpt].join(" "),
  );
  let score = 0;
  for (const keyword of passage.keywords) {
    const normalized = normalizeArabic(keyword);
    if (normalized.length >= 3 && normalizedQuestion.includes(normalized)) score += 8;
  }
  const normalizedSection = normalizeArabic(passage.section);
  const normalizedTopicQuestion = normalizeArabic(passage.question);
  for (const token of tokens) {
    if (hasWord(normalizedSection, token)) score += 3;
    if (hasWord(normalizedTopicQuestion, token)) score += 4;
    if (hasWord(haystack, token)) score += 2;
  }
  return score;
}

function hasWord(haystack: string, token: string): boolean {
  return haystack.split(" ").includes(token);
}
