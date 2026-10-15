import { featured } from "@/content/learning";
import { HomeView } from "@/components/home-view";

export default function HomePage() {
  const featuredIndex = new Date().getDate() % featured.length;
  return <HomeView featuredIndex={featuredIndex} />;
}
