import HeroExperience from "@/components/sections/HeroExperience";
import TheHumanSection from "@/components/sections/TheHumanSection";
import OpenSystemsSection from "@/components/sections/OpenSystemsSection";
import SignalSection from "@/components/sections/SignalSection";
import EngineeringShowcaseSection from "@/components/sections/EngineeringShowcaseSection";
import InteractiveEndGameSection from "@/components/sections/InteractiveEndGameSection";

export default function Home() {
  return (
    <main className="w-full relative bg-[#080706]">
      <HeroExperience />
      <TheHumanSection />
      <OpenSystemsSection />
      <SignalSection />
      <EngineeringShowcaseSection />
      <InteractiveEndGameSection />
    </main>
  );
}
