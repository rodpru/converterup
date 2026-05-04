import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Map old tool slugs to new tool paths (maintained from old middleware)
const toolRedirects: Record<string, string> = {
  "stripe-fee-calculator": "/tools/stripe-fee-calculator",
  "youtube-thumbnail-downloader": "/tools/youtube-thumbnail-downloader",
  "text-repeater": "/tools/text-repeater",
  "json-viewer": "/tools/json-viewer",
  "json-formatter": "/tools/json-viewer",
  "hex-to-decimal": "/tools/hex-to-decimal",
  "decimal-to-hex": "/tools/hex-to-decimal",
  "hex-to-text": "/tools/hex-to-decimal",
  "octal-to-hex": "/tools/hex-to-decimal",
  "octal-to-binary": "/tools/hex-to-decimal",
  "binary-to-octal": "/tools/hex-to-decimal",
  "decimal-to-octal": "/tools/hex-to-decimal",
  "vtt-to-srt": "/tools/vtt-to-srt",
  "webp-to-jpg": "/dashboard",
  "webp-to-png": "/dashboard",
  "jpg-converter": "/dashboard",
  "jpg-to-bmp": "/dashboard",
  "uuid-generator": "/tools/uuid-generator",
  "html-minifier": "/tools/html-minifier",
  "css-minifier": "/tools/css-minifier",
  "base64-decode": "/tools/base64-decode",
  "case-converter": "/tools/case-converter",
  "csv-to-json": "/tools/csv-to-json",
  "comma-separator": "/tools/csv-to-json",
  "number-to-word-converter": "/tools/text-repeater",
  "word-to-number-converter": "/tools/text-repeater",
};

// Map old blog slugs...
const blogRedirects: Record<string, string> = {
  "how-to-use-stripe-fee-calculator": "/blog/stripe-fees-explained",
  "stripe-processing-fees-calculator-guide": "/blog/stripe-fees-explained",
  "how-to-use-youtube-thumbnail-downloader":
    "/blog/how-to-download-youtube-thumbnail",
  "how-to-download-youtube-thumbnails-online-in-3-simple-steps":
    "/blog/how-to-download-youtube-thumbnail",
  "how-to-use-json-editor-online": "/blog/json-formatting-validation-guide",
  "how-to-use-json-minify-online": "/blog/json-formatting-validation-guide",
  "how-to-use-webp-to-jpg-converter": "/blog/png-vs-jpg-vs-webp",
  "how-to-use-jpg-converter": "/blog/png-vs-jpg-vs-webp",
  "how-to-use-png-to-ico-converter": "/blog/how-to-create-favicon",
  "how-to-use-hex-to-octal-converter": "/blog/hex-to-decimal-conversion",
  "how-to-use-decimal-to-octal-converter-tool":
    "/blog/hex-to-decimal-conversion",
  "how-to-use-octal-to-binary": "/blog/hex-to-decimal-conversion",
  "how-to-use-csv-to-json-converter": "/tools/csv-to-json",
  "how-to-use-base64-to-image-online": "/tools/base64-decode",
  "how-to-use-html-minifier": "/tools/html-minifier",
  "how-to-use-html-beautifier": "/tools/html-minifier",
  "how-to-use-css-minifier": "/tools/css-minifier",
  "how-to-use-utm-bulider": "/tools",
  "how-to-use-paypal-fee-calculator": "/tools/stripe-fee-calculator",
};

// Legacy locale prefixes that are NOT handled by next-intl (unsupported locales only).
// Supported locales (en, pt, es) are handled exclusively by next-intl.
const LEGACY_LANG_PREFIXES = ["fr", "de", "ar", "ru", "tr", "it", "vi"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and assets (anything with a file extension)
  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  // 1. Handle explicit old hardcoded redirects (preserving old behavior)
  let slug = pathname;
  for (const lang of LEGACY_LANG_PREFIXES) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      slug = pathname.slice(lang.length + 1) || "/";
      break;
    }
  }

  // Tool redirects
  const toolSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  if (toolRedirects[toolSlug]) {
    return NextResponse.redirect(
      new URL(toolRedirects[toolSlug], request.url),
      301,
    );
  }

  // Blog Redirects
  if (toolSlug.startsWith("blog/")) {
    const blogSlug = toolSlug.replace("blog/", "");
    if (blogRedirects[blogSlug]) {
      return NextResponse.redirect(
        new URL(blogRedirects[blogSlug], request.url),
        301,
      );
    }
  }

  // Direct path redirects (without lang prefix)
  if (toolRedirects[pathname.slice(1)]) {
    return NextResponse.redirect(
      new URL(toolRedirects[pathname.slice(1)], request.url),
      301,
    );
  }

  // Static redirects
  const staticRedirects: Record<string, string> = {
    "/report": "/contact",
    "/terms-and-conditions": "/terms",
    "/data-deletion-policy": "/privacy",
    "/dmca-of-converterup": "/contact",
    "/login": "/",
    "/signup": "/",
  };
  const staticSlug = slug.startsWith("/") ? slug : `/${slug}`;
  if (staticRedirects[staticSlug]) {
    return NextResponse.redirect(
      new URL(staticRedirects[staticSlug], request.url),
      301,
    );
  }

  // 2. Blog article paths without locale prefix are always EN (default locale).
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
