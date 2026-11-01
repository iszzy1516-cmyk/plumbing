import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

// The offset comes from the element's scroll-margin-top, which both paths respect.
export function scrollToElement(element: HTMLElement) {
  if (instance) {
    // After a page change Lenis can still hold the old page's height, which would cut the scroll short.
    instance.resize();
    instance.scrollTo(element, { duration: 0.8 });
    return;
  }
  element.scrollIntoView();
}

export function jumpToTop() {
  window.scrollTo(0, 0);
  instance?.scrollTo(0, { immediate: true, force: true });
}
