import { site } from "@/config/site/site";

// Only states what site.ts knows. There are deliberately no ratings here unless real reviews are added and marked up properly.
export function BusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: site.name,
    url: site.url,
    ...(site.phone.href.startsWith("tel:") && { telephone: site.phone.display }),
    ...(site.email.href.startsWith("mailto:") && { email: site.email.display }),
    ...(site.areas.length > 0 && { areaServed: site.areas }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
