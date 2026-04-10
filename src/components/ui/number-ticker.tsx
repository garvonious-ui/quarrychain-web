"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  className?: string;
  delay?: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  prefix?: string;
  suffix?: string;
}

export default function NumberTicker({
  value,
  className,
  delay = 0,
  duration = 2,
  formatOptions,
  prefix = "",
  suffix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          const formatted = Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
            ...formatOptions,
          }).format(latest);
          setDisplayValue(formatted);
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, value, delay, duration, motionValue, formatOptions]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
