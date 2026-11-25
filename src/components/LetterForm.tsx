"use client";

import { useActionState } from "react";
import { sendEnquiry } from "@/app/actions";
import type { EnquiryState } from "@/lib/enquiry";
import { available, puppyLine, SITE } from "@/lib/site";
import { PawIcon } from "./icons";

const initial: EnquiryState = { ok: false, message: "" };

/** The contact form, written as a fill-in-the-blanks letter to TeddyPups. */
export default function LetterForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const err = state.errors ?? {};
  const v = state.values;

  if (state.ok) {
    return (
      <div className="tp-letterform grid min-h-[420px] place-items-center text-center" role="status">
        <div>
          <Envelope />
          <p className="display mt-6 text-3xl">Letter posted! 💌</p>
          <p className="mt-2 text-cocoa-soft">{state.message}</p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6">Or chat on WhatsApp now</a>
        </div>
      </div>
    );
  }

  const size = (ch: number) => ({ "--size": `${ch}ch` }) as React.CSSProperties;
  return (
    <form key={JSON.stringify(v ?? null)} action={action} className="tp-letterform" noValidate>
      <span aria-hidden className="tp-letter__stamp"><PawIcon className="size-9" /></span>
      <p className="hand tp-letterform__greeting">Dear TeddyPups,</p>
      <p className="tp-letterform__line">
        my name is{" "}
        <span className="tp-blank" style={size(16)}>
          <input name="name" defaultValue={v?.name} aria-label="Your name (required)" aria-invalid={!!err.name} required autoComplete="name" />
        </span>
        , and you can reach me on{" "}
        <span className="tp-blank" style={size(15)}>
          <input name="phone" defaultValue={v?.phone} type="tel" inputMode="tel" aria-label="Phone or WhatsApp number with country code (required)" aria-invalid={!!err.phone} required autoComplete="tel" placeholder="+971 50 123 4567" />
        </span>{" "}
        or by email at{" "}
        <span className="tp-blank" style={size(20)}>
          <input name="email" defaultValue={v?.email} type="email" aria-label="Email (optional)" aria-invalid={!!err.email} autoComplete="email" placeholder="optional" />
        </span>
        .
      </p>
      <p className="tp-letterform__line">
        I live in{" "}
        <span className="tp-blank" style={size(13)}>
          <input name="area" defaultValue={v?.area} aria-label="Your area (optional)" autoComplete="address-level2" placeholder="e.g. Dubai Marina" />
        </span>
        , and I&apos;m curious about{" "}
        <span className="tp-blank tp-blank--select">
          <select name="puppy" defaultValue={v?.puppy ?? ""} aria-label="Puppy you're interested in (optional)">
            <option value="">any puppy (not sure yet)</option>
            {available.map((p) => {
              const label = `${p.name} (${puppyLine({ ...p, video: null, age: "" }).replace(/, $/, "")})`;
              return <option key={p.slug} value={label}>{label}</option>;
            })}
          </select>
        </span>
        .
      </p>
      <textarea name="message" defaultValue={v?.message} rows={4} aria-label="Your message (optional)" placeholder="Anything else you'd like to tell us…" className="tp-letterform__note" />
      <label className="absolute -left-[9999px]" aria-hidden>
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {state.message && (
        <div className="mt-4 rounded-2xl bg-blush px-4 py-3 text-sm leading-normal text-toffee-ink" role="alert">
          <p className="font-semibold">{state.message}</p>
          {Object.values(err).map((e) => <p key={e}>• {e}</p>)}
        </div>
      )}
      <div className="tp-letterform__sign">
        <p className="hand">with love, a future puppy parent</p>
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-70">
          {pending ? "Posting…" : "Post my letter"}
        </button>
      </div>
    </form>
  );
}

function Envelope() {
  return (
    <svg viewBox="0 0 120 80" className="mx-auto w-32" style={{ animation: "tp-post 1.2s var(--ease-pounce) both" }} aria-hidden>
      <rect x="4" y="4" width="112" height="72" rx="6" fill="#fff8ea" stroke="#2a170e" strokeWidth="3" />
      <path d="M6 8l54 38 54-38" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="60" cy="46" r="9" fill="#a24a1a" stroke="#2a170e" strokeWidth="2" />
      <path d="M56 45q4 5 8 0" stroke="#fff8ea" strokeWidth="2" fill="none" />
    </svg>
  );
}
