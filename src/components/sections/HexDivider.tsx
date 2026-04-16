"use client";

import dynamic from "next/dynamic";

const FloatingHex = dynamic(
  () => import("@/components/three/FloatingHex"),
  { ssr: false }
);

/**
 * Section-to-section accent — a single green brand hex tumbling slowly,
 * positioned off to the right within the standard content container.
 *
 * Uses negative vertical margin equal to the hex height so the divider
 * OVERLAPS into the adjacent sections' padding without adding any net
 * height to the page. The hex lives inside the natural gap between
 * DeveloperCTA and Ecosystem rather than pushing them apart.
 */
export default function HexDivider() {
  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -my-24 md:-my-32 relative z-10 flex justify-end"
      aria-hidden="true"
    >
      <div className="w-48 h-48 md:w-64 md:h-64">
        <FloatingHex color={0x22c55e} opacity={0.5} backdropOpacity={0.18} />
      </div>
    </div>
  );
}
