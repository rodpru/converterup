import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/lib/polyfills';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Separate viewport export (Next.js 14+ requirement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // For notched devices
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFCF8' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'PDF Pocket Knife',
    template: '%s | PDF Pocket Knife',
  },
  description:
    'The ultimate tool for all your PDF needs. Merge, split, edit, and sign PDFs with ease.',
  metadataBase: new URL('https://pdf-pocket-knife.com'),

  // Mobile web app capabilities
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PDF Pocket Knife',
  },

  // PWA manifest
  manifest: '/manifest.json',

  openGraph: {
    title: 'PDF Pocket Knife',
    description:
      'The ultimate tool for all your PDF needs. Merge, split, edit, and sign PDFs with ease.',
    url: 'https://pdf-pocket-knife.com',
    siteName: 'PDF Pocket Knife',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PDF Pocket Knife',
    description:
      'The ultimate tool for all your PDF needs. Merge, split, edit, and sign PDFs with ease.',
  },

  robots: {
    index: true,
    follow: true,
  },

  // Additional mobile optimization
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
