import type { MetadataRoute } from "next";
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

  const blogEntries = getAllArticles().map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...toolPages.map((slug) => ({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
