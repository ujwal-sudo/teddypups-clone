"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faqs";
import { SITE } from "@/lib/site";
import { PupSpot } from "./Follower";

const PINS = ["#c2622b", "#2f6e9e", "#f2be6b", "#1f7a4d", "#b4523a"];
const NOTES = ["#fff8ea", "#fbe3b4", "#fff8ea", "#f9e0d6"];

/** Search box + corkboard of sticky-note questions that open like an accordion. */
export default function FaqBoard() {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = FAQS.filter((f) => !needle || (f.q + " " + f.a).toLowerCase().includes(needle));

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
      <div>
        <label htmlFor="faq-search" className="hand text-honey">sniff out a question</label>
        <div className="relative mt-2">
          <svg viewBox="0 0 24 24" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-soft" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />
          </svg>
          <input
            id="faq-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="delivery, Korea, vaccinated…"
            className="w-full rounded-full border-[3px] border-cocoa bg-milk py-2.5 pl-10 pr-4 text-cocoa outline-none focus:ring-4 focus:ring-honey/50"
          />
        </div>
        <p className="hand mt-3 text-sm text-milk/80" aria-live="polite">
          {shown.length} {shown.length === 1 ? "note" : "notes"} on the board
        </p>
        <div className="relative mt-10 hidden w-[110px] lg:block">
          <span className="bubble float absolute -right-8 -top-5">?</span>
          <span className="bubble float absolute -right-14 top-6 [animation-delay:1s]">!</span>
          <PupSpot />
        </div>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-8">Ask your own question</a>
      </div>

      <div className="cork rounded-xl border-[6px] border-[#3d1e0d] p-4 shadow-[inset_0_0_30px_rgb(0_0_0/0.35)] md:p-8">
        {shown.length ? (
          <ul className="space-y-6">
            {shown.map((f, i) => (
              <li key={f.q} className="relative" style={{ rotate: `${[-1.2, 0.9, -0.5, 1.3][i % 4]}deg`, marginLeft: `${[0, 6, 2, 8][i % 4]}%` }}>
                <span className="absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cocoa" style={{ background: PINS[i % PINS.length] }} aria-hidden />
                <details className="group rounded-sm text-cocoa shadow-[0_8px_16px_-8px_rgb(0_0_0/0.6)]" style={{ background: NOTES[i % NOTES.length] }}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="display text-[1.15rem] leading-snug">{f.q}</span>
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded border-2 border-cocoa text-sm transition-transform group-open:rotate-180" aria-hidden>⌄</span>
                  </summary>
                  <p className="px-5 pb-5 text-cocoa-soft">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-sm bg-[#fff8ea] p-8 text-center text-cocoa">
            <p className="display text-xl">No notes match “{q}”</p>
            <p className="mt-2 text-cocoa-soft">Ask us directly — our team is available 24/7 on WhatsApp.</p>
          </div>
        )}
      </div>
    </div>
  );
}
