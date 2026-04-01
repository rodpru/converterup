import type { Metadata } from "next";
import { ExifViewer } from "./viewer";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free EXIF Data Viewer & Remover — Check Photo Metadata | ConverterUp",
  description:
    "View and remove EXIF metadata from your photos. See camera model, GPS coordinates, date taken, and more. Strip metadata for privacy. 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/exif-viewer",
  },
  openGraph: {
    title: "Free EXIF Data Viewer & Remover — Check Photo Metadata",
    description:
      "View and remove EXIF metadata from your photos. See camera model, GPS coordinates, date taken, and more. 100% browser-based.",
    url: "https://converterup.com/tools/exif-viewer",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free EXIF Data Viewer & Remover — Check Photo Metadata",
    description:
      "View and remove EXIF metadata from your photos. See camera model, GPS coordinates, date taken, and more. 100% browser-based.",
  },
};

export default function ExifViewerPage() {
  return (
    <>
      <ExifViewer />
      <RelatedGuides toolHref="/tools/exif-viewer" />
    </>
  );
}
