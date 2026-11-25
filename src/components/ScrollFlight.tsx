"use client";

import { useEffect, useId, useRef } from "react";

const PHOTO = "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg";
const INK = "#2a170e";

/**
 * Korea → Dubai: the plane flies along the dotted route as the section scrolls through the
 * screen (same as the reference), banking to follow the curve and fading in as it takes off.
 */
export default function ScrollFlight({ from = "Korea" }: { from?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const clip = useId();

  useEffect(() => {
    const box = boxRef.current!, route = routeRef.current!, plane = planeRef.current!;
    const len = route.getTotalLength();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const place = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      // 0 when the box enters at the bottom of the screen, 1 when it leaves at the top
      const p = reduced ? 0.5 : Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      const at = route.getPointAtLength(p * len);
      const ahead = route.getPointAtLength(Math.min(len, p * len + 1));
      const behind = route.getPointAtLength(Math.max(0, p * len - 1));
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      plane.setAttribute("transform", `translate(${at.x.toFixed(1)} ${at.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
      plane.style.opacity = String(Math.min(1, Math.max(0, (p - 0.08) / 0.12)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(place); };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const label = { fontFamily: "var(--font-hand)", fontSize: 19, fill: "var(--color-cocoa-soft)" };
  const line = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round" as const };
  return (
    <div ref={boxRef} className="absolute inset-0">
      <svg viewBox="0 0 660 300" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={`A plane flying puppies from ${from} to Dubai`}>
        <defs>
          <clipPath id={clip}><circle r="25" /></clipPath>
        </defs>
        <path ref={routeRef} d="M40 250 C 170 40, 470 20, 620 168" fill="none" stroke="#a24a1a" strokeWidth="3" strokeDasharray="3 11" strokeLinecap="round" />
        <circle cx="40" cy="250" r="7" fill="#a24a1a" />
        <circle cx="620" cy="168" r="7" fill="#a24a1a" />
        <text x="40" y="284" textAnchor="middle" style={label}>{from}</text>
        <text x="620" y="202" textAnchor="middle" style={label}>Dubai</text>
        <g ref={planeRef} style={{ opacity: 0 }}>
          <g transform="translate(-126 -78)">
            <path d="M28 60 L8 26 L34 26 L60 54 Z" fill="#c2622b" {...line} />
            <path d="M108 112 L142 156 L172 156 L158 112 Z" fill="#a24a1a" {...line} />
            <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" fill="#fffdf8" {...line} />
            <path d="M104 44 L138 2 L168 2 L154 44 Z" fill="#c2622b" {...line} />
            <path d="M206 64 C215 67 221 73 224 80" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
            {/* a puppy looking out of the porthole */}
            <g transform="translate(118 78)">
              <image href={PHOTO} x="-25" y="-25" width="50" height="50" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clip})`} />
              <circle r="25" fill="none" stroke={INK} strokeWidth="4" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
