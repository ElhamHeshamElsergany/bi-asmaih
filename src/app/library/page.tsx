import { Suspense } from "react";
import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "أسماء الله الحسنى وصفاته — ما ورد في مصادرنا",
  description:
    "مكتبة مواد مشروحة عن أسماء الله الحسنى وصفاته من كتاب «أصول الإيمان في ضوء الكتاب والسنة»، مع فهرس الأسماء كما أحصتها الدرر السنية من الكتاب والسنة.",
  path: "/library",
  keywords: ["فهرس أسماء الله", "الحي القيوم", "الرحمن الرحيم", "صفة العلم", "صفة السمع"],
});

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <LibraryView />
    </Suspense>
  );
}
