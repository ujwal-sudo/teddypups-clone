import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PuppyBrowser from "@/components/PuppyBrowser";
import PuppyCard from "@/components/PuppyCard";
import Pup from "@/components/Pup";
import { PupSpot } from "@/components/Follower";
import { Squiggle } from "@/components/icons";
import { available, goneHome } from "@/lib/site";

export const metadata: Metadata = {
  title: "Available puppies",
  description: "Every listing shows real photos of the actual puppy. Browse Maltipoo, Pomeranian, Poodle, Cavapoo and Shih Tzu puppies in Dubai.",
};

export default function PuppiesPage() {
  return (
    <>
      <section className="paper-dots pb-24 pt-28 md:pt-36">
        <div className="gutter">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="hand text-toffee-ink">from Teddy&apos;s sketchbook</p>
              <h1 className="display relative mt-2 inline-block max-w-[8ch] text-[clamp(3rem,9vw,6rem)]">
                Available puppies
                <Squiggle className="absolute -bottom-3 left-0 h-3 w-[90%] text-toffee" />
              </h1>
              <p className="mt-7 max-w-xl text-cocoa-soft">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>
            <figure className="hidden shrink-0 text-center md:block">
              <span className="grid h-44 w-44 place-items-center rounded-full border-[3px] border-cocoa bg-cream">
                <Pup className="w-24" />
              </span>
              <figcaption className="hand mt-2 text-sm">self-portrait</figcaption>
            </figure>
          </div>

          {/* useSearchParams needs a Suspense boundary; the fallback is the unfiltered grid */}
          <Suspense fallback={<StaticGrid />}>
            <PuppyBrowser pups={available} />
          </Suspense>
        </div>
      </section>

      <section className="relative bg-honey-soft py-20">
        <div className="gutter grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
          <div>
            <h2 className="display text-[clamp(2.2rem,5vw,3.2rem)]">Already gone home</h2>
            <p className="mt-3 text-cocoa-soft">These puppies have found their families.</p>
            <Link href="/gone-home" className="btn btn-primary mt-6">See the puppies who&apos;ve gone home</Link>
            <PupSpot className="mt-8 w-[70px]" />
          </div>
          <ul className="grid grid-cols-3 gap-5 sm:grid-cols-5">
            {goneHome.slice(0, 5).map((p, i) => (
              <li key={p.slug}><PuppyCard pup={p} i={i} size="sm" /></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function StaticGrid() {
  return (
    <ul className="mt-24 grid grid-cols-1 gap-x-8 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3">
      {available.map((p, i) => (
        <li key={p.slug}><PuppyCard pup={p} i={i} /></li>
      ))}
    </ul>
  );
}
