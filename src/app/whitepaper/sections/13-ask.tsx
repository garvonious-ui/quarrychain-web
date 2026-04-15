import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "ask")!;

const CTAS = [
  {
    text: "Read the Docs",
    href: "/developers",
    primary: true,
  },
  {
    text: "Join Discord",
    href: "https://discord.gg/quarrychain",
    primary: false,
  },
  {
    text: "View on GitHub",
    href: "https://github.com/QuarryLabsInc",
    primary: false,
  },
];

export default function Section13Ask() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain isn&apos;t a thought experiment. The protocol is live on
        Shasta testnet, the QVM runs Solidity contracts unmodified, and the
        ecosystem has working wallets, an explorer, and a DEX. Mainnet,
        listings, and the first delegate elections are next.
      </p>

      <p>
        If you build smart contracts, deploy one to Shasta and see what
        running with free bandwidth and 3-second blocks feels like. If you
        run a project that needs cheap, fast settlement, talk to us about
        what migration looks like. If you want to validate the network when
        mainnet goes live, the candidate process is documented and open.
      </p>

      <div className="not-prose flex flex-col sm:flex-row gap-3 pt-4">
        {CTAS.map((cta) => (
          <a
            key={cta.text}
            href={cta.href}
            target={cta.href.startsWith("http") ? "_blank" : undefined}
            rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={
              cta.primary
                ? "inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
                : "inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300"
            }
          >
            {cta.text}
          </a>
        ))}
      </div>
    </LitepaperSection>
  );
}
