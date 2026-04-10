"use client";

import { ROADMAP } from "@/lib/constants";
import type { RoadmapStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";

const statusStyles: Record<RoadmapStatus, { dot: string; border: string; label: string }> = {
  complete: { dot: "bg-qc-green", border: "border-qc-green/20", label: "Complete" },
  "in-progress": { dot: "bg-qc-blue animate-pulse", border: "border-qc-blue/20", label: "In Progress" },
  upcoming: { dot: "bg-qc-red", border: "border-qc-red/10", label: "Upcoming" },
  future: { dot: "bg-text-muted", border: "border-white/5", label: "Future" },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-qc-green mb-4">
              Roadmap
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">
              The Path Forward
            </h2>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-4 gap-6">
          {ROADMAP.map((phase, i) => {
            const style = statusStyles[phase.status];
            return (
              <BlurFade key={phase.phase} delay={0.1 + i * 0.1}>
                <div
                  className={cn(
                    "rounded-2xl bg-bg-secondary border p-6 h-full transition-colors hover:border-white/10",
                    style.border
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={cn("w-2 h-2 rounded-full", style.dot)}
                    />
                    <span className="text-xs uppercase tracking-widest text-text-muted">
                      Phase {phase.phase} &mdash; {style.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-text-primary mb-4">
                    {phase.title}
                  </h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="text-text-muted mt-1.5">
                          &#8226;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
