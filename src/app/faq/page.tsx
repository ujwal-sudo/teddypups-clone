import type { Metadata } from "next";
import FaqBoard from "@/components/FaqBoard";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Questions & answers",
  description: "Vaccinations, meeting puppies in Dubai, imports from Korea, delivery and after-care — answers to common questions about TeddyPups.",
};

export default function FaqPage() {
  // FAQPage structured data so search engines can show the answers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="bg-gradient-to-b from-toffee-ink to-[#5e2e15] pb-24 pt-28 text-milk md:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gutter">
        <h1 className="display text-[clamp(2.8rem,8vw,5.2rem)]">Questions &amp; answers</h1>
        <p className="mt-4 max-w-xl text-milk/80">
          Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
        </p>
        <div className="mt-12"><FaqBoard /></div>
      </div>
    </section>
  );
}
