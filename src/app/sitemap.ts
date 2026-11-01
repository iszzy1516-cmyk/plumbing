import type { MetadataRoute } from "next";
import { site } from "@/config/site/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...site.nav.map((item) => item.href), site.quoteHref, "/privacy"];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
