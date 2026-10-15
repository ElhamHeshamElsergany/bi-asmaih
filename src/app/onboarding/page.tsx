import type { Metadata } from "next";
import { OnboardingView } from "@/components/onboarding-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ابدأ",
  description: "اختر من أين تبدأ رحلتك في معرفة أسماء الله وصفاته.",
  path: "/onboarding",
  index: false,
});

export default function OnboardingPage() {
  return <OnboardingView />;
}
