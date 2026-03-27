"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("image-to-base64-guide");

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
        <span className="text-[#EDEDEF]">Image to Base64 Guide</span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Developer
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          Image to Base64: What It Is and How to Use It
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Learn what Base64 encoding is, when to embed images as data URIs, and
          how to convert any image to Base64 instantly.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          Base64 is one of those technologies that web developers encounter
          regularly but rarely think about deeply. It converts binary data —
          like an image file — into a string of plain ASCII text characters.
          This seemingly simple conversion unlocks powerful use cases: embedding
          images directly in HTML, CSS, or email without external file
          references, and transmitting binary data through text-only channels.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          What Is Base64 Encoding?
        </h2>
        <p>
          Base64 is a binary-to-text encoding scheme that represents binary data
          using a set of 64 ASCII characters: A-Z, a-z, 0-9, plus (+), and
          forward slash (/), with equals (=) used for padding. The name
          &ldquo;Base64&rdquo; comes from this 64-character alphabet.
        </p>
        <p>
          The encoding process works by taking groups of 3 bytes (24 bits) from
          the binary data and splitting them into 4 groups of 6 bits each. Each
          6-bit group maps to one of the 64 characters. This means every 3 bytes
          of original data become 4 bytes of Base64 text — a 33% size increase.
        </p>
        <p>
          For example, a tiny 3-byte sequence like the ASCII text
          &ldquo;Hi!&rdquo; becomes &ldquo;SGkh&rdquo; in Base64. A 30KB PNG
          icon becomes approximately 40KB of Base64 text.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          The Data URI Format
        </h2>
        <p>
          To use a Base64-encoded image in HTML or CSS, you wrap it in a data
          URI. The format is:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-[#2DD4BF]">
            data:[media-type];base64,[base64-string]
          </code>
        </div>
        <p>For a PNG image, this looks like:</p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-[#2DD4BF]">
            data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
          </code>
        </div>
        <p>
          This data URI can be used anywhere a regular image URL would go: in an{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            {"<img>"}
          </code>{" "}
          tag&apos;s{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            src
          </code>{" "}
          attribute, a CSS{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            background-image
          </code>{" "}
          property, or anywhere else that accepts a URL.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          When to Use Base64 Images
        </h2>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          HTML Emails
        </h3>
        <p>
          Email is one of the strongest use cases for Base64 images. Many email
          clients block external images by default, showing a &ldquo;click to
          load images&rdquo; prompt instead. Embedding small images as Base64
          ensures they display immediately without requiring the recipient to
          allow external content. This is particularly valuable for logos,
          icons, and small decorative elements in email templates.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Single-File HTML Documents
        </h3>
        <p>
          When you need a completely self-contained HTML file — for reports,
          invoices, documentation, or offline content — Base64 lets you embed
          all images directly in the HTML. The resulting file can be opened in
          any browser without needing access to external resources or an
          internet connection.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          CSS Background Images
        </h3>
        <p>
          Small decorative images, patterns, or icons used as CSS backgrounds
          can be embedded as Base64 data URIs. This eliminates an HTTP request
          for each image, which can improve page load performance for tiny
          assets. Icons under 2KB are excellent candidates since the HTTP
          request overhead often exceeds the actual file size.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          API Data Transmission
        </h3>
        <p>
          When sending image data through JSON APIs, Base64 encoding allows you
          to include the image as a string field without dealing with multipart
          form data or separate file upload endpoints. This is common in
          configurations where you need to transmit small images like avatars or
          signatures alongside other{" "}
          <Link
            href="/tools/json-viewer"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            JSON data
          </Link>
          .
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          When NOT to Use Base64
        </h2>
        <p>
          Base64 is not always the right choice. Here are situations where
          regular image files are better:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Large images:</strong> A 500KB
            photo becomes roughly 667KB of Base64 text. The browser cannot cache
            it separately, and it bloats your HTML/CSS file. Any image over
            10-20KB should generally be served as a separate file.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">
              Performance-critical pages:
            </strong>{" "}
            Base64 images embedded in CSS block rendering — the browser must
            download and parse the entire CSS file before it can display
            anything. External images can load in parallel after the initial
            render.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Repeated images:</strong> If the
            same image appears on multiple pages, a separate file can be cached
            by the browser and reused. Base64 data must be re-downloaded with
            every page load since it&apos;s part of the HTML/CSS payload.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">SEO-important images:</strong>{" "}
            Search engines cannot easily index Base64-embedded images. Product
            photos, infographics, or any image you want to appear in image
            search results should be served as regular files with proper alt
            text.
          </li>
        </ul>

        <p>
          For images that are too large for Base64 embedding, consider{" "}
          <Link
            href="/tools/image-compressor"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            compressing them
          </Link>{" "}
          to reduce file size while maintaining quality.
        </p>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Convert any image to Base64 instantly
          </h3>
          <p className="text-[#71717A] mb-4">
            Drop an image into our converter and get the Base64 string and
            ready-to-use data URI. Processing happens entirely in your browser —
            nothing is uploaded.
          </p>
          <Link
            href="/tools/image-to-base64"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open Image to Base64
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Does Base64 encoding increase file size?
            </h3>
            <p>
              Yes, Base64 adds approximately 33% overhead. Three bytes of binary
              data become four bytes of Base64 text. A 30KB image becomes about
              40KB of Base64 text. This is why Base64 is best reserved for small
              images like icons, logos, and UI elements rather than full-size
              photographs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Is Base64 safe for embedding images in emails?
            </h3>
            <p>
              Base64 is widely used and generally safe for email images. Most
              modern email clients (Gmail, Outlook, Apple Mail) support data
              URIs. However, some corporate email filters may strip them. Keep
              images small (under 100KB) and always include alt text as a
              fallback for clients that don&apos;t render the embedded image.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Can I decode a Base64 string back to an image?
            </h3>
            <p>
              Absolutely. Base64 is fully reversible with zero quality loss. In
              JavaScript, you can use{" "}
              <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
                atob()
              </code>{" "}
              to decode the string back to binary data, then create a Blob to
              download it as a file. The decoded image is bit-for-bit identical
              to the original.
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
