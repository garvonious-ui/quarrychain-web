import { cn } from "@/lib/utils";

interface SectionGlowProps {
  color?: "teal" | "blue" | "red" | "green";
  className?: string;
}

const glowColors = {
  teal: "from-transparent via-qc-teal/20 to-transparent",
  blue: "from-transparent via-qc-blue/20 to-transparent",
  red: "from-transparent via-qc-red/15 to-transparent",
  green: "from-transparent via-qc-green/15 to-transparent",
};

export default function SectionGlow({ color = "teal", className }: SectionGlowProps) {
  return (
    <div className={cn("w-full max-w-md mx-auto h-px bg-gradient-to-r", glowColors[color], className)} />
  );
}
