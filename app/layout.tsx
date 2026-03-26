import type { Metadata, Viewport } from "next";
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
    default: "Recast — Convert Anything. Upload Nothing.",
    template: "%s | Recast",
  },
  description:
    "Convert images and videos instantly, 100% in your browser. No uploads, no waiting, no limits. Powered by FFmpeg.wasm.",
  metadataBase: new URL("https://recast.media"),

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Recast",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "Recast — Convert Anything. Upload Nothing.",
    description:
      "Convert images and videos instantly, 100% in your browser. No uploads, no servers, no compromises.",
    url: "https://recast.media",
    siteName: "Recast",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Recast — Convert Anything. Upload Nothing.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
