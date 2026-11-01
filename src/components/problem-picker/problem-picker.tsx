"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

// Pick what's wrong and see what we'd do about it, with the quote form already set to that job.
export function ProblemPicker() {
  const [activeId, setActiveId] = useState(site.services[0].id);
  const active = site.services.find((service) => service.id === activeId) ?? site.services[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose your problem">
        {site.services.map((service) => (
          <button
            key={service.id}
            type="button"
            aria-pressed={activeId === service.id}
            onClick={() => setActiveId(service.id)}
            className={`relative min-h-11 cursor-pointer rounded-full px-5 py-2 text-[0.9375rem] font-medium transition-[transform,color,background-color] duration-150 ease-out active:scale-[0.97] ${
              activeId === service.id ? "bg-blue text-white delay-200" : "bg-surface-2 hover:bg-blue-soft"
            }`}
          >
            {activeId === service.id && (
              <motion.span
                layoutId="problem-pick"
                className="absolute inset-0 rounded-full bg-blue"
                transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
              />
            )}
            <span className="relative">{service.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-[clamp(1.5rem,4vw,4rem)] md:grid-cols-12">
        <div className="card relative aspect-[4/3] bg-surface-2 md:order-2 md:col-span-7">
          {site.services.map((service) => (
            <Image
              key={service.id}
              src={service.image}
              alt={service.id === activeId ? service.alt : ""}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-500 ease-out ${
                service.id === activeId ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
              }`}
            />
          ))}
        </div>

        <div aria-live="polite" className="md:col-span-5">
          <h3 className="text-h2">{active.title}</h3>
          <p className="text-lead mt-4">{active.detail}</p>
          <p className="mt-4 text-ink-soft">Including {active.jobs.join(", ").toLowerCase()}.</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg">
              <Link href={`${site.quoteHref}?service=${active.id}`}>Get a quote for this</Link>
            </Button>
            <Link href={`/services#${active.id}`} className="inline-flex min-h-11 items-center font-medium text-blue-dark underline underline-offset-4">
              More about this job
            </Link>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
