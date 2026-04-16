import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AsSeenIn from "@/components/sections/AsSeenIn";
import Features from "@/components/sections/Features";
import DeveloperCTA from "@/components/sections/DeveloperCTA";
import Ecosystem from "@/components/sections/Ecosystem";
import GovernancePreview from "@/components/sections/GovernancePreview";
import LiveStats from "@/components/sections/LiveStats";
import Tokenomics from "@/components/sections/Tokenomics";
import Roadmap from "@/components/sections/Roadmap";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";

// ISR: Team + Roadmap are now pulled from Sanity (see src/lib/team.ts, src/lib/roadmap.ts).
// 60s revalidation matches the blog pages. /api/revalidate webhook revalidates on-demand.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AsSeenIn />
      <Features />
      <DeveloperCTA />
      <Ecosystem />
      <GovernancePreview />
      <LiveStats />
      <Tokenomics />
      <Roadmap />
      <Team />
      <CTA />
    </>
  );
}
