"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import TextReveal from "@/components/ui/text-reveal";

const HexGrid = dynamic(() => import("@/components/three/HexGrid"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/20 to-bg-primary" />
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js HexGrid background */}
      <div className="absolute inset-0 z-0">
        <HexGrid className="absolute inset-0" />
      </div>

      {/* Light gradient just for top/bottom text readability — grid covers the rest */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary/80" />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-text-primary mb-6">
          <TextReveal delay={0.2}>The Blockchain Built</TextReveal>{" "}
          <span className="text-qc-blue">
            <TextReveal delay={0.4}>for What&apos;s Next</TextReveal>
          </span>
        </h1>

        {/* Subheadline */}
        <BlurFade delay={0.35}>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            100,000 TPS. 3-second finality. Minimal fees. Zero compromise.
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
            >
              Read Whitepaper
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300"
            >
              Explore Testnet
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </div>
    </section>
  );
}
