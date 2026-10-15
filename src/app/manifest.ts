import type { MetadataRoute } from "next";
import { assetPath, basePath, pagePath, site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — أسماء الله وصفاته`,
    short_name: site.name,
    description: site.description,
    id: pagePath("/"),
    start_url: pagePath("/"),
    scope: basePath ? `${basePath}/` : "/",
    display: "standalone",
    orientation: "portrait",
    dir: "rtl",
    lang: "ar",
    categories: ["education", "books"],
    background_color: "#f3efe7",
    theme_color: "#1e6b56",
    icons: [
      { src: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: assetPath("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: assetPath("/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "الأسماء والصفات", url: pagePath("/library") },
      { name: "اختبر فهمك", url: `${pagePath("/discover")}#quiz` },
      { name: "بحث", url: pagePath("/search") },
    ],
  };
}
