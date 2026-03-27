"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts("png-vs-jpg-vs-webp");

export function ArticleContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24"
    >
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm font-[Inter] text-[#71717A] mb-8 pt-8">
          <Link href="/" className="hover:text-[#EDEDEF] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#EDEDEF] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#EDEDEF]">PNG vs JPG vs WebP</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF]">
              Image
            </span>
            <span className="text-[#71717A]">/</span>
            <time
              dateTime="2026-03-27"
              className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
            >
              Mar 27, 2026
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
            PNG vs JPG vs WebP: Which Image Format Is Best?
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            A clear comparison of PNG, JPG, and WebP formats. When to use each,
            file size differences, and how to convert between them.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            Choosing the right image format is one of those decisions that seems
            minor but has a real impact on page load times, visual quality, and
            storage costs. PNG, JPG (JPEG), and WebP each have distinct
            strengths. This guide breaks down exactly when to use each one, with
            real file size comparisons so you can make informed decisions.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            JPEG: The Photograph Standard
          </h2>
          <p>
            JPEG (Joint Photographic Experts Group) has been the default format
            for photographs since the early 1990s. It uses lossy compression
            that exploits how the human visual system perceives color and
            detail, discarding information you are unlikely to notice.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Best for:</strong> Photographs,
            complex images with many colors and smooth gradients, social media
            uploads, email attachments.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Limitations:</strong> No
            transparency support. Each save/re-encode degrades quality
            (generation loss). Poor at sharp edges and text — you will see
            ringing artifacts around high-contrast boundaries.
          </p>
          <p>
            A typical 12-megapixel photo from a smartphone is around 4-8MB as a
            JPEG at maximum quality. At 80% quality (the standard web
            optimization), it drops to 500KB-1.5MB with virtually no visible
            difference.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            PNG: Pixel-Perfect Precision
          </h2>
          <p>
            PNG (Portable Network Graphics) uses lossless compression, meaning
            every pixel is preserved exactly. It was designed as a patent-free
            replacement for GIF and has become the standard for graphics,
            screenshots, and any image where precision matters.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Best for:</strong> Screenshots,
            logos, icons, graphics with text, images requiring transparency,
            illustrations with flat colors.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Limitations:</strong> File sizes
            are significantly larger than JPEG for photographs. A photo that is
            800KB as JPEG could easily be 5-10MB as PNG. Not practical for
            photo-heavy web pages.
          </p>
          <p>
            PNG comes in two variants: PNG-8 (256 colors, like GIF) and PNG-24
            (16 million colors with full alpha transparency). For simple
            graphics, PNG-8 can produce surprisingly small files. For
            screenshots and complex transparency, PNG-24 is necessary.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            WebP: The Modern Contender
          </h2>
          <p>
            WebP, developed by Google and released in 2010, was designed
            specifically for the web. It supports both lossy and lossless
            compression, transparency, and even animation — essentially
            combining the strengths of JPEG, PNG, and GIF into a single format.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Best for:</strong> Web use in
            general. Any scenario where you want the smallest possible file size
            with good quality.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Limitations:</strong> Not
            universally supported by older image editing software. Some CMS
            platforms and email clients still do not handle WebP. Editing and
            re-saving WebP files is less convenient than JPEG/PNG in traditional
            workflows.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            File Size Comparison
          </h2>
          <p>
            To give you concrete numbers, here is how the three formats compare
            for the same source image (a 1920x1080 photograph):
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#16131E]">
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Format
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Typical Size
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    vs. JPEG
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2535]">
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">JPEG (80%)</td>
                  <td className="p-3">250 KB</td>
                  <td className="p-3 text-[#71717A]">Baseline</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">PNG-24</td>
                  <td className="p-3">1.8 MB</td>
                  <td className="p-3 text-[#71717A]">7x larger</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">
                    WebP (lossy 80%)
                  </td>
                  <td className="p-3">170 KB</td>
                  <td className="p-3 text-[#71717A]">30% smaller</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">
                    WebP (lossless)
                  </td>
                  <td className="p-3">1.2 MB</td>
                  <td className="p-3 text-[#71717A]">33% smaller than PNG</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These numbers tell a clear story: WebP wins on file size in both
            lossy and lossless modes. For a website serving 50 images per page,
            switching from JPEG to WebP can save 2-4MB of bandwidth per page
            load.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Transparency Support
          </h2>
          <p>
            This is where the formats diverge significantly. JPEG has no
            transparency support at all. PNG supports full alpha transparency
            (each pixel can be partially transparent). WebP also supports full
            alpha transparency, matching PNG&apos;s capability while producing
            smaller files.
          </p>
          <p>
            If you need a product photo on a transparent background for an
            e-commerce site, PNG and WebP are your options. WebP will give you a
            30-50% smaller file. If you need the image for print or editing, PNG
            is the safer choice due to universal software support.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Browser Compatibility
          </h2>
          <p>
            JPEG and PNG are supported everywhere — every browser, every email
            client, every operating system, every image editor. There are zero
            compatibility concerns.
          </p>
          <p>
            WebP has reached near-universal browser support. Chrome, Firefox,
            Safari (since version 14), Edge, and Opera all support it, covering
            over 97% of global users. The remaining edge cases are legacy
            systems and very old browser versions.
          </p>
          <p>
            For web projects, the practical approach is to serve WebP as the
            primary format with a JPEG/PNG fallback using the HTML{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              &lt;picture&gt;
            </code>{" "}
            element. Our{" "}
            <Link
              href="/dashboard"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              Media Converter
            </Link>{" "}
            can handle the conversion to generate both versions from a single
            source.
          </p>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                Convert Between Formats Instantly
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Convert PNG, JPG, WebP, AVIF, and more — directly in your
                browser. No uploads, no quality loss during conversion.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open Media Converter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Quick Decision Guide
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">
                Photograph for the web:
              </strong>{" "}
              WebP (lossy) or JPEG at 80% quality.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Logo or icon:</strong> SVG if
              vector, otherwise PNG or lossless WebP.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Screenshot:</strong> PNG for
              archival, WebP for sharing.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Image with transparency:
              </strong>{" "}
              WebP or PNG-24.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Email attachment:</strong> JPEG
              for universal compatibility.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Print:</strong> PNG or TIFF for
              lossless quality.
            </li>
          </ul>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Which format is best for web performance?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  WebP is the best choice for web performance. It produces files
                  25-35% smaller than JPEG at the same visual quality and
                  supports transparency. All major browsers have supported WebP
                  since at least 2020. For the absolute cutting edge, AVIF
                  offers even better compression, but browser support is still
                  catching up.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Does WebP work everywhere now?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  For web browsers, effectively yes. Chrome, Firefox, Safari,
                  Edge, and Opera all support WebP. However, some desktop
                  applications, email clients, and older CMS platforms still do
                  not handle WebP natively. For maximum compatibility outside
                  the browser, JPEG and PNG remain the safest choices.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  When should I use PNG over JPEG?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Use PNG when your image contains text, sharp edges, or
                  transparency. Screenshots, logos, icons, and UI mockups all
                  look better as PNG because JPEG compression creates visible
                  artifacts around sharp boundaries. For photographs and images
                  with smooth gradients, JPEG produces much smaller files with
                  no practical quality difference.
                </p>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF]">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-[Syne] font-semibold text-[#EDEDEF] mt-2 group-hover:text-[#2DD4BF] transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.article>
  );
}
