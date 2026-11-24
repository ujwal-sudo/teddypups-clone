import Image from "next/image";
import Link from "next/link";
import { puppyAlt, puppyLine, type Puppy } from "@/lib/site";
import { PawIcon, Sparkle } from "./icons";

const BLOBS = ["#fbe3b4", "#bfddf5", "#f9cdbf", "#fbe3b4"];

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden>
      <path d="M12 20S2 13.6 2 7.2A5 5 0 0 1 12 5a5 5 0 0 1 10 2.2C22 13.6 12 20 12 20z" />
    </svg>
  );
}

// A few sketchbook doodles scattered around each card; which ones depends on the card's position.
function Doodles({ i }: { i: number }) {
  const set = [
    <Heart key="h" className="absolute -right-3 top-[42%] h-5 w-5 text-cocoa" />,
    <Sparkle key="s" className="absolute -left-2 top-[18%] h-4 w-4 text-toffee" />,
    <PawIcon key="p" className="absolute bottom-[22%] right-[6%] h-3.5 w-3.5 text-toffee/80" />,
    <Sparkle key="s2" className="absolute right-[4%] top-0 h-3 w-3 text-cocoa" />,
  ];
  return <>{set.filter((_, k) => (i + k) % 3 !== 0)}</>;
}

/** Sketchbook-style puppy card: round photo over a coloured blob with a pencil ring. */
export default function PuppyCard({ pup, i = 0, size = "lg" }: { pup: Puppy; i?: number; size?: "lg" | "sm" }) {
  const gone = pup.status === "gone";
  return (
    <Link href={`/puppies/${pup.slug}`} className="group relative block text-center">
      <span className={`relative mx-auto block aspect-square ${size === "lg" ? "w-[86%]" : "w-full"}`}>
        <span className="absolute inset-0 translate-x-[6%] translate-y-[5%] rounded-full" style={{ background: BLOBS[i % BLOBS.length] }} />
        <span className="absolute inset-0 overflow-hidden rounded-full bg-honey-soft transition-transform duration-500 [transition-timing-function:var(--ease-pounce)] group-hover:-rotate-3 group-hover:scale-[1.03]">
          <Image
            src={pup.images[0]}
            alt={puppyAlt(pup)}
            fill
            sizes={size === "lg" ? "(min-width:1024px) 300px, (min-width:640px) 40vw, 80vw" : "160px"}
            className="object-cover"
          />
        </span>
        {/* pencil ring: an imperfect circle drawn slightly off-centre */}
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute -inset-[4%] h-[108%] w-[108%] text-cocoa/70" fill="none" aria-hidden>
          <path d="M50 3C76 2 97 22 97 49s-19 47-46 48C24 98 3 78 3 51 3 30 16 10 38 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" style={{ rotate: `${(i * 47) % 360}deg`, transformOrigin: "50% 50%" }} />
        </svg>
        {size === "lg" && !gone && <span className="tag absolute right-[2%] top-[4%] rotate-[10deg]">Available</span>}
        {gone && (
          <span className={`hand absolute bottom-[4%] left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap rounded-sm border-2 border-toffee-deep bg-milk/90 text-toffee-deep ${size === "sm" ? "px-1 text-[0.6rem]" : "px-2 text-[0.75rem]"}`}>
            gone home ♥
          </span>
        )}
        {pup.video && size === "lg" && (
          <span className="absolute bottom-[10%] left-[6%] rounded-full bg-cocoa/85 px-2.5 py-0.5 text-[0.7rem] font-semibold text-milk">▶ video</span>
        )}
        {size === "lg" && <Doodles i={i} />}
      </span>
      <span className={`display mt-4 block ${size === "lg" ? "text-[1.25rem]" : "text-[1rem]"}`}>{pup.name}</span>
      {size === "lg" && <span className="mt-0.5 block text-[0.82rem] text-cocoa-soft">{puppyLine({ ...pup, video: null }, " · ")}</span>}
    </Link>
  );
}
