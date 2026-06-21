import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  const style = {
    "--rot": `${rotate}deg`,
    "--rot-start": `${rotate - 15}deg`,
    animationDelay: `${delay}s`,
  } as CSSProperties;

  return (
    <div className={cn("cf-shape absolute", className)} style={style}>
      <div
        className="cf-shape-float relative"
        style={{ width, height, animationDelay: `${delay}s` }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </div>
    </div>
  );
}
