import type { ReactNode } from "react";

// The title block at the top of every inner page. It animates with CSS, so it never waits for script.
export function PageHeader({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <header className="page pt-[calc(var(--nav-height)+clamp(2.5rem,6vw,5.5rem))] pb-[clamp(2.5rem,5vw,4.5rem)]">
      <h1 className="rise text-hero max-w-[18ch]">{title}</h1>
      <p className="rise text-lead mt-5 max-w-[46ch] text-ink-soft  [--rise-delay:40ms]">{intro}</p>
      {children && <div className="rise mt-8 flex flex-wrap gap-3  [--rise-delay:80ms]">{children}</div>}
    </header>
  );
}
