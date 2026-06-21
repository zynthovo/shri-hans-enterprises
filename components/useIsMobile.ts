"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on small screens (and stays SSR-safe: starts false on both
 * server and first client render, then updates after mount). Used to skip
 * heavy WebGL / 3D / canvas effects on phones.
 */
export function useIsMobile(maxWidth = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);

  return isMobile;
}
