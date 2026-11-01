// GSAP is only fetched once it's needed, so it never slows down the first load.
let loading: ReturnType<typeof load> | null = null;

async function load() {
  const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]);
  gsap.registerPlugin(ScrollTrigger, SplitText);
  return { gsap, ScrollTrigger, SplitText };
}

export function loadGsap() {
  loading ??= load();
  return loading;
}
