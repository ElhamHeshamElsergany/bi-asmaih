import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchView } from "@/components/search-view";

export const metadata: Metadata = { title: "بحث" };

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <SearchView />
    </Suspense>
  );
}
