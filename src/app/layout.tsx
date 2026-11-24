import type { Metadata } from "next";
import { Figtree, Fraunces, Shantell_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Follower from "@/components/Follower";
import CursorPrints from "@/components/CursorPrints";
import { SITE } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const shantell = Shantell_Sans({ variable: "--font-shantell", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Premium teacup puppies in Dubai`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide. Vet-checked teacup puppies with 24/7 support.",
  openGraph: { siteName: SITE.name, type: "website", locale: "en_AE" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${shantell.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <Follower />
        <CursorPrints />
      </body>
    </html>
  );
}
