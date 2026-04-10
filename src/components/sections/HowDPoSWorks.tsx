"use client";

import { Lock, Users, Blocks, Trophy } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

const steps = [
  {
    step: 1,
    title: "Freeze & Gain Power",
    description:
      "Stakeholders freeze QRY tokens to gain Quarry Power — your voice in the network.",
    icon: Lock,
    color: "text-qc-blue",
    bgColor: "bg-qc-blue/10",
  },
  {
    step: 2,
    title: "Vote for Miners",
    description:
      "Community votes to elect 27 Quarry Miners who will produce blocks.",
    icon: Users,
    color: "text-qc-red",
    bgColor: "bg-qc-red/10",
  },
  {
    step: 3,
    title: "Produce Blocks",
    description:
      "Elected miners produce blocks in 3-second rounds — fast, efficient, decentralized.",
    icon: Blocks,
    color: "text-qc-green",
    bgColor: "bg-qc-green/10",
  },
  {
    step: 4,
    title: "Earn Rewards",
    description:
      "Both voters and miners earn rewards for participating in the network.",
    icon: Trophy,
    color: "text-qc-teal",
    bgColor: "bg-qc-teal/10",
  },
];

export default function HowDPoSWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-qc-red mb-4">
              How It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">
              Delegated Proof of Stake
            </h2>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <BlurFade key={item.step} delay={0.1 + i * 0.1}>
              <div className="rounded-2xl bg-bg-secondary border border-white/5 p-6 h-full hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.bgColor} ${item.color} text-sm font-bold font-display`}>
                    {item.step}
                  </span>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
