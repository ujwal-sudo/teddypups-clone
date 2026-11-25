"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PupSpot } from "@/components/Follower";
import { PawIcon } from "@/components/icons";
import { useInView } from "@/components/Reveal";
import { available, puppyAlt, puppyLine, type Puppy } from "@/lib/site";

const DOOR_COLORS = ["#c2622b", "#5a3a28", "#d9853b", "#b4523a", "#8e3f15"];

/**
 * Desktop: the section pins to the screen and vertical scrolling slides a row of doors
 * sideways while Teddy walks along the floor. Each door swings open when it reaches Teddy's
 * nose (and closes again if you scroll back).
 * Mobile: the same doors simply sit in a two-column grid and open as they scroll into view.
 */
export default function MeetPups() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0); // px the track is wider than the screen (0 = not pinned)
  const [reached, setReached] = useState(0); // how many doors Teddy has reached (desktop)

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;

    const hall = track.parentElement!;
    const measure = () => {
      if (mq.matches) {
        // Like the reference: doors are 15% of the screen wide, shrunk if needed so a whole
        // door (name plate + frame) fits above the floor, and never smaller/larger than 8–16rem.
        const plate = track.querySelector<HTMLElement>(".door > span")?.offsetHeight ?? 90;
        const room = hall.clientHeight - (floorRef.current?.offsetHeight ?? 0) - plate - 16;
        const fit = room > 0 ? (room * 4) / 5.2 : Infinity;
        const w = Math.min(256, Math.max(128, Math.min(0.15 * window.innerWidth, fit))); // 8–16rem at 16px
        track.style.setProperty("--door-w", `${w}px`);
      } else {
        track.style.removeProperty("--door-w");
      }
      setOverflow(mq.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!mq.matches) return;
        const max = section.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(1, max)));
        const tx = -p * (track.scrollWidth - window.innerWidth);
        track.style.transform = `translate3d(${tx}px,0,0)`;
        floorRef.current?.style.setProperty("--floor-x", `${tx}px`); // planks slide with the doors
        // a door opens once its left edge slides up to Teddy's nose
        const nose = spotRef.current?.getBoundingClientRect().right ?? 0;
        const doors = track.querySelectorAll(".door");
        let n = 0;
        doors.forEach((d) => { if (d.getBoundingClientRect().left < nose + 8) n++; });
        setReached(n);
      });
    };

    measure();
    onScroll();
    const ro = new ResizeObserver(() => { measure(); onScroll(); });
    ro.observe(track);
    ro.observe(hall);
    mq.addEventListener("change", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      track.style.transform = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-honey-soft md:bg-gradient-to-b md:from-cream md:to-honey-soft"
      style={overflow ? { height: `calc(100vh + ${overflow}px)` } : undefined}
    >
      <div className={overflow ? "sticky top-0 flex h-screen flex-col overflow-hidden" : "pb-16"}>
        <header className="gutter flex flex-col items-start justify-between gap-5 pt-24 md:flex-row md:items-end md:pt-[calc(5.3rem+clamp(1rem,3vh,2.5rem))]">
          <div>
            <h2 className="display text-[clamp(2.4rem,6vw,4.2rem)]">Meet the pups</h2>
            <p className="mt-3 text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link href="/puppies" className="btn btn-primary">See all available puppies</Link>
        </header>

        {/* the "hall": doors stand on the floor, Teddy stands in front at 14vw (sizes follow the reference) */}
        <div className="relative mt-10 md:mt-[clamp(2rem,5vh,3.5rem)] md:flex-1" style={{ "--floor-h": "clamp(5rem,13vh,8rem)" } as React.CSSProperties}>
          <div
            ref={trackRef}
            className="gutter grid grid-cols-[repeat(auto-fill,minmax(min(10.5rem,42vw),1fr))] gap-x-5 gap-y-11 sm:gap-x-8 sm:gap-y-14 md:absolute md:bottom-[var(--floor-h)] md:left-0 md:flex md:w-max md:max-w-none md:items-end md:gap-[clamp(4.5rem,6vw,7rem)] md:pl-[38vw] md:pr-[50vw] md:will-change-transform"
          >
            {available.map((p, i) => (
              <Door key={p.slug} pup={p} color={DOOR_COLORS[i % DOOR_COLORS.length]} reached={overflow ? i < reached : null} />
            ))}
            <Link href="/puppies" className="group flex items-end self-stretch md:w-[var(--door-w,clamp(8rem,min(15vw,24vh),16rem))]">
              <span className="door-frame grid w-full place-items-center border-dashed !bg-transparent transition-colors group-hover:!bg-milk/60">
                <span className="display p-4 text-center text-[clamp(1.6rem,2.4vw,2.4rem)] leading-none underline decoration-toffee decoration-[0.08em] underline-offset-[0.18em]">
                  Meet them all
                </span>
              </span>
            </Link>
          </div>
          <div ref={floorRef} className="floor absolute inset-x-0 bottom-0 hidden h-[var(--floor-h)] md:block">
            <div ref={spotRef} className="absolute bottom-[42%] left-[14vw] w-[clamp(6rem,min(7.7vw,13vh),7.7rem)]">
              <PupSpot />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** `reached` is set on desktop (Teddy decides); null on phones, where the door opens on view. */
function Door({ pup, color, reached }: { pup: Puppy; color: string; reached: boolean | null }) {
  const [ref, inView] = useInView<HTMLAnchorElement>(0.35);
  const open = reached ?? inView;
  return (
    <Link ref={ref} href={`/puppies/${pup.slug}`} data-open={open} className="door group block md:w-[var(--door-w,clamp(8rem,min(15vw,24vh),16rem))]">
      <span className="mb-[0.8rem] block text-center">
        <span className="door-name display line-clamp-3 block text-[clamp(1.45rem,2vw,2rem)] leading-none transition-colors">{pup.name}</span>
        <span className="mt-[0.35rem] line-clamp-2 block text-[0.9rem] font-semibold leading-snug text-cocoa-soft">{puppyLine(pup)}</span>
      </span>
      <span className="door-frame">
        <span className="door-way">
          <span className="door-room">
            <Image src={pup.images[0]} alt={puppyAlt(pup)} fill sizes="(min-width:768px) 260px, 45vw" className="object-cover" />
          </span>
          <span className="door-leaf" style={{ "--door": color } as React.CSSProperties}>
            <PawIcon className="door-peephole" />
            <span className="door-knob" />
          </span>
        </span>
        <span className="tag door-tag">Available</span>
      </span>
    </Link>
  );
}
