"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts("vtt-vs-srt-subtitles");

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
          <span className="text-[#EDEDEF]">VTT vs SRT Subtitles</span>
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
            VTT vs SRT: Subtitle Formats Explained
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            Understand the differences between WebVTT and SRT subtitle formats,
            when to use each, and how to convert between them instantly.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            Subtitles make video content accessible to deaf and hard-of-hearing
            viewers, help non-native speakers follow along, and improve
            engagement in sound-off environments like social media feeds. The
            two most common subtitle formats are SRT (SubRip) and VTT (WebVTT).
            They look similar at first glance, but they have meaningful
            differences that affect which platforms accept them and what
            features you can use.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Format Syntax Comparison
          </h2>
          <p>
            Both formats are plain text files that pair timestamps with subtitle
            text. Here is how the same subtitle looks in each format:
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            SRT Format
          </h3>
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 my-4 font-mono text-sm text-[#EDEDEF] whitespace-pre-line">
            {`1
00:00:01,000 --> 00:00:04,000
Welcome to our tutorial on subtitle formats.

2
00:00:04,500 --> 00:00:08,000
We'll compare SRT and WebVTT side by side.`}
          </div>
          <p>
            SRT files start with a sequential number for each subtitle cue,
            followed by a timestamp range using commas as the millisecond
            separator, then the subtitle text. Cues are separated by blank
            lines.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            VTT (WebVTT) Format
          </h3>
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 my-4 font-mono text-sm text-[#EDEDEF] whitespace-pre-line">
            {`WEBVTT

00:00:01.000 --> 00:00:04.000
Welcome to our tutorial on subtitle formats.

00:00:04.500 --> 00:00:08.000
We'll compare SRT and WebVTT side by side.`}
          </div>
          <p>
            VTT files must begin with the{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              WEBVTT
            </code>{" "}
            header. Cue numbers are optional (not required like in SRT).
            Timestamps use periods instead of commas for milliseconds. The hour
            component is also optional — you can write{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              01:30.000
            </code>{" "}
            instead of{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              00:01:30.000
            </code>
            .
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Key Differences at a Glance
          </h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#16131E]">
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Feature
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    SRT
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    VTT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2535]">
                <tr>
                  <td className="p-3 text-[#EDEDEF]">File extension</td>
                  <td className="p-3 font-mono text-[#2DD4BF]">.srt</td>
                  <td className="p-3 font-mono text-[#2DD4BF]">.vtt</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#EDEDEF]">Header required</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Yes (WEBVTT)</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#EDEDEF]">Cue numbers</td>
                  <td className="p-3">Required (sequential)</td>
                  <td className="p-3">Optional (can be named)</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#EDEDEF]">Millisecond separator</td>
                  <td className="p-3 font-mono text-[#2DD4BF]">, (comma)</td>
                  <td className="p-3 font-mono text-[#2DD4BF]">. (period)</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#EDEDEF]">CSS-like styling</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Yes</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#EDEDEF]">Positioning</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Yes (line, position, align)</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#EDEDEF]">HTML5 native</td>
                  <td className="p-3">No</td>
                  <td className="p-3">
                    Yes (
                    <code className="text-[#2DD4BF] text-xs">
                      &lt;track&gt;
                    </code>
                    )
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Platform Compatibility
          </h2>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            YouTube
          </h3>
          <p>
            YouTube accepts both SRT and VTT for manual subtitle uploads. When
            downloading auto-generated captions, YouTube provides SRT files. If
            you are creating subtitles specifically for YouTube, either format
            works — SRT is slightly more common in the YouTube ecosystem.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            Vimeo
          </h3>
          <p>
            Vimeo supports SRT, VTT, DFXP, and SCC formats. VTT is the
            recommended format if you need any styling or positioning features.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            HTML5 Video
          </h3>
          <p>
            The HTML5{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              &lt;track&gt;
            </code>{" "}
            element only supports WebVTT natively. If your website uses the
            native HTML5 video player, you need VTT files. This is the single
            most important distinction: for web development, VTT is the
            standard.
          </p>
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 my-4 font-mono text-sm text-[#EDEDEF] whitespace-pre-line">
            {`<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subs.vtt" srclang="en" label="English">
</video>`}
          </div>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            Desktop Video Players
          </h3>
          <p>
            VLC, MPC-HC, and most desktop video players support SRT universally.
            VTT support is less consistent in desktop players — VLC handles it
            well, but some older players may not recognize the format. For local
            playback with external subtitles, SRT is the safer choice.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Styling Capabilities
          </h2>
          <p>This is where VTT shines and SRT falls short. WebVTT supports:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Cue settings:</strong> Position
              subtitles at specific locations on screen (top, bottom, left,
              right, or exact percentage positions).
            </li>
            <li>
              <strong className="text-[#EDEDEF]">CSS styling via ::cue:</strong>{" "}
              Change font, color, background, opacity, and text decoration using
              standard CSS.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Voice tags:</strong> Identify
              different speakers with{" "}
              <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
                &lt;v Speaker&gt;
              </code>{" "}
              tags and style each differently.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Karaoke timing:</strong>{" "}
              Highlight words as they are spoken using timestamp tags within the
              cue text.
            </li>
          </ul>
          <p>
            SRT supports only basic HTML-like tags:{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              &lt;b&gt;
            </code>
            ,{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              &lt;i&gt;
            </code>
            ,{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              &lt;u&gt;
            </code>
            , and{" "}
            <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
              &lt;font color=&quot;...&quot;&gt;
            </code>
            . Support for these tags varies by player, and many players simply
            ignore them.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            When to Use Each Format
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Use VTT</strong> when building
              websites with HTML5 video, when you need styled or positioned
              subtitles, when working with modern streaming platforms, or when
              targeting web-first audiences.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Use SRT</strong> when uploading
              to YouTube, when creating subtitles for desktop video players,
              when maximum compatibility is the priority, or when working with
              video editing software.
            </li>
          </ul>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                Convert VTT to SRT Instantly
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Drop your WebVTT file and get a properly formatted SRT file in
                seconds. Timestamps are converted automatically. Free, no
                sign-up needed.
              </p>
              <Link
                href="/tools/vtt-to-srt"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open VTT to SRT Converter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Converting Between Formats
          </h2>
          <p>
            Because SRT and VTT share the same fundamental structure (timestamp
            ranges paired with text), converting between them is
            straightforward. The main transformations are:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">Header:</strong> Add{" "}
              <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
                WEBVTT
              </code>{" "}
              when converting to VTT, or remove it when converting to SRT.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Cue numbers:</strong> Add
              sequential numbers when converting to SRT, since they are
              required.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Millisecond separator:</strong>{" "}
              Change periods to commas (VTT to SRT) or commas to periods (SRT to
              VTT).
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Styling:</strong> Strip
              VTT-specific styling and positioning when converting to SRT, since
              SRT does not support them.
            </li>
          </ol>
          <p>
            While you could do this conversion manually in a text editor, it is
            tedious and error-prone, especially for files with hundreds of cues.
            Our{" "}
            <Link
              href="/tools/vtt-to-srt"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              VTT to SRT Converter
            </Link>{" "}
            handles all these transformations automatically and correctly.
          </p>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Which format does YouTube use?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  YouTube accepts both SRT and VTT for subtitle uploads. When
                  you download auto-generated captions from YouTube, they come
                  in SRT format. Either format works for uploading — choose
                  whichever you have available.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Can I add styling to SRT subtitles?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  SRT has very limited styling support. Some video players
                  recognize basic HTML tags like{" "}
                  <code className="text-[#2DD4BF] bg-[#0C0A12] px-1 py-0.5 rounded text-xs">
                    &lt;b&gt;
                  </code>
                  ,{" "}
                  <code className="text-[#2DD4BF] bg-[#0C0A12] px-1 py-0.5 rounded text-xs">
                    &lt;i&gt;
                  </code>
                  , and{" "}
                  <code className="text-[#2DD4BF] bg-[#0C0A12] px-1 py-0.5 rounded text-xs">
                    &lt;font color&gt;
                  </code>
                  , but support is inconsistent. If you need reliable styling,
                  positioning, or speaker identification, use WebVTT instead.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  How do I convert between VTT and SRT?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  The conversion involves changing the header, adjusting the
                  millisecond separator (period vs comma), adding or removing
                  cue numbers, and stripping VTT-specific styling. While you
                  could do this manually, our free{" "}
                  <Link
                    href="/tools/vtt-to-srt"
                    className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
                  >
                    VTT to SRT Converter
                  </Link>{" "}
                  handles all transformations automatically and processes
                  everything in your browser.
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
