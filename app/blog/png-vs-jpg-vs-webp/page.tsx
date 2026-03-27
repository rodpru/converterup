import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PNG vs JPG vs WebP: Which Image Format Is Best?",
  description:
    "A clear comparison of PNG, JPG, and WebP formats. When to use each, file size differences, and how to convert between them.",
  alternates: {
    canonical: "https://converterup.com/blog/png-vs-jpg-vs-webp",
  },
  openGraph: {
    title: "PNG vs JPG vs WebP: Which Image Format Is Best?",
    description:
      "A clear comparison of PNG, JPG, and WebP formats. When to use each, file size differences, and how to convert between them.",
    url: "https://converterup.com/blog/png-vs-jpg-vs-webp",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG vs JPG vs WebP: Which Image Format Is Best?",
    description:
      "A clear comparison of PNG, JPG, and WebP formats. When to use each, file size differences, and how to convert between them.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "PNG vs JPG vs WebP: Which Image Format Is Best?",
          description:
            "A clear comparison of PNG, JPG, and WebP formats. When to use each, file size differences, and how to convert between them.",
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
          mainEntityOfPage: "https://converterup.com/blog/png-vs-jpg-vs-webp",
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
              name: "PNG vs JPG vs WebP: Which Image Format Is Best?",
              item: "https://converterup.com/blog/png-vs-jpg-vs-webp",
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
              name: "Which image format is best for the web?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "WebP is the best general-purpose format for the web. It produces smaller files than both JPEG and PNG at equivalent quality, supports transparency, and is supported by all major browsers. Use JPEG as a fallback for maximum compatibility.",
              },
            },
            {
              "@type": "Question",
              name: "Does WebP work in all browsers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. As of 2024, WebP is supported by Chrome, Firefox, Safari, Edge, and Opera — covering over 97% of global browser usage. The only holdouts are very old browser versions that represent a negligible market share.",
              },
            },
            {
              "@type": "Question",
              name: "When should I use PNG instead of JPEG?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Use PNG when you need transparency, when your image has text or sharp edges (logos, screenshots, UI elements), or when you need pixel-perfect quality with no compression artifacts. Use JPEG for photographs and images with smooth gradients where file size matters.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
