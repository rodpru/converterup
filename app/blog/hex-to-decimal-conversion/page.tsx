import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "Hex to Decimal Conversion Explained";
const description =
  "Understand hexadecimal numbers and how to convert between hex, decimal, binary, and octal. Includes color code conversion.";
const slug = "hex-to-decimal-conversion";

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
              name: "Why do programmers use hexadecimal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Hexadecimal is a compact way to represent binary data. Each hex digit maps exactly to 4 binary bits, so one byte (8 bits) can be written as exactly 2 hex digits. This makes hex much shorter and more readable than binary while maintaining a direct mathematical relationship. For example, the binary value 11111111 is simply FF in hex, compared to 255 in decimal.",
              },
            },
            {
              "@type": "Question",
              name: "What is 0xFF in decimal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "0xFF in decimal is 255. The 0x prefix indicates a hexadecimal number in most programming languages. F in hex equals 15 in decimal, so FF = (15 × 16) + 15 = 240 + 15 = 255. This is the maximum value of a single byte, which is why it appears frequently in programming — it represents all 8 bits set to 1 (11111111 in binary).",
              },
            },
            {
              "@type": "Question",
              name: "How does hex relate to CSS colors?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "CSS hex color codes like #FF5733 are three hexadecimal byte values concatenated together: FF for red (255), 57 for green (87), and 33 for blue (51). Each pair ranges from 00 (0, no color) to FF (255, full color). An optional fourth pair can specify alpha transparency. The shorthand #F53 expands to #FF5533.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
