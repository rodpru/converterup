export interface Conversion {
  slug: string;
  fromFormat: string;
  toFormat: string;
  toolSlug: string;
  category: "image" | "video" | "text" | "data";
}

export const conversions: Conversion[] = [
  // Image format conversions (highest volume)
  {
    slug: "png-to-jpg",
    fromFormat: "PNG",
    toFormat: "JPG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "jpg-to-png",
    fromFormat: "JPG",
    toFormat: "PNG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "png-to-webp",
    fromFormat: "PNG",
    toFormat: "WebP",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "jpg-to-webp",
    fromFormat: "JPG",
    toFormat: "WebP",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "webp-to-png",
    fromFormat: "WebP",
    toFormat: "PNG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "webp-to-jpg",
    fromFormat: "WebP",
    toFormat: "JPG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "png-to-avif",
    fromFormat: "PNG",
    toFormat: "AVIF",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "jpg-to-avif",
    fromFormat: "JPG",
    toFormat: "AVIF",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "avif-to-jpg",
    fromFormat: "AVIF",
    toFormat: "JPG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "avif-to-png",
    fromFormat: "AVIF",
    toFormat: "PNG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "bmp-to-png",
    fromFormat: "BMP",
    toFormat: "PNG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "tiff-to-jpg",
    fromFormat: "TIFF",
    toFormat: "JPG",
    toolSlug: "image-compressor",
    category: "image",
  },
  {
    slug: "svg-to-png",
    fromFormat: "SVG",
    toFormat: "PNG",
    toolSlug: "svg-to-png",
    category: "image",
  },
  {
    slug: "svg-to-jpg",
    fromFormat: "SVG",
    toFormat: "JPG",
    toolSlug: "svg-to-png",
    category: "image",
  },
  // Video format conversions
  {
    slug: "mp4-to-gif",
    fromFormat: "MP4",
    toFormat: "GIF",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "webm-to-gif",
    fromFormat: "WebM",
    toFormat: "GIF",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "mov-to-gif",
    fromFormat: "MOV",
    toFormat: "GIF",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "avi-to-gif",
    fromFormat: "AVI",
    toFormat: "GIF",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "mov-to-mp4",
    fromFormat: "MOV",
    toFormat: "MP4",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "webm-to-mp4",
    fromFormat: "WebM",
    toFormat: "MP4",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "avi-to-mp4",
    fromFormat: "AVI",
    toFormat: "MP4",
    toolSlug: "video-to-gif",
    category: "video",
  },
  {
    slug: "mp4-to-webm",
    fromFormat: "MP4",
    toFormat: "WebM",
    toolSlug: "video-to-gif",
    category: "video",
  },
  // Text / data conversions
  {
    slug: "csv-to-json",
    fromFormat: "CSV",
    toFormat: "JSON",
    toolSlug: "csv-to-json",
    category: "data",
  },
  {
    slug: "vtt-to-srt",
    fromFormat: "VTT",
    toFormat: "SRT",
    toolSlug: "vtt-to-srt",
    category: "text",
  },
  {
    slug: "image-to-base64",
    fromFormat: "Image",
    toFormat: "Base64",
    toolSlug: "image-to-base64",
    category: "data",
  },
  {
    slug: "base64-to-image",
    fromFormat: "Base64",
    toFormat: "Image",
    toolSlug: "base64-decode",
    category: "data",
  },
  {
    slug: "hex-to-decimal",
    fromFormat: "Hex",
    toFormat: "Decimal",
    toolSlug: "hex-to-decimal",
    category: "data",
  },
  {
    slug: "decimal-to-hex",
    fromFormat: "Decimal",
    toFormat: "Hex",
    toolSlug: "hex-to-decimal",
    category: "data",
  },
  {
    slug: "binary-to-decimal",
    fromFormat: "Binary",
    toFormat: "Decimal",
    toolSlug: "hex-to-decimal",
    category: "data",
  },
  {
    slug: "decimal-to-binary",
    fromFormat: "Decimal",
    toFormat: "Binary",
    toolSlug: "hex-to-decimal",
    category: "data",
  },
];

export function getConversion(slug: string): Conversion | undefined {
  return conversions.find((c) => c.slug === slug);
}

export function getRelatedConversions(
  slug: string,
  limit = 4,
): Conversion[] {
  const target = getConversion(slug);
  if (!target) return [];
  return conversions
    .filter(
      (c) =>
        c.slug !== slug &&
        (c.toolSlug === target.toolSlug ||
          c.fromFormat === target.fromFormat ||
          c.toFormat === target.toFormat ||
          c.category === target.category),
    )
    .slice(0, limit);
}
