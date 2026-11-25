import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PupSpot } from "@/components/Follower";
import { goneHome, type Puppy } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gone home",
  description: "Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.",
};

export default function GoneHomePage() {
  return (
    <section className="paper-dots pb-24 pt-28 md:pt-36">
      <div className="gutter">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h1 className="display text-giant">
              Gone home <span className="hand align-middle text-[0.45em] text-toffee">♡</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lede text-cocoa-soft">
              Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we&apos;ll help you find your match.
            </p>
            <Link href="/puppies" className="btn btn-primary mt-7">See available puppies</Link>
          </div>
          {/* ticket booth */}
          <div className="relative hidden w-[230px] shrink-0 md:block">
            <PupSpot className="absolute -top-[92px] left-1/2 w-[86px] -translate-x-1/2" />
            <div className="h-7 rounded-t-md border-[3px] border-cocoa" style={{ background: "repeating-linear-gradient(90deg,#c2622b 0 20px,#fffdf8 20px 40px)" }} />
            <div className="grid h-20 place-items-center border-[3px] border-t-0 border-cocoa bg-honey-soft">
              <span className="display text-lg">tickets home</span>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goneHome.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 90}>
              <Ticket pup={p} tilt={[-1.2, 0.8, -0.4, 1.1][i % 4]} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ticket({ pup, tilt }: { pup: Puppy; tilt: number }) {
  const from = pup.origin === "local" ? "DUBAI SHOWROOM" : "TEDDYPUPS";
  return (
    <Link
      href={`/puppies/${pup.slug}`}
      className="group flex overflow-hidden rounded-xl border-[3px] border-cocoa bg-[#fff8ea] shadow-[4px_6px_0_-1px_var(--color-cocoa)] transition-transform duration-300 [transition-timing-function:var(--ease-pounce)] hover:-translate-y-1 hover:rotate-0"
      style={{ rotate: `${tilt}deg` }}
    >
      <div className="flex flex-1 items-center gap-4 p-4">
        <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border-2 border-cocoa">
          <Image src={pup.images[0]} alt={`${pup.name}, who has gone home`} fill sizes="80px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="hand block text-xs text-toffee-ink">one ticket home</span>
          <span className="display block truncate text-[1.35rem] leading-tight">{pup.name}</span>
          <span className="block text-sm text-cocoa-soft">{pup.name !== pup.breed ? `${pup.breed}, ${pup.sex.toLowerCase()}` : pup.sex}</span>
          <span className="mt-1.5 inline-flex -rotate-3 flex-col rounded border-2 border-toffee-deep px-1.5 text-center text-[0.55rem] font-bold leading-tight tracking-wider text-toffee-deep">
            {from}
            <span className="hand text-[0.7rem] tracking-normal">HOME ♥</span>
          </span>
        </span>
      </div>
      {/* tear-off stub */}
      <span className="grid w-11 place-items-center border-l-[3px] border-dashed border-cocoa/50 bg-honey">
        <span className="hand -rotate-90 whitespace-nowrap text-xs font-semibold">admit one</span>
      </span>
    </Link>
  );
}
