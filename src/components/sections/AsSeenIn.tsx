"use client";

import Marquee from "@/components/ui/marquee";
import BlurFade from "@/components/ui/blur-fade";

// Placeholder logos — text-based until real logos are provided
const outlets = [
  { name: "CoinDesk", href: "#" },
  { name: "CoinTelegraph", href: "#" },
  { name: "Bloomberg Crypto", href: "#" },
  { name: "The Block", href: "#" },
  { name: "Decrypt", href: "#" },
  { name: "CoinMarketCap", href: "#" },
  { name: "Yahoo Finance", href: "#" },
  { name: "Benzinga", href: "#" },
];

export default function AsSeenIn() {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-text-muted mb-10">
            As Seen In
          </p>
        </BlurFade>

        <Marquee speed={45} pauseOnHover>
          {outlets.map((outlet) => (
            <a
              key={outlet.name}
              href={outlet.href}
              className="flex items-center px-8 text-xl font-display font-bold text-text-muted/40 hover:text-text-muted/70 transition-colors duration-300 whitespace-nowrap"
            >
              {outlet.name}
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
