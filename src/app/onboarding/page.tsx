import type { Metadata } from "next";
import { OnboardingView } from "@/components/onboarding-view";

export const metadata: Metadata = { title: "ابدأ" };

export default function OnboardingPage() {
  return <OnboardingView />;
}
