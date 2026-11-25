"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PupWalker from "./PupWalker";
import { PawIcon } from "./icons";

type State = "intro" | "idle" | "covering" | "covered" | "lifting";

/**
 * Loading curtain (timings from the reference): on first load a quilted blanket covers the
 * page while Teddy runs across leaving paw prints under "every puppy is family", then it
 * lifts away. Clicking an internal link drops the blanket, changes page, and lifts it again.
 */
export default function Curtain() {
  const [state, setState] = useState<State>("intro");
  const router = useRouter();
  const path = usePathname();
  const pending = useRef<string | null>(null);

  // first load: lift after the runner's dash
  useEffect(() => {
    const t = setTimeout(() => setState((s) => (s === "intro" ? "idle" : s)), 1040);
    return () => clearTimeout(t);
  }, []);

  // intercept internal navigation (capture phase, before next/link handles it)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return; // same page / hash links: no curtain
      e.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      setState("covering");
      setTimeout(() => {
        setState("covered");
        router.push(pending.current!);
      }, 320);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // new page rendered: lift the blanket
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    window.scrollTo({ top: 0, behavior: "instant" });
    const t1 = setTimeout(() => setState("lifting"), 120);
    const t2 = setTimeout(() => setState("idle"), 120 + 480);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [path]);

  return (
    <div className="curtain" data-state={state} aria-hidden={state === "idle"} role={state === "idle" ? undefined : "status"}>
      <div className="curtain-blanket">
        <Edge className="curtain-edge curtain-edge--top" />
        <div className="curtain-stage">
          <div className="curtain-prints">
            {Array.from({ length: 6 }, (_, i) => (
              <PawIcon key={i} className="curtain-print" style={{ left: `${8 + i * 15}%`, top: i % 2 ? "0" : "0.7rem", animationDelay: `${0.12 + i * 0.13}s` }} />
            ))}
          </div>
          <div className="curtain-runner is-walking">
            <PupWalker />
          </div>
          <p className="curtain-note hand">every puppy is family</p>
        </div>
        <Edge className="curtain-edge curtain-edge--bottom" />
      </div>
    </div>
  );
}

function Edge({ className }: { className: string }) {
  return (
    <svg className={className} width="100%" height="40" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id={`curtain-${className.slice(-3)}`} width="76" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 0V15A38 25 0 0 0 76 15V0Z" fill="var(--color-honey-soft)" />
          <path d="M0 15A38 25 0 0 0 76 15" fill="none" stroke="#2a170e" strokeWidth="3" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#curtain-${className.slice(-3)})`} />
    </svg>
  );
}
