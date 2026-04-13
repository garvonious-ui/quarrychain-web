"use client";

import BlurFade from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

interface PageHeroCTA {
  text: string;
  href: string;
  primary?: boolean;
  badge?: string;
}

interface PageHeroProps {
  label?: string;
  headline: string;
  subheadline?: string;
  ctas?: PageHeroCTA[];
  className?: string;
}

export default function PageHero({
  label,
  headline,
  subheadline,
  ctas,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("py-24 lg:py-32 px-6", className)}>
      <div className="mx-auto max-w-3xl text-center">
        {label && (
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              {label}
            </p>
          </BlurFade>
        )}

        <BlurFade delay={0.05}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-primary leading-tight">
            {headline}
          </h1>
        </BlurFade>

        {subheadline && (
          <BlurFade delay={0.1}>
            <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
              {subheadline}
            </p>
          </BlurFade>
        )}

        {ctas && ctas.length > 0 && (
          <BlurFade delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              {ctas.map((cta) => (
                <a
                  key={cta.text}
                  href={cta.href}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                    cta.primary
                      ? "text-white border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                      : "text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary"
                  )}
                >
                  {cta.text}
                  {cta.badge && (
                    <span className="text-[10px] text-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                      {cta.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
