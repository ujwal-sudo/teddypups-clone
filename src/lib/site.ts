import puppiesJson from "@/data/puppies.json";
import familiesJson from "@/data/families.json";

// Contact details exactly as on the reference site (it's a demo, so placeholders are intentional).
export const SITE = {
  name: "TeddyPups U.A.E.",
  url: "https://puppy.instabizweb.com",
  whatsapp: "https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project.",
  phone: "+971 50 000 0000",
  phoneHref: "tel:+971500000000",
  email: "info@instabizweb.com",
  address: "Downtown Dubai, United Arab Emirates",
  maps: "https://www.google.com/maps/search/?api=1&query=Downtown+Dubai",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
] as const;

export type Puppy = {
  slug: string;
  name: string;
  breed: string;
  sex: string;
  age: string;
  origin: "local" | "imported";
  status: "available" | "gone";
  images: string[];
  video: string | null;
  /** gallery poster image → its video file */
  videos: Record<string, string>;
};

export const puppies = puppiesJson as Puppy[];
export const available = puppies.filter((p) => p.status === "available");
export const goneHome = puppies.filter((p) => p.status === "gone");
export const families = familiesJson as { src: string; caption: string }[];

/** "Maltipoo, boy, 3 months, with video" — the short line shown under a puppy's name. */
export function puppyLine(p: Puppy, sep = ", ") {
  const parts = [p.name !== p.breed ? p.breed : null, p.sex.toLowerCase(), p.age, p.video ? "with video" : null];
  return parts.filter(Boolean).join(sep);
}

/** Alt text in the reference's style: "Max, male Maltipoo puppy". */
export function puppyAlt(p: Puppy) {
  const sex = p.sex === "Boy" ? "male" : p.sex === "Girl" ? "female" : "";
  const desc = `${sex ? sex + " " : ""}${p.breed} puppy`;
  return p.name !== p.breed ? `${p.name}, ${desc}` : desc.charAt(0).toUpperCase() + desc.slice(1);
}
