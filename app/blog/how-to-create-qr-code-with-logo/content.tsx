"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts("how-to-create-qr-code-with-logo");

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
          <span className="text-[#EDEDEF]">
            How to Create a QR Code with Logo
          </span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF]">
              Utility
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
            How to Create a QR Code with Custom Logo and Colors
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            Generate branded QR codes with your logo in the center, custom
            colors, and high error correction. Free, no sign-up needed.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            A plain black-and-white QR code works, but it does not say anything
            about your brand. Adding a logo and custom colors transforms a
            generic square into a branded touchpoint that customers recognize
            and trust. The key to doing this successfully lies in understanding
            QR code error correction — the built-in redundancy that allows a QR
            code to remain scannable even when part of it is covered.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Error Correction Levels Explained
          </h2>
          <p>
            QR codes were designed to work in harsh environments — factory
            floors, damaged labels, partially obscured stickers. They achieve
            this through Reed-Solomon error correction, which encodes redundant
            data that allows scanners to reconstruct the original information
            even when parts of the code are missing or damaged.
          </p>
          <p>There are four error correction levels:</p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#16131E]">
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Level
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Recovery Capacity
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2535]">
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">L (Low)</td>
                  <td className="p-3">~7% damage</td>
                  <td className="p-3 text-[#71717A]">
                    Simple QR codes, clean environments
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">M (Medium)</td>
                  <td className="p-3">~15% damage</td>
                  <td className="p-3 text-[#71717A]">
                    General purpose, no logo
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">Q (Quartile)</td>
                  <td className="p-3">~25% damage</td>
                  <td className="p-3 text-[#71717A]">Small logo overlay</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">H (High)</td>
                  <td className="p-3">~30% damage</td>
                  <td className="p-3 text-[#71717A]">
                    Logo overlay, custom designs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The tradeoff is density: higher error correction means more data
            modules in the QR code, making it slightly larger or denser. But for
            most use cases, Level H is the right choice when you plan to add a
            logo, because it gives you a 30% damage tolerance — more than enough
            for a centered logo.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Why Level H Allows Logos
          </h2>
          <p>
            When you place a logo in the center of a QR code, you are
            effectively &quot;damaging&quot; that portion of the code — the
            scanner cannot read the modules hidden behind the logo. With Level H
            error correction, the scanner can reconstruct up to 30% of the data
            from the remaining visible modules.
          </p>
          <p>
            A logo covering 20% of the QR code area leaves plenty of margin
            within that 30% tolerance. In practice, this means you can place a
            square or circular logo right in the center of a Level H QR code,
            and it will scan reliably on every device.
          </p>
          <p>
            The center is the optimal position because QR codes have three large
            finder patterns in the corners (the three big squares) and alignment
            patterns distributed throughout. Placing the logo in the center
            avoids these critical structural elements.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Best Practices for Logo Size and Placement
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">
                Keep the logo under 25% of the QR area.
              </strong>{" "}
              For a 300x300 QR code, your logo should be no larger than 75x75
              pixels. Going up to 30% works in theory but leaves zero margin for
              error.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Use a simple, high-contrast logo.
              </strong>{" "}
              A detailed logo with many fine lines will be hard to see at QR
              code sizes. Use your logo mark or icon, not the full wordmark.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Add a white (or background-colored) padding around the logo.
              </strong>{" "}
              A small margin between the logo edge and the QR modules improves
              readability for both humans and scanners.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Center the logo precisely.
              </strong>{" "}
              Off-center logos look unprofessional and may overlap with
              alignment patterns or finder patterns, reducing scannability.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Always test after creating.
              </strong>{" "}
              Scan the final QR code with at least 3 different devices (iPhone,
              Android, a tablet) in different lighting conditions.
            </li>
          </ul>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Choosing Colors That Stay Scannable
          </h2>
          <p>
            Color customization makes QR codes more visually appealing, but the
            wrong choices will break them. QR scanners detect the contrast
            between dark modules and light background. Here are the rules:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">
                Dark foreground on light background.
              </strong>{" "}
              This is the standard direction. Dark blue on white, dark green on
              cream, or maroon on light pink all work. Inverting (light modules
              on dark background) fails on many scanners.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Maintain at least 40% brightness difference.
              </strong>{" "}
              A dark navy (#1A1A5E) on white (#FFFFFF) has excellent contrast.
              Medium gray (#808080) on light gray (#D0D0D0) does not.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Avoid gradients on the modules.
              </strong>{" "}
              The modules themselves (the small squares) should be a solid
              color. Gradient backgrounds behind the QR code are fine as long as
              contrast is maintained.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Avoid red and green together.
              </strong>{" "}
              Approximately 8% of males have red-green color blindness.
              Additionally, some scanner algorithms struggle with red/green
              combinations.
            </li>
          </ul>
          <p>
            Need to find the exact hex values from your brand colors? Our{" "}
            <Link
              href="/tools/color-palette"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              Color Palette Extractor
            </Link>{" "}
            can pull colors directly from your logo or brand images.
          </p>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                Generate a Branded QR Code
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Create a QR code with your logo, custom colors, and high error
                correction. Download as PNG or SVG. Free, no account required.
              </p>
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open QR Code Generator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Common Mistakes to Avoid
          </h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">
                Using Level L with a logo.
              </strong>{" "}
              Level L only tolerates 7% damage. Any logo will likely make the
              code unscannable.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Making the QR code too small.
              </strong>{" "}
              Branded QR codes are denser than plain ones (due to Level H).
              Print them at least 2cm x 2cm, ideally 3cm+ for reliable scanning.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Skipping the quiet zone.
              </strong>{" "}
              QR codes need a white border (quiet zone) around them — at least 4
              modules wide. Cropping this border can cause scan failures.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Not testing in real conditions.
              </strong>{" "}
              A QR code that scans on your screen might not scan when printed on
              a dark background, a curved surface, or behind glass.
            </li>
          </ol>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Will adding a logo make my QR code unscannable?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Not if you use Level H error correction and keep the logo
                  under 25% of the QR code area. Level H can recover up to 30%
                  of damaged or obscured data, giving you enough room for a
                  centered logo with margin to spare. Always test with multiple
                  devices after creating your code.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  What size should the logo be?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  The logo should cover no more than 20-25% of the total QR code
                  area. For a 300x300 pixel QR code, that means the logo should
                  be roughly 60x60 to 75x75 pixels. Use your icon or logo mark
                  rather than a full wordmark, and add a small white padding
                  around it.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Can I use any colors for my QR code?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  You need sufficient contrast between the modules (dark
                  squares) and the background. Dark colors on light backgrounds
                  work best. Avoid light-on-dark inversion, low-contrast pairs,
                  and red-green combinations. Maintain at least 40% brightness
                  difference between foreground and background for reliable
                  scanning.
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
