import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header/page-header";
import { QuoteForm } from "@/components/quote-form/quote-form";
import { site } from "@/config/site/site";

export const metadata: Metadata = {
  title: "Get a quote or book a visit",
  description: `Ask ${site.name} for a plumbing quote or book a visit in ${site.area}. Or call ${site.phone.display}.`,
};

export default function QuotePage() {
  return (
    <main>
      <PageHeader title="Get a quote or book a visit" intro="Tell us what's going on. A rough description is fine." />

      <div className="page grid items-start gap-8 lg:grid-cols-12">
        <div className="rise lg:col-span-8  [--rise-delay:40ms]">
          {/* The form reads the chosen service from the link, so the page shows a plain panel until it loads. */}
          <Suspense
            fallback={
              <div className="card min-h-[40rem] bg-surface-2 p-[clamp(1.25rem,4vw,3rem)] text-ink-soft">
                Loading the form. You can also call us on {site.phone.display}.
              </div>
            }
          >
            <QuoteForm />
          </Suspense>
        </div>

        <aside className="rise grid gap-8 lg:col-span-3 lg:col-start-10  [--rise-delay:80ms]">
          <div>
            <h2 className="text-h3">Rather call?</h2>
            <a href={site.phone.href} className="text-lead mt-2 block font-medium text-blue-dark underline underline-offset-4">
              {site.phone.display}
            </a>
          </div>
          <div>
            <h2 className="text-h3">What happens next</h2>
            <p className="mt-2">We&apos;ll read what you&apos;ve sent and get back to you to talk through the job and the price.</p>
          </div>
          <div>
            <h2 className="text-h3">Water coming through?</h2>
            <p className="mt-2">Don&apos;t fill in a form. Turn off your stopcock and {site.emergency ? "call us now." : "give us a ring."}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
