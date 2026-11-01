import Link from "next/link";
import { SocialIcon } from "@/components/social-icon/social-icon";
import { Wordmark } from "@/components/wordmark/wordmark";
import { site } from "@/config/site/site";

const textLink = "underline-offset-4 hover:underline";

// The phone number is the footer's headline, because it's the one thing someone scrolling this far wants.
export function Footer() {
  return (
    <footer className="mt-[var(--section)] bg-blue pb-16 text-white lg:pb-0">
      <div className="page py-[clamp(3rem,6vw,5rem)]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr]">
          <div className="min-w-0">
            <Wordmark />
            <p className="mt-3 max-w-[30ch]">Everyday plumbing for homes across {site.area}.</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[1.0625rem] font-medium tracking-normal">Explore</h2>
            <ul className="mt-3 grid gap-1.5">
              {[...site.nav, { label: "Get a quote", href: site.quoteHref }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={textLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="text-[1.0625rem] font-medium tracking-normal">Get in touch</h2>
            <div className="mt-3 grid gap-1.5">
              <a href={site.email.href} className={`${textLink} [overflow-wrap:anywhere]`}>
                {site.email.display}
              </a>
              {site.hours.map((group) => (
                <p key={group.days}>
                  {group.days}: {group.time}
                </p>
              ))}
            </div>
            <ul className="mt-4 flex gap-2">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-blue-dark transition-[transform,background-color,color] duration-150 ease-out hover:bg-white hover:text-blue-dark active:scale-[0.97]"
                  >
                    <SocialIcon name={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href={site.phone.href}
          aria-label={`Call ${site.phone.display}`}
          className="mt-[clamp(3rem,8vw,7rem)] block text-[min(11.5vw,12rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap tabular-nums underline-offset-[0.08em] hover:underline"
        >
          {site.phone.display}
        </a>

        <div className="text-small mt-8 flex flex-wrap justify-between gap-x-8 gap-y-2">
          <p>© {site.copyrightYear} {site.legalName}</p>
          <p>
            Stock photos from Unsplash. Video: &ldquo;A running tap of water&rdquo; by Justeraren,{" "}
            <a href="https://creativecommons.org/licenses/by/4.0" className="underline underline-offset-4">
              CC BY 4.0
            </a>
            .
          </p>
          <Link href="/privacy" className={textLink}>
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
