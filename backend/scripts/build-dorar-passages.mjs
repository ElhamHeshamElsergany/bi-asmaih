import { readFileSync, writeFileSync } from "node:fs";

const namesFile = readFileSync(new URL("../../src/content/dorar-names.ts", import.meta.url), "utf8");
const names = JSON.parse(namesFile.match(/names:\s*(\[[\s\S]*\])\s*as ListedName\[\]/)[1]);
const pages = JSON.parse(readFileSync(new URL("../src/knowledge/dorar-pages.json", import.meta.url), "utf8"));
const excerptByUrl = new Map(pages.pages.filter((page) => page.excerpt).map((page) => [page.url, page]));

const passages = [];
for (const item of names) {
  const url = item.dorarId ? `https://dorar.net/aqeeda/${item.dorarId}` : "https://dorar.net/aqeeda/459";
  const page = excerptByUrl.get(url);
  const listedOnly = !page;
  passages.push({
    id: `dorar-name-${item.dorarId ?? item.name}`,
    sourceKind: "dorar",
    section: item.name,
    question: item.name,
    keywords: [item.name],
    page: null,
    url,
    book: "الدرر السنية — الموسوعة العقدية",
    excerpt: listedOnly
      ? `ورد «${item.name}» في قائمة الموسوعة العقدية. ليس في هذا المقطع شرح لمعنى الاسم.`
      : page.excerpt,
  });
}

const listPage = excerptByUrl.get("https://dorar.net/aqeeda/459");
passages.push({
  id: "dorar-name-list",
  sourceKind: "dorar",
  section: "أسماء الله الحسنى",
  question: "ما الأسماء التي أحصتها الدرر السنية من الكتاب والسنة؟",
  keywords: ["أسماء الله الحسنى", "إحصاء الأسماء", "الدرر السنية"],
  page: null,
  url: "https://dorar.net/aqeeda/459",
  book: "الدرر السنية — الموسوعة العقدية",
  excerpt: `${listPage.excerpt} ${names.map((item) => item.name).join("، ")}. يُنظر: ((صفات الله عز وجل الواردة في الكتاب والسنة وإحصاء أسمائه تعالى)) لعلوي السقاف (ص: 438).`,
});

for (const page of pages.pages) {
  if (!page.excerpt || page.url === "https://dorar.net/aqeeda/459") continue;
  if (passages.some((passage) => passage.url === page.url && passage.excerpt === page.excerpt)) continue;
  passages.push({
    id: `dorar-page-${page.topicId}`,
    sourceKind: "dorar",
    section: page.title,
    question: page.title,
    keywords: [page.title],
    page: null,
    url: page.url,
    book: "الدرر السنية — الموسوعة العقدية",
    excerpt: page.excerpt,
  });
}

writeFileSync(new URL("../src/knowledge/dorar-passages.json", import.meta.url), JSON.stringify(passages, null, 2));
console.log("passages", passages.length, "with meaning", passages.filter((passage) => !passage.excerpt.includes("ليس في هذا المقطع")).length);
