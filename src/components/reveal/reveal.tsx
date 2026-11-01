import type { ReactNode } from "react";

// Fades and lifts in as it scrolls into view, using CSS alone. See .reveal in globals.css.
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className ?? ""}`}>{children}</div>;
}
