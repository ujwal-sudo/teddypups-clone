import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PupSpot } from "./Follower";
import Stars from "./Stars";
import { Moon } from "./icons";
import { hill } from "./how/art";

const EXPLORE = [
  { href: "/puppies", label: "Available puppies" },
  { href: "/gone-home", label: "Gone home" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/how-it-works#delivery", label: "Delivery & collection" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-night pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10">
      {/* the night rolls in over a hill */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="tp-footer-hill" dangerouslySetInnerHTML={{ __html: hill }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Stars count={14} />
        <Moon className="absolute right-[12%] top-10 h-10 w-10" />
      </div>
      <div className="gutter relative grid gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        <div className="md:col-span-5">
          <h2 className="display text-big text-honey-soft">Home, at last.</h2>
          <p className="mt-5 max-w-md text-milk/80">
            {SITE.name} is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
        </div>
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <Basket className="w-[clamp(9rem,16vw,19rem)]" />
        </div>
        <div className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h3 className="hand text-lg text-honey">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-semibold text-milk/90 underline-offset-4 transition-colors hover:text-honey hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h3 className="hand text-lg text-honey">Say hello</h3>
          <ul className="mt-4 space-y-2.5 text-milk/90">
            <li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-honey">WhatsApp {SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-honey">{SITE.email}</a></li>
            <li>{SITE.address}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {SITE.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold transition-colors hover:border-honey hover:text-honey">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="gutter relative mt-14 flex flex-col items-start justify-between gap-3 border-t border-milk/15 pt-6 text-sm text-milk/70 sm:flex-row sm:items-center">
        <span className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
          © 2026 {SITE.name}
        </span>
        <span className="hand text-honey">every puppy is family</span>
      </div>
    </footer>
  );
}

/** Teddy's basket: empty until he walks down the page and climbs in (see Follower). */
function Basket({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <PupSpot pose="peek" priority className="relative z-0 mx-auto w-[62%]" />
      {/* the svg overlaps the spot by its rim height, so his paws rest on the rim */}
      <svg viewBox="0 0 140 60" className="relative z-10 -mt-2 w-full">
        <path d="M6 8h128l-12 46a8 8 0 0 1-8 6H26a8 8 0 0 1-8-6z" fill="#c98a4b" stroke="#fffdf8" strokeWidth="3" />
        <path d="M14 22h112M18 36h104M22 50h96" stroke="#8e5a2b" strokeWidth="3" />
        <path d="M2 8h136" stroke="#fffdf8" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
