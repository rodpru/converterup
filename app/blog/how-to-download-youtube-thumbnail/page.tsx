import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Download Any YouTube Thumbnail in HD",
  description:
    "Download YouTube video thumbnails in all resolutions — from 120x90 to 1280x720. Free, instant, no software needed.",
  alternates: {
    canonical: "https://converterup.com/blog/how-to-download-youtube-thumbnail",
  },
  openGraph: {
    title: "How to Download Any YouTube Thumbnail in HD",
    description:
      "Download YouTube video thumbnails in all resolutions — from 120x90 to 1280x720. Free, instant, no software needed.",
    url: "https://converterup.com/blog/how-to-download-youtube-thumbnail",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Download Any YouTube Thumbnail in HD",
    description:
      "Download YouTube video thumbnails in all resolutions — from 120x90 to 1280x720. Free, instant, no software needed.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Download Any YouTube Thumbnail in HD",
          description:
            "Download YouTube video thumbnails in all resolutions — from 120x90 to 1280x720. Free, instant, no software needed.",
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
            "https://converterup.com/blog/how-to-download-youtube-thumbnail",
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
              name: "How to Download Any YouTube Thumbnail in HD",
              item: "https://converterup.com/blog/how-to-download-youtube-thumbnail",
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
              name: "Is it legal to download YouTube thumbnails?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "YouTube thumbnails are publicly accessible images served via Google's CDN. Downloading them for personal reference, blogging (with attribution), or educational purposes is generally considered fair use. However, using someone else's thumbnail commercially without permission could violate copyright.",
              },
            },
            {
              "@type": "Question",
              name: "What resolution is best for YouTube thumbnails?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The maxresdefault (1280x720) version provides the highest quality. If it's not available for a specific video, sddefault (640x480) is the next best option. For small previews, hqdefault (480x360) works well.",
              },
            },
            {
              "@type": "Question",
              name: "Can I download YouTube Shorts thumbnails?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. YouTube Shorts use the same thumbnail URL structure as regular videos. You just need the video ID from the Shorts URL, and you can access all the same resolution variants.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
