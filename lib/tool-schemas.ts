import { getTranslations } from "next-intl/server";

const TOOL_CATEGORIES: Record<
  string,
  "MultimediaApplication" | "UtilityApplication" | "DeveloperApplication"
> = {
  "image-compressor": "MultimediaApplication",
  "image-resizer": "MultimediaApplication",
  "video-to-gif": "MultimediaApplication",
  "qr-code-generator": "UtilityApplication",
  "youtube-thumbnail-downloader": "UtilityApplication",
  "exif-viewer": "UtilityApplication",
  "color-palette": "MultimediaApplication",
  "favicon-generator": "DeveloperApplication",
  "svg-to-png": "MultimediaApplication",
  "image-to-base64": "DeveloperApplication",
  "video-frame-extractor": "MultimediaApplication",
  "stripe-fee-calculator": "UtilityApplication",
  "text-repeater": "UtilityApplication",
  "vtt-to-srt": "UtilityApplication",
  "json-viewer": "DeveloperApplication",
  "hex-to-decimal": "DeveloperApplication",
  "html-minifier": "DeveloperApplication",
  "css-minifier": "DeveloperApplication",
  "uuid-generator": "DeveloperApplication",
  "base64-decode": "DeveloperApplication",
  "case-converter": "UtilityApplication",
  "csv-to-json": "DeveloperApplication",
};

const BASE_URL = "https://converterup.com";

function localizedToolUrl(slug: string, locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}/tools/${slug}`;
}

function toolDisplayName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function getToolHowToSchema(slug: string, locale: string) {
  if (!TOOL_CATEGORIES[slug]) return null;

  const t = await getTranslations({ locale, namespace: "ToolHowTo" });

  let name: string;
  let description: string;
  const steps: { name: string; text: string }[] = [];

  try {
    name = t(`${slug}.name`);
    description = t(`${slug}.description`);
    for (const i of [1, 2, 3] as const) {
      steps.push({
        name: t(`${slug}.step${i}.name`),
        text: t(`${slug}.step${i}.text`),
      });
    }
  } catch {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: "PT30S",
    tool: {
      "@type": "HowToTool",
      name: `ConverterUp ${toolDisplayName(slug)}`,
    },
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: localizedToolUrl(slug, locale),
    })),
  };
}

export function getToolWebAppSchema(
  slug: string,
  name: string,
  description: string,
  locale: string,
) {
  const category = TOOL_CATEGORIES[slug];
  if (!category) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: localizedToolUrl(slug, locale),
    description,
    applicationCategory: category,
    operatingSystem: "Any (browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "ConverterUp",
      url: BASE_URL,
    },
  };
}

export function getToolCategory(slug: string) {
  return TOOL_CATEGORIES[slug] ?? null;
}

export function getAllToolSlugs() {
  return Object.keys(TOOL_CATEGORIES);
}
