import type { Metadata } from "next";
import { ArticleContent } from "./content";
import { JsonLd } from "@/components/json-ld";

const title = "JSON Formatting and Validation: A Complete Guide";
const description =
  "Learn how to format, validate, and debug JSON data. Syntax highlighting, prettify, minify, and common error fixes.";
const slug = "json-formatting-validation-guide";

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
              name: "What's the difference between JSON and JavaScript?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "JSON is a data format inspired by JavaScript object syntax, but it's language-independent and much more restricted. JSON requires double quotes around keys and string values, doesn't support comments, functions, undefined, or trailing commas. JavaScript objects are a programming construct that can contain functions, use single quotes, and include comments. JSON is a strict subset used for data exchange between any languages.",
              },
            },
            {
              "@type": "Question",
              name: "How do I fix invalid JSON?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The most common JSON errors are: missing or extra commas (especially trailing commas after the last item), single quotes instead of double quotes, unquoted keys, missing closing brackets or braces, and unescaped special characters in strings. Paste your JSON into a validator that shows the exact line and position of the error, then fix one error at a time starting from the first one reported.",
              },
            },
            {
              "@type": "Question",
              name: "Should I minify JSON in production?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For API responses, yes — minified JSON removes whitespace and reduces payload size, which means faster network transfers. For configuration files, no — keep them formatted for readability. Most web servers also support gzip compression, which reduces JSON size by 80-90% regardless of formatting, so the real-world difference is often minimal.",
              },
            },
          ],
        }}
      />
      <ArticleContent />
    </>
  );
}
