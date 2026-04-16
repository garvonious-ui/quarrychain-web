import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";
import type { RoadmapStatus } from "@/lib/constants";
import { getRoadmapPhases } from "@/lib/roadmap";
import { cn } from "@/lib/utils";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "roadmap")!;

const STATUS_STYLES: Record<
  RoadmapStatus,
  { dot: string; border: string; label: string }
> = {
  complete: {
    dot: "bg-qc-green",
    border: "border-qc-green/20",
    label: "Complete",
  },
  "in-progress": {
    dot: "bg-qc-blue animate-pulse",
    border: "border-qc-blue/20",
    label: "In Progress",
  },
  upcoming: {
    dot: "bg-qc-red",
    border: "border-qc-red/10",
    label: "Upcoming",
  },
  future: {
    dot: "bg-text-muted",
    border: "border-white/5",
    label: "Future",
  },
};

export default async function Section11Roadmap() {
  const phases = await getRoadmapPhases();
  return (
    <LitepaperSection meta={meta}>
      <p>
        Four phases. Each phase has a single goal and a fixed list of
        deliverables. We&apos;re currently mid-Phase 2.
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 pt-2">
        {phases.map((phase) => {
          const style = STATUS_STYLES[phase.status];
          return (
            <div
              key={phase.phase}
              className={cn(
                "rounded-2xl bg-bg-secondary border p-6 transition-colors hover:border-white/10",
                style.border
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={cn("w-2 h-2 rounded-full", style.dot)} />
                <span className="text-xs uppercase tracking-widest text-text-muted font-mono">
                  Phase {phase.phase} &mdash; {style.label}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-3">
                {phase.title}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="text-text-muted mt-1.5">&#8226;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </LitepaperSection>
  );
}
