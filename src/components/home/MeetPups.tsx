"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PupSpot } from "@/components/Follower";
import { useInView } from "@/components/Reveal";
import { available, puppyAlt, puppyLine, type Puppy } from "@/lib/site";

const DOOR_COLORS = ["#c2622b", "#5a3a28", "#d9853b", "#b4523a", "#8e3f15"];

/**
 * Desktop: the section pins to the screen and vertical scrolling slides a row of doors
 * sideways while Teddy walks along the floor. Each door swings open as it comes into view.
 * Mobile: the same doors simply sit in a two-column grid.
 */
export default function MeetPups() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0); // px the track is wider than the screen (0 = not pinned)

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;

    const measure = () => setOverflow(mq.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!mq.matches) return;
        const max = section.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(1, max)));
        track.style.transform = `translate3d(${-p * (track.scrollWidth - window.innerWidth)}px,0,0)`;
      });
    };

    measure();
    onScroll();
    const ro = new ResizeObserver(() => { measure(); onScroll(); });
    ro.observe(track);
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
        <header className="gutter flex flex-col items-start justify-between gap-5 pt-24 md:flex-row md:items-end md:pt-[max(6rem,14vh)]">
          <div>
            <h2 className="display text-[clamp(2.4rem,6vw,4.2rem)]">Meet the pups</h2>
            <p className="mt-3 text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link href="/puppies" className="btn btn-primary">See all available puppies</Link>
        </header>

        <div className="relative mt-10 flex-1 md:mt-0 md:flex md:flex-col md:justify-end">
          <div
            ref={trackRef}
            className="gutter grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:flex md:w-max md:max-w-none md:gap-12 md:pl-[30vw] md:pr-[12vw] md:will-change-transform"
          >
            {available.map((p, i) => (
              <Door key={p.slug} pup={p} color={DOOR_COLORS[i % DOOR_COLORS.length]} />
            ))}
            <Link href="/puppies" className="group flex flex-col justify-end md:w-[min(190px,25vh)]">
              <span className="door-arch flex aspect-[19/24] items-center justify-center border-[3px] border-dashed border-cocoa text-center transition-colors group-hover:bg-milk/60">
                <span className="display text-2xl">Meet<br />them all</span>
              </span>
            </Link>
          </div>
          <div className="floor relative mt-0 hidden h-16 md:block">
            <PupSpot className="absolute -top-[108px] left-[8vw] w-[86px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Door({ pup, color }: { pup: Puppy; color: string }) {
  // Opens once the door has slid past the right quarter of the screen.
  // (threshold is low enough that right-column doors on phones still open)
  const [ref, open] = useInView<HTMLAnchorElement>(0.35, true, "0px -25% 0px 0px");
  return (
    <Link ref={ref} href={`/puppies/${pup.slug}`} className={`door-wrap group flex flex-col md:w-[min(190px,25vh)] ${open ? "is-open" : ""}`}>
      <span className="mb-3 block min-h-[4.6rem] text-center">
        <span className="display block text-[1.1rem] leading-tight">{pup.name}</span>
        <span className="mt-1 line-clamp-2 block text-[0.8rem] leading-snug text-cocoa-soft">{puppyLine(pup)}</span>
      </span>
      <span className="door-arch relative block aspect-[19/24] border-[3px] border-cocoa bg-cocoa">
        <span className="door-arch absolute inset-0 overflow-hidden">
          <Image src={pup.images[0]} alt={puppyAlt(pup)} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="door-panel door-arch absolute inset-0" style={{ "--door": color } as React.CSSProperties} />
        <span className="tag tag-swing absolute right-[-14px] top-[22%] z-10 rotate-[8deg]">Available</span>
      </span>
    </Link>
  );
}
