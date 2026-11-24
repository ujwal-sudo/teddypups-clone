"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FILTERS, matches, type FilterKey, type FilterState } from "@/lib/filters";
import type { Puppy } from "@/lib/site";
import PuppyCard from "./PuppyCard";

/** Filter panel + puppy grid. Filters are read from and written to the URL. */
export default function PuppyBrowser({ pups }: { pups: Puppy[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const state: FilterState = Object.fromEntries((Object.keys(FILTERS) as FilterKey[]).map((k) => [k, params.get(k) ?? ""]));
  const active = Object.values(state).some(Boolean);
  const shown = pups.filter((p) => matches(p, state));

  const set = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params);
    // clicking the selected chip again turns it off
    if (!value || state[key] === value) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
  };

  return (
    <>
      <div className="relative mt-10 rounded-2xl border-[3px] border-cocoa bg-milk p-5 shadow-[6px_8px_0_-1px_var(--color-cocoa)] md:p-7">
        <span className="absolute -top-3 left-8 h-6 w-20 -rotate-3 bg-honey/70" aria-hidden />
        <div className="space-y-4">
          {(Object.keys(FILTERS) as FilterKey[]).map((key) => (
            <fieldset key={key} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <legend className="hand float-left w-28 shrink-0 text-toffee-ink sm:contents">{FILTERS[key].label}</legend>
              <div className="flex flex-wrap gap-2">
                {FILTERS[key].options.map((o) => {
                  const pressed = (state[key] ?? "") === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => set(key, o.value)}
                      className={`rounded-full border-2 border-cocoa px-3.5 py-1 text-[0.85rem] font-semibold transition-colors ${
                        pressed ? "bg-cocoa text-milk" : "bg-milk hover:bg-honey-soft"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        {active && (
          <button type="button" onClick={() => router.replace(path, { scroll: false })} className="hand mt-5 text-toffee-deep underline underline-offset-4">
            Clear filters
          </button>
        )}
      </div>

      <p className="hand mt-10 text-lg" aria-live="polite">
        {active
          ? `${shown.length} ${shown.length === 1 ? "puppy matches" : "puppies match"}`
          : `${shown.length} puppies looking for a home`}
      </p>

      {shown.length ? (
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug} className={i % 3 === 1 ? "lg:translate-y-12" : ""}>
              <PuppyCard pup={p} i={i} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-cocoa/40 p-10 text-center">
          <p className="display text-2xl">No puppies match right now</p>
          <p className="mt-2 text-cocoa-soft">Try another filter, or ask us on WhatsApp — new puppies arrive often.</p>
          <button type="button" onClick={() => router.replace(path, { scroll: false })} className="btn btn-primary mt-6">Clear filters</button>
        </div>
      )}
    </>
  );
}
