"use client";

import { useEffect, useState, type ReactNode } from "react";

let firstLoad = true;

// The first page arrives fully drawn from the server. Only later page changes fade in.
export function PageTransition({ children }: { children: ReactNode }) {
  const [animate] = useState(() => !firstLoad);

  useEffect(() => {
    firstLoad = false;
  }, []);

  return <div className={animate ? "page-fade" : undefined}>{children}</div>;
}
