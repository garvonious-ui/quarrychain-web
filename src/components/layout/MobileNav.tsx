"use client";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-300",
        open ? "visible" : "invisible"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "absolute right-0 top-16 bottom-0 w-72 bg-bg-secondary border-l border-white/5 p-6 transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg text-text-secondary hover:text-text-primary transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-white/5 my-2" />
          <a
            href="#cta"
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-qc-teal/10"
          >
            Explore Ecosystem
          </a>
        </div>
      </div>
    </div>
  );
}
