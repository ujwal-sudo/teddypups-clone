import Link from "next/link";
import { PupSpot } from "@/components/Follower";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { Sparkle } from "@/components/icons";
import { FAQS } from "@/lib/faqs";

/** Night falls: the first three FAQs under a starry sky. */
export default function NightFaq() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#5e2e15] to-[#33190c] py-20 text-milk md:py-28">
      <Stars count={18} />
      <div className="gutter relative grid gap-12 md:grid-cols-[minmax(0,360px)_1fr] md:gap-20">
        <div>
          <h2 className="display text-huge">Questions, answered</h2>
          <Link href="/faq" className="btn btn-ghost-light mt-7">Read all questions</Link>
          <div className="relative mt-10 w-[80px] md:w-[110px]">
            <span className="bubble float absolute -right-6 -top-4">?</span>
            <PupSpot />
          </div>
        </div>
        <ul className="space-y-9">
          {FAQS.slice(0, 3).map((f, i) => (
            <Reveal as="li" key={f.q} delay={i * 120} className="flex gap-4">
              <Sparkle className="twinkle mt-1.5 h-4 w-4 shrink-0 text-honey" />
              <div>
                <h3 className="display text-[clamp(1.4rem,2vw,1.95rem)] leading-snug">{f.q}</h3>
                <p className="mt-2 text-milk/80">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
