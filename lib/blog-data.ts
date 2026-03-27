export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  toolHref: string;
  toolName: string;
  category: "image" | "video" | "developer" | "utility";
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    description:
      "Learn how to reduce image file sizes by up to 80% while keeping them sharp. Free browser-based compression with no uploads required.",
    keyword: "compress images without losing quality",
    toolHref: "/tools/image-compressor",
    toolName: "Image Compressor",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-download-youtube-thumbnail",
    title: "How to Download Any YouTube Thumbnail in HD",
    description:
      "Download YouTube video thumbnails in all resolutions — from 120x90 to 1280x720. Free, instant, no software needed.",
    keyword: "download youtube thumbnail hd",
    toolHref: "/tools/youtube-thumbnail-downloader",
    toolName: "YouTube Thumbnail Downloader",
    category: "video",
    publishedAt: "2026-03-27",
  },
  {
    slug: "png-vs-jpg-vs-webp",
    title: "PNG vs JPG vs WebP: Which Image Format Is Best?",
    description:
      "A clear comparison of PNG, JPG, and WebP formats. When to use each, file size differences, and how to convert between them.",
    keyword: "png vs jpg vs webp",
    toolHref: "/dashboard",
    toolName: "Media Converter",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-convert-mp4-to-gif",
    title: "How to Convert MP4 to GIF Free Online",
    description:
      "Convert any MP4 video clip to an animated GIF directly in your browser. Control frame rate, size, and quality. No upload required.",
    keyword: "convert mp4 to gif free",
    toolHref: "/tools/video-to-gif",
    toolName: "Video to GIF",
    category: "video",
    publishedAt: "2026-03-27",
  },
  {
    slug: "what-is-exif-data",
    title: "What Is EXIF Data and Why You Should Remove It",
    description:
      "EXIF data stores camera settings, GPS location, and more in your photos. Learn what it contains and how to strip it for privacy.",
    keyword: "what is exif data",
    toolHref: "/tools/exif-viewer",
    toolName: "EXIF Viewer & Remover",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "stripe-fees-explained",
    title: "Stripe Fees Explained: How to Calculate Processing Costs",
    description:
      "Understand Stripe's fee structure for USD, EUR, GBP, and BRL. Use our calculator to see exactly what you'll pay and receive.",
    keyword: "calculate stripe fees",
    toolHref: "/tools/stripe-fee-calculator",
    toolName: "Stripe Fee Calculator",
    category: "utility",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-create-qr-code-with-logo",
    title: "How to Create a QR Code with Custom Logo and Colors",
    description:
      "Generate branded QR codes with your logo in the center, custom colors, and high error correction. Free, no sign-up needed.",
    keyword: "qr code with custom logo",
    toolHref: "/tools/qr-code-generator",
    toolName: "QR Code Generator",
    category: "utility",
    publishedAt: "2026-03-27",
  },
  {
    slug: "vtt-vs-srt-subtitles",
    title: "VTT vs SRT: Subtitle Formats Explained",
    description:
      "Understand the differences between WebVTT and SRT subtitle formats, when to use each, and how to convert between them instantly.",
    keyword: "vtt vs srt subtitles",
    toolHref: "/tools/vtt-to-srt",
    toolName: "VTT to SRT Converter",
    category: "utility",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-resize-images-for-social-media",
    title: "How to Resize Images for Every Social Media Platform",
    description:
      "The complete guide to image sizes for Instagram, Twitter, Facebook, LinkedIn, and more. Resize instantly in your browser.",
    keyword: "resize images social media",
    toolHref: "/tools/image-resizer",
    toolName: "Image Resizer",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-extract-frames-from-video",
    title: "How to Extract Frames from a Video as Images",
    description:
      "Capture individual frames from any video file as PNG or JPG. Precision seek controls and batch download as ZIP.",
    keyword: "extract frames from video",
    toolHref: "/tools/video-frame-extractor",
    toolName: "Video Frame Extractor",
    category: "video",
    publishedAt: "2026-03-27",
  },
  {
    slug: "image-to-base64-guide",
    title: "Image to Base64: What It Is and How to Use It",
    description:
      "Learn what Base64 encoding is, when to embed images as data URIs, and how to convert any image to Base64 instantly.",
    keyword: "image to base64",
    toolHref: "/tools/image-to-base64",
    toolName: "Image to Base64",
    category: "developer",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-convert-svg-to-png",
    title: "How to Convert SVG to PNG (and When You Should)",
    description:
      "Convert SVG vector files to PNG raster images with custom scale and background. Understand when each format is the right choice.",
    keyword: "convert svg to png",
    toolHref: "/tools/svg-to-png",
    toolName: "SVG to PNG",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-create-favicon",
    title: "How to Create a Favicon for Your Website",
    description:
      "Generate all favicon sizes from a single image. Includes apple-touch-icon, PWA icons, and the HTML code to add them.",
    keyword: "create favicon for website",
    toolHref: "/tools/favicon-generator",
    toolName: "Favicon Generator",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "how-to-extract-colors-from-image",
    title: "How to Extract a Color Palette from Any Image",
    description:
      "Extract dominant colors from photos and images. Get HEX, RGB, and HSL values for your design projects.",
    keyword: "extract color palette from image",
    toolHref: "/tools/color-palette",
    toolName: "Color Palette Extractor",
    category: "image",
    publishedAt: "2026-03-27",
  },
  {
    slug: "hex-to-decimal-conversion",
    title: "Hex to Decimal Conversion Explained",
    description:
      "Understand hexadecimal numbers and how to convert between hex, decimal, binary, and octal. Includes color code conversion.",
    keyword: "hex to decimal conversion",
    toolHref: "/tools/hex-to-decimal",
    toolName: "Hex to Decimal",
    category: "developer",
    publishedAt: "2026-03-27",
  },
  {
    slug: "json-formatting-validation-guide",
    title: "JSON Formatting and Validation: A Complete Guide",
    description:
      "Learn how to format, validate, and debug JSON data. Syntax highlighting, prettify, minify, and common error fixes.",
    keyword: "format validate json",
    toolHref: "/tools/json-viewer",
    toolName: "JSON Viewer",
    category: "developer",
    publishedAt: "2026-03-27",
  },
];

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === currentSlug);
  if (!current) return blogPosts.slice(0, count);

  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? -1 : 1;
      const bMatch = b.category === current.category ? -1 : 1;
      return aMatch - bMatch;
    })
    .slice(0, count);
}
