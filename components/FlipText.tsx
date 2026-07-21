import React from "react";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Segment by grapheme cluster (user-perceived character), not raw UTF-16 code
// unit. Naive `.split("")` tears combining marks — e.g. Devanagari matras and
// the virama — away from their base consonant, so each renders in its own
// span as an orphaned combining mark (shown with a dotted-circle placeholder).
const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function toGraphemes(str: string): string[] {
  if (segmenter) return Array.from(segmenter.segment(str), (s) => s.segment);
  return Array.from(str);
}

// The per-letter clip-and-flip trick assumes every letter renders in a tight,
// uniform cell — true for Latin glyphs, but Devanagari conjuncts and matras
// have much taller, more variable vertical reach (and render in a fallback
// font, since Poppins has no Devanagari glyphs). That mismatch lets the
// hidden "incoming" hover layer bleed past its clip box. Render Devanagari
// text plainly instead, with a simple color swap on hover.
const DEVANAGARI_RE = /[ऀ-ॿ]/;

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
  if (DEVANAGARI_RE.test(children)) {
    return (
      <span
        className={cn(
          "inline-block transition-colors duration-300 hover:text-brand",
          className
        )}
      >
        {children}
      </span>
    );
  }

  const words = children.split(" ");
  let i = 0; // continuous index so the stagger flows across the whole phrase
  return (
    <span
      className={cn("group flex flex-wrap gap-x-[0.28em]", className)}
      style={{ lineHeight: 1.05 }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex items-end">
          {toGraphemes(word).map((ch, ci) => {
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
