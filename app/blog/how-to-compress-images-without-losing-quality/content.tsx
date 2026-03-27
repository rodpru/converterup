"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts(
  "how-to-compress-images-without-losing-quality",
);

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
            How to Compress Images Without Losing Quality
          </span>
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
            How to Compress Images Without Losing Quality
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            Learn how to reduce image file sizes by up to 80% while keeping them
            sharp. Free browser-based compression with no uploads required.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            Large images slow down websites, eat through mobile data, and get
            rejected by email clients. The good news is that you can shrink most
            images by 50-80% without any visible difference to the human eye.
            The key is understanding the difference between lossy and lossless
            compression, and choosing the right approach for your use case.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Lossy vs. Lossless Compression
          </h2>
          <p>
            Every image compression technique falls into one of two categories:
            lossy or lossless. Understanding the difference is fundamental to
            making smart decisions about your images.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Lossless compression</strong>{" "}
            reduces file size without discarding any image data. Think of it
            like zipping a file: every single pixel is preserved perfectly. PNG
            uses lossless compression by default, which is why PNG files tend to
            be larger than their JPEG counterparts. When you decompress a
            losslessly compressed image, you get back the exact original, bit
            for bit.
          </p>
          <p>
            <strong className="text-[#EDEDEF]">Lossy compression</strong>{" "}
            achieves much smaller files by permanently removing data that is
            difficult for the human eye to perceive. JPEG is the most common
            lossy format. It exploits the fact that our eyes are far more
            sensitive to changes in brightness than to changes in color. By
            selectively reducing color precision in areas of gradual transition,
            JPEG can cut file sizes dramatically.
          </p>
          <p>
            The practical difference? A 5MB photograph compressed losslessly
            might shrink to 4MB. The same photo with lossy compression at 80%
            quality might be just 800KB, and you would struggle to tell the two
            apart on screen.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            How the Canvas API Quality Parameter Works
          </h2>
          <p>
            When you compress images in the browser, the underlying mechanism is
            the HTML Canvas API. The{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              canvas.toBlob()
            </code>{" "}
            and{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              canvas.toDataURL()
            </code>{" "}
            methods accept a quality parameter between 0 and 1 for lossy formats
            like JPEG and WebP.
          </p>
          <p>
            A value of{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              0.8
            </code>{" "}
            (80% quality) is the sweet spot for most photographs. At this level,
            the encoder removes high-frequency detail in color channels that
            your eyes cannot distinguish, resulting in files that are 60-75%
            smaller than the original. Drop below 0.6, and you start to see
            banding in gradients and smearing around sharp edges.
          </p>
          <p>
            The important thing to understand is that this quality parameter
            only applies to lossy formats. If you export as PNG, the quality
            parameter is ignored entirely because PNG always uses lossless
            compression.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Format-Specific Tips
          </h2>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            JPEG: Best for Photographs
          </h3>
          <p>
            JPEG excels at compressing photographs and images with smooth
            gradients. Set quality between 75-85% for the best results. Below
            70%, watch for blocky artifacts in areas of solid color. JPEG does
            not support transparency, so any transparent areas will be rendered
            as white or black.
          </p>
          <p>
            One often-overlooked optimization: strip the EXIF metadata from your
            photos before sharing online. Camera metadata can add 10-50KB to
            each file and may contain your GPS location. You can use our{" "}
            <Link
              href="/tools/exif-viewer"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              EXIF Viewer & Remover
            </Link>{" "}
            to check and strip this data.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            PNG: Best for Graphics and Screenshots
          </h3>
          <p>
            PNG uses lossless compression, making it ideal for screenshots, text
            overlays, logos, and anything with sharp edges or limited colors.
            While you cannot adjust a quality slider for PNG, you can optimize
            it by reducing the color palette. A PNG with 256 colors (PNG-8) is
            dramatically smaller than a full 24-bit PNG.
          </p>
          <p>
            If your PNG has large areas of identical color (like a screenshot
            with a white background), the compression ratio will be excellent.
            Photographs stored as PNG, however, will produce bloated files with
            no advantage over JPEG.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            WebP: The Modern All-Rounder
          </h3>
          <p>
            WebP, developed by Google, supports both lossy and lossless
            compression, transparency, and animation. At equivalent visual
            quality, WebP files are 25-35% smaller than JPEG and 20-30% smaller
            than PNG. Every major browser has supported WebP since 2020, so
            compatibility is no longer a concern for web use.
          </p>
          <p>
            For web projects, converting your images to WebP using a{" "}
            <Link
              href="/dashboard"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              media converter
            </Link>{" "}
            is one of the fastest ways to improve page load times. A typical
            product page with 20 images can shave off 1-3MB just by switching
            from JPEG to WebP.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Optimizing Images for Social Media
          </h2>
          <p>
            Social media platforms re-compress every image you upload.
            Instagram, Twitter, and Facebook all run aggressive JPEG compression
            on your photos after upload. If you upload an already heavily
            compressed image, the platform&apos;s re-compression introduces a
            second round of artifacts, making it look noticeably worse.
          </p>
          <p>
            The strategy is counterintuitive: upload images at slightly higher
            quality (85-92%) so they survive the platform&apos;s compression
            pass. Also, match the platform&apos;s recommended dimensions. An
            image that needs to be downscaled by the platform before compression
            loses more quality than one uploaded at the correct size. Our{" "}
            <Link
              href="/tools/image-resizer"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              Image Resizer
            </Link>{" "}
            can help you hit the exact dimensions.
          </p>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                Compress Images Instantly
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Drag and drop your images into our free browser-based
                compressor. No uploads required. Your files never leave your
                device.
              </p>
              <Link
                href="/tools/image-compressor"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open Image Compressor
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            A Quick Compression Checklist
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Photographs:</strong> Use JPEG
              at 75-85% quality, or WebP at 75-80%.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Screenshots & graphics:
              </strong>{" "}
              Use PNG with reduced color palette, or lossless WebP.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Web performance:</strong>{" "}
              Convert everything to WebP for the smallest files.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Social media:</strong> Upload
              at 85-92% quality at the platform&apos;s recommended dimensions.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Email attachments:</strong>{" "}
              Compress to under 1MB per image. Most clients reject large
              attachments.
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
                  Does compression reduce image dimensions?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  No. Compression reduces file size by optimizing how pixel data
                  is stored, not by shrinking the image dimensions. A 1920x1080
                  image stays 1920x1080 after compression. If you want to reduce
                  dimensions, you need to resize the image separately.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  What quality setting should I use?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  For most use cases, 75-85% offers the best balance of size and
                  clarity. Below 70%, artifacts become visible. Above 90%, file
                  size savings are minimal. Start at 80% and adjust from there.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Is WebP better than JPEG?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  In terms of compression efficiency, yes. WebP produces 25-35%
                  smaller files at equivalent quality and supports transparency.
                  All major browsers support it. However, some older image
                  editing tools and email clients still lack WebP support, so
                  JPEG remains the safer choice for maximum compatibility.
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
