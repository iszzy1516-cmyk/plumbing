import { site } from "@/config/site/site";

// Set as live text, so changing the name in site.ts changes the logo too.
export function Wordmark() {
  return <span className="block min-w-0 truncate text-[1.375rem] font-medium tracking-[-0.03em]">{site.name}</span>;
}
