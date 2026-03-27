import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "How to Extract a Color Palette from Any Image";
const description =
  "Extract dominant colors from photos and images. Get HEX, RGB, and HSL values for your design projects.";
const slug = "how-to-extract-colors-from-image";

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
              name: "How many colors should a color palette have?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A practical design palette typically has 5-8 colors: 1-2 primary colors, 1-2 secondary/accent colors, and 2-3 neutrals (light background, dark text, mid-tone). Extracting 5-6 dominant colors from an image usually gives you a well-balanced starting palette that you can refine from there.",
              },
            },
            {
              "@type": "Question",
              name: "Can I extract colors from screenshots?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Screenshots are just images, so any color extraction tool works on them. This is a common workflow for designers who want to match the color scheme of an existing website, app, or design. Take a screenshot, extract the palette, and use the HEX values in your own project.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between HEX and RGB color formats?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "HEX and RGB represent the same colors in different notation. RGB uses decimal values 0-255 for red, green, and blue channels (e.g., rgb(45, 212, 191)). HEX uses hexadecimal notation for the same values (e.g., #2DD4BF). They're interchangeable — HEX is more common in web design and CSS, while RGB is used in many design tools and programming contexts.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
