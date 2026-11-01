"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site/site";

const lastLine = `in ${site.area}?`;

// The type fills the page width on two lines, so it shrinks to keep a longer area name from taking a third.
const lineWidth = Math.max(7.6, 2 + lastLine.length * 0.5);
const fontSize = `min(${(88 / lineWidth).toFixed(2)}vw, 10.5rem)`;

// The headline, with running water set into the sentence. Plays only for people who haven't asked for less motion.
export function HeroSentence() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.current?.play().catch(() => {
      // The poster frame stays if the browser refuses to play.
    });
  }, []);

  return (
    <h1 className="rise leading-[1.02] font-medium tracking-[-0.04em]" style={{ fontSize }}>
      Need a plumber
      <br />
      <span aria-hidden="true" className="shutter relative mr-[0.2em] inline-block h-[0.74em] w-[1.6em] overflow-hidden rounded-[0.2em] bg-surface-2 align-[-0.04em]">
        {/* The clip has black side bars, so it's enlarged to show only the water in the sink. */}
        <video
          ref={video}
          src="/video/running-tap.webm"
          poster="/images/running-tap-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute top-[-200%] left-[-108%] w-[316%] max-w-none"
        />
      </span>
      {lastLine}
    </h1>
  );
}
