import type { Metadata } from "next";
import LetterForm from "@/components/LetterForm";
import Image from "next/image";
import Pup from "@/components/Pup";
import { PawIcon } from "@/components/icons";
import { city } from "@/components/how/art";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit & contact",
  description: "Questions about our puppies or the adoption process? Write to us, WhatsApp us, or visit our Downtown Dubai showroom.",
};

const PHOTO = "/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg";

export default function ContactPage() {
  return (
    <section className="bg-gradient-to-b from-[#fff9ee] to-[#f9dca4]" aria-labelledby="contact-title">
      <div className="gutter pb-24 pt-28 md:pt-36">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h1 id="contact-title" className="display max-w-[12ch] text-giant lg:col-span-7">Get in touch with us</h1>
          <p className="text-lede text-cocoa-soft lg:col-span-5 lg:pb-3">
            Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <LetterForm />
            <Pup className="-mt-3 ml-auto mr-6 w-24 -scale-x-100 md:w-28" title="Teddy, waiting for your letter" />
          </div>

          <div className="lg:col-span-5 lg:row-start-1">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full sm:w-auto">WhatsApp {SITE.phone}</a>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="hand text-cocoa-soft">call us</dt>
                <dd className="mt-1 text-lg font-semibold"><a className="link-ink" href={SITE.phoneHref}>{SITE.phone}</a></dd>
              </div>
              <div>
                <dt className="hand text-cocoa-soft">email</dt>
                <dd className="mt-1 break-all text-lg font-semibold"><a className="link-ink" href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
              </div>
            </dl>

            <section aria-labelledby="visit-title" className="tp-shopfront mt-12">
              <svg viewBox="0 0 300 120" className="absolute -bottom-1 right-0 w-3/4 text-toffee/30" aria-hidden dangerouslySetInnerHTML={{ __html: city }} />
              <div className="tp-visit relative p-7 pt-6">
                <div>
                  <h2 id="visit-title" className="display text-[2rem] leading-tight">Visit us in Downtown Dubai</h2>
                  <p className="mt-3 max-w-[38ch] text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
                  <p className="mt-4 flex items-center gap-2 font-semibold"><PawIcon className="size-5 shrink-0 text-toffee-deep" />{SITE.address}</p>
                  <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6 !bg-milk">Open in Google Maps</a>
                </div>
                <figure className="tp-visit__photo">
                  <Image src={PHOTO} alt="The apricot teddy bear puppy from our showroom, held up to say hello" fill sizes="(min-width: 640px) 11rem, 90vw" className="object-cover object-[45%_44%]" />
                </figure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
