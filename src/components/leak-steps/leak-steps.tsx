import { Phone } from "lucide-react";
import { RevealImage } from "@/components/reveal-image/reveal-image";
import { RevealText } from "@/components/reveal-text/reveal-text";
import { Reveal } from "@/components/reveal/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

const steps = [
  { title: "Turn off the water.", text: "Find your stopcock, usually under the kitchen sink, and turn it clockwise." },
  { title: "Keep clear of the electrics.", text: "If water is near sockets or lights, don't touch them. Turn the power off at the fuse box only if it's dry and safe to reach." },
  { title: "Then give us a call.", text: site.emergency ? "We take emergency call-outs, so tell us what's happening and we'll tell you when we can get there." : "We don't run an emergency service, but if we can't get to you quickly we'll say so straight away." },
];

// Useful whether or not the business takes emergency call-outs. The wording follows site.emergency.
export function LeakSteps() {
  return (
    <section className="page grid items-center gap-[clamp(2rem,5vw,5rem)] pt-[var(--section)] md:grid-cols-2">
      <div className="md:order-2">
        <RevealText className="text-h2">{site.emergency ? "Got a leak? Call us now" : "Got a leak right now?"}</RevealText>
        <Reveal>
          <ol className="mt-6 grid gap-5">
            {steps.map((step) => (
              <li key={step.title}>
                <h3 className="text-lead tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-1 max-w-[46ch]">{step.text}</p>
              </li>
            ))}
          </ol>
          <Button asChild size="lg" className="mt-7">
            <a href={site.phone.href}>
              <Phone aria-hidden="true" />
              Call {site.phone.display}
            </a>
          </Button>
        </Reveal>
      </div>
      <Reveal className="md:order-1">
        <RevealImage
          src="/images/tap-splash.jpg"
          alt="Water splashing from a kitchen tap"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[5/4]"
        />
      </Reveal>
    </section>
  );
}
