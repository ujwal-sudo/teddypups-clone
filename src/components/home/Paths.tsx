import Image from "next/image";
import Link from "next/link";
import { PupSpot } from "@/components/Follower";
import Reveal from "@/components/Reveal";
import ScrollFlight from "@/components/ScrollFlight";

const SHOWROOM_PHOTO = "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg";

/** "Two ways to meet your puppy" — a signpost splitting into the Dubai showroom and the import route. */
export default function Paths() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-honey-soft to-[#f8d295] pb-20 pt-24 md:pt-28">
      <div className="gutter">
        <h2 className="display mx-auto max-w-[12ch] text-center text-huge">Two ways to meet your puppy</h2>

        <div className="relative mt-10 grid gap-14 md:grid-cols-2 md:gap-24">
          {/* Signpost (desktop: sits between the two columns) */}
          <Signpost className="absolute left-1/2 top-0 hidden h-full w-[clamp(360px,30vw,560px)] -translate-x-1/2 md:block" />

          <Reveal className="relative flex flex-col items-center text-center md:items-start md:pr-10 md:pt-24 md:text-left">
            <h3 className="hand mb-6 rounded-md border-2 border-cocoa bg-toffee px-4 py-1 text-milk md:hidden">Puppies in Dubai</h3>
            <Showroom />
            <p className="mt-8 max-w-md text-cocoa-soft">
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>
            <Link href="/puppies?origin=local" className="btn btn-primary mt-6">Meet local puppies</Link>
          </Reveal>

          <Reveal delay={150} className="relative flex flex-col items-center text-center md:items-end md:pl-10 md:pt-24 md:text-right">
            <h3 className="hand mb-6 rounded-md border-2 border-cocoa bg-toffee px-4 py-1 text-milk md:hidden">Imported for you</h3>
            <FlightPath />
            <p className="mt-8 max-w-md text-cocoa-soft">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
            </p>
            <Link href="/puppies?origin=imported" className="btn btn-primary mt-6">See imported puppies</Link>
          </Reveal>
        </div>
      </div>
      <PupSpot className="absolute bottom-6 left-1/2 w-[clamp(64px,6vw,120px)] -translate-x-1/2" />
    </section>
  );
}

function Signpost({ className }: { className?: string }) {
  const text = { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, fill: "#2a170e" };
  return (
    <svg viewBox="0 0 360 520" preserveAspectRatio="xMidYMin meet" className={className} aria-hidden>
      <rect x="170" y="20" width="20" height="500" rx="4" fill="#b8692f" stroke="#2a170e" strokeWidth="3" />
      <path d="M180 14l-8 8h16z" fill="#2a170e" />
      <g style={{ transformOrigin: "180px 60px", animation: "tp-flag 5s ease-in-out infinite" }}>
        <path d="M176 34H36L8 60l28 26h140z" fill="#e9a35a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
        <text x="96" y="66" textAnchor="middle" textLength="122" lengthAdjust="spacingAndGlyphs" style={text}>Puppies in Dubai</text>
      </g>
      <g style={{ transformOrigin: "180px 120px", animation: "tp-flag 5s 0.6s ease-in-out infinite" }}>
        <path d="M184 94h140l28 26-28 26H184z" fill="#e9a35a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
        <text x="262" y="126" textAnchor="middle" textLength="126" lengthAdjust="spacingAndGlyphs" style={text}>Imported for you</text>
      </g>
    </svg>
  );
}

export function Showroom() {
  return (
    <div className="relative w-[clamp(250px,17vw,330px)]">
      {/* city skyline line drawing */}
      <svg viewBox="0 0 300 120" className="absolute -bottom-2 left-[40%] w-[120%] text-cocoa" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M0 118h300M20 118V70h22v48M50 118V40h18v78M76 118V58l12-10 12 10v60M108 118V20l8-14 8 14v98M134 118V64h26v54M168 118V50h16v68M192 118V78h24v40M224 118V60h14v58M246 118V86h30v32" />
      </svg>
      {/* awning */}
      <div className="relative z-10 h-9 overflow-hidden rounded-t-md border-[3px] border-cocoa" style={{ background: "repeating-linear-gradient(90deg,#c2622b 0 22px,#fffdf8 22px 44px)" }} />
      <div className="relative z-10 -mt-[3px] h-3" style={{ background: "radial-gradient(circle at 11px 0,#c2622b 10px,transparent 11px) 0 0/44px 12px repeat-x,radial-gradient(circle at 33px 0,#fffdf8 10px,transparent 11px) 0 0/44px 12px repeat-x" }} />
      <div className="relative z-10 mx-3 -mt-1 border-[3px] border-cocoa bg-milk p-2 shadow-[6px_6px_0_var(--color-cocoa)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={SHOWROOM_PHOTO} alt="A tiny apricot teddy bear puppy in our Dubai showroom" fill sizes="240px" className="object-cover" />
        </div>
        <p className="hand mt-1 text-center text-sm">In our showroom</p>
      </div>
    </div>
  );
}

export function FlightPath({ from = "Korea" }: { from?: string }) {
  return (
    <div className="relative aspect-[660/300] w-[clamp(300px,32vw,620px)]">
      <ScrollFlight from={from} />
    </div>
  );
}
