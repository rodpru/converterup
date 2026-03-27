"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("how-to-extract-colors-from-image");

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
        <span className="text-[#EDEDEF]">
          How to Extract Colors from an Image
        </span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Image
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          How to Extract a Color Palette from Any Image
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Extract dominant colors from photos and images. Get HEX, RGB, and HSL
          values for your design projects.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          Color is the most immediate element of any design. Before a user reads
          a word of text or recognizes a logo, they register the colors. This is
          why extracting color palettes from images is such a powerful technique
          — it lets you derive harmonious, tested color combinations from
          photographs, artwork, nature, and existing designs rather than
          selecting colors from scratch.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Use Cases for Designers and Developers
        </h2>
        <p>
          Color extraction has applications across every creative discipline:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Brand design:</strong> Extract
            colors from product photography, lifestyle images, or mood boards to
            build a brand palette that feels cohesive with your visual identity.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Web design:</strong> Pull colors
            from a client&apos;s existing materials (photos, printed brochures,
            physical products) to create a website that matches their
            established aesthetic.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Social media:</strong> Match your
            post backgrounds and text colors to the dominant colors of a photo
            for a cohesive look across your feed.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Interior design:</strong>{" "}
            Photograph a room, extract its color palette, and use those values
            to select complementary paint, furniture, or decor.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Competitive analysis:</strong>{" "}
            Screenshot competitor websites or apps and extract their palettes to
            understand design trends in your industry.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          How Color Extraction Algorithms Work
        </h2>
        <p>
          When you extract colors from an image, the tool doesn&apos;t simply
          pick random pixels. It uses clustering algorithms to find the most
          &ldquo;representative&rdquo; colors — the ones that best summarize the
          image&apos;s overall color distribution.
        </p>
        <p>
          The most common algorithm is a simplified version of k-means
          clustering. Here&apos;s how it works conceptually:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Sample the pixels.</strong> The
            algorithm reads the color of every pixel (or a representative
            sample) in the image. A 1000 &times; 1000 image has one million
            pixels, each with its own RGB color value.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Plot in color space.</strong>{" "}
            Each pixel&apos;s color is treated as a point in 3D space, where the
            axes are Red, Green, and Blue (or Hue, Saturation, Lightness).
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Find clusters.</strong> The
            algorithm identifies groups of points that are close together —
            regions of color space where many pixels congregate. A sunset photo
            would have clusters around orange, pink, blue, and dark tones.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Pick the center.</strong> The
            center of each cluster becomes one of the palette colors. It
            represents the &ldquo;average&rdquo; of all similar colors in that
            group.
          </li>
        </ol>
        <p>
          The result is a set of colors that faithfully represent the
          image&apos;s visual character, weighted by how much area each color
          occupies.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          HEX vs. RGB vs. HSL Explained
        </h2>
        <p>
          Color extraction tools typically output colors in multiple formats.
          Understanding the differences helps you use them effectively:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">HEX (#2DD4BF):</strong> A
            six-character hexadecimal code representing Red, Green, and Blue
            values. Each pair of characters is a value from 00 (0) to FF (255).
            This is the most common format in CSS and web design. For more on
            hexadecimal notation, see our{" "}
            <Link
              href="/blog/hex-to-decimal-conversion"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
            >
              hex-to-decimal guide
            </Link>
            .
          </li>
          <li>
            <strong className="text-[#EDEDEF]">RGB (45, 212, 191):</strong>{" "}
            Three decimal values from 0-255 representing Red, Green, and Blue
            channels. Identical information to HEX, just in decimal notation.
            Used in CSS as{" "}
            <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
              rgb(45, 212, 191)
            </code>
            .
          </li>
          <li>
            <strong className="text-[#EDEDEF]">HSL (174, 67%, 50%):</strong> Hue
            (0-360 degrees on the color wheel), Saturation (0-100% intensity),
            and Lightness (0-100% brightness). HSL is the most intuitive format
            for designers because you can reason about it: a hue of 0 is red,
            120 is green, 240 is blue, and you adjust saturation and lightness
            independently.
          </li>
        </ul>
        <p>
          All three formats describe the same colors — they&apos;re just
          different notations. Most design tools accept all three, and
          converting between them is lossless.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Building a Design System from Extracted Colors
        </h2>
        <p>
          Raw extracted colors are a starting point, not a finished palette.
          Here&apos;s how to refine them into a usable design system:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Choose a primary color.</strong>{" "}
            Pick the most vibrant or distinctive extracted color as your
            primary. This becomes your brand anchor — the color for buttons,
            links, and key UI elements.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">
              Create tint and shade scales.
            </strong>{" "}
            From each extracted color, generate lighter tints (by increasing
            lightness in HSL) and darker shades (by decreasing lightness). A
            9-step scale from 50 to 900 gives you the flexibility most design
            systems need.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Add functional neutrals.</strong>{" "}
            Pure extracted colors rarely include the grays you need for text,
            borders, and backgrounds. Create a neutral scale by desaturating one
            of the extracted colors slightly — this produces warmer, more
            cohesive grays than pure black-to-white.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Check contrast ratios.</strong>{" "}
            Every color combination used for text must meet WCAG contrast
            requirements (4.5:1 minimum for normal text). Adjust lightness
            values to pass accessibility checks before finalizing.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Test in context.</strong> Apply
            your palette to actual UI elements — buttons, cards, backgrounds,
            and text — before committing. Colors that look harmonious as
            swatches sometimes clash in practice.
          </li>
        </ul>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Extract colors from any image
          </h3>
          <p className="text-[#71717A] mb-4">
            Drop an image into our Color Palette Extractor and get the dominant
            colors in HEX, RGB, and HSL. Copy values with one click. All
            processing happens in your browser.
          </p>
          <Link
            href="/tools/color-palette"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open Color Palette Extractor
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              How many colors should a palette have?
            </h3>
            <p>
              A practical design palette typically has 5-8 colors: 1-2 primary
              colors, 1-2 accents, and 2-3 neutrals. Extracting 5-6 dominant
              colors from an image usually gives a balanced starting point. You
              can always expand by creating tint and shade variations of each
              core color.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Can I extract colors from screenshots?
            </h3>
            <p>
              Yes. Screenshots are standard image files, so color extraction
              works identically on them. This is a popular workflow for matching
              the color scheme of an existing website or app — take a
              screenshot, extract the palette, and use the values in your own
              project. You can also{" "}
              <Link
                href="/tools/image-compressor"
                className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
              >
                compress the screenshot
              </Link>{" "}
              first if you want to reduce noise in the extraction.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What&apos;s the difference between HEX and RGB?
            </h3>
            <p>
              They represent exactly the same colors in different notation. HEX
              uses hexadecimal (base-16) for each channel — #FF0000 is pure red.
              RGB uses decimal (base-10) — rgb(255, 0, 0) is the same red. HEX
              is more compact and common in CSS. RGB is more human-readable and
              used in many programming languages. They are freely
              interchangeable.
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
