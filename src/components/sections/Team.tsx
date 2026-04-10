"use client";

import { TEAM } from "@/lib/constants";
import BlurFade from "@/components/ui/blur-fade";

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-qc-teal mb-4">
              Team
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">
              Built by Builders
            </h2>
          </div>
        </BlurFade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {TEAM.map((member, i) => (
            <BlurFade key={member.name} delay={0.05 + i * 0.05}>
              <div className="rounded-2xl bg-bg-secondary border border-white/5 p-6 text-center hover:border-white/10 transition-colors">
                {/* Abstract avatar */}
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-qc-teal/20 to-qc-blue/20 flex items-center justify-center">
                  <span className="text-lg font-bold font-display text-qc-teal">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  {member.name}
                </h3>
                <p className="text-sm text-text-muted mt-1">{member.role}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
