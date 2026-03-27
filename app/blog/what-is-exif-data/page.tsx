import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What Is EXIF Data and Why You Should Remove It",
  description:
    "EXIF data stores camera settings, GPS location, and more in your photos. Learn what it contains and how to strip it for privacy.",
  alternates: {
    canonical: "https://converterup.com/blog/what-is-exif-data",
  },
  openGraph: {
    title: "What Is EXIF Data and Why You Should Remove It",
    description:
      "EXIF data stores camera settings, GPS location, and more in your photos. Learn what it contains and how to strip it for privacy.",
    url: "https://converterup.com/blog/what-is-exif-data",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is EXIF Data and Why You Should Remove It",
    description:
      "EXIF data stores camera settings, GPS location, and more in your photos. Learn what it contains and how to strip it for privacy.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Is EXIF Data and Why You Should Remove It",
          description:
            "EXIF data stores camera settings, GPS location, and more in your photos. Learn what it contains and how to strip it for privacy.",
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
          mainEntityOfPage: "https://converterup.com/blog/what-is-exif-data",
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
              name: "What Is EXIF Data and Why You Should Remove It",
              item: "https://converterup.com/blog/what-is-exif-data",
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
              name: "Do screenshots have EXIF data?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Screenshots contain minimal EXIF data — typically just the date, time, and device/software information. They do not contain GPS coordinates, camera settings, or lens information since no physical camera was involved. However, the device model and OS version may still be present.",
              },
            },
            {
              "@type": "Question",
              name: "Does WhatsApp remove EXIF data?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. WhatsApp strips all EXIF data from photos when you send them as regular messages. However, if you send a photo as a document (using the document attachment option), the original EXIF data is preserved. The same applies to Telegram's 'send as file' feature.",
              },
            },
            {
              "@type": "Question",
              name: "Can EXIF data reveal my location?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. If your phone's camera has location services enabled, every photo stores precise GPS coordinates in the EXIF data — accurate to within a few meters. This can reveal your home address, workplace, or other sensitive locations. Always strip EXIF data before sharing photos publicly.",
              },
            },
            {
              "@type": "Question",
              name: "Which social media platforms strip EXIF data?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Facebook, Instagram, Twitter/X, and WhatsApp all strip EXIF data from uploaded photos. However, these platforms may still read and store the location data on their servers before removing it from the public image. LinkedIn and some forums do not strip EXIF data.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
