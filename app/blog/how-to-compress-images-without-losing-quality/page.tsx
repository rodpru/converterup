import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Compress Images Without Losing Quality",
  description:
    "Learn how to reduce image file sizes by up to 80% while keeping them sharp. Free browser-based compression with no uploads required.",
  alternates: {
    canonical:
      "https://converterup.com/blog/how-to-compress-images-without-losing-quality",
  },
  openGraph: {
    title: "How to Compress Images Without Losing Quality",
    description:
      "Learn how to reduce image file sizes by up to 80% while keeping them sharp. Free browser-based compression with no uploads required.",
    url: "https://converterup.com/blog/how-to-compress-images-without-losing-quality",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress Images Without Losing Quality",
    description:
      "Learn how to reduce image file sizes by up to 80% while keeping them sharp. Free browser-based compression with no uploads required.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Compress Images Without Losing Quality",
          description:
            "Learn how to reduce image file sizes by up to 80% while keeping them sharp. Free browser-based compression with no uploads required.",
          datePublished: "2026-03-27",
          author: {
            "@type": "Organization",
            name: "ConverterUp",
          },
          publisher: {
            "@type": "Organization",
            name: "ConverterUp",
            url: "https://converterup.com",
          },
          mainEntityOfPage:
            "https://converterup.com/blog/how-to-compress-images-without-losing-quality",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://converterup.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://converterup.com/blog",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "How to Compress Images Without Losing Quality",
              item: "https://converterup.com/blog/how-to-compress-images-without-losing-quality",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Does compressing an image reduce its dimensions?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Compression reduces file size by optimizing how pixel data is stored, not by shrinking the image dimensions. A 1920x1080 image stays 1920x1080 after compression — it just takes up less disk space.",
              },
            },
            {
              "@type": "Question",
              name: "What quality setting should I use for JPEG compression?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For most use cases, a quality setting between 75-85% offers the best balance of file size and visual fidelity. Below 70%, artifacts become noticeable. Above 90%, the file size savings are minimal.",
              },
            },
            {
              "@type": "Question",
              name: "Is WebP better than JPEG for compression?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "WebP typically produces files 25-35% smaller than JPEG at equivalent visual quality. It also supports transparency and animation. However, JPEG has universal compatibility, while WebP requires modern browsers (all major browsers now support it).",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
