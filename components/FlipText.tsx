import React from "react";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface FlipTextProps {
  children: string;
  /** Classes for the wrapper (font-size, weight, casing, base color). */
  className?: string;
  /** Color class for the layer that flips in on hover. */
  incomingClassName?: string;
}

/**
 * Per-letter flip-on-hover text. Each letter is its own clipped unit, so the
 * effect works for text that wraps onto multiple lines (the incoming layer is
 * always clipped to its own letter box and can never bleed onto another line).
 */
export function FlipText({
  children,
  className,
  incomingClassName = "text-brand",
}: FlipTextProps) {
  const words = children.split(" ");
  let i = 0; // continuous index so the stagger flows across the whole phrase
  return (
    <span
      className={cn("group flex flex-wrap gap-x-[0.28em]", className)}
      style={{ lineHeight: 1.05 }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex items-end">
          {word.split("").map((ch, ci) => {
            const delay = i++ * 22;
            return (
              <span
                key={ci}
                className="relative inline-block overflow-hidden align-bottom"
              >
                {/* front layer */}
                <span
                  className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
                {/* incoming layer — clipped below the letter until hover */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                    incomingClassName
                  )}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
