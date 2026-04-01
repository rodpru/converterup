import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0C0A12" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A12" },
  ],
};

const LOCALE_TO_OG: Record<string, string> = {
  en: "en_US",
  pt: "pt_PT",
  es: "es_ES",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: "ConverterUp — Convert Anything. Upload Nothing.",
      template: "%s | ConverterUp",
    },
    description:
      "Convert images and videos instantly, 100% in your browser. No uploads, no waiting, no limits. Powered by FFmpeg.wasm.",
    metadataBase: new URL("https://converterup.com"),

    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "ConverterUp",
    },

    manifest: "/manifest.json",

    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },

    openGraph: {
      title: "ConverterUp — Convert Anything. Upload Nothing.",
      description:
        "Convert images and videos instantly, 100% in your browser. No uploads, no servers, no compromises.",
      url: "https://converterup.com",
      siteName: "ConverterUp",
      locale: LOCALE_TO_OG[locale] ?? "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "ConverterUp — Convert Anything. Upload Nothing.",
      description:
        "Convert images and videos instantly, 100% in your browser. No uploads, no servers, no compromises.",
    },

    alternates: {
      canonical: "https://converterup.com",
    },

    robots: {
      index: true,
      follow: true,
    },

    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
