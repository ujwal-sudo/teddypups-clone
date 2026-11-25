"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PupSpot } from "@/components/Follower";
import { SendIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

const STEPS = [
  { title: "Choose your breed", text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle." },
  { title: "Get photos & details", text: "Our team will share real photos, health details, and all necessary information directly on WhatsApp." },
  { title: "Secure & safe delivery", text: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free." },
];

const M = "/media/";
const CHAT_PHOTOS = [
  M + "Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
  M + "g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
];
const CHAT_VIDEO_POSTER = M + "skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg";

/** "Your puppy journey": three steps on the left drive a WhatsApp conversation on the phone. */
export default function Journey() {
  const [step, setStep] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStep(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" }, // the step crossing the middle of the screen is "active"
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#f8d295] to-honey pb-24 pt-20 md:pt-28">
      <div className="gutter grid gap-12 md:grid-cols-[1fr_minmax(300px,30rem)] md:gap-16 lg:gap-24">
        <div>
          <h2 className="display max-w-[9ch] text-huge">Your puppy journey</h2>
          <p className="mt-4 max-w-md text-lede text-cocoa-soft">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>
          <ol className="mt-10 md:mt-16">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                data-i={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`flex gap-5 pb-12 transition-opacity duration-500 md:min-h-[44vh] ${i <= step ? "opacity-100" : "opacity-40"}`}
              >
                <span className={`display grid h-11 w-11 shrink-0 place-items-center rounded-full border-[2.5px] border-cocoa text-lg transition-colors ${i === step ? "bg-toffee-deep text-milk" : "bg-milk/50"}`}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.6rem,2.3vw,2.3rem)]">{s.title}</h3>
                  <p className="mt-2 max-w-md text-cocoa-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative flex items-end gap-4">
            <Link href="/how-it-works" className="btn btn-ghost">How it works</Link>
          </div>
        </div>

        <div className="relative md:order-none">
          <div className="sticky top-28">
            <Phone step={step} />
            <div className="absolute -bottom-4 -left-4 w-[70px] md:-left-20 md:w-[clamp(90px,8vw,150px)]">
              {step >= 1 && <span className="bubble msg absolute -top-7 left-6">ooh, photos!</span>}
              <PupSpot />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Phone({ step }: { step: number }) {
  return (
    <div className="mx-auto w-full max-w-[clamp(300px,20vw,385px)] overflow-hidden rounded-[2.2rem] border-[3px] border-cocoa bg-milk p-2.5 shadow-[10px_12px_0_-2px_var(--color-cocoa)]">
      <div className="flex items-center gap-3 rounded-t-[1.6rem] bg-milk px-3 py-2.5">
        <Image src="/brand/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
        <div className="leading-tight">
          <p className="text-[0.85rem] font-bold">{SITE.name}</p>
          <p className="text-[0.7rem] text-whatsapp">online</p>
        </div>
      </div>
      <div className="chat-bg flex h-[clamp(400px,50vh,521px)] flex-col justify-end gap-2 overflow-hidden rounded-b-md p-3 text-[clamp(0.8rem,0.85vw,0.95rem)] leading-snug">
        <div key="m1" className="msg ml-auto max-w-[80%] rounded-xl rounded-br-sm border-2 border-cocoa bg-honey px-3 py-2">
          Hi TeddyPups! I&apos;d love to know more about your puppies.
        </div>
        {step >= 1 && (
          <div key="m2" className="msg max-w-[82%] space-y-1.5 rounded-xl rounded-bl-sm border-2 border-cocoa bg-milk p-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              {CHAT_PHOTOS.map((src) => (
                <span key={src} className="relative block aspect-square overflow-hidden rounded-md">
                  <Image src={src} alt="The apricot teddy bear puppy from our showroom" fill sizes="120px" className="object-cover" />
                </span>
              ))}
            </div>
            <span className="relative block aspect-[16/10] overflow-hidden rounded-md">
              <Image src={CHAT_VIDEO_POSTER} alt="" fill sizes="240px" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-milk/90 text-cocoa">▶</span>
              </span>
            </span>
            <p className="px-1 pb-0.5">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
          </div>
        )}
        {step >= 2 && (
          <div key="m3" className="msg max-w-[80%] rounded-xl rounded-bl-sm border-2 border-cocoa bg-milk px-3 py-2">
            Your puppy is on the way home 🧸🚗 safe, comfy and stress-free.
          </div>
        )}
      </div>
      <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 rounded-full border-2 border-cocoa bg-milk py-1 pl-4 pr-1 text-[0.8rem] text-cocoa-soft">
        Say hello on WhatsApp
        <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-whatsapp text-white"><SendIcon className="h-4 w-4" /></span>
      </a>
    </div>
  );
}
