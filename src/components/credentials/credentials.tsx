import { Reveal } from "@/components/reveal/reveal";
import { site } from "@/config/site/site";

// Shows only real memberships from site.ts, so it renders nothing until there are some.
export function Credentials() {
  if (site.accreditations.length === 0) return null;

  return (
    <section className="page pt-[var(--section)]">
      <Reveal className="card bg-surface-2 p-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="text-h3">Registered and accredited</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {site.accreditations.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="text-small inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 font-medium underline-offset-4 hover:underline">
                {item.name}
                {item.number && <span className="text-ink-soft">No. {item.number}</span>}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
