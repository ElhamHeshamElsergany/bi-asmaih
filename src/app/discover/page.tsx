import type { Metadata } from "next";
import { DiscoverView } from "@/components/discover-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "اكتشف — أسئلة شائعة واختبارات في العقيدة",
  description:
    "أسئلة قصيرة عن أسماء الله وصفاته، وتصحيح لعبارات شائعة، واختبارات سريعة تراجع بها فهمك. كل إجابة معها مصدرها من الكتاب.",
  path: "/discover",
  keywords: ["أسئلة في العقيدة", "اختبار العقيدة", "أخطاء شائعة في الأسماء والصفات"],
});

export default function DiscoverPage() {
  return <DiscoverView />;
}
