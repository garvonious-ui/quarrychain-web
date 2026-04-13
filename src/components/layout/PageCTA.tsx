"use client";

import BlurFade from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

interface PageCTAProps {
  headline: string;
  ctas: Array<{ text: string; href: string; primary?: boolean }>;
  className?: string;
}

export default function PageCTA({ headline, ctas, className }: PageCTAProps) {
  return (
    <section className={cn("py-24 px-6 relative", className)}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05),transparent_70%)]" />

      <div className="relative z-10 text-center">
        <BlurFade>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
            {headline}
          </h2>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {ctas.map((cta) => (
              <a
                key={cta.text}
                href={cta.href}
                className={cn(
                  "inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                  cta.primary
                    ? "text-white border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                    : "text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary"
                )}
              >
                {cta.text}
              </a>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
