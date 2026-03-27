import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "How to Convert SVG to PNG (and When You Should)";
const description =
  "Convert SVG vector files to PNG raster images with custom scale and background. Understand when each format is the right choice.";
const slug = "how-to-convert-svg-to-png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `https://converterup.com/blog/${slug}` },
  openGraph: {
    title,
    description,
    url: `https://converterup.com/blog/${slug}`,
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          datePublished: "2026-03-27",
          author: { "@type": "Organization", name: "ConverterUp" },
          publisher: {
            "@type": "Organization",
            name: "ConverterUp",
            url: "https://converterup.com",
          },
          mainEntityOfPage: `https://converterup.com/blog/${slug}`,
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
              name: title,
              item: `https://converterup.com/blog/${slug}`,
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
              name: "Will I lose quality converting SVG to PNG?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You won't lose quality if you export at an appropriate scale. Since SVG is vector-based, you can render it at any resolution. Exporting at 2x or 3x scale produces a high-DPI PNG that looks crisp on retina displays. The only 'loss' is that the PNG becomes fixed-resolution — you can't scale it up further without degradation.",
              },
            },
            {
              "@type": "Question",
              name: "What scale factor should I use for SVG to PNG conversion?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Use 1x for standard screens, 2x for retina/HiDPI displays (recommended for most use cases), and 3x for extra-high-density displays or when you want room to crop. For print, use 3x or higher. If the SVG has a viewBox of 100x100, a 2x export produces a 200x200 pixel PNG.",
              },
            },
            {
              "@type": "Question",
              name: "Can I convert a PNG back to SVG?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not perfectly. Converting PNG to SVG requires image tracing, which approximates the raster image with vector paths. Simple graphics with solid colors can be traced reasonably well, but photographs or complex images produce poor results. The conversion from vector to raster is fundamentally a one-way process for complex content.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
