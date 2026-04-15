import { cn } from "@/lib/utils";
import { LITEPAPER_ACCENTS, type LitepaperSectionMeta } from "@/lib/litepaper";

interface LitepaperSectionProps {
  meta: LitepaperSectionMeta;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper for each litepaper section.
 *
 * Renders the section anchor, the number+label header, the gradient
 * headline, and a content slot. `scroll-mt-24` accounts for the fixed
 * navbar so anchor scrolls land below the navbar, not under it.
 */
export default function LitepaperSection({
  meta,
  children,
  className,
}: LitepaperSectionProps) {
  const accent = LITEPAPER_ACCENTS[meta.accent];

  return (
    <section
      id={meta.id}
      className={cn("scroll-mt-24 py-16 lg:py-20 first:pt-8", className)}
    >
      {/* Section header — number, divider, label */}
      <div className="flex items-center gap-3 mb-4">
        <span className={cn("text-xs font-mono", accent.text)}>
          {meta.number}
        </span>
        <span
          className="h-px w-8"
          style={{ backgroundColor: `${accent.hex}55` }}
        />
        <span className="text-xs uppercase tracking-widest text-text-muted font-mono">
          {meta.label}
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-text-primary mb-8 leading-tight max-w-3xl">
        {meta.title}
      </h2>

      {/* Body */}
      <div className="text-text-secondary text-base lg:text-lg leading-relaxed space-y-6">
        {children}
      </div>
    </section>
  );
}
