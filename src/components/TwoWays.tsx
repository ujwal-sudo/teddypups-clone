"use client";

import { useState } from "react";
import Pup from "./Pup";
import { city, postcardPlane, postcardRoute, stepsImported, stepsLocal } from "./how/art";

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
const TINTS = ["#fbe3b4", "#fde6de", "#e3f0fb", "#e6f2df"];

/** "Two ways home": a sliding switch between the Dubai showroom flow and the import flow. */
export default function TwoWays() {
  const [way, setWay] = useState<Way>("local");
  const keys = Object.keys(WAYS) as Way[];
  const w = WAYS[way];
  const icons = way === "local" ? stepsLocal : stepsImported;
  return (
    <section className="tp-journeys" aria-labelledby="two-ways-title">
      <div className="tp-journeys__top">
        <div>
          <p className="hand tp-journeys__kicker">choose your way</p>
          <h2 id="two-ways-title" className="display text-big">Two ways home</h2>
        </div>
        <div className="tp-journeys__pick">
          <div role="tablist" aria-label="Ways to bring your puppy home" className="tp-switch" style={{ "--at": keys.indexOf(way), "--n": keys.length } as React.CSSProperties}>
            <span aria-hidden className="tp-switch__thumb" />
            {keys.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                id={`tab-${k}`}
                aria-selected={way === k}
                aria-controls={`panel-${k}`}
                onClick={() => setWay(k)}
                className="tp-switch__tab"
              >
                <span className="display tp-switch__label">{WAYS[k].tab}</span>
                <span className="tp-switch__hint">{WAYS[k].sub}</span>
              </button>
            ))}
          </div>
          <Pup className="tp-journeys__teddy" />
        </div>
      </div>

      {/* keyed: switching remounts the panel, so the steps (and the plane) animate in again */}
      <div key={way} id={`panel-${way}`} role="tabpanel" aria-labelledby={`tab-${way}`} className="tp-journey">
        <div className="tp-journey__head">
          <div>
            <h3 className="display tp-journey__title">{w.title}</h3>
            <p className="mt-4 text-lede text-cocoa-soft">{w.intro[0]}</p>
            {w.intro[1] && <p className="hand mt-4 text-toffee-ink">{w.intro[1]}</p>}
          </div>
          {way === "local" ? (
            <div aria-hidden className="tp-postcard">
              <span className="tp-postcard__sun" />
              <svg viewBox="0 0 300 120" className="tp-postcard__city" dangerouslySetInnerHTML={{ __html: city }} />
              <span className="hand tp-postcard__to tp-postcard__to--left">Downtown Dubai</span>
            </div>
          ) : (
            <div aria-hidden className="tp-postcard tp-postcard--sky">
              <svg viewBox="0 0 320 150" className="tp-postcard__route" preserveAspectRatio="none" dangerouslySetInnerHTML={{ __html: postcardRoute }} />
              <svg viewBox="0 0 64 40" className="tp-postcard__plane" dangerouslySetInnerHTML={{ __html: postcardPlane }} />
              <span className="hand tp-postcard__from">Europe · Korea</span>
              <span className="hand tp-postcard__to">Dubai</span>
            </div>
          )}
        </div>
        <ol className="tp-steps">
          {w.steps.map(([t, d], i) => (
            <li key={t} className="tp-step" style={{ "--i": i, "--tint": TINTS[i] } as React.CSSProperties}>
              <span aria-hidden className="tp-step__icon">
                <svg viewBox="0 0 48 48" dangerouslySetInnerHTML={{ __html: icons[i] }} />
              </span>
              <span className="display tp-step__num">Step {i + 1}</span>
              <h4 className="display-text tp-step__title">{t}</h4>
              <p className="tp-step__text">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
