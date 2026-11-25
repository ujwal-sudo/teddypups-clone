"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal for any element marked `data-reveal` (same idea as the reference):
 * it gets `data-armed` once JS is watching it (so content is never hidden without JS)
 * and `data-revealed` when it scrolls into view. CSS does the actual animation.
 */
export default function AutoReveal() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    // Only touch elements React has already hydrated (it tags them with a __reactFiber key);
    // marking them earlier triggers hydration-mismatch warnings.
    // shortcut: relies on React's internal key name, upgrade if a React release renames it.
    const hydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber"));
    // Hide right away, but only start revealing once the loading curtain is gone; otherwise
    // whatever is on screen when a page opens animates unseen underneath it.
    const armed: Element[] = [];
    const curtainUp = () => (document.querySelector(".curtain") as HTMLElement | null)?.dataset.state !== "idle";
    const arm = () => {
      let waiting = 0;
      document.querySelectorAll("[data-reveal]:not([data-armed])").forEach((el) => {
        if (!hydrated(el)) return void waiting++;
        el.setAttribute("data-armed", "");
        armed.push(el);
      });
      if (curtainUp()) return waiting + armed.length;
      armed.splice(0).forEach((el) => io.observe(el));
      return waiting;
    };
    const mo = new MutationObserver(arm); // filtered lists render new cards
    mo.observe(document.body, { childList: true, subtree: true });
    // streamed sections hydrate a little later: retry until everything is armed (max ~10s)
    let tries = 0;
    const retry = setInterval(() => {
      if (!arm()) return clearInterval(retry);
      // safety net: never leave content hidden if the curtain somehow never lifts
      if (++tries > 40) { clearInterval(retry); armed.splice(0).forEach((el) => io.observe(el)); }
    }, 250);
    return () => { clearInterval(retry); io.disconnect(); mo.disconnect(); };
  }, [path]);
  return null;
}
