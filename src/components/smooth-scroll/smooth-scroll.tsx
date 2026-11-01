"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { jumpToTop, setLenis } from "@/lib/lenis-store/lenis-store";
import { loadGsap } from "@/lib/load-gsap/load-gsap";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SmoothScroll() {
  const pathname = usePathname();
  const cameBack = useRef(false);
  const firstRender = useRef(true);

  // Runs before the new page measures anything. The back button keeps its scroll position.
  useIsomorphicLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (cameBack.current) {
      cameBack.current = false;
      return;
    }
    jumpToTop();
  }, [pathname]);

  useEffect(() => {
    const onPop = () => {
      cameBack.current = true;
    };
    window.addEventListener("popstate", onPop);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("popstate", onPop);
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    setLenis(lenis);

    // Keeps ScrollTrigger in step with Lenis from the first scroll onwards.
    const syncOnFirstScroll = () => {
      loadGsap().then(({ ScrollTrigger }) => lenis.on("scroll", ScrollTrigger.update));
    };
    window.addEventListener("scroll", syncOnFirstScroll, { once: true, passive: true });

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", syncOnFirstScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
