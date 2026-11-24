"use client";

import { useEffect, useRef } from "react";
import Pup from "./Pup";
import PupWalker from "./PupWalker";

/**
 * One Teddy for the whole site. Sections mark where he likes to sit with <PupSpot />.
 *
 * How he moves (all in page coordinates, so he never "floats" against the content):
 *  - He keeps his current spot for as long as any of it is on screen.
 *  - When that spot scrolls away he stays at the screen edge, trotting along, until a
 *    new spot comes into view; then he walks there (spring physics, capped speed).
 *  - Once he arrives he is pinned exactly to the spot, so he scrolls with the page
 *    (and stays on the floor of the pinned "doors" section).
 *  - Legs move and paw prints are dropped only while he is actually moving across the page.
 */
export function PupSpot({ className = "" }: { className?: string }) {
  return <span data-pup-spot aria-hidden className={`pointer-events-none block aspect-[104/134] ${className}`} />;
}

const STIFFNESS = 55; // spring strength
const DAMPING = 2 * Math.sqrt(STIFFNESS); // critically damped: no overshoot or wobble
const MAX_SPEED = 750; // px/s — a brisk trot, not a teleport
const PRINT_EVERY = 34; // px travelled between paw prints

type Box = { x: number; y: number; w: number };

export default function Follower() {
  const dogRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dog = dogRef.current!;
    const body = dog.firstElementChild as HTMLElement;
    const prints = printsRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let spot: Element | null = null;
    let arrived = false;
    let shown = false;
    const pos: Box = { x: 0, y: 0, w: 80 }; // page coordinates of the dog's top-left
    const vel = { x: 0, y: 0 };
    let speed = 0; // smoothed page-space speed (px/s)
    let facingLeft = false;
    let travelled = 0;
    let stepSide = 1;
    let raf = 0;
    let last = 0;
    let idleSince = 0;
    let lastStep = -1e9;

    const isMobile = () => window.innerWidth < 768;
    const onScreen = (r: DOMRect) => r.width > 0 && r.bottom > 70 && r.top < window.innerHeight;

    const pickSpot = () => {
      if (spot?.isConnected && onScreen(spot.getBoundingClientRect())) return spot; // stay put while visible
      const mid = window.innerHeight / 2;
      let best: Element | null = null;
      let bestD = Infinity;
      document.querySelectorAll("[data-pup-spot]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!onScreen(r)) return;
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = el; }
      });
      if (best) return best;
      // nothing visible: keep following from the screen edge (desktop) or step away (phones)
      return spot?.isConnected && !isMobile() ? spot : null;
    };

    // Keep a viewport y (top of the dog) inside the visible screen, below the header.
    const clampY = (y: number, w: number) => {
      const minY = 78;
      const maxY = window.innerHeight - (w * 134) / 104 - (isMobile() ? 84 : 14);
      return Math.min(Math.max(y, minY), Math.max(minY, maxY));
    };

    // Where he should stand: on the spot, but never outside the visible screen.
    const targetFor = (el: Element): Box => {
      const r = el.getBoundingClientRect();
      return { x: r.left + scrollX, y: clampY(r.top, r.width) + scrollY, w: r.width };
    };

    const dropPrint = (dx: number, dy: number) => {
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len; // perpendicular, to alternate left/right feet
      stepSide = -stepSide;
      const el = document.createElement("span");
      el.className = "paw-print";
      el.style.left = `${pos.x + pos.w / 2 + nx * 7 * stepSide - 8}px`;
      el.style.top = `${pos.y + (pos.w * 134) / 104 - 10 + ny * 7 * stepSide}px`;
      el.style.rotate = `${(Math.atan2(dy, dx) * 180) / Math.PI + 90}deg`;
      el.addEventListener("animationend", () => el.remove());
      prints.appendChild(el);
      while (prints.childElementCount > 28) prints.firstElementChild?.remove();
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;

      const next = pickSpot();
      if (next !== spot) {
        if (!next) {
          dog.style.opacity = "0";
          shown = false;
        }
        spot = next;
        arrived = false;
      }
      if (!spot) return; // hidden until a spot appears (loop restarts on scroll)

      const t = targetFor(spot);
      const prev = { x: pos.x, y: pos.y };

      if (!shown) {
        // appear right on the spot (fade in), no long walk from nowhere
        Object.assign(pos, t);
        vel.x = vel.y = 0;
        arrived = true;
        shown = true;
        dog.style.opacity = "1";
      } else if (arrived || reduced) {
        Object.assign(pos, t); // pinned to the spot (or to the screen edge)
      } else {
        // critically damped spring towards the target, with a speed cap
        const ax = STIFFNESS * (t.x - pos.x) - DAMPING * vel.x;
        const ay = STIFFNESS * (t.y - pos.y) - DAMPING * vel.y;
        vel.x += ax * dt;
        vel.y += ay * dt;
        const v = Math.hypot(vel.x, vel.y);
        if (v > MAX_SPEED) { vel.x *= MAX_SPEED / v; vel.y *= MAX_SPEED / v; }
        pos.x += vel.x * dt;
        pos.y += vel.y * dt;
        pos.w += (t.w - pos.w) * Math.min(1, dt * 6);
        // Fast scrolling can outrun his trot: then the screen edge drags him along instead
        // of letting him fall off-screen.
        const vy = pos.y - scrollY;
        const cy = clampY(vy, pos.w);
        if (cy !== vy) {
          pos.y += cy - vy;
          vel.y = 0;
        }
        if (Math.hypot(t.x - pos.x, t.y - pos.y) < 1.5 && Math.hypot(vel.x, vel.y) < 25) arrived = true;
      }

      // movement across the page drives legs, facing and paw prints
      const dx = pos.x - prev.x, dy = pos.y - prev.y;
      const moved = Math.hypot(dx, dy);
      speed += (moved / Math.max(dt, 0.001) - speed) * 0.25;
      const walking = moved > 0.3 && speed > 40;
      if (walking) lastStep = now;
      // stay in the walking pose briefly after the last step so it doesn't flicker
      const showWalk = !reduced && now - lastStep < 180;
      if (Math.abs(dx) > 0.8) {
        const left = dx < 0;
        if (left !== facingLeft) { facingLeft = left; body.style.scale = left ? "-1 1" : ""; }
      }
      body.classList.toggle("is-walking", showWalk);
      if (walking && !reduced) {
        travelled += moved;
        if (travelled >= PRINT_EVERY) { travelled = 0; dropPrint(dx, dy); }
      }

      // render in viewport space
      dog.style.width = `${pos.w}px`;
      dog.style.transform = `translate3d(${pos.x - scrollX}px, ${pos.y - scrollY}px, 0)`;

      if (showWalk || !arrived) idleSince = now;
      // keep animating while moving; stop shortly after he settles (restarted by scroll/resize)
      if (now - idleSince < 250) raf = requestAnimationFrame(frame);
      else { last = 0; body.classList.remove("is-walking"); }
    };

    const wake = () => {
      idleSince = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    };
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    const mo = new MutationObserver(wake); // spots change on client-side navigation
    mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={printsRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-[5]" />
      <div
        ref={dogRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ width: 80 }}
      >
        <div className="follower relative">
          <Pup className="pose-sit" />
          <PupWalker className="pose-walk" />
        </div>
      </div>
    </>
  );
}
