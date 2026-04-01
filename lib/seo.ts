const BASE_URL = "https://converterup.com";

/**
 * Generate alternates (canonical + hreflang) for pages that exist in all 3 locales.
 * Blog articles are excluded — they have independent keywords per language.
 */
export function generateAlternates(path: string, locale: string) {
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const canonical = `${BASE_URL}${localePrefix}${path}`;

  return {
    canonical,
    languages: {
      en: `${BASE_URL}${path}`,
      pt: `${BASE_URL}/pt${path}`,
      es: `${BASE_URL}/es${path}`,
      "x-default": `${BASE_URL}${path}`,
    },
  };
}
