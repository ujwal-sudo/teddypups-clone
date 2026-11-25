import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PupSpot } from "./Follower";
import Stars from "./Stars";
import { Moon } from "./icons";

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
    <footer className="relative overflow-hidden bg-night pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10">
      <Stars count={14} />
      <Moon className="absolute right-[12%] top-10 h-10 w-10" />
      <div className="gutter relative grid gap-10 pt-24 md:grid-cols-[1.4fr_1fr_1fr] md:pt-28">
        <div>
          <h2 className="display text-[2.4rem] md:text-[2.8rem]">Home, at last.</h2>
          <p className="mt-4 max-w-sm text-milk/80">
            {SITE.name} is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
          <Basket className="mt-6 w-[clamp(9rem,16vw,19rem)]" />
        </div>
        <div>
          <h3 className="hand text-honey">Explore</h3>
          <ul className="mt-3 space-y-2">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-milk/90 transition-colors hover:text-honey">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="hand text-honey">Say hello</h3>
          <ul className="mt-3 space-y-2 text-milk/90">
            <li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-honey">WhatsApp {SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-honey">{SITE.email}</a></li>
            <li>{SITE.address}</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {SITE.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-sm !px-4 !py-1.5 !text-[0.8rem]">
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
