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
    <section className="tp-faqroom" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gutter relative pb-24 pt-28 md:pt-36">
        <header className="max-w-4xl">
          <h1 id="faq-title" className="display text-giant">Questions &amp; answers</h1>
          <p className="mt-6 max-w-[52ch] text-lede text-milk/80">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
        </header>
        <div className="mt-12 md:mt-16"><FaqBoard /></div>
      </div>
    </section>
  );
}
