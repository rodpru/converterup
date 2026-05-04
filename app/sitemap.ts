import type { MetadataRoute } from "next";
import { conversions } from "@/data/conversions";
import { getAllArticles } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://converterup.com";

  const toolPages = [
    "image-compressor",
    "image-resizer",
    "video-to-gif",
    "qr-code-generator",
    "youtube-thumbnail-downloader",
    "exif-viewer",
    "color-palette",
    "favicon-generator",
    "svg-to-png",
    "image-to-base64",
    "video-frame-extractor",
    "stripe-fee-calculator",
    "text-repeater",
    "vtt-to-srt",
    "json-viewer",
    "hex-to-decimal",
    "html-minifier",
    "css-minifier",
    "uuid-generator",
    "base64-decode",
    "case-converter",
    "csv-to-json",
  ];

  const blogEntries = getAllArticles().map((article) => {
    const localePrefix = article.lang === "en" ? "" : `/${article.lang}`;
    return {
      url: `${baseUrl}${localePrefix}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          pt: `${baseUrl}/pt`,
          es: `${baseUrl}/es`,
        },
      },
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/tools`,
          pt: `${baseUrl}/pt/tools`,
          es: `${baseUrl}/es/tools`,
        },
      },
    },
    ...toolPages.map((slug) => ({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/tools/${slug}`,
          pt: `${baseUrl}/pt/tools/${slug}`,
          es: `${baseUrl}/es/tools/${slug}`,
        },
      },
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/blog`,
          pt: `${baseUrl}/pt/blog`,
          es: `${baseUrl}/es/blog`,
        },
      },
    },
    ...["about", "contact", "privacy", "terms"].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...conversions.map((c) => ({
      url: `${baseUrl}/convert/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: `${baseUrl}/convert/${c.slug}`,
          pt: `${baseUrl}/pt/convert/${c.slug}`,
          es: `${baseUrl}/es/convert/${c.slug}`,
        },
      },
    })),
    ...blogEntries,
  ];
}
