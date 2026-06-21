"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`scroll-top ${active ? "active" : ""}`}
    >
      <i className="bi bi-arrow-up-short" />
    </button>
  );
}
