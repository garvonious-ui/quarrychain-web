import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";
import TokenAllocationChart from "@/components/sections/tokenomics/TokenAllocationChart";
import AllocationBreakdown from "@/components/sections/tokenomics/AllocationBreakdown";
import VestingTimeline from "@/components/sections/tokenomics/VestingTimeline";
import SupplySchedule from "@/components/sections/tokenomics/SupplySchedule";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "tokenomics")!;

export default function Section09Tokenomics() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QRY is the native token of the QuarryChain network. It pays for
        bandwidth, drives validator elections, and is the unit of account for
        smart contract deployment. The supply is fixed at 200 million tokens,
        and every allocation is on a public, contractually-enforced vesting
        schedule.
      </p>

      <div className="not-prose pt-2">
        <TokenAllocationChart />
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-8">
        Every slice, accounted for
      </h3>
      <p>
        Five categories cover the entire 200M supply. No tokens are unallocated,
        none are reserved for the foundation outside of the ecosystem grant
        pool, and the team allocation is the strictest-locked of the five.
      </p>

      <div className="not-prose">
        <AllocationBreakdown />
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-8">
        Vesting timeline
      </h3>
      <p>
        Tokens unlock gradually over 48 months. Team tokens are completely
        locked for the first 12 months, then vest linearly over the next 24.
        No allocation reaches full circulation before month 24, and the public
        sale tranche is the only one with significant TGE liquidity.
      </p>

      <div className="not-prose">
        <VestingTimeline />
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-8">
        Cumulative supply over time
      </h3>
      <p>
        Stacked across all five allocations, this is what circulating supply
        actually looks like month-by-month. The curve flattens as private and
        team allocations finish vesting, leaving long-tail emission from the
        staking pool.
      </p>

      <div className="not-prose">
        <SupplySchedule />
      </div>
    </LitepaperSection>
  );
}
