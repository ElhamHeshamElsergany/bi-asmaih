import { book } from "@/content/book";

/** Set for GitHub Pages project sites. Empty on Bonto and in local dev. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** File URL, such as an icon. Keeps the path exactly, with the Pages prefix when set. */
export function assetPath(pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${basePath}${path}`;
}

/** Page URL. GitHub Pages serves each route as a directory, so the slash is required there. */
export function pagePath(pathname: string) {
  const path = assetPath(pathname);
  if (!basePath || path.endsWith("/")) return path || "/";
  return `${path}/`;
}

export const site = {
  name: "اعرف ربك",
  tagline: "أسماء • صفات • عقيدة",
  description:
    "تعلّم أسماء الله الحسنى وصفاته العُلا بطريقة بسيطة وموثوقة: خلاصة قصيرة، ثم الدليل من القرآن والسنة، ثم نص الكتاب ورقم الصفحة. لطالب العلم وللمسلم الذي يريد أن يعرف ربه.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "ar_AR",
  keywords: [
    "أسماء الله الحسنى",
    "صفات الله",
    "العقيدة الإسلامية",
    "توحيد الأسماء والصفات",
    "معاني أسماء الله",
    "الإيمان بالله",
    "تعلم العقيدة",
    "طالب العلم",
    "أصول الإيمان",
    "اعرف ربك",
  ],
  source: book,
} as const;

/** Origin only. Next.js adds the Pages base path itself when resolving icons and social images. */
export function metadataOrigin() {
  return new URL(site.url).origin;
}

export function absoluteUrl(pathname = "/") {
  const suffix = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (!basePath) return `${site.url}${suffix}`;
  const splitAt = Math.min(...["?", "#"].map((mark) => {
    const index = suffix.indexOf(mark);
    return index === -1 ? suffix.length : index;
  }));
  const path = suffix.slice(0, splitAt);
  const rest = suffix.slice(splitAt);
  return `${site.url}${path.endsWith("/") ? path : `${path}/`}${rest}`;
}
