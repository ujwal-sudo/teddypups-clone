"use server";

import { enquiryEmail, readEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry";

/**
 * Sends an enquiry by email through Resend's HTTP API (no SDK needed).
 * Needs RESEND_API_KEY and ENQUIRY_TO in the environment; see .env.example.
 */
export async function sendEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real people never see or fill the "website" field. Pretend success for bots.
  if (String(form.get("website") ?? "")) return { ok: true, message: "Thanks! We'll be in touch soon." };

  const enquiry = readEnquiry(form);
  const errors = validateEnquiry(enquiry);
  if (errors) return { ok: false, message: "Please check the highlighted fields.", errors, values: enquiry };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  if (!key || !to) {
    console.error("sendEnquiry: RESEND_API_KEY or ENQUIRY_TO is not set");
    return { ok: false, message: "Sorry, our form is offline right now. Please message us on WhatsApp instead.", values: enquiry };
  }

  const mail = enquiryEmail(enquiry);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || "TeddyPups <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: enquiry.email || undefined,
        ...mail,
      }),
    });
    if (!res.ok) {
      console.error("sendEnquiry: Resend responded", res.status, await res.text());
      return { ok: false, message: "Sorry, we couldn't send that. Please try again or message us on WhatsApp.", values: enquiry };
    }
  } catch (err) {
    console.error("sendEnquiry: network error", err);
    return { ok: false, message: "Sorry, we couldn't send that. Please try again or message us on WhatsApp.", values: enquiry };
  }
  return { ok: true, message: `Thanks ${enquiry.name.split(" ")[0]}! Your enquiry is on its way — we'll get back to you promptly.` };
}
