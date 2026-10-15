import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type BookPassage = {
  id: string;
  section: string;
  question: string;
  keywords: string[];
  page: number | null;
  book: string;
  excerpt: string;
  sourceKind?: "book" | "dorar";
  url?: string;
};

export function loadBookPassages(): BookPassage[] {
  return [...readJson("passages.json"), ...readJson("dorar-passages.json")];
}

function readJson(name: string): BookPassage[] {
  const candidates = [join(__dirname, "..", "knowledge", name), join(process.cwd(), "src", "knowledge", name)];
  const file = candidates.find((candidate) => existsSync(candidate));
  if (!file) return [];
  return JSON.parse(readFileSync(file, "utf8")) as BookPassage[];
}
