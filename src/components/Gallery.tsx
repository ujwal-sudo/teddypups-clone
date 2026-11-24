"use client";

import Image from "next/image";
import { useState } from "react";

/** Photo/video gallery for a puppy: big frame with ‹ › arrows, counter, and a thumbnail strip. */
export default function Gallery({ images, videos, alt }: { images: string[]; videos: Record<string, string>; alt: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const go = (n: number) => {
    setI((n + images.length) % images.length);
    setPlaying(false);
  };
  const src = images[i];
  const video = videos[src];

  return (
    <div>
      <div className="relative">
        {/* stacked "pages" behind the main photo */}
        <span className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border-[3px] border-cocoa bg-milk" aria-hidden />
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-[3px] border-cocoa bg-cocoa sm:aspect-[5/5]">
          {video && playing ? (
            <video src={video} poster={src} controls autoPlay playsInline className="h-full w-full object-contain" />
          ) : (
            <>
              <Image key={src} src={src} alt={`${alt} — photo ${i + 1}`} fill priority={i === 0} sizes="(min-width:1024px) 560px, 92vw" quality={85} className="object-cover" />
              {video && (
                <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center" aria-label="Play video">
                  <span className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-cocoa bg-milk text-2xl shadow-[0_5px_0_-1px_var(--color-cocoa)]">▶</span>
                </button>
              )}
            </>
          )}
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl">‹</button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl">›</button>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-cocoa/80 px-3 py-0.5 text-xs font-semibold text-milk" aria-live="polite">
                {i + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      </div>
      {images.length > 1 && (
        <ul className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {images.map((s, n) => (
            <li key={s} className="shrink-0">
              <button
                type="button"
                onClick={() => go(n)}
                aria-label={`Show ${videos[s] ? "video" : "photo"} ${n + 1}`}
                aria-current={n === i}
                className={`relative block h-[72px] w-[72px] overflow-hidden rounded-xl border-[3px] transition ${n === i ? "border-cocoa" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <Image src={s} alt="" fill sizes="80px" className="object-cover" />
                {videos[s] && <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-milk">▶</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
