import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "Image to Base64: What It Is and How to Use It";
const description =
  "Learn what Base64 encoding is, when to embed images as data URIs, and how to convert any image to Base64 instantly.";
const slug = "image-to-base64-guide";

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
              name: "Does Base64 encoding increase file size?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Base64 encoding increases the data size by approximately 33%. This happens because Base64 represents binary data using only 64 ASCII characters, so 3 bytes of binary data become 4 bytes of Base64 text. A 30KB image becomes roughly 40KB of Base64 text. This overhead is the main reason Base64 embedding is only recommended for small images.",
              },
            },
            {
              "@type": "Question",
              name: "Is Base64 safe for embedding images in emails?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Base64 is widely used in HTML emails because it allows images to display without requiring the recipient to download external resources. Most modern email clients support Base64 data URIs, though some may block them for security reasons. Keep embedded images small (under 100KB) and always provide alt text as a fallback.",
              },
            },
            {
              "@type": "Question",
              name: "Can I decode a Base64 string back to an image?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Base64 encoding is fully reversible. You can decode a Base64 string back to the original binary image data without any quality loss. In JavaScript, you can use the atob() function to decode Base64, or use an online tool to convert Base64 text back into a downloadable image file.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
