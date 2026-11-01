"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { site, type ServiceCategory } from "@/config/site/site";
import { scrollToElement } from "@/lib/lenis-store/lenis-store";

const categories: (ServiceCategory | "All")[] = ["All", "Repairs", "Fitting", "Heating"];

export function ServiceBoard() {
  const [category, setCategory] = useState<ServiceCategory | "All">("All");
  const services = useMemo(
    () => (category === "All" ? site.services : site.services.filter((service) => service.category === category)),
    [category],
  );

  // The picker on the home page links straight to a service.
  useEffect(() => {
    const target = window.location.hash && document.querySelector<HTMLElement>(window.location.hash);
    if (target) scrollToElement(target);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="page rise flex flex-wrap gap-2 pb-[clamp(2rem,4vw,3.5rem)]  [--rise-delay:120ms]" role="group" aria-label="Filter services">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
            className={`relative h-11 cursor-pointer rounded-full px-5 text-[0.9375rem] font-medium transition-[transform,color,background-color] duration-150 ease-out active:scale-[0.97] ${
              category === name ? "bg-blue text-white delay-200" : "bg-surface-2 hover:bg-blue-soft"
            }`}
          >
            {category === name && (
              <motion.span
                layoutId="service-filter"
                className="absolute inset-0 rounded-full bg-blue"
                transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
              />
            )}
            <span className="relative">{name}</span>
          </button>
        ))}
      </div>

      <ul key={category} className="page rise grid gap-[clamp(3.5rem,7vw,7rem)] [animation-duration:0.4s]">
        {services.map((service, index) => (
          <li key={service.id} id={service.id} className="scroll-mt-24">
            <article className="grid items-center gap-[clamp(1.5rem,5vw,5rem)] md:grid-cols-12">
              <div className={`card group relative aspect-[4/3] md:col-span-7 ${index % 2 ? "md:order-2" : ""}`}>
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="md:col-span-5">
                <h2 className="text-h2">{service.title}</h2>
                <p className="text-lead mt-4">{service.detail}</p>
                <ul className="mt-5 grid gap-1 text-ink-soft">
                  {service.jobs.map((job) => (
                    <li key={job}>{job}</li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-7">
                  <Link href={`${site.quoteHref}?service=${service.id}`} aria-label={`Get a quote for ${service.title.toLowerCase()}`}>
                    Get a quote
                  </Link>
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </MotionConfig>
  );
}
