"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type CardStackItem } from "@/components/CardStack";

gsap.registerPlugin(ScrollTrigger);

// rgba strings must contain "0.8" so the conic-gradient .replace() calls work.
const COLORS = [
  "rgba(0, 93, 237, 0.8)",
  "rgba(94, 114, 228, 0.8)",
  "rgba(122, 162, 255, 0.8)",
  "rgba(0, 212, 255, 0.8)",
  "rgba(137, 101, 224, 0.8)",
  "rgba(59, 130, 246, 0.8)",
];

interface StackCardProps {
  item: CardStackItem;
  index: number;
  total: number;
  color: string;
  stickyTop: number;
}

function StackCard({ item, index, total, color, stickyTop }: StackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (total - index) * 0.05;
    gsap.set(card, { scale: 1, transformOrigin: "center top" });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(1, targetScale, self.progress);
        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    // Only kill THIS card's trigger (not every ScrollTrigger on the page).
    return () => {
      st.kill();
    };
  }, [index, total]);

  return (
    <div
      ref={containerRef}
      // Scroll distance per card = this height. Smaller = less scrolling.
      // (was h-screen / 100vh). 40vh ≈ ~60% less scrolling than the original.
      // `stickyTop` pins the cards just below the sticky "Our Services" header.
      style={{ top: stickyTop }}
      className="sticky flex h-[40vh] min-h-[400px] items-center justify-center"
    >
      <div
        ref={cardRef}
        className="relative h-[360px] w-[88%] max-w-4xl"
        style={{
          borderRadius: "24px",
          isolation: "isolate",
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: "top",
        }}
      >
        {/* Electric border */}
        <div
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "27px",
            padding: "3px",
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${color} 60deg,
              ${color.replace("0.8", "0.6")} 120deg,
              transparent 180deg,
              ${color.replace("0.8", "0.4")} 240deg,
              transparent 360deg
            )`,
            zIndex: -1,
          }}
        />

        {/* Glass card */}
        <div
          className="glass-strong"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "24px",
            backdropFilter: "blur(25px) saturate(180%)",
            WebkitBackdropFilter: "blur(25px) saturate(180%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Glass reflection */}
          <div
            style={{
              position: "absolute",
              inset: "0 0 auto 0",
              height: "60%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-center gap-4 px-8 md:px-16">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: color.replace("0.8", "0.18") }}
            >
              <i className={`fa-solid ${item.icon} text-2xl text-white`} />
            </div>
            <h3 className="text-3xl font-bold text-heading md:text-4xl">
              {item.title}
            </h3>
            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesStackedCards({
  items,
  stickyTop = 0,
}: {
  items: CardStackItem[];
  stickyTop?: number;
}) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <StackCard
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          color={COLORS[index % COLORS.length]}
          stickyTop={stickyTop}
        />
      ))}
    </div>
  );
}
