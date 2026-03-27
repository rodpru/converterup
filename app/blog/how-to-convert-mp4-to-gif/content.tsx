"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts("how-to-convert-mp4-to-gif");

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
          <span className="text-[#EDEDEF]">How to Convert MP4 to GIF</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF]">
              Video
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
            How to Convert MP4 to GIF Free Online
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            Convert any MP4 video clip to an animated GIF directly in your
            browser. Control frame rate, size, and quality. No upload required.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            GIFs are everywhere. They dominate messaging apps, enliven Slack
            channels, make documentation more engaging, and add motion to social
            media posts. Despite being a format from 1987 with a 256-color
            limit, GIFs persist because they play automatically, loop
            seamlessly, and work in places where video embeds do not — emails,
            forum posts, GitHub issues, and inline documentation.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Why GIFs Are Still Relevant
          </h2>
          <p>
            The animated GIF has survived for nearly four decades for one simple
            reason: universal support. Every browser, every email client, every
            messaging platform, and every operating system can display a GIF
            without plugins or special players. When you need a short animation
            that just works everywhere, GIF remains the most reliable choice.
          </p>
          <p>Common use cases where GIFs outshine video include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Bug reports:</strong> A
              3-second GIF showing a UI glitch communicates the problem faster
              than a paragraph of text.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Tutorial steps:</strong> Short
              animated clips embedded directly in documentation guide users
              through multi-step processes.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Social media reactions:
              </strong>{" "}
              GIFs are the lingua franca of internet expression — supported
              natively on Twitter, Discord, Slack, and most messaging apps.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Email marketing:</strong> Most
              email clients support animated GIFs but block video entirely.
            </li>
          </ul>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Understanding Frame Rate and File Size
          </h2>
          <p>
            The single biggest factor in GIF file size is the number of frames.
            Unlike video formats like MP4 that use sophisticated inter-frame
            compression (storing only the differences between frames), GIF
            stores each frame as a separate image with only basic transparency
            optimization between them.
          </p>
          <p>
            Let us do the math. A 5-second clip at 30fps contains 150 frames. At
            10fps, the same clip is 50 frames — one third the data. The visual
            difference? Most people cannot distinguish 15fps from 30fps in a
            small animated GIF. The file size difference is dramatic:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#16131E]">
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Frame Rate
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    5s Clip Size
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Smoothness
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2535]">
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">30 fps</td>
                  <td className="p-3">~8 MB</td>
                  <td className="p-3 text-[#71717A]">
                    Very smooth, overkill for GIF
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">15 fps</td>
                  <td className="p-3">~4 MB</td>
                  <td className="p-3 text-[#71717A]">
                    Smooth, good for action clips
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">10 fps</td>
                  <td className="p-3">~2.5 MB</td>
                  <td className="p-3 text-[#71717A]">
                    Slightly choppy, great for UI demos
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">5 fps</td>
                  <td className="p-3">~1.2 MB</td>
                  <td className="p-3 text-[#71717A]">
                    Slideshow feel, fine for simple animations
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Width and Resolution Impact
          </h2>
          <p>
            The second biggest factor is pixel dimensions. A GIF at 1920px wide
            stores four times more pixel data per frame than one at 480px wide.
            For most use cases, 480px width is perfectly adequate. Even for
            screen recordings shown in documentation, 640px captures enough
            detail while keeping files under 5MB for reasonable clip lengths.
          </p>
          <p>Here is a practical guideline for choosing width:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Messaging/reactions:</strong>{" "}
              320px — small, fast-loading, fits inline.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Documentation/tutorials:
              </strong>{" "}
              480-640px — clear enough to read UI text.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Blog/presentation:</strong>{" "}
              640-800px — crisp on most screens.
            </li>
          </ul>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Tips for Creating Small, High-Quality GIFs
          </h2>
          <p>
            Combining the right settings makes the difference between a 2MB
            shareable GIF and a 20MB monster that nobody wants to load:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">
                Trim first, convert second.
              </strong>{" "}
              Cut your video to only the essential seconds before converting.
              Our{" "}
              <Link
                href="/tools/video-frame-extractor"
                className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
              >
                Video Frame Extractor
              </Link>{" "}
              can help you find the exact start and end frames.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Keep it under 5 seconds.
              </strong>{" "}
              The sweet spot for GIFs is 2-5 seconds. Shorter clips loop more
              naturally and keep file sizes manageable.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Use 10-15 fps.</strong> Drop
              from the video&apos;s native 30fps to 10-15fps. The motion stays
              clear; the file size drops by half or more.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Reduce width to 480px.</strong>{" "}
              Unless your GIF needs to be large, 480px width is the best balance
              of clarity and file size.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Prefer simple backgrounds.
              </strong>{" "}
              Areas with consistent color compress well in GIF. Complex,
              changing backgrounds balloon the file size.
            </li>
          </ol>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                Convert MP4 to GIF Now
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Drop your video file and get an animated GIF in seconds. Control
                frame rate, width, and duration — all processing happens in your
                browser.
              </p>
              <Link
                href="/tools/video-to-gif"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open Video to GIF
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            When to Use Video Instead
          </h2>
          <p>
            For some use cases, an MP4 with{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              autoplay muted loop
            </code>{" "}
            attributes is a better choice than GIF. A 5-second clip that is 4MB
            as a GIF might be 200KB as an MP4. Modern websites increasingly use
            this approach — Twitter, for example, converts all uploaded
            &quot;GIFs&quot; to MP4 video behind the scenes.
          </p>
          <p>
            However, GIF wins in contexts where video is not supported: email
            newsletters, GitHub README files, Slack messages, forum posts, and
            anywhere you need guaranteed inline playback without a video player.
          </p>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Why is my GIF so large?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  GIF files store each frame as a separate image. A 10-second
                  video at 30fps becomes 300 individual images stitched
                  together. To reduce size: lower the frame rate to 10-15fps,
                  reduce the width to 480px or less, shorten the duration, and
                  prefer scenes with simple or static backgrounds.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  What frame rate should I use?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  10-15fps is the sweet spot. 10fps works well for screen
                  recordings and tutorials where motion is not the focus. 15fps
                  is better for reaction clips and action sequences. Going above
                  20fps rarely makes a perceptible difference in a GIF but
                  doubles the file size compared to 10fps.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Can I convert long videos to GIF?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  You can, but the result will likely be too large to be
                  practical. A 60-second video at 15fps and 480px width produces
                  a 50MB+ GIF. For clips longer than 10 seconds, consider using
                  MP4 with autoplay and loop attributes instead, which achieves
                  the same visual effect at a fraction of the file size.
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
