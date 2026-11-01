import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site/site";

export default function NotFound() {
  return (
    <main className="page pt-[calc(var(--nav-height)+clamp(3rem,10vw,8rem))]">
      <h1 className="text-hero max-w-[16ch]">Page not found</h1>
      <p className="text-lead mt-5 text-ink-soft">It may have moved, or it may never have existed.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={site.quoteHref}>Get a quote</Link>
        </Button>
      </div>
    </main>
  );
}
