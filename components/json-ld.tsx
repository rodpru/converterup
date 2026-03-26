export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ConverterUp",
  url: "https://converterup.com",
  description:
    "Convert images and videos instantly, 100% in your browser. No uploads, no servers, no compromises.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://converterup.com/dashboard",
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ConverterUp",
  url: "https://converterup.com",
  logo: "https://converterup.com/logo.svg",
  sameAs: [],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ConverterUp",
  url: "https://converterup.com",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (browser-based)",
  description:
    "Browser-based media converter powered by FFmpeg.wasm. Convert images and videos client-side with zero uploads.",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free",
      description: "3 conversions per day, all formats, no watermarks",
    },
    {
      "@type": "Offer",
      price: "5",
      priceCurrency: "USD",
      name: "Unlimited",
      description: "Unlimited conversions, priority support",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "5",
        priceCurrency: "USD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
    },
  ],
  featureList: [
    "Image conversion: PNG, JPG, WebP, AVIF, GIF, TIFF, BMP",
    "Video conversion: MP4, WebM, MKV, AVI, MOV",
    "Audio extraction: MP3, AAC, WAV, OGG",
    "Quality and resolution control",
    "100% client-side processing",
    "No file uploads required",
    "Mobile-friendly",
  ],
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is my data safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All file processing happens entirely in your browser using WebAssembly (FFmpeg.wasm). Your files are never uploaded to any server. They stay on your device at all times.",
      },
    },
    {
      "@type": "Question",
      name: "What formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Images: PNG, JPG, WebP, AVIF, GIF, TIFF, BMP. Videos: MP4, WebM, MKV, AVI, MOV. Audio extraction: MP3, AAC, WAV, OGG. We're constantly adding more formats.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Since processing happens in your browser, the limit depends on your device's memory. Most modern devices handle files up to 500MB for images and 1-2GB for videos without issues.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use it on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! ConverterUp is fully responsive and optimized for mobile devices. All conversion features work on smartphones and tablets, though very large files may perform better on desktop.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use ConverterUp without an account for basic conversions. Creating a free account unlocks daily conversion tracking and the ability to upgrade to unlimited.",
      },
    },
    {
      "@type": "Question",
      name: "How does pricing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free users get 3 conversions per day. For unlimited conversions, you can upgrade to the Unlimited plan at $5/month. Cancel anytime.",
      },
    },
  ],
};
