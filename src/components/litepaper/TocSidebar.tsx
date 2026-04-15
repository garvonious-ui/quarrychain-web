"use client";

import { useEffect, useState } from "react";
import { LITEPAPER_SECTIONS, LITEPAPER_ACCENTS } from "@/lib/litepaper";
import { cn } from "@/lib/utils";

/**
 * Sticky TOC sidebar with scroll-spy.
 *
 * Uses IntersectionObserver to track which section is currently in view
 * and highlights the corresponding TOC link. Hidden on mobile (<lg) — the
 * mobile experience uses MobileTocDrawer.
 *
 * Smooth scroll is handled globally by Lenis (SmoothScroll.tsx) — it
 * intercepts clicks on a[href^="#"] and scrolls with a -80px offset.
 */
export default function TocSidebar() {
  const [activeId, setActiveId] = useState<string>(LITEPAPER_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible section as "active". The rootMargin
        // shifts the observation window down by ~80px (navbar offset)
        // and up by 60% of viewport — so a section becomes active once
        // its top reaches roughly 40% of viewport height.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    LITEPAPER_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2"
    >
      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-4">
        Contents
      </p>
      <ul className="border-l border-white/5">
        {LITEPAPER_SECTIONS.map((section) => {
          const active = activeId === section.id;
          const accent = LITEPAPER_ACCENTS[section.accent];
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "flex items-center gap-3 -ml-px pl-4 py-1.5 text-sm border-l transition-all duration-200",
                  active
                    ? cn(accent.text, "border-current font-medium")
                    : "text-text-muted border-transparent hover:text-text-secondary hover:border-white/20"
                )}
              >
                <span className="text-[10px] font-mono opacity-60 shrink-0">
                  {section.number}
                </span>
                <span className="truncate">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
