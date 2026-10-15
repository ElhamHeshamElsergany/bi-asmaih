import type { Metadata } from "next";
import { ProgressView } from "@/components/progress-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "تقدمي",
  description: "تابع ما قرأته وما حفظته ومسار تعلّمك في أسماء الله وصفاته.",
  path: "/progress",
  index: false,
});

export default function ProgressPage() {
  return <ProgressView />;
}
