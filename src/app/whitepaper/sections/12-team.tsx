import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";
import { TEAM } from "@/lib/constants";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "team")!;

export default function Section12Team() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain is built by a small, focused team across engineering,
        design, and operations. The protocol&apos;s ambition is large, but the
        decision-making surface is intentionally small.
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-3 pt-2">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="rounded-xl bg-bg-secondary border border-white/5 p-5 flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-qc-teal/20 to-qc-blue/20 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold font-display text-qc-teal">
                {member.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold font-display text-text-primary truncate">
                {member.name}
              </p>
              <p className="text-xs text-text-muted mt-0.5 truncate">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </LitepaperSection>
  );
}
