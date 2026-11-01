import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header/page-header";
import { site } from "@/config/site/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} handles your personal information.`,
};

const sections = [
  {
    title: "What we collect",
    text: "When you ask for a quote or book a visit, we ask for your name, phone number and postcode, plus your email address and details of the job if you choose to give them.",
  },
  {
    title: "Why we collect it",
    text: "We use your details to reply to you, price the job and arrange the work. We don't sell your information, and we won't send you marketing unless you ask us to.",
  },
  {
    title: "Cookies",
    text: "This site doesn't set any cookies, so there's nothing to accept or turn off. If that changes, for example if we add visitor statistics, we'll ask you first.",
  },
  {
    title: "How long we keep it",
    text: "We keep your details only for as long as we need them to do the work and meet our legal obligations, such as keeping tax records.",
  },
  {
    title: "Your rights",
    text: "Under UK GDPR, you can ask to see, correct or delete the information we hold about you. You can also complain to the Information Commissioner's Office (ICO).",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader title="Privacy policy" intro="The short version: we only use your details to sort out your plumbing." />
      <div className="page">
        <p className="rise max-w-[56ch] rounded-2xl bg-blue-soft p-5  [--rise-delay:40ms]">
          Draft for the business to review with a legal adviser before launch. It is not yet a final policy.
        </p>
        <div className="rise mt-10 grid max-w-[56ch] gap-10  [--rise-delay:80ms]">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-h3">{section.title}</h2>
              <p className="mt-3 text-ink-soft">{section.text}</p>
            </section>
          ))}
          <section>
            <h2 className="text-h3">Contact us</h2>
            <p className="mt-3 [overflow-wrap:anywhere] text-ink-soft">
              {site.legalName}.{" "}
              <a href={site.email.href} className="underline underline-offset-4">
                {site.email.display}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
