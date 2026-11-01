import Link from "next/link";
import { Phone } from "lucide-react";
import { Credentials } from "@/components/credentials/credentials";
import { HeroImage } from "@/components/hero-image/hero-image";
import { HeroSentence } from "@/components/hero-sentence/hero-sentence";
import { LeakSteps } from "@/components/leak-steps/leak-steps";
import { ProblemPicker } from "@/components/problem-picker/problem-picker";
import { Reviews } from "@/components/reviews/reviews";
import { RevealImage } from "@/components/reveal-image/reveal-image";
import { RevealText } from "@/components/reveal-text/reveal-text";
import { Reveal } from "@/components/reveal/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

const steps = [
  { title: "First, tell us what's wrong.", text: "Call or fill in the form. A rough description and your postcode are plenty.", start: "lg:col-start-1" },
  { title: "Then you get a price.", text: "We talk you through the job and what it costs before anything starts.", start: "lg:col-start-3" },
  { title: "We fix it and tidy up.", text: "You see what we've done, and you can stop thinking about it.", start: "lg:col-start-5" },
];

export default function Home() {
  const [firstPromise, secondPromise] = site.promises;

  return (
    <main>
      <section className="page pt-[calc(var(--nav-height)+clamp(2rem,5vw,4.5rem))] pb-[clamp(2.5rem,5vw,4rem)]">
        <HeroSentence />
        <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <p className="rise text-lead max-w-[44ch]  [--rise-delay:80ms]">
            We fix leaks, clear blockages and fit taps, toilets, radiators and bathrooms. You get the price before we
            start.
          </p>
          <div className="rise flex flex-wrap gap-3  [--rise-delay:120ms]">
            <Button asChild size="lg">
              <a href={site.phone.href}>
                <Phone aria-hidden="true" />
                {site.phone.display}
              </a>
            </Button>
            <Button asChild size="lg" variant="tonal">
              <Link href={site.quoteHref}>Get a quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <HeroImage src="/images/plumber-bathroom.jpg" alt="A plumber in overalls working on the pipes behind a bathroom wall" />

      <section className="page pt-[var(--section)]">
        <RevealText className="text-h2">What&apos;s gone wrong?</RevealText>
        <div className="mt-8">
          <ProblemPicker />
        </div>
      </section>

      <LeakSteps />

      <section className="page pt-[var(--section)]">
        <h2 className="sr-only">How it works</h2>
        <ol className="grid gap-[clamp(2.5rem,4vw,3.5rem)] lg:grid-cols-12">
          {steps.map((step) => (
            <li key={step.title} className={`lg:col-span-8 ${step.start}`}>
              <Reveal>
                <h3 className="text-h2">{step.title}</h3>
                <p className="text-lead mt-3 max-w-[36ch] text-ink-soft">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="page pt-[var(--section)]">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <RevealImage
              src="/images/pliers-pipe.jpg"
              alt="Water pump pliers tightening a pipe fitting"
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3] h-full w-full md:aspect-auto md:min-h-[34rem]"
            />
          </Reveal>
          <div className="grid gap-4 md:col-span-5">
            <Reveal className="card flex flex-col justify-between gap-12 bg-blue p-[clamp(1.5rem,3vw,2.5rem)] text-white">
              <h2 className="text-h2">{firstPromise.title}</h2>
              <p>{firstPromise.text}</p>
            </Reveal>
            <Reveal className="card flex flex-col justify-between gap-12 bg-surface-2 p-[clamp(1.5rem,3vw,2.5rem)]">
              <h2 className="text-h3">{secondPromise.title}</h2>
              <p>
                {secondPromise.text}{" "}
                <Link href="/about" className="font-medium underline underline-offset-4">
                  How we work
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Reviews />
      <Credentials />

      <section className="page grid items-center gap-[clamp(2rem,5vw,5rem)] pt-[var(--section)] md:grid-cols-2">
        <div>
          <RevealText className="text-h2">Are we near you?</RevealText>
          <Reveal>
            <p className="text-lead mt-5 max-w-[32ch]">
              We cover {site.area}. If you&apos;re not sure that includes your street, send us your postcode.
            </p>
            {site.areas.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {site.areas.map((area) => (
                  <li key={area} className="text-small rounded-full bg-surface-2 px-4 py-2 font-medium">
                    {area}
                  </li>
                ))}
              </ul>
            )}
            <Button asChild variant="tonal" size="lg" className="mt-7">
              <Link href="/contact">Ask us</Link>
            </Button>
          </Reveal>
        </div>
        <Reveal>
          <RevealImage
            src="/images/copper-pipes.jpg"
            alt="Two copper pipes running up an open wall"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[5/4]"
          />
        </Reveal>
      </section>
    </main>
  );
}
