import HeroExperience from "@/components/sections/HeroExperience";
import TheHumanSection from "@/components/sections/TheHumanSection";
import OpenSystemsSection from "@/components/sections/OpenSystemsSection";
import SignalSection from "@/components/sections/SignalSection";
import ResearchSection from "@/components/sections/ResearchSection";
import ConclusionSection from "@/components/sections/ConclusionSection";

export default function Home() {
  return (
    <main className="w-full relative bg-[#080706]">
      <HeroExperience />
      <TheHumanSection />
      <OpenSystemsSection />
      <SignalSection />
      <ResearchSection />
      <ConclusionSection />
    </main>
  );
}
