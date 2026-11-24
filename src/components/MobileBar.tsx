import { SITE } from "@/lib/site";

/** Sticky WhatsApp / Call bar shown on phones only. */
export default function MobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t-2 border-cocoa bg-milk px-3 pt-2.5 md:hidden"
      style={{ paddingBottom: "calc(0.6rem + env(safe-area-inset-bottom))" }}
    >
      <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp flex-1 !shadow-none">
        WhatsApp us
      </a>
      <a href={SITE.phoneHref} className="btn btn-ghost bg-milk px-7">
        Call
      </a>
    </div>
  );
}
