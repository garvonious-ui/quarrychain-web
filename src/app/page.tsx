import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import AsSeenIn from "@/components/sections/AsSeenIn";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Features from "@/components/sections/Features";
import HowDPoSWorks from "@/components/sections/HowDPoSWorks";
import Ecosystem from "@/components/sections/Ecosystem";
import LiveStats from "@/components/sections/LiveStats";
import Tokenomics from "@/components/sections/Tokenomics";
import Roadmap from "@/components/sections/Roadmap";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AsSeenIn />
        <ProblemSolution />
        <Features />
        <HowDPoSWorks />
        <Ecosystem />
        <LiveStats />
        <Tokenomics />
        <Roadmap />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
