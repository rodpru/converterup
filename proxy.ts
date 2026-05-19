import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Map old tool/format slugs to current paths.
// Targets prefer /convert/<slug> or /tools/<slug>. Never redirect to /dashboard
// (disallowed in robots.txt — Google treats redirect chain as error).
const toolRedirects: Record<string, string> = {
  // Tools (kept from previous version)
  "stripe-fee-calculator": "/tools/stripe-fee-calculator",
  "paypal-fee-calculator": "/tools/stripe-fee-calculator",
  "youtube-thumbnail-downloader": "/tools/youtube-thumbnail-downloader",
  "text-repeater": "/tools/text-repeater",
  "json-viewer": "/tools/json-viewer",
  "json-formatter": "/tools/json-viewer",
  "json-editor": "/tools/json-viewer",
  "json-minify": "/tools/json-viewer",
  "html-minifier": "/tools/html-minifier",
  "html-beautifier": "/tools/html-minifier",
  "css-minifier": "/tools/css-minifier",
  "css-beautifier": "/tools/css-minifier",
  "base64-decode": "/tools/base64-decode",
  "base64-encode": "/tools/base64-decode",
  "case-converter": "/tools/case-converter",
  "csv-to-json": "/tools/csv-to-json",
  "xml-to-json": "/tools/csv-to-json",
  "comma-separator": "/tools/csv-to-json",
  "uuid-generator": "/tools/uuid-generator",
  "qr-code-generator": "/tools/qr-code-generator",
  "vtt-to-srt": "/tools/vtt-to-srt",
  "srt-to-vtt": "/tools/vtt-to-srt",
  "image-resizer": "/tools/image-resizer",
  "image-compressor": "/tools/image-compressor",
  "image-converter": "/tools",
  "image-to-base64": "/tools/image-to-base64",
  "base64-to-image": "/tools/base64-decode",
  "color-palette": "/tools/color-palette",
  "favicon-generator": "/tools/favicon-generator",
  "exif-viewer": "/tools/exif-viewer",
  "video-to-gif": "/tools/video-to-gif",
  "video-frame-extractor": "/tools/video-frame-extractor",
  "rotate-image": "/tools/image-resizer",
  "flip-image": "/tools/image-resizer",
  "heic-to-jpg": "/tools/heic-to-jpg",
  "heic-to-pdf": "/tools/heic-to-pdf",
  // Hex/decimal family
  "hex-to-decimal": "/tools/hex-to-decimal",
  "decimal-to-hex": "/tools/hex-to-decimal",
  "hex-to-text": "/tools/hex-to-decimal",
  "text-to-hex": "/tools/hex-to-decimal",
  "octal-to-hex": "/tools/hex-to-decimal",
  "hex-to-octal": "/tools/hex-to-decimal",
  "octal-to-binary": "/tools/hex-to-decimal",
  "binary-to-octal": "/tools/hex-to-decimal",
  "decimal-to-octal": "/tools/hex-to-decimal",
  "octal-to-decimal": "/tools/hex-to-decimal",
  "binary-to-decimal": "/tools/hex-to-decimal",
  "decimal-to-binary": "/tools/hex-to-decimal",
  // Image format legacy slugs → /convert/<slug>
  "webp-to-jpg": "/convert/webp-to-jpg",
  "webp-to-png": "/convert/webp-to-png",
  "png-to-webp": "/convert/png-to-webp",
  "png-to-jpg": "/convert/png-to-jpg",
  "jpg-to-png": "/convert/jpg-to-png",
  "jpg-to-webp": "/convert/jpg-to-webp",
  "svg-to-png": "/convert/svg-to-png",
  "svg-to-jpg": "/convert/svg-to-jpg",
  "png-to-ico": "/tools/favicon-generator",
  "png-to-gif": "/convert/mp4-to-gif",
  "jpg-converter": "/tools",
  "jpg-to-bmp": "/tools",
  // Calculators not implemented → /tools galeria
  "cpm-calculator": "/tools",
  "tdee-calculator": "/tools",
  "margin-calculator": "/tools",
  "area-converter": "/tools",
  "temperature-converter": "/tools",
  "sales-tax-calculator": "/tools/stripe-fee-calculator",
  "probability-calculator": "/tools",
  // Text/number tools
  "number-to-word-converter": "/tools/text-repeater",
  "word-to-number-converter": "/tools/text-repeater",
};

// Map old blog slugs to current blog/tool paths.
const blogRedirects: Record<string, string> = {
  "how-to-use-stripe-fee-calculator": "/blog/stripe-fees-explained",
  "stripe-processing-fees-calculator-guide": "/blog/stripe-fees-explained",
  "how-to-use-youtube-thumbnail-downloader":
    "/blog/how-to-download-youtube-thumbnail",
  "how-to-download-youtube-thumbnails-online-in-3-simple-steps":
    "/blog/how-to-download-youtube-thumbnail",
  "how-to-use-json-editor-online": "/blog/json-formatting-validation-guide",
  "how-to-use-json-minify-online": "/blog/json-formatting-validation-guide",
  "how-to-use-jason-minify": "/blog/json-formatting-validation-guide",
  "how-to-use-webp-to-jpg-converter": "/blog/png-vs-jpg-vs-webp",
  "how-to-use-webp-to-png-converter": "/blog/png-vs-jpg-vs-webp",
  "how-to-use-png-to-webp-converter": "/blog/png-vs-jpg-vs-webp",
  "how-to-use-jpg-converter": "/blog/png-vs-jpg-vs-webp",
  "how-to-use-png-to-ico-converter": "/blog/how-to-create-favicon",
  "how-to-use-hex-to-octal-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-decimal-to-octal-converter-tool":
    "/blog/hex-to-decimal-conversion",
  "how-to-use-decimal-to-octal-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-decimal-to-hex-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-hex-to-decimal-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-octal-to-binary": "/blog/hex-to-decimal-conversion",
  "how-to-use-octal-to-decimal-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-octal-to-decimal-converter-tool":
    "/blog/hex-to-decimal-conversion",
  "how-to-use-binary-to-octal-converter-tool":
    "/blog/hex-to-decimal-conversion",
  "how-to-use-text-to-hex-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-csv-to-json-converter": "/tools/csv-to-json",
  "how-to-use-xml-to-json-converter": "/tools/csv-to-json",
  "how-to-use-base64-to-image-online": "/tools/base64-decode",
  "how-to-use-base64-decode": "/tools/base64-decode",
  "how-to-use-image-to-base64-converter": "/tools/image-to-base64",
  "how-to-use-html-minifier": "/tools/html-minifier",
  "how-to-use-html-beautifier": "/tools/html-minifier",
  "how-to-use-css-minifier": "/tools/css-minifier",
  "how-to-use-css-beautifier": "/tools/css-minifier",
  "how-to-use-utm-bulider": "/tools",
  "how-to-use-paypal-fee-calculator": "/tools/stripe-fee-calculator",
  "how-to-use-srt-to-vtt-converter": "/tools/vtt-to-srt",
  "how-to-convert-vtt-to-srt": "/tools/vtt-to-srt",
  "how-to-use-margin-calculator": "/tools",
  "how-to-use-case-converter-tool": "/tools/case-converter",
  "how-to-use-number-to-word-converter": "/tools/text-repeater",
  "how-to-use-number-to-word-converter-2": "/tools/text-repeater",
  "how-to-use-sales-tax-calculator": "/tools/stripe-fee-calculator",
  "how-to-use-png-to-gif-converter": "/blog/png-vs-jpg-vs-webp",
  "hoe-to-use-flip-image": "/tools/image-resizer",
  "top-5-ways-the-text-repeater-tool-can-boost-your-productivity":
    "/tools/text-repeater",
  // Lorem-ipsum placeholder posts from old site → kill
  "the-storms-of-the-waves": "/blog",
  "lovely-and-cosy-apartment": "/blog",
  "what-is-lorem-ipsum": "/blog",
};

// Static legacy paths → current equivalents.
const staticRedirects: Record<string, string> = {
  "/report": "/contact",
  "/terms-and-conditions": "/terms",
  "/data-deletion-policy": "/privacy",
  "/dmca-of-converterup": "/contact",
  "/dmca": "/contact",
  "/disclaimer": "/privacy",
  "/cookie-policy": "/privacy",
  "/privacy-policy": "/privacy",
  "/login": "/",
  "/signup": "/",
  "/register": "/",
  "/forgot-password": "/",
  "/sumowebtools": "/",
};

// Legacy locale prefixes from previous version of site. Not handled by next-intl.
// Strip prefix and try to map slug. If no match, redirect to root.
const LEGACY_LANG_PREFIXES = ["fr", "de", "ar", "ru", "tr", "it", "vi"];

// Convert slug synonyms — .jpeg and .jpg are the same format. Consolidate
// link equity by 301-redirecting jpeg variants to the canonical jpg slug.
const CONVERT_SYNONYMS: Record<string, string> = {
  "jpeg-to-png": "jpg-to-png",
  "png-to-jpeg": "png-to-jpg",
  "jpeg-to-webp": "jpg-to-webp",
  "webp-to-jpeg": "webp-to-jpg",
  "jpeg-to-avif": "jpg-to-avif",
  "avif-to-jpeg": "avif-to-jpg",
  "heic-to-jpeg": "heic-to-jpg",
  "heif-to-jpeg": "heif-to-jpg",
  "svg-to-jpeg": "svg-to-jpg",
  "tiff-to-jpeg": "tiff-to-jpg",
};

function redirect301(url: URL): NextResponse {
  return NextResponse.redirect(url, 301);
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and assets (anything with a file extension)
  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Lowercase the path for matching — handles legacy CamelCase URLs like
  // /PayPal-Fee-Calculator or /Temperature-Converter.
  const lowerPath = pathname.toLowerCase();

  // 1. Strip legacy unsupported locale prefix if present.
  let slug = lowerPath;
  let isLegacyLocale = false;
  for (const lang of LEGACY_LANG_PREFIXES) {
    if (lowerPath === `/${lang}` || lowerPath === `/${lang}/`) {
      // Legacy locale root → homepage
      return redirect301(new URL("/", request.url));
    }
    if (lowerPath.startsWith(`/${lang}/`)) {
      slug = lowerPath.slice(lang.length + 1); // "/<rest>"
      isLegacyLocale = true;
      break;
    }
  }

  // Normalize slug to "thing" (no leading slash) for map lookups
  const slugKey = slug.startsWith("/") ? slug.slice(1) : slug;

  // 2. Tool redirects (also handles non-prefixed paths like /jpg-converter)
  if (toolRedirects[slugKey]) {
    return redirect301(new URL(toolRedirects[slugKey], request.url));
  }

  // 3. Blog redirects (/blog/<slug> or /<lang>/blog/<slug>)
  if (slugKey.startsWith("blog/")) {
    const blogSlug = slugKey.slice("blog/".length);
    if (blogRedirects[blogSlug]) {
      return redirect301(new URL(blogRedirects[blogSlug], request.url));
    }
    // Legacy locale + unknown blog slug → /blog
    if (isLegacyLocale) {
      return redirect301(new URL("/blog", request.url));
    }
  }

  // 4. Static redirects
  if (staticRedirects[slug]) {
    return redirect301(new URL(staticRedirects[slug], request.url));
  }

  // 5. Legacy locale fallback — any unmatched path under /fr, /de, etc. → /
  if (isLegacyLocale) {
    return redirect301(new URL("/", request.url));
  }

  // 6. Convert slug synonyms — strip optional locale prefix, match against
  //    CONVERT_SYNONYMS, redirect to canonical /convert/<slug> path.
  const convertMatch = pathname.match(
    /^\/(?:(en|pt|es)\/)?convert\/([a-z0-9-]+)\/?$/i,
  );
  if (convertMatch) {
    const localePrefix = convertMatch[1] ? `/${convertMatch[1]}` : "";
    const synonym = convertMatch[2].toLowerCase();
    if (CONVERT_SYNONYMS[synonym]) {
      return redirect301(
        new URL(
          `${localePrefix}/convert/${CONVERT_SYNONYMS[synonym]}`,
          request.url,
        ),
      );
    }
  }

  // 7. Blog article paths without locale prefix are always EN (default locale).
  //    Slugs are language-specific, so prevent next-intl from redirecting
  //    e.g. /blog/how-to-convert-svg-to-png → /pt/blog/how-to-convert-svg-to-png (wrong!)
  if (/^\/blog\/[^/]+$/.test(pathname)) {
    request.cookies.set("NEXT_LOCALE", "en");
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|monitoring|.*\\..*).*)"],
};
