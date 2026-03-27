"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";

const relatedPosts = getRelatedPosts("hex-to-decimal-conversion");

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
        <span className="text-[#EDEDEF]">Hex to Decimal Conversion</span>
      </nav>

      <header className="mb-10">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-3">
          Developer
        </span>
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
          Hex to Decimal Conversion Explained
        </h1>
        <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
          Understand hexadecimal numbers and how to convert between hex,
          decimal, binary, and octal. Includes color code conversion.
        </p>
      </header>

      <div className="prose-custom space-y-6 text-[#C4C4C6] leading-relaxed text-base">
        <p>
          Hexadecimal (hex) is a base-16 number system that programmers
          encounter daily — in color codes, memory addresses, character
          encodings, and network protocols. Despite its ubiquity, many
          developers rely on converters without fully understanding the
          underlying math. This guide demystifies number systems and gives you a
          solid grasp of how hex, decimal, binary, and octal relate to each
          other.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Number Systems Explained
        </h2>
        <p>
          A number system (or base) defines how many unique digits are available
          before you need a second position. We use decimal (base-10) daily
          because we have 10 digits: 0 through 9. After 9, we carry over to the
          next position: 10, 11, 12, and so on.
        </p>
        <p>The same principle applies to every other base:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Binary (base-2):</strong> Uses
            only 0 and 1. Each digit is a &ldquo;bit.&rdquo; This is the native
            language of computers since electronic circuits have two states: on
            and off. The decimal number 10 is 1010 in binary.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Octal (base-8):</strong> Uses
            digits 0-7. Historically used in Unix file permissions (like 755 or
            644). The decimal number 10 is 12 in octal.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Decimal (base-10):</strong> Our
            everyday system with digits 0-9. It likely evolved because humans
            have 10 fingers.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Hexadecimal (base-16):</strong>{" "}
            Uses digits 0-9 and letters A-F (where A=10, B=11, C=12, D=13, E=14,
            F=15). The decimal number 10 is A in hex. The decimal number 255 is
            FF.
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Why Hexadecimal Is Used in Computing
        </h2>
        <p>
          The key insight is that hex maps perfectly to binary. Each hex digit
          represents exactly 4 binary bits:
        </p>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-[#2DD4BF]">
            {`Hex:  0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F
Dec:  0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
Bin: 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111`}
          </pre>
        </div>
        <p>
          This means one byte (8 bits) can always be written as exactly 2 hex
          digits. The binary value 11111111 is FF in hex and 255 in decimal.
          Reading FF is much faster than reading 11111111, and it maintains the
          direct relationship to the binary that decimal obscures.
        </p>
        <p>This is why hex appears everywhere in programming:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">Memory addresses:</strong>{" "}
            0x7FFF5FBFF8A0 is a typical 64-bit pointer — far more readable than
            its decimal equivalent 140,734,799,804,576.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Color codes:</strong> #FF5733
            represents a specific RGB color, with each pair being one byte.
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Character encoding:</strong>{" "}
            Unicode code points are written in hex (U+1F600 for the grinning
            face emoji).
          </li>
          <li>
            <strong className="text-[#EDEDEF]">Bitwise operations:</strong>{" "}
            Bitmasks like 0xFF00 are instantly readable as &ldquo;the upper byte
            of a 16-bit value.&rdquo;
          </li>
        </ul>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Color Codes and Hex
        </h2>
        <p>
          CSS hex color codes are the most visible use of hexadecimal for most
          web developers. A color like{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            #2DD4BF
          </code>{" "}
          is actually three hex bytes concatenated:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-[#EDEDEF]">2D</strong> = Red channel = 45 in
            decimal (out of 255)
          </li>
          <li>
            <strong className="text-[#EDEDEF]">D4</strong> = Green channel = 212
            in decimal
          </li>
          <li>
            <strong className="text-[#EDEDEF]">BF</strong> = Blue channel = 191
            in decimal
          </li>
        </ul>
        <p>
          So{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            #2DD4BF
          </code>{" "}
          is equivalent to{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            rgb(45, 212, 191)
          </code>
          . The shorthand{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            #F53
          </code>{" "}
          expands to{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            #FF5533
          </code>{" "}
          by doubling each character.
        </p>
        <p>
          An optional fourth byte adds alpha (transparency):{" "}
          <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
            #2DD4BF80
          </code>{" "}
          is the same teal at 50% opacity (80 hex = 128 decimal, which is
          roughly 50% of 255). If you need to{" "}
          <Link
            href="/tools/color-palette"
            className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
          >
            extract colors from an image
          </Link>
          , the resulting HEX codes follow this same format.
        </p>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Common Conversions Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#2A2535]">
                <th className="text-left py-3 px-3 text-[#EDEDEF] font-[Syne] font-semibold">
                  Decimal
                </th>
                <th className="text-left py-3 px-3 text-[#EDEDEF] font-[Syne] font-semibold">
                  Hex
                </th>
                <th className="text-left py-3 px-3 text-[#EDEDEF] font-[Syne] font-semibold">
                  Binary
                </th>
                <th className="text-left py-3 px-3 text-[#EDEDEF] font-[Syne] font-semibold">
                  Octal
                </th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {[
                ["0", "0", "0000", "0"],
                ["10", "A", "1010", "12"],
                ["15", "F", "1111", "17"],
                ["16", "10", "10000", "20"],
                ["100", "64", "1100100", "144"],
                ["127", "7F", "1111111", "177"],
                ["128", "80", "10000000", "200"],
                ["255", "FF", "11111111", "377"],
                ["256", "100", "100000000", "400"],
                ["1024", "400", "10000000000", "2000"],
                ["65535", "FFFF", "1111111111111111", "177777"],
              ].map(([dec, hex, bin, oct]) => (
                <tr key={dec} className="border-b border-[#2A2535]/50">
                  <td className="py-2 px-3">{dec}</td>
                  <td className="py-2 px-3 text-[#2DD4BF]">{hex}</td>
                  <td className="py-2 px-3">{bin}</td>
                  <td className="py-2 px-3">{oct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Notice the patterns: powers of 2 (128, 256, 1024) have clean hex
          representations (80, 100, 400). The maximum value of a byte (255) is
          FF, and the maximum of two bytes (65,535) is FFFF.
        </p>

        {/* CTA Box */}
        <div className="my-10 rounded-xl border border-[#2A2535] bg-gradient-to-br from-[#16131E] to-[#1a1726] p-6 sm:p-8">
          <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
            Convert hex to decimal instantly
          </h3>
          <p className="text-[#71717A] mb-4">
            Use our Hex to Decimal tool for instant conversions between hex,
            decimal, binary, and octal. Includes color code breakdown. Runs
            entirely in your browser.
          </p>
          <Link
            href="/tools/hex-to-decimal"
            className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors"
          >
            Open Hex to Decimal
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] pt-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              Why do programmers use hexadecimal?
            </h3>
            <p>
              Hex provides a compact, human-readable representation of binary
              data. Each hex digit maps exactly to 4 bits, so a byte is always
              exactly 2 hex digits. This makes it far easier to read and
              mentally parse than long binary strings, while maintaining a
              direct mathematical relationship that decimal doesn&apos;t have.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              What is 0xFF in decimal?
            </h3>
            <p>
              0xFF equals 255 in decimal. The{" "}
              <code className="bg-[#16131E] px-1.5 py-0.5 rounded text-[#2DD4BF] text-sm">
                0x
              </code>{" "}
              prefix indicates hexadecimal in most programming languages. F is
              15 in decimal, so FF = (15 &times; 16) + 15 = 255. This is the
              maximum value of a single byte (all 8 bits set to 1), making it
              one of the most common hex values you&apos;ll encounter.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
              How does hex relate to CSS colors?
            </h3>
            <p>
              CSS hex colors like #FF5733 are three hex byte values for Red (FF
              = 255), Green (57 = 87), and Blue (33 = 51). Each pair ranges from
              00 (none) to FF (full intensity). An optional fourth pair controls
              alpha transparency. The shorthand #F53 doubles each character to
              #FF5533. You can use our{" "}
              <Link
                href="/tools/json-viewer"
                className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#EDEDEF] transition-colors"
              >
                JSON viewer
              </Link>{" "}
              to inspect color configurations in design tokens and theme files.
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
