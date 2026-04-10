"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = NAV_LINKS.map((link) =>
        document.querySelector(link.href)
      ).filter(Boolean) as HTMLElement[];

      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = `#${section.id}`;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "backdrop-blur-xl border-b border-white/5",
          scrolled ? "bg-bg-primary/90" : "bg-bg-primary/50"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <img
                src="/logo-hero.png"
                alt="QuarryChain"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold font-display">
                <span className="text-qc-blue">Quarry</span>
                <span className="text-text-primary">Chain</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors relative",
                    activeSection === link.href
                      ? "text-qc-teal"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-qc-teal" />
                  )}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <a
                href="#cta"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-transparent hover:bg-qc-teal/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-all"
              >
                Explore Ecosystem
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-text-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
