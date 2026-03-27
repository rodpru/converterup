"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("how-to-create-favicon");

export function ArticleContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 font-[Inter] text-[#EDEDEF]"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#71717A] mb-8">
        <Link href="/" className="hover:text-[#EDEDEF] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#EDEDEF] transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-[#EDEDEF]">How to Create a Favicon</span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Image
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          How to Create a Favicon for Your Website
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Generate all favicon sizes from a single image. Includes
          apple-touch-icon, PWA icons, and the HTML code to add them.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          A favicon is the small icon that appears in browser tabs, bookmarks,
          history lists, and — increasingly — in search results. Despite its
          tiny size, it plays a significant role in brand recognition and
          professionalism. A missing or broken favicon makes a site look
          unfinished. A well-designed one reinforces your brand every time a
          user glances at their browser tabs.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          What Is a Favicon and Why It Matters
        </h2>
        <p>
          The word &ldquo;favicon&rdquo; is short for &ldquo;favorites
          icon&rdquo; — it originated as the icon shown next to a website in
          Internet Explorer&apos;s favorites (bookmarks) list. Today, favicons
          appear in many more places:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Browser tabs:</strong> The
            primary location. Users with many tabs rely on favicons to identify
            sites at a glance.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Bookmarks bar:</strong> When a
            user bookmarks your site, the favicon appears next to the title.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Home screen icons:</strong> On
            mobile devices, when a user adds your site to their home screen, the
            apple-touch-icon (or PWA icon) is used as the app-like icon.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Google search results:</strong>{" "}
            Google displays favicons next to site URLs in search results,
            increasing visual brand presence.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Browser history:</strong>{" "}
            Favicons help users find previously visited sites in their history.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          All Required Favicon Sizes Explained
        </h2>
        <p>
          Different browsers, operating systems, and devices expect different
          favicon sizes. Here is the complete list you need:
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Browser Favicons
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">16 &times; 16 pixels:</strong>{" "}
            The classic favicon size used in browser tabs. This is the smallest
            and most commonly displayed size.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">32 &times; 32 pixels:</strong>{" "}
            Used for the Windows taskbar, higher-resolution browser tabs, and
            shortcuts. This is the standard .ico size.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">48 &times; 48 pixels:</strong>{" "}
            Used for Windows site shortcuts and some browser contexts.
          </li>
        </ul>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Apple Touch Icon
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">180 &times; 180 pixels:</strong>{" "}
            The apple-touch-icon used when iOS users add your site to their home
            screen. Apple automatically applies rounded corners and a subtle
            shadow. This is the single most important non-browser favicon size.
          </li>
        </ul>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          PWA Icons (Progressive Web App)
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">192 &times; 192 pixels:</strong>{" "}
            Used by Android Chrome for the &ldquo;Add to Home Screen&rdquo;
            feature and in the app launcher.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">512 &times; 512 pixels:</strong>{" "}
            Used in the PWA splash screen that appears while the app loads, and
            in the Android app switcher. This is your highest-resolution icon.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          The HTML Code You Need
        </h2>
        <p>
          Add these lines to the{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            {"<head>"}
          </code>{" "}
          section of your HTML:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto space-y-1">
          <div className="text-[#2DD4BF]">
            {`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`}
          </div>
          <div className="text-[#2DD4BF]">
            {`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`}
          </div>
          <div className="text-[#2DD4BF]">
            {`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}
          </div>
          <div className="text-[#2DD4BF]">
            {`<link rel="manifest" href="/site.webmanifest">`}
          </div>
        </div>
        <p>
          The{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            site.webmanifest
          </code>{" "}
          file references the 192 and 512 pixel icons for PWA support:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#2DD4BF]">
            {`{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Tips for Designing a Good Favicon
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Keep it simple.</strong> At 16
            pixels, fine details disappear. Use bold shapes, a single letter, or
            a simplified version of your logo rather than the full logo.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Use high contrast.</strong> The
            favicon must be recognizable against both light and dark browser
            themes. Test against white, gray, and dark backgrounds.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">
              Start with a square canvas.
            </strong>{" "}
            Favicons are always square. If your logo is horizontal, use just the
            logomark (icon) or first letter rather than trying to squeeze the
            full wordmark into a square.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">
              Consider a subtle background.
            </strong>{" "}
            If your icon is very thin or light-colored, a filled background
            square (like a colored rounded rectangle) improves visibility at
            small sizes.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Test at actual size.</strong>{" "}
            Design at 512 &times; 512 for detail work, but frequently preview at
            16 &times; 16 and 32 &times; 32 to ensure it reads well at those
            sizes. What looks great at 512px may be unrecognizable at 16px.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Match your brand colors.</strong>{" "}
            Use your primary brand color to create instant recognition. If
            you&apos;re unsure about colors, you can{" "}
            <Link
              href="/tools/color-palette"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
            >
              extract your palette
            </Link>{" "}
            from an existing brand asset.
          </li>
        </ul>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Generate all favicon sizes from one image
          </h3>
          <p className="text-[#71717A] mb-4">
            Upload a single image and get every size you need: 16x16, 32x32,
            180x180 apple-touch-icon, 192x192, and 512x512 PWA icons. Plus the
            HTML code to paste into your site.
          </p>
          <Link
            href="/tools/favicon-generator"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open Favicon Generator
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What file format should a favicon be?
            </h3>
            <p>
              Use PNG for all modern favicon sizes. The .ico format is only
              needed for Internet Explorer compatibility, which is rarely a
              concern today. SVG favicons are supported by modern browsers and
              scale perfectly, but you still need PNG fallbacks for Apple
              devices and PWA manifests. If you&apos;re starting from an{" "}
              <Link
                href="/tools/svg-to-png"
                className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
              >
                SVG logo, convert it to PNG
              </Link>{" "}
              at high resolution first.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Do I need all favicon sizes?
            </h3>
            <p>
              At minimum, provide a 32 &times; 32 PNG (or .ico) for browser
              tabs, a 180 &times; 180 PNG for Apple touch icon, and a 192
              &times; 192 PNG for Android. Add the 512 &times; 512 PNG if your
              site is a PWA. Browsers can resize icons, but dedicated sizes
              always look sharper.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              How do I test my favicon?
            </h3>
            <p>
              Open your site in Chrome, Firefox, and Safari and check the
              browser tab. For Apple touch icon, add the page to your
              iPhone&apos;s home screen. For Android, use Chrome&apos;s
              &ldquo;Add to Home Screen&rdquo; option. Use DevTools&apos;
              Network tab to confirm the correct files load. Clear your cache if
              changes don&apos;t appear — browsers cache favicons aggressively.
            </p>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <section className="mt-16 pt-10 border-t border-[#2A2535]">
        <h2 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-6">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors"
            >
              <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF] mb-2">
                {post.category}
              </span>
              <h3 className="text-sm font-[Syne] font-semibold text-[#EDEDEF] group-hover:text-[#2DD4BF] transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </motion.article>
  );
}
