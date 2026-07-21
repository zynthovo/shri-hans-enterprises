"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/components/useIsMobile";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
  align?: "center" | "left";
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  align = "center",
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();

  // Mobile: cheap word swap (no per-frame blur / threshold filter).
  React.useEffect(() => {
    if (!isMobile) return;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (t1) {
      t1.style.filter = "none";
      t1.style.opacity = "100%";
      t1.style.transition = "opacity 0.4s";
    }
    if (t2) t2.style.opacity = "0%";
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % texts.length;
      if (!t1) return;
      t1.style.opacity = "0%";
      window.setTimeout(() => {
        if (t1) {
          t1.textContent = texts[i];
          t1.style.opacity = "100%";
        }
      }, 400);
    }, 2400);
    return () => window.clearInterval(id);
  }, [isMobile, texts]);

  React.useEffect(() => {
    if (isMobile) return; // mobile uses the lightweight swap above
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId = 0;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      rafId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent =
              texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [texts, morphTime, cooldownTime, isMobile]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "flex h-full items-center",
          align === "left" ? "justify-start" : "justify-center"
        )}
        style={{ filter: isMobile ? "none" : "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          style={{ opacity: "100%" }}
          className={cn(
            "absolute inline-block whitespace-nowrap select-none text-5xl md:text-7xl",
            align === "left" ? "left-0 text-left" : "text-center",
            textClassName
          )}
        >
          {texts[0]}
        </span>
        <span
          ref={text2Ref}
          style={{ opacity: "0%" }}
          className={cn(
            "absolute inline-block whitespace-nowrap select-none text-5xl md:text-7xl",
            align === "left" ? "left-0 text-left" : "text-center",
            textClassName
          )}
        >
          {texts[1] ?? texts[0]}
        </span>
      </div>
    </div>
  );
}
