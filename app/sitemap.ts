import type { MetadataRoute } from "next";
import { conversions } from "@/data/conversions";
import { routing } from "@/i18n/routing";
import { getAllArticles } from "@/lib/blog";
import {
  BASE_URL,
  currentDateIso,
  generateAlternates,
  localizedUrl,
} from "@/lib/seo";
import { getAllToolSlugs } from "@/lib/tool-schemas";

// Real content dates, not build time — search engines ignore lastmod once it
// changes on every deploy. Bump the matching date when a section's content
// actually changes.
const CONTENT_UPDATED = {
  home: "2026-09-24",
  tools: "2026-09-24",
  convert: "2026-09-24",
  about: "2026-09-24",
  contact: "2026-09-24",
  privacy: "2026-05-02",
  terms: "2026-05-02",
} as const;

type Entry = MetadataRoute.Sitemap[number];

/** One <url> per locale, each carrying the full hreflang set. */
function localizedEntries(
  path: string,
  lastModified: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
): Entry[] {
  const { languages } = generateAlternates(path, "en");
  return routing.locales.map((locale) => ({
    url: localizedUrl(path, locale),
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

// Regenerate weekly so blog lastmod tracks the articles' 7-day ISR cycle.
export const revalidate = 604800;

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: Entry[] = getAllArticles().map((article) => ({
    url: localizedUrl(`/blog/${article.slug}`, article.lang),
    // Matches the article's dateModified (weekly ISR, see blog/[slug]).
    lastModified: new Date(currentDateIso()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Legal/info pages are English-only (other locales canonicalise to EN).
  const infoEntries: Entry[] = (
    ["about", "contact", "privacy", "terms"] as const
  ).map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(CONTENT_UPDATED[slug]),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...localizedEntries("", CONTENT_UPDATED.home, "weekly", 1),
    ...localizedEntries("/tools", CONTENT_UPDATED.tools, "weekly", 0.9),
    ...getAllToolSlugs().flatMap((slug) =>
      localizedEntries(`/tools/${slug}`, CONTENT_UPDATED.tools, "monthly", 0.8),
    ),
    ...conversions.flatMap((c) =>
      localizedEntries(
        `/convert/${c.slug}`,
        CONTENT_UPDATED.convert,
        "monthly",
        0.75,
      ),
    ),
    ...localizedEntries("/blog", currentDateIso(), "weekly", 0.8),
    ...blogEntries,
    ...infoEntries,
  ];
}
