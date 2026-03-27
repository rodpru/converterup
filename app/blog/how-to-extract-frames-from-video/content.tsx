"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("how-to-extract-frames-from-video");

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
          How to Extract Frames from a Video
        </span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Video
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          How to Extract Frames from a Video as Images
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Capture individual frames from any video file as PNG or JPG. Perfect
          for thumbnails, storyboards, and documentation.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          Every video is a sequence of still images displayed in rapid
          succession. At 30 frames per second, a single minute of footage
          contains 1,800 individual images. Extracting specific frames from
          video is essential for creating thumbnails, building storyboards,
          documenting processes, and capturing the perfect still from a recorded
          moment.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Common Use Cases for Frame Extraction
        </h2>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Video Thumbnails
        </h3>
        <p>
          YouTube thumbnails are arguably the most important visual element for
          any video&apos;s success. While you can design custom thumbnails from
          scratch, extracting a compelling frame from the video itself often
          provides the most authentic and relevant preview. The ideal thumbnail
          frame captures a moment of peak emotion, action, or visual interest. A
          frame extracted at{" "}
          <Link
            href="/tools/image-resizer"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            1280 &times; 720 pixels
          </Link>{" "}
          is the standard YouTube thumbnail size.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Storyboards and Pre-production
        </h3>
        <p>
          Film and video professionals extract frames to create storyboards from
          existing footage. This is useful when reviewing takes, planning
          re-edits, or documenting a scene&apos;s progression. By capturing one
          frame every few seconds, you can create a visual timeline of an entire
          video sequence that can be reviewed at a glance.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Documentation and Tutorials
        </h3>
        <p>
          If you&apos;ve recorded a screen capture or tutorial video, extracting
          key frames turns that video into step-by-step documentation. Each
          extracted frame becomes a screenshot that can be annotated and
          included in written guides, help articles, or training materials.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Social Media Content
        </h3>
        <p>
          Repurposing video content into still images for social media extends
          the life of your content. A single video can yield dozens of
          high-quality images for Instagram posts, Twitter threads, or LinkedIn
          articles. This is especially effective with{" "}
          <Link
            href="/tools/video-to-gif"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            video-to-GIF conversion
          </Link>{" "}
          when you want to capture short animated moments.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Understanding Frame Rate vs. Frame Selection
        </h2>
        <p>
          The frame rate of a video determines how many still images exist in
          each second. Common frame rates include:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">24fps:</strong> Cinematic
            standard. Used in most films and gives a natural motion blur.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">30fps:</strong> Standard for most
            online video, screen recordings, and TV broadcasts.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">60fps:</strong> Smooth motion for
            gaming, sports, and action content. Excellent for frame extraction
            since each individual frame is sharper due to shorter exposure time.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">120fps+:</strong> Slow-motion
            footage. While these produce the sharpest individual frames, the
            files are significantly larger.
          </li>
        </ul>
        <p>
          Higher frame rates give you more frames to choose from and produce
          sharper stills because each frame captures a shorter slice of time.
          This means less motion blur in each individual frame. If you&apos;re
          specifically shooting video with the intent to extract stills,
          consider recording at 60fps or higher.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Choosing the Right Output Format
        </h2>
        <p>When extracting frames, you typically choose between PNG and JPG:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">PNG:</strong> Lossless
            compression preserves every pixel exactly as it appears in the video
            frame. File sizes are larger (typically 2-10MB per frame), but there
            is zero quality loss. Choose PNG when you plan to edit the frames
            further, need transparency support, or are archiving footage.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">JPG:</strong> Lossy compression
            produces much smaller files (typically 100-500KB per frame) at the
            cost of some detail. At quality levels of 90-95%, the loss is nearly
            imperceptible. Choose JPG for web use, thumbnails, reference images,
            or when extracting many frames.
          </li>
        </ul>
        <p>
          For a deeper comparison of image formats, see our guide on{" "}
          <Link
            href="/blog/png-vs-jpg-vs-webp"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            PNG vs JPG vs WebP
          </Link>
          .
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Tips for Capturing Sharp Frames
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">
              Pause at the right moment.
            </strong>{" "}
            Scrub through the video slowly and look for frames where the subject
            is in sharp focus with minimal motion blur.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Avoid transition frames.</strong>{" "}
            Frames during cuts, fades, or dissolves often contain blended
            content from two scenes and look blurry or ghosted.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Use precision seeking.</strong>{" "}
            Standard video playback often snaps to keyframes (I-frames), which
            may not be the exact frame you want. A frame-by-frame advance
            control gives you access to every single frame.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">
              Check for compression artifacts.
            </strong>{" "}
            Heavily compressed videos (low bitrate) may produce frames with
            visible blockiness, especially in areas of smooth gradients like sky
            or skin tones.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">
              Extract from the highest quality source.
            </strong>{" "}
            If you have access to the original recording file, use it instead of
            a compressed version shared online.
          </li>
        </ul>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Extract frames from any video
          </h3>
          <p className="text-[#71717A] mb-4">
            Our Video Frame Extractor lets you capture individual frames with
            precision seek controls. Export as PNG or JPG, batch download as
            ZIP. Runs entirely in your browser.
          </p>
          <Link
            href="/tools/video-frame-extractor"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open Video Frame Extractor
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              How many frames are in one second of video?
            </h3>
            <p>
              It matches the video&apos;s frame rate. A 30fps video has 30
              frames per second, a 24fps video has 24, and a 60fps video has 60.
              A one-minute clip at 30fps contains 1,800 total frames. You can
              check a video&apos;s frame rate in its file properties or with a
              media info tool.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Can I extract all frames from a video?
            </h3>
            <p>
              You can, but the output will be enormous. A 10-minute 30fps video
              produces 18,000 frames. At roughly 500KB each as JPG, that&apos;s
              about 9GB of images. For most purposes, extracting frames at
              intervals (every 1 second, 5 seconds, etc.) or manually selecting
              specific frames is far more practical.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What image format is best for extracted frames?
            </h3>
            <p>
              Use PNG when quality is paramount — it&apos;s lossless and
              preserves every detail. Use JPG at 90-95% quality when you need
              smaller files, such as for web thumbnails or batch extraction. For
              most uses, JPG provides the best balance of quality and file size.
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
