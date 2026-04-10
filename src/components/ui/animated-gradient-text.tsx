"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]",
        "bg-gradient-to-r from-qc-teal via-qc-blue to-qc-teal",
        className
      )}
    >
      {children}
    </span>
  );
}
