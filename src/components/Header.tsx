"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { PawIcon } from "./icons";

export default function Header() {
  const path = usePathname();
  // The menu remembers which page it was opened on, so navigating closes it automatically.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(open) : v) ? path : null);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  // Close with Escape and lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header id="site-header" className="site-header fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 btn btn-primary btn-sm">
        Skip to content
      </a>
      <div className="bg-milk">
        <div className="gutter flex h-[4.1rem] items-center justify-between gap-6 md:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
            <Image src="/brand/logo.png" alt="" width={48} height={48} priority className="h-11 w-11 rounded-full md:h-12 md:w-12" />
            <span className="display text-xl md:hidden">TeddyPups</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-4 whitespace-nowrap md:flex lg:gap-8">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link text-[0.85rem] lg:text-[0.94rem]" aria-current={isActive(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>

          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm hidden md:inline-flex">
            WhatsApp us
          </a>

          <button
            type="button"
            className="btn btn-ghost btn-sm relative z-[60] md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <PawIcon className="h-4 w-4" />
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div className="scallop-down" aria-hidden />

      {open && (
        <div id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="menu-panel fixed inset-0 z-[55] flex flex-col bg-honey-soft px-6 pb-10 pt-24 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                style={{ animationDelay: `${80 + i * 55}ms` }}
                aria-current={isActive(n.href) ? "page" : undefined}
                className="display py-1.5 text-[2.6rem] aria-[current=page]:text-toffee-deep"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex gap-3">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp flex-1">WhatsApp us</a>
            <a href={SITE.phoneHref} className="btn btn-ghost">Call</a>
          </div>
        </div>
      )}
    </header>
  );
}
