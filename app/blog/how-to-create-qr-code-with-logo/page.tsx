import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Create a QR Code with Custom Logo and Colors",
  description:
    "Generate branded QR codes with your logo in the center, custom colors, and high error correction. Free, no sign-up needed.",
  alternates: {
    canonical: "https://converterup.com/blog/how-to-create-qr-code-with-logo",
  },
  openGraph: {
    title: "How to Create a QR Code with Custom Logo and Colors",
    description:
      "Generate branded QR codes with your logo in the center, custom colors, and high error correction. Free, no sign-up needed.",
    url: "https://converterup.com/blog/how-to-create-qr-code-with-logo",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create a QR Code with Custom Logo and Colors",
    description:
      "Generate branded QR codes with your logo in the center, custom colors, and high error correction. Free, no sign-up needed.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Create a QR Code with Custom Logo and Colors",
          description:
            "Generate branded QR codes with your logo in the center, custom colors, and high error correction. Free, no sign-up needed.",
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
            "https://converterup.com/blog/how-to-create-qr-code-with-logo",
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
              name: "How to Create a QR Code with Custom Logo and Colors",
              item: "https://converterup.com/blog/how-to-create-qr-code-with-logo",
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
              name: "Will adding a logo make my QR code unscannable?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not if you use the right error correction level. QR codes with Level H (high) error correction can tolerate up to 30% of the code being obscured. As long as your logo covers less than 25-30% of the QR code area, it will scan reliably on all devices.",
              },
            },
            {
              "@type": "Question",
              name: "What size should the logo be?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The logo should cover no more than 20-25% of the total QR code area for reliable scanning. For a 300x300 pixel QR code, the logo should be roughly 60x60 to 75x75 pixels. Always test with multiple devices after adding a logo.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use any colors for my QR code?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You need sufficient contrast between the foreground (modules) and background for reliable scanning. Dark foreground on light background works best. Avoid light foreground on dark background, low-contrast color pairs, or gradients on the modules themselves. A good rule: maintain at least 40% brightness difference between foreground and background.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
