"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("how-to-resize-images-for-social-media");

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
          How to Resize Images for Every Social Media Platform
        </span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Image
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          How to Resize Images for Every Social Media Platform
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          The complete guide to image sizes for Instagram, Twitter, Facebook,
          LinkedIn, and more. Resize instantly in your browser.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          Posting images that look blurry, cropped awkwardly, or stretched is
          one of the fastest ways to lose engagement on social media. Every
          platform has specific image dimensions it expects, and when your
          photos don&apos;t match, the platform forces them to fit — often with
          ugly results. This guide gives you the exact pixel dimensions for
          every major platform so your images always look sharp and intentional.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Why Image Dimensions Matter
        </h2>
        <p>
          Social media platforms display images at fixed aspect ratios. When you
          upload a photo that doesn&apos;t match, the platform either crops it
          automatically (cutting off parts of your image), adds padding (leaving
          ugly bars), or stretches it to fit (distorting the content). None of
          these outcomes are desirable, especially for brand content or product
          photos.
        </p>
        <p>
          Beyond aesthetics, correctly sized images load faster. An image that
          is 5000 pixels wide when the platform only displays it at 1080 pixels
          wastes bandwidth and slows down feed scrolling. Platforms often
          recompress oversized images aggressively, which can introduce
          compression artifacts that make your photo look worse than the
          original.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Instagram Image Sizes
        </h2>
        <p>
          Instagram is the most dimension-sensitive platform. It supports
          multiple content formats, each with different optimal sizes:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Square feed post:</strong> 1080
            &times; 1080 pixels (1:1 ratio). The classic Instagram format that
            works universally well.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Portrait feed post:</strong> 1080
            &times; 1350 pixels (4:5 ratio). Takes up more screen space in the
            feed, which can increase engagement by up to 60%.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Landscape feed post:</strong>{" "}
            1080 &times; 566 pixels (1.91:1 ratio). Less common and takes up
            less feed space, but useful for panoramic shots.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Stories and Reels:</strong> 1080
            &times; 1920 pixels (9:16 ratio). Full-screen vertical format.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Profile photo:</strong> 320
            &times; 320 pixels. Displayed as a circle, so keep important content
            centered.
          </li>
        </ul>
        <p>
          The portrait format (1080 &times; 1350) is particularly valuable
          because it occupies the maximum allowed vertical space in the feed,
          giving your content more visibility as users scroll.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Twitter/X Image Sizes
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">In-stream image:</strong> 1200
            &times; 675 pixels (16:9 ratio). This is what displays when you
            attach a single photo to a tweet.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Header/banner:</strong> 1500
            &times; 500 pixels (3:1 ratio). Keep text and logos in the center as
            edges may be cropped on mobile.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Profile photo:</strong> 400
            &times; 400 pixels. Displayed as a circle.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Facebook Image Sizes
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Shared image:</strong> 1200
            &times; 630 pixels (1.91:1 ratio). This is the standard size for
            link previews and shared photos.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Cover photo:</strong> 820 &times;
            312 pixels on desktop, 640 &times; 360 on mobile. Design for mobile
            first since the cropping differs significantly.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Stories:</strong> 1080 &times;
            1920 pixels (9:16). Same as Instagram Stories.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Event cover:</strong> 1200
            &times; 628 pixels. Nearly identical to shared image dimensions.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          LinkedIn Image Sizes
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Shared post image:</strong> 1200
            &times; 627 pixels. Very similar to Facebook&apos;s shared image
            size.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Company banner:</strong> 1128
            &times; 191 pixels. Extremely wide format, so use it for branding
            rather than detailed content.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Profile photo:</strong> 400
            &times; 400 pixels. Displayed as a circle.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          TikTok and YouTube
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">TikTok cover:</strong> 1080
            &times; 1920 pixels (9:16). Full vertical screen.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">YouTube thumbnail:</strong> 1280
            &times; 720 pixels (16:9 ratio). Minimum 640px wide. This is one of
            the most important images on the platform since it directly affects
            click-through rates.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">YouTube channel banner:</strong>{" "}
            2560 &times; 1440 pixels. The safe area for text is 1546 &times; 423
            pixels in the center.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Understanding Aspect Ratios
        </h2>
        <p>
          An aspect ratio is the proportional relationship between an
          image&apos;s width and height. A 1:1 ratio is a perfect square, 16:9
          is widescreen, and 9:16 is the vertical equivalent. When you resize an
          image, maintaining the correct aspect ratio prevents distortion. If
          you need to change the aspect ratio (say, from a square to a
          landscape), you&apos;ll need to either crop the image or add padding
          to the sides.
        </p>
        <p>
          Most{" "}
          <Link
            href="/tools/image-compressor"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            image compression tools
          </Link>{" "}
          preserve the aspect ratio automatically. The key is knowing which
          ratio each platform expects before you start.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Quality Tips When Resizing
        </h2>
        <p>
          Resizing images properly is about more than just changing the pixel
          dimensions. Here are practical tips to maintain the best quality:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">
              Start with high resolution.
            </strong>{" "}
            Always begin with the largest version of your image. Scaling down is
            nearly lossless, but scaling up introduces blur.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Use the right format.</strong>{" "}
            JPG works well for photographs. PNG is better for graphics with
            text, logos, or transparency. WebP offers the best of both with
            smaller file sizes.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Sharpen after resizing.</strong>{" "}
            Downscaling can soften fine details. A slight sharpening pass after
            resizing can restore crispness.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Check file size limits.</strong>{" "}
            Instagram recommends under 8MB for photos. Twitter limits images to
            5MB for photos and 15MB for GIFs. Exceeding these limits triggers
            extra compression.
          </li>
        </ul>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Resize images instantly
          </h3>
          <p className="text-[#71717A] mb-4">
            Use our free Image Resizer to adjust dimensions for any platform.
            Processing happens entirely in your browser — your files are never
            uploaded.
          </p>
          <Link
            href="/tools/image-resizer"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open Image Resizer
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Does resizing reduce image quality?
            </h3>
            <p>
              Downscaling (making an image smaller) generally preserves quality
              well since you&apos;re discarding excess pixels. Upscaling (making
              an image larger) can introduce blurriness because the software
              interpolates new pixel data. Always start with the highest
              resolution source and resize downward for the sharpest results.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What&apos;s the best aspect ratio for social media?
            </h3>
            <p>
              There is no single best ratio — it depends on the platform and
              content type. For maximum feed visibility on Instagram, use 4:5
              portrait. For Twitter and Facebook shared links, use 1.91:1
              landscape. For Stories and Reels across all platforms, use 9:16
              vertical.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Should I resize before or after editing?
            </h3>
            <p>
              Always edit first at full resolution, then resize as the final
              step. Editing at higher resolution gives you more pixel data to
              work with for retouching, color correction, and cropping. Resizing
              last ensures the sharpest output at your target dimensions. You
              can also{" "}
              <Link
                href="/tools/image-compressor"
                className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
              >
                compress images
              </Link>{" "}
              after resizing to further optimize file size.
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
