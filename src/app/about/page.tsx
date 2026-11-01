import type { Metadata } from "next";
import Link from "next/link";
import { Credentials } from "@/components/credentials/credentials";
import { PageHeader } from "@/components/page-header/page-header";
import { Reviews } from "@/components/reviews/reviews";
import { RevealImage } from "@/components/reveal-image/reveal-image";
import { RevealText } from "@/components/reveal-text/reveal-text";
import { Reveal } from "@/components/reveal/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

export const metadata: Metadata = {
  title: "How we work",
  description: `How ${site.name} works: a clear price first, a time you can plan around, plain English and a tidy finish.`,
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="How we work"
        intro="Nobody books a plumber for fun. You want to know how bad it is, what it'll cost and when it'll be done, so that's what we tell you."
      />

      <div className="page">
        <RevealImage
          src="/images/bathroom-bright.jpg"
          alt="A bright bathroom with a glass shower and a long vanity unit"
          sizes="(min-width: 96rem) 92rem, 100vw"
          priority
          className="aspect-[4/3] md:aspect-[21/9]"
        />
      </div>

      <section className="page grid items-start gap-[clamp(2rem,5vw,5rem)] pt-[var(--section)] md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText className="text-h2">What you can expect</RevealText>
          <ul className="mt-8 grid gap-8">
            {site.promises.map((promise) => (
              <li key={promise.title}>
                <Reveal>
                  <h3 className="text-h3">{promise.title}</h3>
                  <p className="text-lead mt-2 max-w-[42ch] text-ink-soft">{promise.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="md:col-span-5">
          <RevealImage
            src="/images/plumber-portrait.jpg"
            alt="A tradesman in blue workwear in a room being refitted"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="aspect-[4/5]"
          />
        </Reveal>
      </section>

      <section className="page pt-[var(--section)]">
        <Reveal className="card grid items-center gap-8 bg-blue p-[clamp(1.5rem,5vw,4.5rem)] text-white md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-h2">Repair it, or replace it?</h2>
            <p className="text-lead mt-4 max-w-[46ch]">
              If a new washer will do, we won&apos;t sell you a new tap. If a repair would only cost you more next year,
              we&apos;ll tell you that too, and the decision&apos;s yours.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button asChild variant="white" size="lg">
              <Link href={site.quoteHref}>Get a quote</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <Reviews />
      <Credentials />
    </main>
  );
}
