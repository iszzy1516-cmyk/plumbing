"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/load-gsap/load-gsap";

const START_CLIP = "inset(0% 4% 0% 4% round 32px)";

// A rounded picture that grows to the full width of the screen as you scroll.
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const start = async () => {
      const { gsap } = await loadGsap();
      if (cancelled) return;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: frame.current, start: "top 75%", end: "top 12%", scrub: 0.3 },
      });
      timeline
        .fromTo(frame.current, { clipPath: START_CLIP }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
        .fromTo(picture.current, { scale: 1.08 }, { scale: 1, ease: "none" }, 0);
      revert = () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    };

    window.addEventListener("scroll", start, { once: true, passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", start);
      revert?.();
    };
  }, []);

  return (
    <div ref={frame} style={{ clipPath: START_CLIP }} className="relative h-[62svh] overflow-hidden md:h-[86svh]">
      <div ref={picture} className="absolute inset-0">
        <Image src={src} alt={alt} fill preload fetchPriority="high" sizes="100vw" className="object-cover object-[72%_40%]" />
      </div>
    </div>
  );
}
