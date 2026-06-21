"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Stay true once it has entered the viewport (good for lazy-mounting heavy scenes). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Reports whether the referenced element is in the viewport.
 * Used to gate heavy WebGL scenes so only the visible one renders.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = false,
  rootMargin = "200px",
  threshold = 0,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
