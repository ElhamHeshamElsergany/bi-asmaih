import type { Metadata } from "next";
import { featured } from "@/content/learning";
import { HomeView } from "@/components/home-view";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { url: absoluteUrl("/"), type: "website", locale: site.locale, siteName: site.name, title: site.name, description: site.description },
};

export default function HomePage() {
  const featuredIndex = new Date().getDate() % featured.length;
  return <HomeView featuredIndex={featuredIndex} />;
}
