import type { Puppy } from "./site";

// Filter groups for /puppies. State lives in the URL (?origin=&breed=&sex=) so links like
// /puppies?breed=pomeranian work and the back button behaves.
export const FILTERS = {
  origin: {
    label: "where",
    options: [
      { value: "", label: "Everywhere" },
      { value: "imported", label: "Imported" },
      { value: "korean", label: "Korean Teacup" },
    ],
  },
  breed: {
    label: "breed",
    options: [
      { value: "maltipoo", label: "Maltipoo" },
      { value: "pomeranian", label: "Pomeranian" },
      { value: "poodle", label: "Poodle" },
      { value: "cavapoo", label: "Cavapoo" },
      { value: "shih-tzu", label: "Shih Tzu" },
    ],
  },
  sex: {
    label: "boy or girl",
    options: [
      { value: "boy", label: "Boys" },
      { value: "girl", label: "Girls" },
    ],
  },
} as const;

export type FilterKey = keyof typeof FILTERS;
export type FilterState = Partial<Record<FilterKey, string>>;

export function matches(p: Puppy, f: FilterState) {
  if (f.origin === "korean" && !p.breed.includes("Korean Teacup")) return false;
  if ((f.origin === "imported" || f.origin === "local") && p.origin !== f.origin) return false;
  // "Maltipoo & Cavapoo" counts for both breeds; "Boy & girl" counts for both sexes.
  if (f.breed && !p.breed.toLowerCase().includes(f.breed.replace("-", " "))) return false;
  if (f.sex && !p.sex.toLowerCase().includes(f.sex)) return false;
  return true;
}
