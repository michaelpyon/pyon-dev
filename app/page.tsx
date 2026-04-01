import { Hero } from "@/components/Hero";
import { FlagshipSection } from "@/components/FlagshipSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <Hero />
      <main id="main-content">
        <FlagshipSection />
        <ProjectGrid />
      </main>
    </>
  );
}
