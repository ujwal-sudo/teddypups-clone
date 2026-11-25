import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TwoWays from "@/components/TwoWays";
import { PupSpot } from "@/components/Follower";
import { FlightPath } from "@/components/home/Paths";
import { Stamp } from "@/components/home/Passport";
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
  { label: "Hand-selected breeders", text: "We work only with breeders who uphold the highest ethical and health standards.", shape: "rounded-full", color: "#c2622b", r: "-6deg", icon: "♥︎" },
  { label: "Full transparency", text: "Photos, videos, and health certificates are shared before your puppy travels.", shape: "rounded-md", color: "#1f7a4d", r: "4deg", icon: "◉" },
  { label: "Safe, stress-free delivery", text: "We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.", shape: "rounded-[45%]", color: "#5a3a28", r: "-3deg", icon: "✈︎" },
];

const DELIVERY = [
  ["Take your puppy home the same day", "Local puppies are available immediately — visit, fall in love, and go home together."],
  ["Delivery within Dubai", "Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably."],
  ["Safe international cargo", "We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free."],
  ["Worldwide delivery", "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance."],
];

const WHY = [
  ["✈︎", "International cargo", "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance."],
  ["☎︎", "Support 24/7", "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away."],
  ["♥︎", "Health guarantee", "All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family."],
  ["★", "Unique and high quality puppies", "When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend."],
];

export default function HowItWorksPage() {
  return (
    <div className="bg-gradient-to-b from-milk via-honey-soft to-[#f8d295]">
      <section className="gutter pb-10 pt-28 md:pt-36">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_minmax(0,360px)]">
          <h1 className="display text-giant">How it works</h1>
          <p className="text-lede text-cocoa-soft">
            Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
          </p>
        </div>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2.5">
          {CHAPTERS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className="rounded-full border-2 border-cocoa bg-milk px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-honey-soft">
              <span className="hand mr-1.5 text-toffee">{i + 1}</span>{label}
            </a>
          ))}
        </nav>
      </section>

      <section id="two-ways" className="gutter scroll-mt-28 py-12">
        <p className="hand text-toffee-ink">choose your way</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-big">Two ways home</h2>
        </div>
        <div className="mt-6"><TwoWays /></div>
      </section>

      <section id="promise" className="gutter scroll-mt-28 py-12">
        <Reveal plain className="paper rounded-[1.4rem] border-[3px] border-cocoa p-7 shadow-[0_12px_0_-4px_var(--color-cocoa)] md:p-10">
          <p className="hand text-sm text-toffee-ink">puppy passport</p>
          <h2 className="display mt-1 max-w-[12ch] text-big">Our premium puppy promise</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {PROMISE.map((s, i) => <Stamp key={s.label} {...s} delay={i * 180} />)}
          </div>
        </Reveal>
      </section>

      <section id="delivery" className="gutter scroll-mt-28 py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <h2 className="display max-w-[10ch] text-big">Delivery &amp; collection</h2>
            <p className="mt-4 max-w-xl text-lede text-cocoa-soft">
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
            </p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {DELIVERY.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90}>
                  <h3 className="display text-[1.3rem] leading-snug">{t}</h3>
                  <p className="mt-2 text-[0.95rem] text-cocoa-soft">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative flex justify-center">
            <FlightPath />
          </div>
        </div>
      </section>

      <section id="why" className="gutter scroll-mt-28 py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
          <div>
            <h2 className="display text-big">Why choose us</h2>
            <p className="mt-4 text-lede text-cocoa-soft">
              We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
            </p>
            <PupSpot className="mt-10 w-[86px]" />
          </div>
          <ul className="space-y-9">
            {WHY.map(([icon, t, d], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl text-toffee-deep" aria-hidden>{icon}</span>
                <div>
                  <h3 className="display text-[1.35rem]">{t}</h3>
                  <p className="mt-1.5 text-cocoa-soft">{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-col justify-center gap-4 sm:flex-row">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Ask us on WhatsApp</a>
          <Link href="/puppies" className="btn btn-primary">See available puppies</Link>
        </div>
      </section>
    </div>
  );
}
