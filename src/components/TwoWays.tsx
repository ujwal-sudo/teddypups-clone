"use client";

import { useState } from "react";
import { FlightPath, Showroom } from "./home/Paths";

const WAYS = {
  local: {
    tab: "In Dubai",
    sub: "meet in person",
    title: "Meet your puppy in person",
    intro: [
      "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.",
    ],
    steps: [
      ["Explore our puppies", "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information."],
      ["Choose your puppy", "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions."],
      ["Meet before you choose", "Spend time bonding before making your decision."],
      ["Pick-up or delivery", "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably."],
    ],
  },
  imported: {
    tab: "Imported",
    sub: "order upon request",
    title: "Order upon request",
    intro: [
      "Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.",
      "From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.",
    ],
    steps: [
      ["Reserve your puppy", "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences."],
      ["Personalized consultation", "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey."],
      ["Import and arrival", "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family."],
      ["Welcome home", "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home."],
    ],
  },
} as const;

type Way = keyof typeof WAYS;

/** "Two ways home": a tab switch between the Dubai showroom flow and the import flow. */
export default function TwoWays() {
  const [way, setWay] = useState<Way>("local");
  const w = WAYS[way];
  return (
    <div>
      <div role="tablist" aria-label="Two ways home" className="inline-flex rounded-full border-[3px] border-cocoa bg-milk p-1">
        {(Object.keys(WAYS) as Way[]).map((k) => (
          <button
            key={k}
            role="tab"
            id={`tab-${k}`}
            aria-selected={way === k}
            aria-controls={`panel-${k}`}
            onClick={() => setWay(k)}
            className={`rounded-full px-6 py-2 text-center leading-tight transition-colors md:px-9 ${way === k ? "bg-toffee-deep text-milk" : "hover:bg-honey-soft"}`}
          >
            <span className="display block text-[1.05rem]">{WAYS[k].tab}</span>
            <span className="block text-[0.72rem] opacity-80">{WAYS[k].sub}</span>
          </button>
        ))}
      </div>

      <div key={way} id={`panel-${way}`} role="tabpanel" aria-labelledby={`tab-${way}`} className="msg mt-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="display text-[clamp(1.9rem,4vw,2.6rem)]">{w.title}</h3>
            {w.intro.map((p) => <p key={p} className="mt-4 text-cocoa-soft">{p}</p>)}
          </div>
          <div className="flex justify-center">
            {way === "local" ? (
              <div className="w-full max-w-sm rounded-2xl border-[3px] border-cocoa bg-honey-soft p-6">
                <p className="hand text-toffee-ink">Downtown Dubai</p>
                <div className="mt-3 flex justify-center"><Showroom /></div>
              </div>
            ) : (
              <FlightPath from="Europe · Korea" />
            )}
          </div>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {w.steps.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border-2 border-cocoa bg-milk p-5 shadow-[4px_5px_0_-1px_var(--color-cocoa)]">
              <span className="hand text-sm text-toffee-ink">Step {i + 1}</span>
              <h4 className="display mt-1 text-[1.25rem]">{t}</h4>
              <p className="mt-2 text-[0.92rem] text-cocoa-soft">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
