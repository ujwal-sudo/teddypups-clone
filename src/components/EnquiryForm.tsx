"use client";

import { useActionState } from "react";
import { sendEnquiry } from "@/app/actions";
import type { EnquiryState } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

const initial: EnquiryState = { ok: false, message: "" };

/** Enquiry form shown on every puppy page. */
export default function EnquiryForm({ puppy }: { puppy: string }) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-whatsapp bg-milk p-8 text-center" role="status">
        <p className="display text-2xl">Letter received! 🐾</p>
        <p className="mt-2 text-cocoa-soft">{state.message}</p>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6">Or chat on WhatsApp now</a>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values;
  const field = "mt-1.5 w-full rounded-xl border-2 border-cocoa bg-milk px-3.5 py-2.5 outline-none transition focus:border-toffee focus:ring-4 focus:ring-honey/40 aria-[invalid=true]:border-toffee-deep";
  return (
    <form key={JSON.stringify(v ?? null)} action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
      <input type="hidden" name="puppy" value={puppy} />
      <label className="text-sm font-semibold">
        Your name <span className="text-toffee-deep">*</span>
        <input name="name" defaultValue={v?.name} required autoComplete="name" aria-invalid={!!err.name} className={field} />
        {err.name && <span className="mt-1 block text-xs text-toffee-deep">{err.name}</span>}
      </label>
      <label className="text-sm font-semibold">
        Phone or WhatsApp <span className="text-toffee-deep">*</span>
        <input name="phone" defaultValue={v?.phone} type="tel" required autoComplete="tel" aria-invalid={!!err.phone} className={field} />
        <span className={`mt-1 block text-xs ${err.phone ? "text-toffee-deep" : "font-normal text-cocoa-soft"}`}>
          {err.phone ?? "With country code, e.g. +971 50 123 4567"}
        </span>
      </label>
      <label className="text-sm font-semibold">
        Email <span className="font-normal text-cocoa-soft">(optional)</span>
        <input name="email" defaultValue={v?.email} type="email" autoComplete="email" aria-invalid={!!err.email} className={field} />
        {err.email && <span className="mt-1 block text-xs text-toffee-deep">{err.email}</span>}
      </label>
      <label className="text-sm font-semibold">
        Your area <span className="font-normal text-cocoa-soft">(optional)</span>
        <input name="area" defaultValue={v?.area} autoComplete="address-level2" className={field} />
        <span className="mt-1 block text-xs font-normal text-cocoa-soft">e.g. Dubai Marina</span>
      </label>
      <label className="text-sm font-semibold sm:col-span-2">
        Message <span className="font-normal text-cocoa-soft">(optional)</span>
        <textarea name="message" rows={4} defaultValue={v?.message ?? `Hi! I'd love to know more about ${puppy}.`} className={field} />
      </label>
      {/* honeypot — hidden from people, bots fill it in */}
      <label className="absolute -left-[9999px]" aria-hidden>
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        {state.message && <p className="text-sm text-toffee-deep" role="alert">{state.message}</p>}
      </div>
    </form>
  );
}
