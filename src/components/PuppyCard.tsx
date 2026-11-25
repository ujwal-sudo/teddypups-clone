import Image from "next/image";
import Link from "next/link";
import { puppyAlt, puppyLine, type Puppy } from "@/lib/site";
import { PawIcon, Sparkle } from "./icons";

const WASH = ["#fbe3b4", "#bfddf5", "#f9cdbf", "#fbe3b4"];
const TILT = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.2];

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden>
      <path d="M12 20S2 13.6 2 7.2A5 5 0 0 1 12 5a5 5 0 0 1 10 2.2C22 13.6 12 20 12 20z" />
    </svg>
  );
}

/**
 * Sketchbook card (reveal copied from the reference): when it scrolls into view the pencil
 * ring draws itself, a colour wash blooms, the photo opens out of a circle, then the
 * doodles and the "Available" sticker pop on.
 */
export default function PuppyCard({ pup, i = 0, size = "lg" }: { pup: Puppy; i?: number; size?: "lg" | "sm" }) {
  const gone = pup.status === "gone";
  const lg = size === "lg";
  return (
    <Link
      href={`/puppies/${pup.slug}`}
      data-reveal
      className="sketch group relative block text-center"
      style={{ "--d": `${(i % 4) * 0.12}s`, "--tilt": `${TILT[i % TILT.length]}deg`, "--wash": WASH[i % WASH.length] } as React.CSSProperties}
    >
      <span className={`sketch-frame mx-auto ${lg ? "w-[92%]" : "w-full"}`}>
        <svg viewBox="0 0 100 100" className="sketch-wash" aria-hidden>
          <path d="M52 4c22 1 42 17 44 40s-12 46-38 50S8 84 5 58 26 3 52 4z" />
        </svg>
        <span className="sketch-photo">
          <Image src={pup.images[0]} alt={puppyAlt(pup)} fill sizes={lg ? "(min-width:1280px) 330px, (min-width:640px) 40vw, 80vw" : "180px"} className="object-cover" />
        </span>
        <svg viewBox="0 0 100 100" className="sketch-ink" aria-hidden>
          <path className="sketch-line" pathLength={1} d="M50 3C76 2 97 22 97 49s-19 47-46 48C24 98 3 78 3 51 3 30 16 10 38 4" />
          <path className="sketch-line sketch-line--retrace" pathLength={1} d="M46 5C70 1 95 20 96 47s-17 49-44 49C28 97 5 80 4 54" />
        </svg>
        {lg && (
          <>
            <Heart className="sketch-doodle absolute -right-[6%] top-[40%] h-[9%] w-[9%] text-cocoa" />
            <Sparkle className="sketch-doodle absolute -left-[4%] top-[16%] h-[7%] w-[7%] text-toffee" />
            <PawIcon className="sketch-doodle absolute bottom-[14%] right-[2%] h-[7%] w-[7%] text-toffee/80" />
          </>
        )}
        {lg && !gone && <span className="tag sketch-sticker absolute right-[0%] top-[4%] rotate-[10deg]">Available</span>}
        {gone && (
          <span className={`sketch-sticker hand absolute bottom-[2%] left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap rounded-full border-2 border-toffee-deep bg-milk px-2 text-toffee-deep ${lg ? "text-[0.8rem]" : "text-[0.62rem]"}`}>
            gone home ♥
          </span>
        )}
        {pup.video && lg && <span className="sketch-sticker absolute bottom-[10%] left-[6%] rounded-full bg-cocoa/85 px-2.5 py-0.5 text-[0.72rem] font-semibold text-milk">▶ video</span>}
      </span>
      <span className={`display mt-4 block leading-[1.02] transition-colors group-hover:text-toffee-deep ${lg ? "text-[clamp(1.35rem,2vw,1.85rem)]" : "text-[1.05rem]"}`}>{pup.name}</span>
      {lg && <span className="mt-1 block text-[0.92rem] font-semibold text-cocoa-soft">{puppyLine({ ...pup, video: null }, " · ")}</span>}
    </Link>
  );
}
