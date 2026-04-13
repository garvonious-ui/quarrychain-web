"use client";

import { Shield, Layers, ArrowLeftRight, Vote } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";

const FEATURES = [
  {
    title: "Self-Custody",
    description: "Your private keys never leave your device. Full ownership, zero compromises.",
    icon: Shield,
    spotlight: "rgba(20, 184, 166, 0.08)",
  },
  {
    title: "Multi-Token",
    description: "QRY, QRC-10, QRC-20 — manage all your QuarryChain assets in one place.",
    icon: Layers,
    spotlight: "rgba(59, 130, 246, 0.08)",
  },
  {
    title: "QuarrySwap Integration",
    description: "Swap and stake tokens directly from your wallet. No need to visit a separate dApp.",
    icon: ArrowLeftRight,
    spotlight: "rgba(34, 197, 94, 0.08)",
  },
  {
    title: "Governance",
    description: "Vote for Quarry Miners and participate in network governance. Earn staking rewards.",
    icon: Vote,
    spotlight: "rgba(239, 68, 68, 0.08)",
  },
];

export default function QuarryWalletPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="QuarryWallet"
        headline="Your keys. Your crypto. Your control."
        subheadline="Non-custodial wallet for QRY, QRC-10, and QRC-20 tokens."
        shape="octahedron"
        shapeColors={{ primary: "#ef4444", secondary: "#3b82f6" }}
        ctas={[
          { text: "Download", href: "#", primary: true, badge: "Coming soon" },
          { text: "Learn More", href: "/technology" },
        ]}
      />

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, i) => (
              <BlurFade key={feature.title} delay={0.1 + i * 0.1}>
                <SpotlightCard spotlightColor={feature.spotlight} className="h-full">
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-qc-teal" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-text-primary mb-2">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.description}</p>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        headline="Get notified when QuarryWallet launches."
        ctas={[
          { text: "Join Discord", href: "https://discord.gg/quarrychain", primary: true },
          { text: "Read Whitepaper", href: "/whitepaper" },
        ]}
      />
    </div>
  );
}
