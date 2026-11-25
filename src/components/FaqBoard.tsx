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
  const [open, setOpen] = useState<string | null>(null); // one note open at a time, like the reference

  return (
    <div data-reveal data-open={open ? "" : undefined} className="notes grid gap-12 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-16">
      <div>
        <label htmlFor="faq-search" className="hand text-[1.15rem] text-honey">sniff out a question</label>
        <div className="relative mt-2">
          <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cocoa-soft" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />
          </svg>
          <input
            id="faq-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="delivery, Korea, vaccinated…"
            className="h-14 w-full rounded-full border-[3px] border-cocoa bg-milk pl-12 pr-5 text-[1.0625rem] text-cocoa shadow-[0_6px_0_var(--color-cocoa)] outline-none focus:ring-4 focus:ring-honey/50"
          />
        </div>
        <p className="hand mt-3 text-sm text-milk/80" aria-live="polite">
          {shown.length} {shown.length === 1 ? "note" : "notes"} on the board
        </p>
        <div className="relative mt-10 hidden w-[11rem] lg:block">
          {/* "?" while browsing, "!" once a note is open */}
          <span className="notes-bubble absolute -right-6 -top-4 z-10 grid size-[3.1rem] place-items-center rounded-full border-[3px] border-cocoa bg-milk text-xl font-bold text-toffee-deep" aria-hidden>
            <span className="q">?</span>
            <span className="a">!</span>
          </span>
          <PupSpot />
        </div>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-8">Ask your own question</a>
      </div>

      <div className="cork rounded-xl border-[6px] border-[#3d1e0d] p-4 shadow-[inset_0_0_30px_rgb(0_0_0/0.35)] md:p-8">
        {shown.length ? (
          <ul className="space-y-6">
            {shown.map((f, i) => (
              <li
                key={f.q}
                data-open={open === f.q}
                className="note relative rounded-sm border-[3px] border-cocoa text-cocoa shadow-[0_8px_16px_-8px_rgb(0_0_0/0.6)]"
                style={{ "--tilt": `${[-1.2, 0.9, -0.5, 1.3][i % 4]}deg`, "--shift": `${[0, 1.5, 0.5, 2][i % 4]}rem`, "--i": i, background: NOTES[i % NOTES.length] } as React.CSSProperties}
              >
                <span className="note-pin absolute -top-[0.85rem] left-1/2 z-10 size-[1.45rem] -translate-x-1/2 rounded-full border-[2.5px] border-cocoa" style={{ background: `radial-gradient(circle at 34% 30%, #ffffffbf 0 16%, ${PINS[i % PINS.length]} 20%)` }} aria-hidden />
                <h2>
                  <button
                    type="button"
                    aria-expanded={open === f.q}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen((o) => (o === f.q ? null : f.q))}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left md:px-7"
                  >
                    <span className="display text-[clamp(1.1rem,1.6vw,1.3rem)] leading-snug">{f.q}</span>
                    <span className="note-chevron mt-1.5 size-[0.85rem] shrink-0 border-b-[3px] border-r-[3px] border-toffee-deep" aria-hidden />
                  </button>
                </h2>
                <div id={`faq-a-${i}`} className="note-answer">
                  <div className="note-flap">
                    <p className="mx-5 mb-5 border-t-2 border-dashed border-cocoa/30 pt-4 text-cocoa-soft md:mx-7">{f.a}</p>
                  </div>
                </div>
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
