import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Stripe Fees Explained: How to Calculate Processing Costs",
  description:
    "Understand Stripe's fee structure for USD, EUR, GBP, and BRL. Use our calculator to see exactly what you'll pay and receive.",
  alternates: {
    canonical: "https://converterup.com/blog/stripe-fees-explained",
  },
  openGraph: {
    title: "Stripe Fees Explained: How to Calculate Processing Costs",
    description:
      "Understand Stripe's fee structure for USD, EUR, GBP, and BRL. Use our calculator to see exactly what you'll pay and receive.",
    url: "https://converterup.com/blog/stripe-fees-explained",
    siteName: "ConverterUp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Fees Explained: How to Calculate Processing Costs",
    description:
      "Understand Stripe's fee structure for USD, EUR, GBP, and BRL. Use our calculator to see exactly what you'll pay and receive.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Stripe Fees Explained: How to Calculate Processing Costs",
          description:
            "Understand Stripe's fee structure for USD, EUR, GBP, and BRL. Use our calculator to see exactly what you'll pay and receive.",
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
            "https://converterup.com/blog/stripe-fees-explained",
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
              name: "Stripe Fees Explained",
              item: "https://converterup.com/blog/stripe-fees-explained",
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
              name: "Does Stripe charge a monthly fee?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Stripe's standard pricing has no monthly fees, setup fees, or minimum charges. You only pay per transaction. However, some premium features like Stripe Tax, Radar for Fraud Teams, and Stripe Atlas have additional costs.",
              },
            },
            {
              "@type": "Question",
              name: "What about international transaction fees?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Stripe charges an additional 1% for international cards (cards issued outside your country) and another 1% if currency conversion is required. So a US merchant processing a European card in EUR would pay 2.9% + 30¢ + 1% (international) + 1% (conversion) = 4.9% + 30¢ total.",
              },
            },
            {
              "@type": "Question",
              name: "How do refund fees work on Stripe?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "When you issue a refund, Stripe returns the transaction amount to the customer but does not refund the processing fees. For a $100 charge with $3.20 in fees, you'd refund $100 to the customer but the $3.20 fee is not returned to you. This is standard across all major payment processors.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
