"use client";

import { useEffect, useState } from "react";
import { List, X } from "lucide-react";
import { LITEPAPER_SECTIONS, LITEPAPER_ACCENTS } from "@/lib/litepaper";
import { cn } from "@/lib/utils";

/**
 * Mobile-only TOC. Renders as a fixed button in the bottom-right corner;
 * tapping it opens a fullscreen drawer with the section list. Tapping a
 * section closes the drawer (the global Lenis SmoothScroll handler picks
 * up the anchor click and scrolls to the target).
 *
 * Hidden on lg+ screens since TocSidebar is visible there.
 */
export default function MobileTocDrawer() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(LITEPAPER_SECTIONS[0].id);

  // Track current section so the drawer highlights the right entry when opened.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Floating button — only visible on mobile */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-bg-secondary border border-qc-teal/30 shadow-[0_0_30px_rgba(20,184,166,0.15)] text-text-primary text-sm font-medium backdrop-blur"
        aria-label="Open table of contents"
      >
        <List className="w-4 h-4 text-qc-teal" />
        Contents
      </button>

      {/* Drawer overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-bg-primary border-l border-white/10 overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 sticky top-0 bg-bg-primary/95 backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
                Contents
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white/5"
                aria-label="Close table of contents"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="px-5 py-4 space-y-1">
              {LITEPAPER_SECTIONS.map((section) => {
                const active = activeId === section.id;
                const accent = LITEPAPER_ACCENTS[section.accent];
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all",
                        active
                          ? cn(accent.bg, accent.text, "font-medium")
                          : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                      )}
                    >
                      <span className="text-[10px] font-mono opacity-60 shrink-0 w-6">
                        {section.number}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
