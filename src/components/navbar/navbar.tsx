"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark/wordmark";
import { site } from "@/config/site/site";

const MobileMenu = dynamic(() => import("@/components/mobile-menu/mobile-menu"), { ssr: false });

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_0_0_var(--line)]" : "" // taste-skill-ignore: a fixed bar
      }`}
    >
      <div className="page flex h-[var(--nav-height)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name}, home`} className="flex min-h-11 min-w-0 items-center rounded-sm transition-transform duration-150 active:scale-[0.97]">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
                  active ? "bg-blue-soft text-blue-dark" : "text-ink hover:bg-surface-2"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <Button asChild variant="ghost" className="hidden lg:inline-flex">
            <a href={site.phone.href}>
              <Phone aria-hidden="true" />
              {site.phone.display}
            </a>
          </Button>
          <Button asChild className="hidden lg:inline-flex">
            <Link href={site.quoteHref}>Get a quote</Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open menu" aria-haspopup="dialog" className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </Button>
          {open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
