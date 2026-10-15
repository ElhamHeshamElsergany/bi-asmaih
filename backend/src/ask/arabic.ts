const STOP = new Set([
  "في",
  "من",
  "علي",
  "الي",
  "عن",
  "ما",
  "هذا",
  "هذه",
  "ذلك",
  "التي",
  "الذي",
  "هو",
  "هي",
  "لا",
  "لم",
  "ان",
  "قد",
  "كل",
  "او",
  "ثم",
  "مع",
  "بين",
  "بعد",
  "قبل",
  "كان",
  "الله",
  "تعالي",
  "عز",
  "وجل",
  "سبحانه",
  "كيف",
  "هل",
  "لماذا",
  "معنى",
  "معني",
]);

export function normalizeArabic(value: string): string {
  return value
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\u0621-\u064A0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function distinctiveTokens(value: string): string[] {
  const seen = new Set<string>();
  for (const token of normalizeArabic(value).split(" ")) {
    if (token.length < 3 || STOP.has(token) || seen.has(token)) continue;
    seen.add(token);
  }
  return [...seen];
}
