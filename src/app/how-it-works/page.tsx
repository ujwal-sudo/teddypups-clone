import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TwoWays from "@/components/TwoWays";
import Pup from "@/components/Pup";
import ScrollFlight from "@/components/ScrollFlight";
import { city, stamps, why } from "@/components/how/art";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "Visit our Downtown Dubai showroom or order a premium breed from overseas. Delivery, collection and our premium puppy promise.",
};

const CHAPTERS = [
  ["two-ways", "Two ways home"],
  ["promise", "Our premium puppy promise"],
  ["delivery", "Delivery & collection"],
  ["why", "Why choose us"],
];

const PROMISE = [
  { label: "Hand-selected breeders", text: "We work only with breeders who uphold the highest ethical and health standards.", shape: "round", ink: "#a24a1a", tilt: "-8deg" },
  { label: "Full transparency", text: "Photos, videos, and health certificates are shared before your puppy travels.", shape: "ticket", ink: "#1f6b45", tilt: "5deg" },
  { label: "Safe, stress-free delivery", text: "We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.", shape: "oval", ink: "#5a3a28", tilt: "-4deg" },
];

const DELIVERY = [
  ["Take your puppy home the same day", "Local puppies are available immediately — visit, fall in love, and go home together."],
  ["Delivery within Dubai", "Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably."],
  ["Safe international cargo", "We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free."],
  ["Worldwide delivery", "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance."],
];

const WHY = [
  ["International cargo", "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance."],
  ["Support 24/7", "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away."],
  ["Health guarantee", "All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family."],
];

export default function HowItWorksPage() {
  return (
    <div className="bg-gradient-to-b from-[#fffbf3] to-[#f6cc85]">
      <div className="gutter pb-24 pt-28 md:pt-36">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="display text-giant md:col-span-7">How it works</h1>
          <p className="text-lede text-cocoa-soft md:col-span-5 md:pb-4">
            Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
          </p>
        </header>
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
          {CHAPTERS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className="inline-flex h-11 items-center gap-1.5 rounded-full border-2 border-cocoa bg-milk px-4 text-sm font-semibold transition-colors hover:bg-honey-soft">
              <span className="display text-toffee">{i + 1}</span>{label}
            </a>
          ))}
        </nav>

        <div id="two-ways" className="scroll-mt-28">
          <TwoWays />
        </div>

        <section id="promise" aria-labelledby="promise-title" className="tp-paper mt-24 -rotate-[0.6deg] scroll-mt-28">
          <p aria-hidden className="hand text-lg text-toffee-ink">puppy passport</p>
          <h2 id="promise-title" className="display mt-1 max-w-[16ch] text-huge">Our premium puppy promise</h2>
          <ul data-reveal className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {PROMISE.map((p, i) => (
              <li key={p.label} className="tp-entry" style={{ "--ink-stamp": p.ink, "--tilt": p.tilt, "--i": i } as React.CSSProperties}>
                <span className={`tp-stamp tp-stamp--${p.shape}`}>
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden dangerouslySetInnerHTML={{ __html: stamps[i] }} />
                  <span className="display tp-stamp__title">{p.label}</span>
                </span>
                <p className="tp-entry__text">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="delivery" aria-labelledby="delivery-title" className="mt-24 grid scroll-mt-28 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="delivery-title" className="display text-huge">Delivery &amp; collection</h2>
            <p className="mt-5 text-lede text-cocoa-soft">
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {DELIVERY.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90}>
                  <h3 className="display-text text-[1.3rem] font-bold leading-snug">{t}</h3>
                  <p className="mt-1.5 text-cocoa-soft">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative h-[clamp(14rem,30vw,22rem)] lg:col-span-6">
            <svg viewBox="0 0 300 120" className="absolute inset-x-0 bottom-0 w-full text-cocoa/25" aria-hidden dangerouslySetInnerHTML={{ __html: city }} />
            <ScrollFlight />
          </div>
        </section>

        <section id="why" aria-labelledby="why-title" className="mt-24 grid scroll-mt-28 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="why-title" className="display text-huge">Why choose us</h2>
            <p className="mt-6 text-lede text-cocoa-soft">
              We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
            </p>
          </div>
          <ul className="space-y-8 lg:col-span-6 lg:col-start-7">
            {WHY.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="flex gap-5">
                <svg viewBox="0 0 64 64" className="size-14 shrink-0 text-toffee-deep" aria-hidden dangerouslySetInnerHTML={{ __html: why[i] }} />
                <div>
                  <h3 className="display text-[1.7rem]">{t}</h3>
                  <p className="mt-2 text-cocoa-soft">{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section aria-labelledby="care-title" className="tp-board mt-24 grid items-center gap-8 md:grid-cols-[1fr_auto] md:!p-12">
          <div>
            <h2 id="care-title" className="display text-big">Unique and high quality puppies</h2>
            <p className="mt-5 max-w-[62ch] text-lede text-cocoa-soft">
              When you choose TeddyPups, you can trust that you&apos;re getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Ask us on WhatsApp</a>
              <Link href="/puppies" className="btn btn-ghost">See available puppies</Link>
            </div>
          </div>
          <div className="relative mx-auto w-48 md:w-56">
            <span aria-hidden className="hand absolute -top-6 right-2 rounded-full border-2 border-cocoa bg-milk px-2.5 py-0.5 text-sm">hm?</span>
            <Pup className="w-full -scale-x-100" />
          </div>
        </section>
      </div>
    </div>
  );
}
