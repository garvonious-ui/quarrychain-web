"use client";

import dynamic from "next/dynamic";
import { SOCIAL_LINKS } from "@/lib/constants";
import BlurFade from "@/components/ui/blur-fade";

const WireframeGem = dynamic(() => import("@/components/three/WireframeGem"), {
  ssr: false,
  loading: () => null,
});

export default function CTA() {
  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08),transparent_70%)]" />

      {/* Wireframe gem */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[550px] h-[550px]">
          <WireframeGem className="w-full h-full" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <BlurFade>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">
            Start building on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
              QuarryChain.
            </span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="/developers"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
            >
              Read the Docs
            </a>
            <a
              href="https://discord.gg/quarrychain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300"
            >
              Join Discord
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.25}>
          <div className="flex items-center justify-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-text-muted hover:text-qc-teal transition-colors text-sm"
                aria-label={social.name}
              >
                {social.name}
              </a>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
