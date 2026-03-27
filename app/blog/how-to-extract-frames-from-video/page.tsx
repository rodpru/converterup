import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "How to Extract Frames from a Video as Images";
const description =
  "Capture individual frames from any video file as PNG or JPG. Precision seek controls and batch download as ZIP.";
const slug = "how-to-extract-frames-from-video";

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
              name: "How many frames are in one second of video?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on the video's frame rate. A standard 30fps video contains 30 frames per second, while cinematic 24fps footage has 24. High-motion content like sports or gaming may be recorded at 60fps or even 120fps. A one-minute 30fps video contains 1,800 individual frames.",
              },
            },
            {
              "@type": "Question",
              name: "Can I extract all frames from a video?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Technically yes, but it's rarely practical. A 10-minute video at 30fps contains 18,000 frames. Extracting all of them produces thousands of image files totaling several gigabytes. In most cases, you should extract specific frames at key moments or use interval-based extraction (e.g., one frame every 5 seconds).",
              },
            },
            {
              "@type": "Question",
              name: "What image format is best for extracted frames?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "PNG is best when you need maximum quality and plan to edit the frames further — it's lossless so no detail is lost. JPG is better when you need smaller file sizes and the frames are for reference or web use. For most thumbnail and storyboard purposes, JPG at 90-95% quality offers the best balance.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
