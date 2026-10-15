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

export function minutesLabel(minutes: number): string {
  if (minutes <= 1) return "دقيقة واحدة";
  if (minutes === 2) return "دقيقتان";
  return `${minutes} دقائق`;
}

export function typeLabel(type: "name" | "attribute" | "concept"): string {
  if (type === "name") return "اسم";
  if (type === "attribute") return "صفة";
  return "مفهوم";
}
