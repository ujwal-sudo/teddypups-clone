"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Pup from "./Pup";
import PupWalker from "./PupWalker";
import { lenis } from "./SmoothScroll";

/**
 * One Teddy for the whole site. Sections mark where he likes to sit with <PupSpot />.
 *
 * How he moves (he walks in screen space, so scrolling never shoves him around mid-walk):
 *  - He keeps his current spot for as long as any of it is on screen.
 *  - When that spot scrolls away he stays at the screen edge, trotting along, until a
 *    new spot comes into view; then he walks there (spring physics, capped speed).
 *  - Once he arrives he is pinned exactly to the spot, so he scrolls with the page
 *    (and stays on the floor of the pinned "doors" section).
 *  - Legs move and paw prints are dropped only while he is actually moving across the page.
 *  - A `priority` spot (the footer basket) wins as soon as it is fully on screen; a `peek`
 *    spot shows him peeking out (head and paws over the rim) instead of sitting, and he hops
 *    up into it from behind the rim.
 *  - He only follows you on the home page (starting from the hero quilt). On other pages he
 *    just turns up in the footer basket at the end.
 */
export function PupSpot({ className = "", pose = "sit", priority }: { className?: string; pose?: "sit" | "peek"; priority?: boolean }) {
  return (
    <span
      data-pup-spot
      data-pose={pose}
      data-priority={priority ? "" : undefined}
      aria-hidden
      className={`pointer-events-none block ${pose === "peek" ? "aspect-[88/92]" : "aspect-[104/134]"} ${className}`}
    />
  );
}

const STIFFNESS = 55; // spring strength
const DAMPING = 2 * Math.sqrt(STIFFNESS); // critically damped: no overshoot or wobble
const MAX_SPEED = 750; // px/s — a brisk trot, not a teleport
const PRINT_EVERY = 34; // px travelled between paw prints

type Box = { x: number; y: number; w: number; h: number };

export default function Follower() {
  const dogRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const pathRef = useRef(path);
  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  useEffect(() => {
    const dog = dogRef.current!;
    const body = dog.firstElementChild as HTMLElement;
    const prints = printsRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let spot: Element | null = null;
    let arrived = false;
    let shown = false;
    const pos: Box = { x: 0, y: 0, w: 80, h: 103 }; // screen (viewport) coordinates of the dog's box
    let lastScroll = scrollY;
    let scrollDir = 0; // direction of the latest scroll step, and when it happened
    let scrollAt = -1e9;
    const vel = { x: 0, y: 0 };
    let facingLeft = false;
    let travelled = 0;
    let stepSide = 1;
    let raf = 0;
    let last = 0;
    let idleSince = 0;
    let lastStep = -1e9;
    let walkPose = false; // pose on screen, held for a moment so it never flickers
    let poseAt = -1e9;

    const isMobile = () => window.innerWidth < 768;
    const onScreen = (r: DOMRect) => r.width > 0 && r.bottom > 70 && r.top < window.innerHeight;

    const pickSpot = () => {
      const home = pathRef.current === "/";
      for (const el of document.querySelectorAll("[data-pup-spot][data-priority]")) {
        const r = el.getBoundingClientRect();
        if (r.width && r.top >= 70 && r.bottom <= window.innerHeight) return el; // e.g. the basket
      }
      if (!home) return null; // off the home page he only lives in the basket
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
    const clampY = (y: number, h: number) => {
      const minY = 78;
      const maxY = window.innerHeight - h - (isMobile() ? 84 : 14);
      return Math.min(Math.max(y, minY), Math.max(minY, maxY));
    };

    // Where he should stand: on the spot, but never outside the visible screen.
    const targetFor = (el: Element): Box => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: clampY(r.top, r.height), w: r.width, h: r.height };
    };

    const dropPrint = (dx: number, dy: number) => {
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len; // perpendicular, to alternate left/right feet
      stepSide = -stepSide;
      const el = document.createElement("span");
      el.className = "paw-print";
      el.style.left = `${pos.x + scrollX + pos.w / 2 + nx * 7 * stepSide - 8}px`;
      el.style.top = `${pos.y + scrollY + pos.h - 10 + ny * 7 * stepSide}px`;
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
      const scrolled = scrollY - lastScroll;
      lastScroll = scrollY;
      if (Math.abs(scrolled) > 0.5) { scrollDir = Math.sign(scrolled); scrollAt = now; }
      // He's stepped both from his own frame loop and right after each Lenis scroll, so one call
      // can see no scroll mid-flick: remember the direction briefly.
      const scrolling = now - scrollAt < 120 ? scrollDir : 0;
      let treadmill = false; // trotting on the spot while the page scrolls under him

      if (!shown) {
        // appear right on the spot (fade in), no long walk from nowhere
        Object.assign(pos, t);
        vel.x = vel.y = 0;
        arrived = true;
        shown = true;
        dog.style.opacity = "1";
      } else if (arrived || reduced) {
        // Pinned to the spot: he rides along with the page. If the spot stays put on screen
        // while the page scrolls (the pinned doors floor, or the screen edge while he follows
        // you), he trots on the spot instead.
        treadmill = arrived && scrolling !== 0 && Math.hypot(t.x - prev.x, t.y - prev.y) < 0.5;
        Object.assign(pos, t);
        prev.x = pos.x; prev.y = pos.y; // being carried by the page is not walking
      } else {
        // Walking to a spot, in screen space: scrolling never shoves him around, so what you
        // see is only his own (critically damped, speed-capped) trot.
        const ax = STIFFNESS * (t.x - pos.x) - DAMPING * vel.x;
        const ay = STIFFNESS * (t.y - pos.y) - DAMPING * vel.y;
        vel.x += ax * dt;
        vel.y += ay * dt;
        const v = Math.hypot(vel.x, vel.y);
        if (v > MAX_SPEED) { vel.x *= MAX_SPEED / v; vel.y *= MAX_SPEED / v; }
        // Never walk against the scroll: if the page carries his spot past him while you're still
        // scrolling, he trots on the spot (facing forward) and catches up once you stop.
        if ((scrolling > 0 && vel.y < 0) || (scrolling < 0 && vel.y > 0)) {
          vel.y = 0;
          treadmill = true;
        }
        pos.x += vel.x * dt;
        pos.y += vel.y * dt;
        pos.w += (t.w - pos.w) * Math.min(1, dt * 6);
        pos.h += (t.h - pos.h) * Math.min(1, dt * 6);
        if (Math.hypot(t.x - pos.x, t.y - pos.y) < 3 && Math.hypot(vel.x, vel.y) < 60) { Object.assign(pos, t); arrived = true; }
      }

      // his own movement on screen drives legs, facing and paw prints
      const dx = pos.x - prev.x, dy = pos.y - prev.y;
      const moved = Math.hypot(dx, dy);
      // on his way to a spot he's walking the whole time (even while easing in at the end)
      const walking = (!arrived && moved > 0.05) || treadmill;
      if (walking) lastStep = now;
      // stay in the walking pose briefly after the last step so it doesn't flicker
      // ...but never while the page is carrying him: that reads as walking backwards
      const carried = arrived && !treadmill && scrolling !== 0;
      const wantWalk = !reduced && (walking || (!carried && now - lastStep < 180));
      if (wantWalk !== walkPose && now - poseAt > 250) { walkPose = wantWalk; poseAt = now; }
      const showWalk = walkPose;
      // Face the way he's going on screen; going straight up/down (or trotting on the spot) he
      // faces forward, to the right, towards the doors.
      if (walking) {
        const left = dx < -0.4;
        if (left !== facingLeft) { facingLeft = left; body.style.scale = left ? "-1 1" : ""; }
      }
      body.classList.toggle("is-walking", showWalk);
      const peek = !showWalk && arrived && (spot as HTMLElement).dataset.pose === "peek";
      if (peek && !body.classList.contains("is-peek") && !reduced) {
        // hop up from behind the rim (quilt / basket)
        body.classList.remove("hop");
        void body.offsetWidth;
        body.classList.add("hop");
      }
      body.classList.toggle("is-peek", peek);
      if (walking && !reduced) {
        // prints go down in the page, so count the page distance he covered
        const px = dx, py = dy + (treadmill ? scrolled : 0);
        travelled += Math.hypot(px, py);
        if (travelled >= PRINT_EVERY) { travelled = 0; dropPrint(px, py); }
      }

      // Render in page space (he's absolutely positioned in the document), so while he sits on a
      // spot the browser scrolls him with the content: no lag behind fast scrolls.
      dog.style.width = `${pos.w}px`;
      dog.style.height = `${pos.h}px`;
      dog.style.transform = `translate3d(${pos.x + scrollX}px, ${pos.y + scrollY}px, 0)`;

      if (showWalk || !arrived) idleSince = now;
      // keep animating while moving; stop shortly after he settles (restarted by scroll/resize)
      if (now - idleSince < 250) raf = requestAnimationFrame(frame);
      else { last = 0; walkPose = false; body.classList.remove("is-walking"); }
    };

    // Lenis moves the page inside its own animation frame; step right after it so the dog
    // (and his screen-edge / pinned-section targets) never lag a frame behind the scroll.
    let unsub: (() => void) | undefined;
    const wake = () => {
      idleSince = performance.now();
      if (!unsub && lenis) unsub = lenis.on("scroll", () => { cancelAnimationFrame(raf); frame(performance.now()); });
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
      unsub?.();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={printsRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-[5]" />
      <div
        ref={dogRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ width: 80 }}
      >
        <div className="follower relative">
          <Pup className="pose-sit" />
          <Pup pose="peek" className="pose-peek" />
          <PupWalker className="pose-walk" />
        </div>
      </div>
    </>
  );
}
