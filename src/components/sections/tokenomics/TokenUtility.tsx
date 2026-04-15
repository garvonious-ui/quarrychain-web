"use client";

import { Zap, Vote, Pickaxe, Code, Building, Coins } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { TOKEN_UTILITY } from "@/lib/constants";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Zap,
  Vote,
  Pickaxe,
  Code,
  Building,
};

/**
 * Token utility timeline — 5 use cases for QRY, vertically stacked
 * with colored icon dots and a connecting gradient line.
 */
export default function TokenUtility() {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-qc-teal/40 via-qc-blue/20 to-transparent hidden md:block" />
      <div className="space-y-10">
        {TOKEN_UTILITY.map((item, i) => {
          const Icon = ICON_MAP[item.icon] || Coins;
          return (
            <BlurFade key={item.title} delay={0.1 + i * 0.08}>
              <div className="flex gap-6 md:gap-10 items-start">
                <div
                  className={`shrink-0 w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center relative z-10`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary max-w-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
