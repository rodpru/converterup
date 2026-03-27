import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Convert MP4 to GIF Free Online",
  description:
    "Convert any MP4 video clip to an animated GIF directly in your browser. Control frame rate, size, and quality. No upload required.",
  alternates: {
    canonical: "https://converterup.com/blog/how-to-convert-mp4-to-gif",
  },
  openGraph: {
    title: "How to Convert MP4 to GIF Free Online",
    description:
      "Convert any MP4 video clip to an animated GIF directly in your browser. Control frame rate, size, and quality. No upload required.",
    url: "https://converterup.com/blog/how-to-convert-mp4-to-gif",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert MP4 to GIF Free Online",
    description:
      "Convert any MP4 video clip to an animated GIF directly in your browser. Control frame rate, size, and quality. No upload required.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Convert MP4 to GIF Free Online",
          description:
            "Convert any MP4 video clip to an animated GIF directly in your browser. Control frame rate, size, and quality. No upload required.",
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
            "https://converterup.com/blog/how-to-convert-mp4-to-gif",
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
              name: "How to Convert MP4 to GIF Free Online",
              item: "https://converterup.com/blog/how-to-convert-mp4-to-gif",
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
              name: "Why is my GIF so large?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GIF files store each frame as a full image, unlike video formats which use inter-frame compression. A 10-second video at 30fps becomes 300 individual images. To reduce size: lower the frame rate to 10-15fps, reduce width to 480px or less, and keep duration under 5 seconds.",
              },
            },
            {
              "@type": "Question",
              name: "What frame rate is best for GIFs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "10-15fps is ideal for most GIFs. This provides smooth enough motion while keeping file sizes manageable. 10fps works well for screen recordings and tutorials, while 15fps is better for action or reaction clips. Going above 20fps rarely adds perceived smoothness but dramatically increases file size.",
              },
            },
            {
              "@type": "Question",
              name: "Can I convert long videos to GIF?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Technically yes, but the results will be impractical. A 60-second video at 15fps and 480px width can easily produce a 50MB+ GIF. Keep GIFs under 10 seconds for reasonable file sizes. For longer clips, consider using MP4 with autoplay and loop attributes, which achieves the same visual effect at 1/10th the file size.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
