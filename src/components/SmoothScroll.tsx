"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** The page's Lenis instance (null before mount, or when the user prefers reduced motion). */
export let lenis: Lenis | null = null;

/** Scroll to the top, through Lenis when it's running so it doesn't fight the jump. */
export const scrollToTop = (smooth: boolean) =>
  lenis ? lenis.scrollTo(0, { immediate: !smooth, force: true }) : window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });

/** Smooth, eased wheel scrolling like the reference site (Lenis). */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: { offset: -112 } });
    return () => { lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}
