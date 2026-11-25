"use client";

import { useEffect, useRef } from "react";

/**
 * Flies its child (the plane) along the route drawn in the sibling <svg> each time it mounts,
 * ending exactly where the plane normally rests, then hands over to the resting bob.
 */
export default function PlaneFlyIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const route = el.parentElement?.parentElement?.querySelector("path");
    const box = el.parentElement!; // the bobbing, absolutely placed plane
    const svg = route?.ownerSVGElement;
    if (!route || !svg) return;
    const vb = svg.viewBox.baseVal;
    const px = svg.clientWidth / vb.width; // route units -> pixels
    // resting centre of the plane, in route units
    const rest = {
      x: ((box.offsetLeft + box.offsetWidth / 2) / svg.clientWidth) * vb.width,
      y: ((box.offsetTop + box.offsetHeight / 2) / svg.clientHeight) * vb.height,
    };
    // fly up the route to the point nearest the resting spot
    const len = route.getTotalLength();
    let end = 0, best = Infinity;
    for (let l = 0; l <= len; l += len / 120) {
      const p = route.getPointAtLength(l);
      const d = Math.hypot(p.x - rest.x, p.y - rest.y);
      if (d < best) { best = d; end = l; }
    }
    const endPt = route.getPointAtLength(end);
    const steps = 24;
    const frames: Keyframe[] = [];
    for (let i = 0; i <= steps; i++) {
      const k = i / steps;
      const l = end * k;
      const p = route.getPointAtLength(l);
      const q = route.getPointAtLength(Math.min(len, l + 2));
      // drift onto the resting spot gradually, so the flight ends exactly where the bob starts
      const x = p.x + (rest.x - endPt.x) * k - rest.x;
      const y = p.y + (rest.y - endPt.y) * k - rest.y;
      const angle = i === steps ? 0 : (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI * (1 - k);
      frames.push({
        transform: `translate(${x * px}px, ${y * px}px) rotate(${angle}deg) scale(${0.55 + 0.45 * k})`,
        opacity: Math.min(1, k * 6),
      });
    }
    const anim = el.animate(frames, { duration: 1800, easing: "cubic-bezier(.45,0,.25,1)" });
    return () => anim.cancel();
  }, []);
  return <div ref={ref}>{children}</div>;
}
