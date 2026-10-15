import fs from "node:fs";

const src = fs
  .readFileSync(new URL("../../src/content/topics.ts", import.meta.url), "utf8")
  .replace(/\r\n/g, "\n");
const parts = src.split("\n  {\n    id:").slice(1);
const passages = [];

for (const part of parts) {
  const id = part.match(/^\s*"([^"]+)"/)?.[1];
  const title = part.match(/titleArabic:\s*"([^"]+)"/)?.[1];
  const question = part.match(/question:\s*"([^"]+)"/)?.[1];
  const keywordBlock = part.match(/searchKeywords:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  const keywords = [...keywordBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  const refs = [...part.matchAll(/page:\s*(\d+),\s*\n\s*excerpt:\s*\n\s*"([\s\S]*?)"/g)];
  for (const ref of refs) {
    passages.push({
      id: `${id}-p${ref[1]}-${passages.length}`,
      section: title,
      question,
      keywords,
      page: Number(ref[1]),
      book: "أصول الإيمان في ضوء الكتاب والسنة",
      excerpt: ref[2],
    });
  }
}

fs.mkdirSync(new URL("../src/knowledge", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../src/knowledge/passages.json", import.meta.url), JSON.stringify(passages, null, 2));
console.log(`passages ${passages.length}`);
