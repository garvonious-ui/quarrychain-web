import PageHero from "@/components/layout/PageHero";
import LitepaperLayout from "@/components/litepaper/LitepaperLayout";

import Section01Intro from "./sections/01-intro";
import Section02Architecture from "./sections/02-architecture";
import Section03Consensus from "./sections/03-consensus";
import Section04QVM from "./sections/04-qvm";
import Section05Economics from "./sections/05-economics";
import Section06Tokens from "./sections/06-tokens";
import Section07RWA from "./sections/07-rwa";
import Section08Governance from "./sections/08-governance";
import Section09Tokenomics from "./sections/09-tokenomics";
import Section10Ecosystem from "./sections/10-ecosystem";
import Section11Roadmap from "./sections/11-roadmap";
import Section12Team from "./sections/12-team";
import Section13Ask from "./sections/13-ask";

export const metadata = {
  title: "QuarryChain Litepaper — Architecture, Consensus, Tokenomics",
  description:
    "An on-site, long-form read of QuarryChain's design: 3-layer architecture, Delegated Proof of Stake, EVM-compatible QVM, real-world asset tokenization, and the QRY token.",
};

// ISR: §11 Roadmap + §12 Team pull from Sanity (when configured).
// 60s revalidation matches the blog pages. /api/revalidate webhook revalidates on-demand.
export const revalidate = 60;

export default function WhitepaperPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Litepaper"
        headline="QuarryChain Litepaper"
        subheadline="Architecture, consensus, economics, and the case for QuarryChain — distilled into a single read."
        shape="tetrahedron"
        shapeColors={{
          primary: "#14b8a6",
          secondary: "#3b82f6",
          tertiary: "#ef4444",
        }}
      />

      <LitepaperLayout>
        <Section01Intro />
        <Section02Architecture />
        <Section03Consensus />
        <Section04QVM />
        <Section05Economics />
        <Section06Tokens />
        <Section07RWA />
        <Section08Governance />
        <Section09Tokenomics />
        <Section10Ecosystem />
        <Section11Roadmap />
        <Section12Team />
        <Section13Ask />
      </LitepaperLayout>
    </div>
  );
}
