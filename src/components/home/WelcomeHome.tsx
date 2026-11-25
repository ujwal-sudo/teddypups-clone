"use client";

import Image from "next/image";
import Link from "next/link";
import { PupSpot } from "@/components/Follower";
import { useInView } from "@/components/Reveal";
import { available, SITE } from "@/lib/site";

/** Final call to action: a little house whose front door swings open on Max. */
export default function WelcomeHome() {
  const [ref, open] = useInView<HTMLDivElement>(0.5);
  const max = available[0];
  return (
    <section className="relative overflow-hidden bg-[#33190c] pb-16 pt-6 text-center text-milk md:pb-24">
      <div className="gutter">
        <h2 className="display mx-auto max-w-[14ch] text-huge">Ready to meet your new best friend?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-[clamp(1.05rem,1.3vw,1.3rem)] text-milk/80">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the
          right match and ensure a smooth, safe delivery across the UAE.
        </p>

        <div ref={ref} className="relative mx-auto mt-12 max-w-[clamp(560px,42vw,800px)]">
          {/* house front */}
          <div className="relative rounded-t-[1.6rem] border-[3px] border-[#1c0e07] px-6 pt-8" style={{ background: "repeating-linear-gradient(0deg,#6b3a1f 0 26px,#5c311a 26px 28px)" }}>
            <div className="relative mx-auto flex items-end justify-center gap-6 md:gap-10">
              <Plant />
              <div className="door-wrap relative" style={{ perspective: "800px" }}>
                <span className="door-arch relative block h-[clamp(200px,15vw,290px)] w-[clamp(130px,10vw,190px)] overflow-hidden border-[3px] border-[#1c0e07] bg-[#1c0e07]">
                  <Image src={max.images[0]} alt="Max, waiting inside" fill sizes="160px" className="object-cover" />
                </span>
                <span
                  className="door-arch absolute inset-0 border-[3px] border-[#1c0e07]"
                  style={{
                    background: "linear-gradient(90deg,rgb(0 0 0/.15) 0 6px,transparent 6px),#c2622b",
                    transformOrigin: "left center",
                    transition: "transform 1.4s var(--ease-silk) .2s",
                    transform: open ? "rotateY(-110deg)" : "none",
                  }}
                />
                <span className="hand absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm border-2 border-[#1c0e07] bg-honey px-3 text-[0.8rem] text-cocoa">
                  welcome home
                </span>
              </div>
              <Plant flip />
              {/* porch lamp */}
              <span className="absolute right-[18%] top-0 hidden h-12 w-8 rounded-b-lg border-[3px] border-[#1c0e07] bg-[#ffd27a] shadow-[0_0_40px_10px_rgb(255_210_122/0.35)] sm:block" />
            </div>
          </div>
          <div className="h-5 rounded-b-md border-[3px] border-t-0 border-[#1c0e07] bg-[#3d1e0d]" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Enquire on WhatsApp</a>
          <Link href="/contact" className="btn btn-ghost-light">Visit &amp; contact</Link>
        </div>
      </div>
      <PupSpot className="absolute bottom-4 left-[6%] w-[clamp(64px,6vw,120px)]" />
    </section>
  );
}

function Plant({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 60 80" className={`w-[clamp(52px,4.5vw,86px)] ${flip ? "-scale-x-100" : ""}`} aria-hidden>
      <path d="M30 46C20 30 22 12 30 2c8 10 10 28 0 44zM28 46C14 40 6 26 8 16c12 4 20 16 20 30zM32 46c14-6 22-20 20-30-12 4-20 16-20 30z" fill="#4f8a4b" stroke="#1c0e07" strokeWidth="2.5" />
      <path d="M10 46h40l-5 32H15z" fill="#c2622b" stroke="#1c0e07" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
