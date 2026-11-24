import Image from "next/image";
import Link from "next/link";
import { PupSpot } from "@/components/Follower";
import Reveal from "@/components/Reveal";
import { families } from "@/lib/site";

export const TESTIMONIAL = {
  quote:
    "TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.",
  by: "Sarah M., Dubai, UAE",
};

const TILTS = [-4, 3, -2, 5, -5, 2, -3, 4];

/** Dusk: a testimonial note and a corkboard of polaroids from real families. */
export default function Families() {
  const shown = families.filter((f) => f.caption).slice(0, 8);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#d9853b] via-[#8a4520] to-[#5e2e15] pb-24 pt-20 text-milk md:pt-24">
      <div className="gutter grid items-start gap-10 md:grid-cols-[1fr_minmax(0,460px)]">
        <Reveal>
          <h2 className="display max-w-[10ch] text-[clamp(2.4rem,6vw,4.2rem)]">Happy families &amp; puppies</h2>
          <p className="mt-5 max-w-md text-milk/85">
            We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have
            been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <figure className="relative rotate-[1.5deg] rounded-sm bg-milk p-6 text-cocoa shadow-[8px_10px_0_-2px_rgb(42_23_14/0.6)]">
            <span className="washi" />
            <blockquote className="font-display text-[1.02rem] leading-relaxed">“{TESTIMONIAL.quote}”</blockquote>
            <figcaption className="hand mt-3 text-toffee-deep">{TESTIMONIAL.by}</figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="gutter mt-14">
        <div className="cork relative rounded-xl border-[6px] border-[#3d1e0d] px-4 pb-10 pt-10 shadow-[inset_0_0_30px_rgb(0_0_0/0.35)] md:px-10">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((f, i) => (
              <li key={f.src}>
                <figure className="polaroid relative" style={{ transform: `rotate(${TILTS[i]}deg)` }}>
                  <span className="washi" />
                  <span className="relative block aspect-[4/5] overflow-hidden">
                    <Image src={f.src} alt="A happy TeddyPups family with their new puppy" fill sizes="(min-width:1024px) 240px, 45vw" className="object-cover" />
                  </span>
                  <figcaption className="hand mt-1.5 truncate text-center text-[0.8rem] text-cocoa">{f.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <PupSpot className="absolute -bottom-7 left-1/2 w-[70px] -translate-x-1/2" />
        </div>
        <div className="mt-14 text-center">
          <Link href="/happy-families" className="btn btn-ghost-light">See every happy family</Link>
        </div>
      </div>
    </section>
  );
}
