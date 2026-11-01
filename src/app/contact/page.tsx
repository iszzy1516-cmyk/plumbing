import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaqList } from "@/components/faq-list/faq-list";
import { PageHeader } from "@/components/page-header/page-header";
import { RevealImage } from "@/components/reveal-image/reveal-image";
import { RevealText } from "@/components/reveal-text/reveal-text";
import { Reveal } from "@/components/reveal/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or email ${site.name}, plumbers covering ${site.area}. Phone ${site.phone.display}.`,
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader title="Talk to a plumber" intro="A quick call is usually the fastest way to find out what your job needs.">
        <Button asChild size="lg">
          <a href={site.phone.href}>
            <Phone aria-hidden="true" />
            {site.phone.display}
          </a>
        </Button>
        <Button asChild size="lg" variant="tonal">
          <Link href={site.quoteHref}>Get a quote</Link>
        </Button>
      </PageHeader>

      <div className="page grid items-stretch gap-4 md:grid-cols-12">
        <div className="rise grid gap-4 sm:grid-cols-2 md:col-span-5 md:grid-cols-1  [--rise-delay:40ms]">
          <div className="card flex flex-col justify-between gap-8 bg-blue-soft p-[clamp(1.5rem,2.5vw,2.25rem)]">
            <h2 className="text-h3">Where we work</h2>
            <div>
              <p>We cover {site.area}. Send us your postcode if you&apos;re not sure.</p>
              {site.areas.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {site.areas.map((area) => (
                    <li key={area} className="text-small rounded-full bg-white px-3 py-1.5 font-medium">
                      {area}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="card flex flex-col justify-between gap-8 bg-surface-2 p-[clamp(1.5rem,2.5vw,2.25rem)]">
            <h2 className="text-h3">Rather email?</h2>
            <div className="grid gap-2">
              <a href={site.email.href} className="[overflow-wrap:anywhere] underline underline-offset-4">
                {site.email.display}
              </a>
              {site.hours.map((group) => (
                <p key={group.days}>
                  {group.days}: {group.time}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="rise md:col-span-7  [--rise-delay:80ms]">
          <RevealImage
            src="/images/radiator-white.jpg"
            alt="A white radiator under a window in a bright room"
            sizes="(min-width: 768px) 58vw, 100vw"
            priority
            className="aspect-[4/3] h-full w-full"
          />
        </div>
      </div>

      <section className="page grid gap-8 pt-[var(--section)] md:grid-cols-12">
        <RevealText className="text-h2 md:col-span-4">Common questions</RevealText>
        <Reveal className="md:col-span-8">
          <FaqList items={site.faqs} />
        </Reveal>
      </section>
    </main>
  );
}
