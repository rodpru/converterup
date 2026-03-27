import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "VTT vs SRT: Subtitle Formats Explained",
  description:
    "Understand the differences between WebVTT and SRT subtitle formats, when to use each, and how to convert between them instantly.",
  alternates: {
    canonical: "https://converterup.com/blog/vtt-vs-srt-subtitles",
  },
  openGraph: {
    title: "VTT vs SRT: Subtitle Formats Explained",
    description:
      "Understand the differences between WebVTT and SRT subtitle formats, when to use each, and how to convert between them instantly.",
    url: "https://converterup.com/blog/vtt-vs-srt-subtitles",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "VTT vs SRT: Subtitle Formats Explained",
    description:
      "Understand the differences between WebVTT and SRT subtitle formats, when to use each, and how to convert between them instantly.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "VTT vs SRT: Subtitle Formats Explained",
          description:
            "Understand the differences between WebVTT and SRT subtitle formats, when to use each, and how to convert between them instantly.",
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
          mainEntityOfPage: "https://converterup.com/blog/vtt-vs-srt-subtitles",
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
              name: "VTT vs SRT: Subtitle Formats Explained",
              item: "https://converterup.com/blog/vtt-vs-srt-subtitles",
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
              name: "Which subtitle format does YouTube use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "YouTube supports both SRT and VTT for uploads, but internally uses a proprietary format. When you download auto-generated captions, YouTube provides them in SRT format. For manual uploads, both SRT and VTT work equally well.",
              },
            },
            {
              "@type": "Question",
              name: "Can I add styling to SRT subtitles?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "SRT has very limited styling support. Some players recognize basic HTML tags like <b>, <i>, and <u> within SRT files, but this is not standardized and many players ignore them. If you need styled subtitles, use WebVTT, which has built-in support for CSS-like styling, positioning, and color.",
              },
            },
            {
              "@type": "Question",
              name: "How do I convert between VTT and SRT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The conversion is straightforward since both formats share the same basic structure (timestamps and text). The main differences are the header (WEBVTT vs numbered cues), timestamp separator (. vs ,), and styling tags. Use our free VTT to SRT converter tool for instant conversion in your browser.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
