import type { Metadata } from "next";

export const BASE_URL = "https://converterup.com";

/** Byline for articles — matches the "Who's behind it" section on /about. */
export const AUTHOR = {
  "@type": "Person",
  name: "Rodrigo Prudêncio",
  url: `${BASE_URL}/about`,
} as const;

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  pt: "pt_PT",
  es: "es_ES",
};

export function localizedUrl(path: string, locale: string) {
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  return `${BASE_URL}${localePrefix}${path}`;
}

/**
 * Generate alternates (canonical + hreflang) for pages that exist in all 3 locales.
 * Blog articles are excluded — they have independent keywords per language.
 */
export function generateAlternates(path: string, locale: string) {
  return {
    canonical: localizedUrl(path, locale),
    languages: {
      en: `${BASE_URL}${path}`,
      pt: `${BASE_URL}/pt${path}`,
      es: `${BASE_URL}/es${path}`,
      "x-default": `${BASE_URL}${path}`,
    },
  };
}

interface PageMetadataOptions {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /** Pages that only exist in one locale (blog articles) skip hreflang. */
  hreflang?: boolean;
  /** Absolute title — bypasses the "%s | ConverterUp" layout template. */
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * Use the locale root OG image. Only for pages without their own
   * `opengraph-image.tsx` — config images override the file convention.
   */
  fallbackImage?: boolean;
}

/**
 * Shared metadata builder so every page emits the same canonical, hreflang,
 * og:url, og:locale and Twitter card. og:image comes from the nearest
 * `opengraph-image.tsx` file convention; pages without one opt into the
 * locale root image via `fallbackImage`.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  hreflang = true,
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
  fallbackImage = false,
}: PageMetadataOptions): Metadata {
  const alternates = hreflang
    ? generateAlternates(path, locale)
    : { canonical: localizedUrl(path, locale) };

  const defaultImage = {
    url: `${BASE_URL}/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "ConverterUp",
      locale: OG_LOCALE[locale] ?? "en_US",
      type,
      ...(fallbackImage ? { images: [defaultImage] } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(fallbackImage ? { images: [defaultImage.url] } : {}),
    },
  };
}
