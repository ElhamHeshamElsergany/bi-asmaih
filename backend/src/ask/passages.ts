import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type BookPassage = {
  id: string;
  section: string;
  question: string;
  keywords: string[];
  page: number;
  book: string;
  excerpt: string;
};

export function loadBookPassages(): BookPassage[] {
  const candidates = [
    join(__dirname, "..", "knowledge", "passages.json"),
    join(process.cwd(), "src", "knowledge", "passages.json"),
  ];
  const file = candidates.find((candidate) => existsSync(candidate));
  if (!file) return [];
  return JSON.parse(readFileSync(file, "utf8")) as BookPassage[];
}
