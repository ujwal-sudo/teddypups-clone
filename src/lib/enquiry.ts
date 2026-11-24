// Validation for the enquiry forms (puppy pages + contact page). Pure functions so they can be tested.

export type Enquiry = { name: string; phone: string; email: string; area: string; puppy: string; message: string };
export type EnquiryState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<keyof Enquiry, string>>;
  /** what the visitor typed, echoed back so the form keeps it after an error */
  values?: Enquiry;
};

const LIMITS: Record<keyof Enquiry, number> = { name: 100, phone: 30, email: 200, area: 100, puppy: 120, message: 2000 };

export function readEnquiry(form: FormData): Enquiry {
  const get = (k: keyof Enquiry) => String(form.get(k) ?? "").trim().slice(0, LIMITS[k]);
  return { name: get("name"), phone: get("phone"), email: get("email"), area: get("area"), puppy: get("puppy"), message: get("message") };
}

export function validateEnquiry(e: Enquiry): EnquiryState["errors"] {
  const errors: NonNullable<EnquiryState["errors"]> = {};
  if (e.name.length < 2) errors.name = "Please tell us your name.";
  // digits, spaces, +, -, brackets; at least 7 digits
  if (!/^[+\d][\d\s()-]*$/.test(e.phone) || e.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please add a phone or WhatsApp number with country code.";
  }
  if (e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) errors.email = "That email doesn't look right.";
  return Object.keys(errors).length ? errors : undefined;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function enquiryEmail(e: Enquiry) {
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Phone / WhatsApp", e.phone],
    ["Email", e.email || "—"],
    ["Area", e.area || "—"],
    ["Puppy", e.puppy || "any puppy (not sure yet)"],
    ["Message", e.message || "—"],
  ];
  return {
    subject: `New puppy enquiry from ${e.name}${e.puppy ? ` — ${e.puppy}` : ""}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2>New puppy enquiry</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`,
  };
}
