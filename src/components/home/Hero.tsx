"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PupSpot } from "@/components/Follower";
import { Squiggle } from "@/components/icons";
import { available, puppyAlt, SITE } from "@/lib/site";

// Seat layout copied from the reference: x position, width, how much peeks over the quilt, tilt.
const SEATS = [
  { x: "9%", w: "8.6rem", peek: 0.62, tilt: "-5deg" },
  { x: "22.5%", w: "10.4rem", peek: 0.8, tilt: "3deg" },
  { x: "35%", w: "9.2rem", peek: 0.7, tilt: "-2deg" },
  { x: "65%", w: "9.4rem", peek: 0.74, tilt: "3deg" },
  { x: "77.5%", w: "10.6rem", peek: 0.82, tilt: "-3deg" },
  { x: "91%", w: "8.4rem", peek: 0.6, tilt: "4deg" },
];

type SeatState = { pup: number; phase: "in" | "duck" | "pop" };

/**
 * Hero: six puppies in arched door frames peek over a quilt. Every couple of seconds one of
 * them ducks down and pops back up as a different puppy. Teddy (the site's follower dog)
 * starts here, peeking over the middle of the quilt.
 */
export default function Hero() {
  const [seats, setSeats] = useState<SeatState[]>(SEATS.map((_, i) => ({ pup: i, phase: "in" })));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let next = SEATS.length; // next puppy to bring on stage
    const timers: ReturnType<typeof setTimeout>[] = [];
    const swap = () => {
      const i = Math.floor(Math.random() * SEATS.length);
      setSeats((s) => s.map((x, k) => (k === i ? { ...x, phase: "duck" } : x)));
      timers.push(
        setTimeout(() => {
          const pup = next++ % available.length;
          setSeats((s) => s.map((x, k) => (k === i ? { pup, phase: "pop" } : x)));
        }, 380),
      );
    };
    const loop = setInterval(swap, 2300);
    return () => {
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="hero relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-x-clip bg-gradient-to-b from-milk to-cream pt-[4.75rem]">
      <div className="hero-sun" aria-hidden />
      <div className="gutter relative z-10 pt-[clamp(1rem,4.5vh,3.75rem)] text-center">
        <p className="hand inline-flex flex-col items-center text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium text-toffee-ink">
          every puppy is family
          <Squiggle className="-mt-0.5 h-2 w-[110%]" />
        </p>
        <h1 className="display mx-auto mt-3 max-w-[13ch] text-[clamp(2.6rem,min(9.2vw,11vh),8.4rem)]">
          Premium teacup puppies in Dubai
        </h1>
        <p className="mx-auto mt-5 max-w-[40rem] text-[clamp(1.05rem,1.25vw,1.28rem)] text-cocoa-soft">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/puppies" className="btn btn-primary">View available puppies</Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Enquire on WhatsApp</a>
        </div>
      </div>

      <div className="hero-stage">
        <ul className="absolute inset-0">
          {SEATS.map((seat, i) => {
            const st = seats[i];
            const pup = available[st.pup];
            return (
              <li
                key={i}
                className="hero-seat"
                style={{ "--x": seat.x, "--w": seat.w, "--peek": seat.peek, "--tilt": seat.tilt, "--i": i } as React.CSSProperties}
              >
                <Link href={`/puppies/${pup.slug}`} className="hero-pup" data-phase={st.phase}>
                  <span className="hero-photo">
                    <Image src={pup.images[0]} alt={puppyAlt(pup)} fill sizes="200px" className="object-cover" priority={i < 3} />
                  </span>
                  <span className="hero-name">{pup.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Teddy's first spot: peeking over the middle of the quilt */}
        <PupSpot pose="peek" className="hero-teddy" />
        <div className="hero-quilt" aria-hidden>
          <svg className="block h-10 w-full" preserveAspectRatio="none" aria-hidden>
            <defs>
              <pattern id="hero-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="var(--color-cream)" />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#hero-scallop)" />
          </svg>
          <div className="cushion h-[var(--quilt-h)]" />
        </div>
      </div>
    </section>
  );
}
