import Image from "next/image";
import Link from "next/link";
import Pup from "@/components/Pup";
import { Squiggle } from "@/components/icons";
import { available, puppyAlt, SITE } from "@/lib/site";

// left% / size(px, desktop) / how far the photo rises above the cushion
const SPOTS = [
  { left: 4, size: 118, lift: 52 },
  { left: 15, size: 150, lift: 66 },
  { left: 28, size: 128, lift: 40 },
  { left: 61, size: 140, lift: 50 },
  { left: 72, size: 168, lift: 78 },
  { left: 86, size: 126, lift: 46 },
];

export default function Hero() {
  const pups = available.slice(0, SPOTS.length);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-milk to-cream pt-28 md:pt-36">
      <div className="gutter relative z-10 text-center">
        <p className="hand inline-flex flex-col items-center text-[1.05rem] font-medium text-toffee-ink">
          every puppy is family
          <Squiggle className="-mt-0.5 h-2 w-[110%]" />
        </p>
        <h1 className="display mx-auto mt-3 max-w-[13ch] text-[clamp(2.55rem,8.3vw,5.3rem)]">
          Premium teacup puppies in Dubai
        </h1>
        <p className="mx-auto mt-5 max-w-[36rem] text-[1.05rem] text-cocoa-soft md:text-base">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/puppies" className="btn btn-primary">View available puppies</Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Enquire on WhatsApp</a>
        </div>
      </div>

      <div className="hero-row relative mt-12 h-[150px] md:mt-14 md:h-[215px]">
        {pups.map((p, i) => {
          const s = SPOTS[i];
          return (
            <Link
              key={p.slug}
              href={`/puppies/${p.slug}`}
              className="hero-photo group absolute z-0 block"
              style={{
                left: `${s.left}%`,
                bottom: `calc(var(--k) * ${s.lift}px + 30px)`,
                width: `calc(var(--k) * ${s.size}px)`,
                animationDelay: `${300 + i * 110}ms`,
              } as React.CSSProperties}
            >
              <span className="block aspect-square overflow-hidden rounded-full border-[3px] border-cocoa bg-honey-soft shadow-[0_6px_0_-1px_var(--color-cocoa)] transition-transform duration-300 [transition-timing-function:var(--ease-pounce)] group-hover:-translate-y-2 group-hover:rotate-[-4deg]">
                <Image src={p.images[0]} alt={puppyAlt(p)} width={240} height={240} quality={75} className="h-full w-full object-cover" priority={i < 3} />
              </span>
              <span className="bubble absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">{p.name}</span>
            </Link>
          );
        })}

        <div className="absolute bottom-[30px] left-1/2 z-[1] w-[110px] -translate-x-1/2 overflow-hidden md:w-[150px]">
          <div className="hero-peek relative">
            <span className="bubble absolute -top-1 left-[62%] text-[0.7rem]">hm?</span>
            <Pup pose="peek" className="mt-5 w-full" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[2]">
          <div className="cushion-edge" />
          <div className="cushion h-[34px]" />
        </div>
      </div>
    </section>
  );
}
