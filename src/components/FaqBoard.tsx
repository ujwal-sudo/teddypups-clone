"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faqs";
import { SITE } from "@/lib/site";
import Pup from "./Pup";

// pin colours and tilts in the same order as the reference
const PINS = ["var(--color-toffee)", "#2f6e9e", "#d9a13c", "#c45a6a"];
const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];

/** Search box + corkboard of pinned notes that unfold like an accordion (one open at a time). */
export default function FaqBoard() {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = FAQS.filter((f) => !needle || (f.q + " " + f.a).toLowerCase().includes(needle));
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="tp-notes" data-open={open ? "" : undefined}>
      <aside className="tp-notes__side" aria-label="Find a question">
        <label htmlFor="faq-search" className="hand tp-notes__label">sniff out a question</label>
        <div className="tp-notes__search">
          <svg viewBox="0 0 24 24" aria-hidden className="tp-notes__lens"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
          <input id="faq-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="delivery, Korea, vaccinated…" autoComplete="off" />
        </div>
        <p className="tp-notes__count" aria-live="polite">{shown.length} {shown.length === 1 ? "note" : "notes"} on the board</p>
        <div className="tp-notes__teddy">
          {/* "?" while browsing, "!" once a note is open */}
          <span aria-hidden className="display tp-notes__bubble">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </span>
          <Pup />
        </div>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp tp-notes__ask">Ask your own question</a>
      </aside>

      <div className="tp-notes__board">
        {shown.length ? (
          <ul className="tp-notes__list">
            {shown.map((f, i) => (
              <li
                key={f.q}
                data-reveal
                data-unfolded={open === f.q ? "" : undefined}
                className="tp-note"
                style={{ "--tilt": `${TILTS[i % TILTS.length]}deg`, "--pin": PINS[i % PINS.length], "--i": i } as React.CSSProperties}
              >
                <span aria-hidden className="tp-note__pin" />
                <h2 className="tp-note__q">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={open === f.q}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen((o) => (o === f.q ? null : f.q))}
                  >
                    <span className="display-text">{f.q}</span>
                    <span aria-hidden className="tp-note__chevron" />
                  </button>
                </h2>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="tp-note__answer" inert={open !== f.q}>
                  <div className="tp-note__flap"><p>{f.a}</p></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="tp-note tp-note--empty text-center">
            <p className="display text-xl">No notes match “{q}”</p>
            <p className="mt-2 text-cocoa-soft">Ask us directly — our team is available 24/7 on WhatsApp.</p>
          </div>
        )}
      </div>
    </div>
  );
}
