"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Animation =
  | "fade-up"
  | "fade-down"
  | "zoom-in"
  | "zoom-out"
  | "fade-left"
  | "fade-right";

const hidden: Record<Animation, gsap.TweenVars> = {
  "fade-up": { y: 50, opacity: 0 },
  "fade-down": { y: -50, opacity: 0 },
  "fade-left": { x: 50, opacity: 0 },
  "fade-right": { x: -50, opacity: 0 },
  "zoom-in": { scale: 0.9, opacity: 0 },
  "zoom-out": { scale: 1.05, opacity: 0 },
};

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  animation?: Animation;
  delay?: number;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block */
  stagger?: number;
}

/**
 * Scroll reveal driven by IntersectionObserver (reliable across layout shifts)
 * and animated with GSAP. The hidden state is applied in JS only, so if the
 * effect never runs the content stays visible — it can never get stuck hidden.
 */
export function Reveal({
  children,
  as,
  animation = "fade-up",
  delay = 0,
  className,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets: gsap.TweenTarget = stagger
        ? Array.from(el.children)
        : el;

      const show = () =>
        gsap.to(targets, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay,
          ease: "power2.out",
          stagger: stagger ?? 0,
          overwrite: "auto",
        });

      // Respect reduced motion — just show it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { x: 0, y: 0, scale: 1, opacity: 1 });
        return;
      }

      // Apply the hidden state, then reveal when it scrolls into view.
      gsap.set(targets, hidden[animation]);

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            show();
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(el);

      return () => observer.disconnect();
    },
    { scope: ref, dependencies: [animation, delay, stagger] }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
