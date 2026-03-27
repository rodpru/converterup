import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "How to Resize Images for Every Social Media Platform";
const description =
  "The complete guide to image sizes for Instagram, Twitter, Facebook, LinkedIn, and more. Resize instantly in your browser.";
const slug = "how-to-resize-images-for-social-media";

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
              name: "Does resizing reduce image quality?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Downscaling generally preserves quality well because you're discarding pixels rather than inventing new ones. Upscaling, however, can introduce blurriness because the software must interpolate new pixel data. For best results, always start with the highest resolution source image and resize down to your target dimensions.",
              },
            },
            {
              "@type": "Question",
              name: "What aspect ratio should I use for social media?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Each platform has preferred ratios: Instagram feed posts work best at 1:1 (square) or 4:5 (portrait), Stories and Reels use 9:16 (vertical), Twitter/X header images use 3:1, and Facebook shared images use roughly 1.91:1. Using the correct aspect ratio prevents cropping and ensures your content displays as intended.",
              },
            },
            {
              "@type": "Question",
              name: "Should I resize images before or after editing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Always edit at the highest resolution first, then resize as the final step. Editing at full resolution gives you more pixel data to work with for retouching, color correction, and cropping. Resizing last ensures you get the sharpest possible output at your target dimensions.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use the same image for all platforms?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "While you can upload the same image everywhere, each platform will crop it differently based on its display dimensions. For the best presentation, create platform-specific versions. Start with a high-resolution master image and resize it to each platform's recommended dimensions.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
