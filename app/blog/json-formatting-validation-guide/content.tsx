"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("json-formatting-validation-guide");

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
          JSON Formatting and Validation Guide
        </span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Developer
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          JSON Formatting and Validation: A Complete Guide
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Learn how to format, validate, and debug JSON data. Syntax
          highlighting, prettify, minify, and common error fixes.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          JSON (JavaScript Object Notation) has become the lingua franca of data
          exchange on the web. APIs return it, configuration files use it,
          databases store it, and developers spend a surprising amount of time
          reading, writing, and debugging it. Understanding JSON thoroughly —
          its syntax rules, formatting conventions, and common pitfalls — makes
          you more productive in virtually every area of modern development.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          What JSON Is and Why It Matters
        </h2>
        <p>
          JSON is a lightweight text format for structured data. It was
          formalized by Douglas Crockford in the early 2000s, based on a subset
          of JavaScript&apos;s object literal syntax. Its success comes from
          being simultaneously human-readable and machine-parseable across every
          programming language.
        </p>
        <p>A JSON document is built from two structures:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Objects:</strong> Unordered
            collections of key-value pairs, wrapped in curly braces{" "}
            <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
              {"{ }"}
            </code>
            . Keys must be double-quoted strings. Values can be any JSON type.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Arrays:</strong> Ordered lists of
            values, wrapped in square brackets{" "}
            <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
              {"[ ]"}
            </code>
            . Values can be any JSON type, including nested objects and arrays.
          </li>
        </ul>
        <p>
          JSON supports six value types: strings (double-quoted), numbers,
          booleans (
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            true
          </code>
          /
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            false
          </code>
          ), null, objects, and arrays. That&apos;s it — no dates, functions,
          comments, or undefined. This simplicity is a feature, not a
          limitation.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Common JSON Syntax Errors
        </h2>
        <p>
          JSON&apos;s strictness means small mistakes cause parsing failures.
          Here are the errors developers hit most often:
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Trailing Commas
        </h3>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#C4C4C6]">
            {`// INVALID — trailing comma after "blue"
{
  "colors": ["red", "green", "blue",]
}

// VALID
{
  "colors": ["red", "green", "blue"]
}`}
          </pre>
        </div>
        <p>
          JavaScript allows trailing commas, but JSON does not. This is the
          single most common error when hand-writing JSON.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Single Quotes
        </h3>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#C4C4C6]">
            {`// INVALID — single quotes
{'name': 'Alice'}

// VALID — double quotes only
{"name": "Alice"}`}
          </pre>
        </div>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Unquoted Keys
        </h3>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#C4C4C6]">
            {`// INVALID — unquoted key
{name: "Alice"}

// VALID
{"name": "Alice"}`}
          </pre>
        </div>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Comments
        </h3>
        <p>
          JSON does not support comments of any kind — not{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            {"//"}
          </code>{" "}
          nor{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            {"/* */"}
          </code>
          . If you need comments in configuration files, consider JSONC (JSON
          with Comments), which tools like VS Code and TypeScript support for
          their config files (tsconfig.json, settings.json).
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Unescaped Special Characters
        </h3>
        <p>
          Strings must escape backslashes, double quotes, and control
          characters:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#C4C4C6]">
            {`// INVALID
{"path": "C:\\Users\\name"}

// VALID — escaped backslashes
{"path": "C:\\\\Users\\\\name"}`}
          </pre>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Formatting vs. Minifying
        </h2>
        <p>
          JSON can be written in two styles, and each serves a different
          purpose:
        </p>
        <p>
          <strong className="text-[#EDEDEF]">Formatted (prettified)</strong>{" "}
          JSON adds indentation and line breaks for readability:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#2DD4BF]">
            {`{
  "name": "Alice",
  "age": 30,
  "skills": [
    "JavaScript",
    "Python"
  ]
}`}
          </pre>
        </div>
        <p>
          <strong className="text-[#EDEDEF]">Minified</strong> JSON strips all
          unnecessary whitespace:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#2DD4BF]">
            {`{"name":"Alice","age":30,"skills":["JavaScript","Python"]}`}
          </pre>
        </div>
        <p>
          Both are identical in terms of data — parsers produce the same result.
          The difference is purely in whitespace characters. Use formatted JSON
          for reading, debugging, and configuration files. Use minified JSON for
          network transmission and storage where every byte counts.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          JSON in Practice
        </h2>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          APIs and Data Exchange
        </h3>
        <p>
          JSON is the default response format for most REST APIs. When you call
          an endpoint like{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            GET /api/users/1
          </code>
          , the server typically returns a JSON object. Request bodies for POST
          and PUT operations are also usually JSON. The{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            Content-Type: application/json
          </code>{" "}
          header signals JSON payload in HTTP requests and responses.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Configuration Files
        </h3>
        <p>
          Many tools use JSON for configuration: package.json (Node.js),
          tsconfig.json (TypeScript), .eslintrc.json, and composer.json (PHP).
          These files are read by tools, not transmitted over networks, so
          readability matters more than compactness. Always keep configuration
          JSON formatted.
        </p>

        <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] pt-2">
          Data Storage
        </h3>
        <p>
          Databases like MongoDB store data as BSON (binary JSON), and
          PostgreSQL has native JSON and JSONB column types. Even when JSON
          isn&apos;t the primary storage format, it&apos;s often used for
          export/import, data migration, and backup files. When working with{" "}
          <Link
            href="/tools/image-to-base64"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            Base64-encoded images
          </Link>
          , JSON is frequently the transport layer.
        </p>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Format and validate JSON instantly
          </h3>
          <p className="text-[#71717A] mb-4">
            Paste JSON into our viewer for instant formatting, syntax
            highlighting, validation, and error detection. Minify or prettify
            with one click. Entirely browser-based.
          </p>
          <Link
            href="/tools/json-viewer"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open JSON Viewer
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What&apos;s the difference between JSON and JavaScript?
            </h3>
            <p>
              JSON is a data format inspired by JavaScript object syntax but far
              more restricted. JSON requires double quotes around all keys and
              string values, doesn&apos;t support comments, functions,
              undefined, or trailing commas. JavaScript objects are a
              programming construct with no such limitations. JSON is
              language-independent — it&apos;s used equally by Python, Java, Go,
              Ruby, and every other language.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              How do I fix invalid JSON?
            </h3>
            <p>
              Start by pasting your JSON into a validator that reports the exact
              line and character position of the error. Fix the first error
              reported — subsequent errors are often caused by the first one.
              Common fixes include replacing single quotes with double quotes,
              removing trailing commas, quoting unquoted keys, removing
              comments, and escaping backslashes. Work through errors one at a
              time from top to bottom.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Should I minify JSON in production?
            </h3>
            <p>
              For API responses transmitted over the network, minifying removes
              unnecessary whitespace and reduces payload size. However, most
              servers also support gzip or Brotli compression, which reduces
              JSON size by 80-90% regardless of formatting. The bigger win is
              often compression, not minification. For configuration files and
              anything humans read, always keep JSON formatted with indentation.
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
