import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  index?: boolean;
}): Metadata {
  const image = { url: `${site.url}/opengraph-image.png`, width: 1200, height: 630, alt: `${site.name} — ${title}` };
  return {
    title,
    description,
    keywords: [...keywords, ...site.keywords],
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { type: "website", locale: site.locale, siteName: site.name, title, description, url: absoluteUrl(path), images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: index ? undefined : { index: false, follow: true },
  };
}
