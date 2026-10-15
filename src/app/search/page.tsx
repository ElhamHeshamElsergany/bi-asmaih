import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchView } from "@/components/search-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "بحث في أسماء الله وصفاته",
  description: "ابحث عن اسم من أسماء الله أو صفة من صفاته في المواد المشروحة وفهرس الأسماء.",
  path: "/search",
  index: false,
});

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <SearchView />
    </Suspense>
  );
}
