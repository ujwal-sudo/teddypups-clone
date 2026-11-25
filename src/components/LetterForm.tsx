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
      <div className="letter grid min-h-[420px] place-items-center p-8 text-center" role="status">
        <div>
          <Envelope />
          <p className="display mt-6 text-3xl">Letter posted! 💌</p>
          <p className="mt-2 text-cocoa-soft">{state.message}</p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6">Or chat on WhatsApp now</a>
        </div>
      </div>
    );
  }

  const blank = "mx-1 inline-block border-0 border-b-2 border-dashed border-cocoa/50 bg-transparent px-1 py-0.5 font-hand text-toffee-deep outline-none placeholder:text-cocoa/35 focus:border-toffee aria-[invalid=true]:border-solid aria-[invalid=true]:border-toffee-deep";
  return (
    <form key={JSON.stringify(v ?? null)} action={action} className="letter relative p-6 text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[2.6] md:p-12" noValidate>
      <span className="absolute -top-4 right-6 grid h-16 w-14 rotate-6 place-items-center border-2 border-dashed border-cocoa bg-honey" aria-hidden>
        <PawIcon className="h-6 w-6 text-cocoa" />
      </span>
      <p className="hand text-[clamp(1.4rem,2.4vw,1.75rem)] text-toffee-deep">Dear TeddyPups,</p>
      <p className="mt-3">
        my name is
        <input name="name" defaultValue={v?.name} aria-label="Your name" aria-invalid={!!err.name} required autoComplete="name" placeholder="your name" className={`${blank} w-[clamp(10rem,13vw,15.5rem)]`} />,
        and you can reach me on
        <input name="phone" defaultValue={v?.phone} type="tel" aria-label="Phone or WhatsApp" aria-invalid={!!err.phone} required autoComplete="tel" placeholder="+971 50 123 4567" className={`${blank} w-[clamp(11rem,14vw,16rem)]`} />
        or by email at
        <input name="email" defaultValue={v?.email} type="email" aria-label="Email (optional)" aria-invalid={!!err.email} autoComplete="email" placeholder="optional" className={`${blank} w-[clamp(12rem,15vw,17rem)]`} />.
      </p>
      <p>
        I live in
        <input name="area" defaultValue={v?.area} aria-label="Your area (optional)" autoComplete="address-level2" placeholder="e.g. Dubai Marina" className={`${blank} w-[clamp(10rem,13vw,15.5rem)]`} />,
        and I&apos;m curious about
        <select name="puppy" defaultValue={v?.puppy ?? ""} aria-label="Puppy you're interested in (optional)" className={`${blank} max-w-[15rem] cursor-pointer`}>
          <option value="">any puppy (not sure yet)</option>
          {available.map((p) => {
            const label = `${p.name} (${puppyLine({ ...p, video: null, age: "" }).replace(/, $/, "")})`;
            return <option key={p.slug} value={label}>{label}</option>;
          })}
        </select>
        .
      </p>
      <label className="mt-4 block">
        <span className="sr-only">Your message (optional)</span>
        <textarea
          name="message"
          defaultValue={v?.message}
          rows={3}
          placeholder="Anything else you'd like to tell us…"
          className="w-full resize-y border-0 bg-[repeating-linear-gradient(transparent_0_2.5rem,rgb(42_23_14/0.15)_2.5rem_calc(2.5rem+1px))] font-hand leading-[2.5rem] text-toffee-deep outline-none placeholder:text-cocoa/35"
        />
      </label>
      <label className="absolute -left-[9999px]" aria-hidden>
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="hand mt-2 text-right">with love, a future puppy parent</p>

      {state.message && (
        <div className="mt-4 rounded-lg bg-blush/50 px-4 py-2 text-sm leading-normal text-toffee-ink" role="alert">
          <p className="font-semibold">{state.message}</p>
          {Object.values(err).map((e) => <p key={e}>• {e}</p>)}
        </div>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary mt-6 disabled:opacity-60">
        {pending ? "Posting…" : "Post my letter"}
      </button>
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
