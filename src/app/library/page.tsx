import { Suspense } from "react";
import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";

export const metadata: Metadata = { title: "ما ورد في مصادرنا" };

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <LibraryView />
    </Suspense>
  );
}
