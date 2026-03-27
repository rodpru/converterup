import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "How to Create a Favicon for Your Website";
const description =
  "Generate all favicon sizes from a single image. Includes apple-touch-icon, PWA icons, and the HTML code to add them.";
const slug = "how-to-create-favicon";

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
              name: "What file format should a favicon be?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Modern browsers support PNG favicons natively. The traditional .ico format is only needed for legacy Internet Explorer support. Use PNG for all modern favicon sizes (16x16, 32x32, 180x180, 192x192, 512x512). SVG favicons are also supported by modern browsers and scale perfectly to any size, but you still need PNG fallbacks for Apple devices and older browsers.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need all favicon sizes?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "At minimum, you need: favicon.ico (32x32 for legacy browsers), a 180x180 PNG for Apple touch icon, and a 192x192 PNG for Android/Chrome. For full PWA support, add a 512x512 PNG. While browsers will resize a single icon, providing dedicated sizes ensures the sharpest appearance everywhere.",
              },
            },
            {
              "@type": "Question",
              name: "How do I test my favicon?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Open your site in multiple browsers and check the browser tab for the favicon. For Apple touch icon, add the page to your iPhone home screen. For Android, use Chrome's 'Add to Home Screen' feature. Use browser DevTools (Network tab) to verify the correct favicon files are being loaded. Clear your browser cache if changes don't appear immediately.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
