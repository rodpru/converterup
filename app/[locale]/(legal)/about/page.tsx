import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ConverterUp — a free, 100% client-side toolkit for converting images, videos, and text.",
  alternates: { canonical: "https://converterup.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <h1>About ConverterUp</h1>

      <p>
        ConverterUp is a small toolkit of free converters that run entirely in
        your browser. No uploads, no accounts, no servers handling your files.
      </p>

      <h2>Why client-side?</h2>
      <p>
        Most online converters upload your files to a remote server, queue them
        behind paid plans, and may keep them long after you&apos;re done. We
        wanted the opposite: open the page, drop a file, get the result, close
        the tab. Your files never leave your device.
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
        for video and image conversion, and standard browser APIs (Canvas,
        Web Crypto, FileReader) for everything else. Performance is bound by
        your hardware, not by our servers.
      </p>

      <h2>How we keep it free</h2>
      <p>
        We display unobtrusive ads through Google AdSense to cover the hosting
        and domain costs. There is no paid plan, no &quot;upgrade&quot; modal,
        and no premium features behind a wall.
      </p>

      <h2>Who&apos;s behind it</h2>
      <p>
        Built and maintained by Rodrigo Prudêncio. Reach out at{" "}
        <a href="mailto:rgp.prt@gmail.com">rgp.prt@gmail.com</a> with feedback
        or suggestions for new tools.
      </p>
    </>
  );
}
