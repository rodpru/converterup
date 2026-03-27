"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("how-to-convert-svg-to-png");

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
        <span className="text-[#EDEDEF]">How to Convert SVG to PNG</span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Image
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          How to Convert SVG to PNG (and When You Should)
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Convert SVG vector files to PNG raster images with custom scale and
          background. Understand when each format is the right choice.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          SVG and PNG serve fundamentally different purposes. SVG (Scalable
          Vector Graphics) defines images using mathematical paths and shapes,
          which means they can scale to any size without losing sharpness. PNG
          (Portable Network Graphics) stores images as a grid of colored pixels,
          which looks great at its native resolution but degrades when scaled
          up. Understanding when and how to convert between them is a core skill
          for designers and developers.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          SVG vs. PNG: Vector vs. Raster
        </h2>
        <p>
          A vector image like SVG is essentially a set of instructions:
          &ldquo;draw a circle here with this radius, fill it with this
          color.&rdquo; Because these instructions are resolution-independent,
          the image looks perfectly crisp whether it&apos;s displayed at 16
          pixels or 16,000 pixels. SVGs are also typically very small in file
          size for icons, logos, and geometric designs.
        </p>
        <p>
          A raster image like PNG is a grid of pixels where each pixel has a
          specific color value. It looks perfect at its native resolution but
          becomes blurry or pixelated when scaled up because there is no
          additional detail to fill in the new pixels. PNGs excel at
          representing photographs and complex images with gradients, shadows,
          and photographic detail.
        </p>
        <p>
          SVG advantages include infinite scalability, tiny file size for simple
          graphics, editability with code, and animation support. PNG advantages
          include universal compatibility, support for complex imagery, and
          predictable rendering across all platforms. For a broader comparison
          of raster formats, see our guide on{" "}
          <Link
            href="/blog/png-vs-jpg-vs-webp"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            PNG vs JPG vs WebP
          </Link>
          .
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          When You Need PNG Instead of SVG
        </h2>
        <p>
          Despite SVG&apos;s flexibility, there are many situations where PNG is
          required or simply works better:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Social media platforms:</strong>{" "}
            Instagram, Twitter, Facebook, and LinkedIn don&apos;t support SVG
            uploads. You must convert to PNG (or JPG) before posting. Our{" "}
            <Link
              href="/tools/image-resizer"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
            >
              Image Resizer
            </Link>{" "}
            can then adjust dimensions for each platform.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Email newsletters:</strong> Most
            email clients have limited or no SVG support. PNG is the safe choice
            for email images.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Legacy systems:</strong> Older
            software, content management systems, and document formats (like
            Word or PowerPoint) often don&apos;t render SVG correctly. PNG works
            everywhere.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Favicon generation:</strong>{" "}
            While modern browsers support SVG favicons, you still need PNG
            versions for Apple touch icons and older browsers. Our{" "}
            <Link
              href="/tools/favicon-generator"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
            >
              Favicon Generator
            </Link>{" "}
            handles this automatically.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Print workflows:</strong> Many
            print services accept PNG but not SVG, especially for photo products
            like stickers, business cards, and merchandise.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Understanding Scale Factor and Resolution
        </h2>
        <p>
          The most important setting when converting SVG to PNG is the scale
          factor. An SVG has a defined viewport size (for example, 200 &times;
          200 units), and the scale factor determines how many pixels each unit
          becomes:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">1x scale:</strong> A 200-unit SVG
            becomes a 200 &times; 200 pixel PNG. Suitable for standard-density
            screens.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">2x scale:</strong> Produces a 400
            &times; 400 pixel PNG. The recommended default for most use cases,
            as it looks sharp on retina/HiDPI displays while keeping file size
            reasonable.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">3x scale:</strong> Produces a 600
            &times; 600 pixel PNG. Use for extra-high-density displays (like
            modern smartphones) or when you need room to crop.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">4x or higher:</strong> Use for
            print-quality output or when the PNG will be used at very large
            physical sizes.
          </li>
        </ul>
        <p>
          Since the SVG is being rasterized from vector data, there is no
          quality penalty for choosing a higher scale. You&apos;re generating
          new pixels from mathematical curves, not stretching existing ones.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Handling Transparency
        </h2>
        <p>
          SVG files often have transparent backgrounds, and PNG supports
          transparency natively through its alpha channel. When converting, you
          typically have two options:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Preserve transparency:</strong>{" "}
            The PNG maintains the transparent areas from the SVG. This is ideal
            for logos, icons, and graphics that will be placed on various
            backgrounds.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Add a background color:</strong>{" "}
            Fill transparent areas with white, black, or any solid color. This
            is necessary when the target platform doesn&apos;t support
            transparency (like JPG) or when you want a specific background.
          </li>
        </ul>
        <p>
          Be aware that some SVG files may appear to have a white background in
          your browser but actually have a transparent background — the white
          you see is the page behind the SVG. Check by placing the SVG on a dark
          background before converting.
        </p>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Convert SVG to PNG in seconds
          </h3>
          <p className="text-[#71717A] mb-4">
            Drop your SVG file into our converter and choose your scale factor
            and background. Processing runs entirely in your browser — your
            files stay on your device.
          </p>
          <Link
            href="/tools/svg-to-png"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open SVG to PNG
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Will I lose quality converting SVG to PNG?
            </h3>
            <p>
              Not if you export at an appropriate scale. Because SVG is vector,
              you can render it at any resolution you need. Export at 2x or 3x
              for retina-ready output. The only &ldquo;loss&rdquo; is that the
              PNG becomes fixed-resolution — you can&apos;t scale it up further
              without degradation, unlike the original SVG.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What scale factor should I use?
            </h3>
            <p>
              For web use, 2x is the sweet spot — sharp on retina displays
              without excessive file size. For social media, check the
              platform&apos;s required pixel dimensions and calculate the scale
              needed. For print, use 3x or 4x to ensure sufficient DPI.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Can I convert a PNG back to SVG?
            </h3>
            <p>
              Not perfectly. Raster-to-vector conversion (image tracing)
              approximates the pixel grid with vector paths. Simple logos with
              flat colors can trace well, but photographs or complex gradients
              produce poor results. Think of it like converting a painting back
              into a blueprint — the fundamental information is different.
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
