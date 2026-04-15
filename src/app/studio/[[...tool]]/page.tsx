"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import type { Config } from "sanity";

export default function StudioPage() {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    // Lazy-load sanity.config.ts only on the client at runtime
    import("../../../../sanity.config").then((mod) => {
      setConfig(mod.default);
    });
  }, []);

  if (!config) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary">
        <p className="text-text-secondary">Loading Studio...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-bg-primary">
      <NextStudio config={config} />
    </div>
  );
}
