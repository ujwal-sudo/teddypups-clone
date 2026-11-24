"use client";

import { useEffect, useRef, useState, type ElementType, type ComponentPropsWithoutRef } from "react";

/** Adds `is-in` once the element scrolls into view (used for fade-ups and stamp animations). */
export function useInView<T extends Element>(threshold = 0.2, once = true, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);
  return [ref, inView] as const;
}

type Props<T extends ElementType> = { as?: T; delay?: number; plain?: boolean } & ComponentPropsWithoutRef<T>;

export default function Reveal<T extends ElementType = "div">({ as, delay = 0, plain, className = "", style, ...rest }: Props<T>) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      ref={ref}
      className={`${plain ? "" : "reveal"} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    />
  );
}
