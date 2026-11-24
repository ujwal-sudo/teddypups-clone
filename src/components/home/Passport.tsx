import { PupSpot } from "@/components/Follower";
import Reveal from "@/components/Reveal";

const STAMPS = [
  { label: "Vet-checked & healthy", text: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.", shape: "rounded-full", color: "#c2622b", r: "-8deg", icon: "♥\uFE0E" },
  { label: "Korea to Dubai, safely", text: "Trusted breeders, safe travel, and premium care from start to finish.", shape: "rounded-md", color: "#1f7a4d", r: "5deg", icon: "✈\uFE0E" },
  { label: "Support 24/7", text: "Always here to help, from choosing your puppy to post-delivery support.", shape: "rounded-[45%]", color: "#5a3a28", r: "-4deg", icon: "☎\uFE0E" },
  { label: "Trusted by families worldwide", text: "Puppies delivered to loving homes all around the world.", shape: "rounded-full border-dotted", color: "#a24a1a", r: "7deg", icon: "✦" },
];

/** "Why families trust TeddyPups" — an open puppy passport whose pages get stamped. */
export default function Passport() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-honey to-[#d9853b] pt-16 md:pt-24">
      <div className="gutter">
        <Reveal plain className="relative mx-auto max-w-5xl rounded-[1.4rem] border-[3px] border-cocoa bg-toffee-ink p-2.5 shadow-[0_14px_0_-4px_var(--color-cocoa)] md:p-3.5">
          <div className="grid overflow-hidden rounded-xl border-2 border-cocoa md:grid-cols-2">
            <div className="paper relative px-6 pb-8 pt-7 md:border-r-2 md:border-dashed md:border-cocoa/30 md:px-10">
              <p className="hand text-sm text-toffee-ink">puppy passport</p>
              <h2 className="display mt-1 text-[clamp(2rem,4.5vw,3rem)]">Why families trust TeddyPups</h2>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                {STAMPS.slice(0, 2).map((s, i) => <Stamp key={s.label} {...s} delay={i * 180} />)}
              </div>
            </div>
            <div className="paper grid grid-cols-2 content-center gap-x-6 gap-y-8 px-6 pb-10 pt-2 md:px-10 md:pt-10">
              {STAMPS.slice(2).map((s, i) => <Stamp key={s.label} {...s} delay={360 + i * 180} />)}
            </div>
          </div>
        </Reveal>
      </div>

      {/* city at sunset, with Teddy strolling past */}
      <div className="relative mt-10 h-[150px] md:h-[190px]">
        <div className="absolute bottom-0 left-[62%] h-[120px] w-[120px] rounded-full bg-[#ffd27a] md:h-[150px] md:w-[150px]" style={{ animation: "tp-sun-set 8s ease-in-out infinite alternate" }} />
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 h-[110px] w-full text-[#8a4520]" aria-hidden>
          <path fill="currentColor" d="M0 120V80h40V60h30v20h20V40h25v40h30V70h40v50h20V50h18V30h6V10h4v20h6v20h18v70h30V64h40v56h30V44h30v76h25V70h45V40h20v80h30V58h28v62h40V30l10-14 10 14v90h30V66h44v54h20V48h36v72h28V76h40v44h20V54h30v66h40V70h30v50h46V60h20v60h40V36h30v84h30V72h40v48h28V58h40v62z" />
        </svg>
        <PupSpot className="absolute bottom-3 left-[14%] w-[70px] md:w-[86px]" />
      </div>
    </section>
  );
}

export type StampProps = { label: string; text: string; shape: string; color: string; r: string; icon: string; delay: number };

export function Stamp({ label, text, shape, color, r, icon, delay }: StampProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className={`stamp grid h-[104px] w-[104px] place-items-center border-[3px] border-double p-2 ${shape}`}
        style={{ color, borderColor: color, "--r": r, animationDelay: `${delay}ms` } as React.CSSProperties}
      >
        <span className="display text-[0.82rem] leading-tight">
          <span className="block text-lg" aria-hidden>{icon}</span>
          {label}
        </span>
      </span>
      <p className="mt-3 text-[0.85rem] leading-snug text-cocoa-soft">{text}</p>
    </div>
  );
}
