"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/load-gsap/load-gsap";

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "blockquote";
  className?: string;
  children: ReactNode;
};

// Lines rise behind a mask with GSAP SplitText, shortly before the heading reaches the screen.
export function RevealText({ as: Tag = "h2", className, children }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const { gsap, SplitText } = await loadGsap();
        if (cancelled) return;
        await document.fonts.ready;
        if (cancelled) return;
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        const tween = gsap.from(split.lines, {
          yPercent: 105,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          onComplete: () => split.revert(),
        });
        revert = () => {
          tween.kill();
          split.revert();
        };
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
