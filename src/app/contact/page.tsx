import type { Metadata } from "next";
import LetterForm from "@/components/LetterForm";
import { PupSpot } from "@/components/Follower";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit & contact",
  description: "Questions about our puppies or the adoption process? Write to us, WhatsApp us, or visit our Downtown Dubai showroom.",
};

export default function ContactPage() {
  return (
    <section className="bg-gradient-to-b from-milk to-honey-soft pb-24 pt-28 md:pt-36">
      <div className="gutter">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_minmax(0,380px)]">
          <h1 className="display max-w-[9ch] text-[clamp(3rem,9vw,5.6rem)]">Get in touch with us</h1>
          <p className="text-cocoa-soft">
            Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <aside className="space-y-8">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp {SITE.phone}</a>
            <dl className="space-y-4">
              <div>
                <dt className="hand text-sm text-toffee-ink">call us</dt>
                <dd><a href={SITE.phoneHref} className="font-semibold underline decoration-toffee/50 underline-offset-4 hover:text-toffee-deep">{SITE.phone}</a></dd>
              </div>
              <div>
                <dt className="hand text-sm text-toffee-ink">email</dt>
                <dd><a href={`mailto:${SITE.email}`} className="font-semibold underline decoration-toffee/50 underline-offset-4 hover:text-toffee-deep">{SITE.email}</a></dd>
              </div>
            </dl>

            <div className="overflow-hidden rounded-2xl border-[3px] border-cocoa bg-milk shadow-[6px_8px_0_-1px_var(--color-cocoa)]">
              <div className="h-8 border-b-[3px] border-cocoa" style={{ background: "repeating-linear-gradient(90deg,#c2622b 0 22px,#fffdf8 22px 44px)" }} aria-hidden />
              <div className="p-6">
                <h2 className="display text-[1.8rem] leading-tight">Visit us in Downtown Dubai</h2>
                <p className="mt-3 text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
                <p className="mt-3 font-semibold">{SITE.address}</p>
                <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-5">Open in Google Maps</a>
              </div>
            </div>
            <PupSpot className="hidden w-[86px] lg:block" />
          </aside>

          <LetterForm />
        </div>
      </div>
    </section>
  );
}
