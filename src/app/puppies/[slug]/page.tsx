import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EnquiryForm from "@/components/EnquiryForm";
import Gallery from "@/components/Gallery";
import Pup from "@/components/Pup";
import { PupSpot } from "@/components/Follower";
import { Check, PawIcon } from "@/components/icons";
import { puppies, puppyAlt, SITE, type Puppy } from "@/lib/site";

const WAY_HOME = {
  imported: {
    title: "Coming home from abroad",
    steps: [
      ["Reserve your puppy", "Tell us which puppy has captured your heart."],
      ["Personalized consultation", "We finalize details with you and share updates on your puppy's journey."],
      ["Import and arrival", "We manage health checks, travel arrangements, and documentation."],
      ["Welcome home", "We help your new puppy settle in and ensure a smooth transition into your home."],
    ],
  },
  local: {
    title: "Meet them in Dubai",
    steps: [
      ["Visit our showroom", "Come to Downtown Dubai and meet your puppy in person."],
      ["Spend time together", "Bond with your puppy before making your decision."],
      ["Health check & papers", "Every puppy is vet-checked with a verified health certificate."],
      ["Take them home", "Pick up the same day, or we deliver to your door within Dubai."],
    ],
  },
} as const;

const PROMISE = ["Vaccinated", "Dewormed", "Verified health certificate from licensed vets", "Thoroughly checked before joining your family"];

const find = (slug: string) => puppies.find((p) => p.slug === slug);
const titleOf = (p: Puppy) => (p.name !== p.breed ? `${p.name}, ${p.breed} puppy` : `${p.breed} puppy (${p.sex.toLowerCase()})`);

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/puppies/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return {
    title: titleOf(p),
    description: `${puppyAlt(p)}, ${p.age}. Real photos of the actual puppy — ask TeddyPups about ${p.name} on WhatsApp.`,
    openGraph: { images: [p.images[0]] },
  };
}

// Reading `params` must sit inside <Suspense> so client navigations stay instant (Next 16 cache components).
// Every slug is prerendered by generateStaticParams, so the fallback is only seen on an unknown URL.
export default function PuppyPage({ params }: PageProps<"/puppies/[slug]">) {
  return (
    <Suspense fallback={<article className="paper-dots min-h-screen" />}>
      <PuppyContent params={params} />
    </Suspense>
  );
}

async function PuppyContent({ params }: { params: PageProps<"/puppies/[slug]">["params"] }) {
  const pup = find((await params).slug);
  if (!pup) notFound();

  // previous / next within the same list (available or gone home), wrapping around
  const list = puppies.filter((p) => p.status === pup.status);
  const at = list.indexOf(pup);
  const prev = list[(at - 1 + list.length) % list.length];
  const next = list[(at + 1) % list.length];
  const gone = pup.status === "gone";
  const way = WAY_HOME[pup.origin];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Puppies", item: `${SITE.url}/puppies` },
      { "@type": "ListItem", position: 2, name: pup.name, item: `${SITE.url}/puppies/${pup.slug}` },
    ],
  };

  return (
    <article className="paper-dots relative pb-24 pt-24 md:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {/* bookmark ribbon down the left edge */}
      <span className="absolute bottom-24 left-0 top-24 hidden w-2.5 rounded-r bg-toffee md:block" aria-hidden />

      <div className="gutter">
        <nav aria-label="Breadcrumb" className="text-sm text-cocoa-soft">
          <Link href={gone ? "/gone-home" : "/puppies"} className="text-toffee-deep hover:underline">{gone ? "Gone home" : "Available puppies"}</Link>
          <span className="mx-1.5">/</span>
          <span aria-current="page">{pup.name}</span>
        </nav>

        <Chapter n={1} label="hello, it's me" />
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <Gallery images={pup.images} videos={pup.videos} alt={puppyAlt(pup)} />

          <div className="space-y-10">
            <div className="relative rounded-2xl border-[3px] border-cocoa bg-milk p-6 shadow-[6px_8px_0_-1px_var(--color-cocoa)] md:p-8">
              <Pup pose="peek" className="absolute -top-12 right-6 w-20" />
              <span className={`tag inline-block ${gone ? "!bg-blush" : ""}`}>{gone ? "Gone home ♥" : "Available"}</span>
              <h1 className="display mt-4 text-[clamp(2.4rem,5vw,3.4rem)]">{pup.name}</h1>
              {pup.name !== pup.breed && <p className="hand mt-1 text-toffee-ink">{pup.breed}</p>}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  ["Breed", pup.breed],
                  ["Boy or girl", pup.sex],
                  ["Age", pup.age],
                  ["Where", pup.origin === "local" ? "In Dubai" : "Imported for you"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="hand text-sm text-cocoa-soft">{k}</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !whitespace-normal text-center">
                  {gone ? "Find me a puppy like " : "Ask about "}{pup.name} on WhatsApp
                </a>
                <a href={`#enquire-${pup.slug}`} className="btn btn-ghost">Send an enquiry</a>
              </div>
            </div>

            <div className="paper relative rotate-[0.6deg] rounded-2xl border-2 border-cocoa p-6 md:p-7">
              <Chapter n={2} label={`what comes with ${pup.name}`} />
              <h2 className="display mt-3 text-[1.7rem]">Every Teddy Pup comes</h2>
              <ul className="mt-4 space-y-2.5">
                {PROMISE.map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-whatsapp" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <Chapter n={3} label="the way home" />
          <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3rem)]">{way.title}</h2>
          <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* dotted paw path joining the steps (desktop) */}
            <span className="absolute left-[6%] right-[6%] top-6 hidden border-t-[3px] border-dotted border-toffee/50 lg:block" aria-hidden />
            {way.steps.map(([t, d], i) => (
              <li key={t} className="relative">
                <span className="display relative grid h-12 w-12 place-items-center rounded-full border-[3px] border-cocoa bg-milk text-xl">{i + 1}</span>
                <h3 className="display mt-4 text-[1.25rem]">{t}</h3>
                <p className="mt-1.5 text-cocoa-soft">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id={`enquire-${pup.slug}`} className="mt-20 scroll-mt-28">
          <div className="relative grid gap-8 rounded-2xl border-[3px] border-cocoa bg-milk p-6 shadow-[6px_8px_0_-1px_var(--color-cocoa)] md:grid-cols-[minmax(0,280px)_1fr] md:p-10">
            <span className="absolute -top-4 right-6 grid h-14 w-14 rotate-6 place-items-center rounded-md border-2 border-dashed border-cocoa bg-honey" aria-hidden>
              <PawIcon className="h-6 w-6 text-cocoa" />
            </span>
            <div>
              <Chapter n={4} label="dear TeddyPups…" />
              <h2 className="display mt-3 text-[2.1rem]">Ask about {pup.name}</h2>
              <p className="mt-3 text-cocoa-soft">Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.</p>
              <PupSpot className="mt-8 hidden w-[80px] md:block" />
            </div>
            <EnquiryForm puppy={pup.name !== pup.breed ? `${pup.name} (${pup.breed})` : pup.breed} />
          </div>
        </section>

        <nav aria-label="More puppies" className="mt-14 grid gap-5 sm:grid-cols-2">
          <PupLink pup={prev} dir="Previous pup" />
          <PupLink pup={next} dir="Next pup" right />
        </nav>
      </div>
    </article>
  );
}

function Chapter({ n, label }: { n: number; label: string }) {
  return (
    <p className="mt-5 flex items-center gap-2.5 text-toffee-ink">
      <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-cocoa text-sm font-bold text-cocoa">{n}</span>
      <span className="hand">{label}</span>
    </p>
  );
}

function PupLink({ pup, dir, right }: { pup: Puppy; dir: string; right?: boolean }) {
  return (
    <Link
      href={`/puppies/${pup.slug}`}
      className={`group flex items-center gap-4 rounded-2xl border-[3px] border-cocoa bg-milk p-4 transition-transform hover:-translate-y-1 ${right ? "flex-row-reverse text-right" : ""}`}
    >
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-cocoa">
        <Image src={pup.images[0]} alt="" fill sizes="64px" className="object-cover" />
      </span>
      <span>
        <span className="hand block text-sm text-toffee-ink">{dir}</span>
        <span className="display block text-xl">{pup.name}</span>
      </span>
    </Link>
  );
}
