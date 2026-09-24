import type { Metadata } from "next";
import { JsonLd, organizationSchema } from "@/components/json-ld";
import { BASE_URL, pageMetadata } from "@/lib/seo";

// Legal/info pages are English-only; every locale canonicalises to the EN URL.
export const metadata: Metadata = pageMetadata({
  fallbackImage: true,
  locale: "en",
  path: "/about",
  title: "About",
  description:
    "About ConverterUp — a free, 100% client-side toolkit for converting images, videos, and text.",
  hreflang: false,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${BASE_URL}/about`,
          name: "About ConverterUp",
          mainEntity: organizationSchema,
        }}
      />
      <h1>About ConverterUp</h1>

      <p>
        ConverterUp is a free toolkit of 25 converters and utilities that run
        entirely in your browser — image and video conversion, compression,
        resizing, HEIC to JPG or PDF, favicons, QR codes, JSON, CSV, Base64,
        number bases and more. No uploads, no accounts, no servers handling your
        files.
      </p>

      <h2>Why client-side?</h2>
      <p>
        Most online converters upload your files to a remote server, queue them
        behind paid plans, and may keep them long after you&apos;re done. We
        wanted the opposite: open the page, drop a file, get the result, close
        the tab. Your files never leave your device.
      </p>
      <p>
        That matters most for the files people convert every day: phone photos
        with GPS coordinates in their EXIF data, screen recordings of internal
        dashboards, scanned documents, client assets under NDA. With ConverterUp
        there is nothing to trust on our side, because nothing is sent to us.
      </p>

      <h2>How it works</h2>
      <p>
        Under the hood we use{" "}
        <a
          href="https://ffmpegwasm.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ffmpeg.wasm
        </a>{" "}
        — FFmpeg compiled to WebAssembly — for video and image conversion,
        libheif for HEIC photos, and standard browser APIs (Canvas, Web Crypto,
        FileReader) for everything else. Performance is bound by your hardware,
        not by our servers.
      </p>
      <ul>
        <li>
          <strong>Images:</strong> PNG, JPG, WebP, AVIF, GIF, TIFF, BMP, HEIC,
          SVG and ICO, up to 50 MB per file.
        </li>
        <li>
          <strong>Video:</strong> MP4, WebM, MOV, MKV, AVI and more, up to 500
          MB per file, plus video to GIF and audio extraction (MP3, AAC, WAV,
          OGG).
        </li>
        <li>
          <strong>Developer and text tools:</strong> JSON viewer, CSV to JSON,
          Base64, HTML/CSS minifiers, UUIDs, case converter, hex/decimal/binary.
        </li>
      </ul>

      <h2>Verify it yourself</h2>
      <p>
        Open your browser&apos;s developer tools, switch to the Network tab and
        convert a file. You will see the page load the WebAssembly engine once,
        and then no request carrying your file. After the first load, most tools
        keep working even if you go offline.
      </p>

      <h2>How we keep it free</h2>
      <p>
        We display unobtrusive ads through Google AdSense to cover the hosting
        and domain costs. There is no paid plan, no &quot;upgrade&quot; modal,
        no daily limit and no premium features behind a wall. Output files carry
        no watermark.
      </p>

      <h2>Who&apos;s behind it</h2>
      <p>
        Built and maintained by Rodrigo Prudêncio, a software engineer based in
        Portugal. The site is available in English, Portuguese and Spanish.
        Reach out at <a href="mailto:rgp.prt@gmail.com">rgp.prt@gmail.com</a>{" "}
        with feedback or suggestions for new tools — see the{" "}
        <a href="/contact">contact page</a> for what to include in a bug report.
      </p>
    </>
  );
}
