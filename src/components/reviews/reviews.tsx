import { RevealText } from "@/components/reveal-text/reveal-text";
import { Reveal } from "@/components/reveal/reveal";
import { site } from "@/config/site/site";

// Shows only real reviews from site.ts, so it renders nothing until there are some.
export function Reviews() {
  if (site.reviews.length === 0) return null;

  return (
    <section className="page pt-[var(--section)]">
      <RevealText className="text-h2">What customers say</RevealText>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {site.reviews.map((review) => (
          <li key={review.quote}>
            <Reveal className={`card flex h-full min-h-56 flex-col justify-between gap-8 bg-surface-2 p-[clamp(1.5rem,2.5vw,2rem)]`}>
              <blockquote className="text-h3">&ldquo;{review.quote}&rdquo;</blockquote>
              <p className="text-small font-medium">
                {review.name}, {review.place}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
