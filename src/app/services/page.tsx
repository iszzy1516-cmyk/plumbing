import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header/page-header";
import { RevealText } from "@/components/reveal-text/reveal-text";
import { Reveal } from "@/components/reveal/reveal";
import { ServiceBoard } from "@/components/service-board/service-board";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

export const metadata: Metadata = {
  title: "Plumbing services",
  description: `Leaks, blockages, taps, toilets, bathrooms, radiators and pipework across ${site.area}, from ${site.name}.`,
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title="Plumbing services"
        intro={`Everyday plumbing for homes across ${site.area}. If your job isn't listed here, ask anyway.`}
      >
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

      <ServiceBoard />

      <section className="page grid gap-6 pt-[var(--section)] md:grid-cols-12">
        <RevealText className="text-h2 md:col-span-5">Boilers and gas</RevealText>
        <Reveal className="md:col-span-7">
          <p className="text-lead max-w-[46ch]">
            We don&apos;t work on boilers or gas appliances. By law, that work has to be done by a Gas Safe registered
            engineer. If you can smell gas, leave the building and call the National Gas Emergency Service on{" "}
            <a href="tel:+448001119999" className="font-medium underline underline-offset-4">
              0800 111 999
            </a>
            .
          </p>
        </Reveal>
      </section>
    </main>
  );
}
