"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Skip on touch devices — Lenis hijacks native scroll, hurting INP
    // and causing jank on mobile / iPad.
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)")
      .matches;
    if (isTouch) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        touchMultiplier: 2,
      });

      let rafId = 0;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
