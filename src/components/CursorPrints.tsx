"use client";

import { useEffect, useState } from "react";
import { PawIcon } from "./icons";

type Print = { id: number; x: number; y: number; rot: number; left: boolean };

/** Leaves a short trail of paw prints behind the mouse; each fades out in ~1.5s. */
export default function CursorPrints() {
  const [prints, setPrints] = useState<Print[]>([]);

  useEffect(() => {
    // mouse only, and not for people who asked for less motion
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = { x: -999, y: -999 };
    let id = 0;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (dx * dx + dy * dy < 45 * 45) return; // one print per ~45px of travel
      const rot = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      last = { x: e.clientX, y: e.clientY };
      const p = { id: ++id, x: e.clientX, y: e.clientY, rot, left: id % 2 === 0 };
      setPrints((ps) => [...ps.slice(-12), p]);
      setTimeout(() => setPrints((ps) => ps.filter((q) => q.id !== p.id)), 1500);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      {prints.map((p) => (
        <PawIcon
          key={p.id}
          className="cursor-print absolute h-3.5 w-3.5 text-toffee/60"
          // alternate left/right foot, offset sideways from the pointer
          style={{ left: p.x + (p.left ? -8 : 8), top: p.y + 10, rotate: `${p.rot}deg` }}
        />
      ))}
    </div>
  );
}
