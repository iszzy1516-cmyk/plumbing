import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

const bar = "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-1px_0_0_var(--line)] lg:hidden"; // taste-skill-ignore: a fixed bar

// Keeps calling one tap away on phones and tablets, where most people with a leak will be.
export function CallBar() {
  return (
    <div className={bar}>
      <Button asChild>
        <a href={site.phone.href} aria-label={`Call ${site.phone.display}`}>
          <Phone aria-hidden="true" />
          Call us
        </a>
      </Button>
      <Button asChild variant="tonal">
        <Link href={site.quoteHref}>Get a quote</Link>
      </Button>
    </div>
  );
}
