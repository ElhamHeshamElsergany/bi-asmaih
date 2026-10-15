import type { Metadata } from "next";
import { DiscoverView } from "@/components/discover-view";

export const metadata: Metadata = { title: "اكتشف" };

export default function DiscoverPage() {
  return <DiscoverView />;
}
