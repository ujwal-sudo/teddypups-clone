import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PupSpot } from "@/components/Follower";
import { TESTIMONIAL } from "@/components/home/Families";
import { families } from "@/lib/site";

export const metadata: Metadata = {
  title: "Happy families",
  description: "Nothing makes us happier than seeing our puppies in loving homes. Beautiful moments shared by TeddyPups families.",
};

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5];

export default function HappyFamiliesPage() {
  return (
    <section
      className="pb-24 pt-28 md:pt-36"
      style={{ background: "repeating-linear-gradient(90deg, transparent 0 79px, rgb(194 98 43 / 0.08) 79px 81px), linear-gradient(#fff1d8, #fbe3b4)" }}
    >
      <div className="gutter">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_minmax(0,440px)]">
          <div>
            <p className="hand text-toffee-ink">our wall of happy endings</p>
            <h1 className="display mt-2 max-w-[8ch] text-[clamp(3rem,9vw,5.6rem)]">
              Happy families <span className="hand align-middle text-[0.45em] text-toffee">♡</span>
            </h1>
            <p className="mt-5 max-w-md text-cocoa-soft">
              Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
            </p>
            <p className="hand mt-4 text-toffee-deep">{families.length} moments and counting</p>
          </div>
          <figure className="relative rotate-[1.5deg] bg-milk p-6 shadow-[0_14px_28px_-14px_rgb(42_23_14/0.5)]">
            <span className="washi" />
            <blockquote className="font-display leading-relaxed">“{TESTIMONIAL.quote}”</blockquote>
            <figcaption className="hand mt-3 text-toffee-deep">{TESTIMONIAL.by}</figcaption>
          </figure>
        </div>

        {/* masonry wall of polaroids */}
        <ul className="mt-16 columns-2 gap-5 md:columns-3 md:gap-8 lg:columns-4">
          {families.map((f, i) => (
            <Reveal as="li" key={f.src} delay={(i % 4) * 70} className="mb-7 break-inside-avoid md:mb-10">
              <figure className="polaroid relative" style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}>
                <span className="washi" />
                <Image
                  src={f.src}
                  alt="A happy TeddyPups family with their new puppy"
                  width={400}
                  height={500}
                  sizes="(min-width:1024px) 270px, (min-width:768px) 30vw, 45vw"
                  className="h-auto w-full"
                />
                {f.caption && <figcaption className="hand mt-1.5 text-center text-[0.8rem]">{f.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex items-end justify-center gap-4">
          <PupSpot className="w-[80px]" />
          <p className="hand pb-3 text-cocoa-soft">every one of them was a Teddy Pup once</p>
        </div>
      </div>
    </section>
  );
}
