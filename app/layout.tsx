import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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

export const metadata: Metadata = {
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
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ConverterUp — Convert Anything. Upload Nothing.",
    description:
      "Convert images and videos instantly, 100% in your browser. No uploads, no servers, no compromises.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
