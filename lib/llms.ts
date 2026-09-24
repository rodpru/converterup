import { conversions } from "@/data/conversions";
import en from "@/messages/en.json";
import { getAllArticles } from "./blog";
import { BASE_URL } from "./seo";
import { getAllToolSlugs } from "./tool-schemas";

// llms.txt (https://llmstxt.org) — generated from the same sources as the
// pages so it can't drift from the site (it previously advertised a paid plan
// that no longer exists).

const toolMeta = en.ToolMeta as Record<string, string>;
const toolSeo = en.ToolSeo as Record<string, Record<string, unknown>>;

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "");

function header() {
  const tools = getAllToolSlugs();
  return [
    "# ConverterUp",
    "",
    `> ${toolMeta["home-desc"]}`,
    "",
    `ConverterUp is a free collection of ${tools.length} browser-based converters and utilities. Every file is processed locally with WebAssembly (FFmpeg.wasm, libheif) and standard browser APIs — nothing is uploaded, there is no account, no daily limit and no watermark. The site is funded by ads and available in English, Portuguese (/pt) and Spanish (/es).`,
    "",
    "## Key facts",
    "",
    "- Price: free, unlimited. No paid plan, no sign-up.",
    "- Privacy: files never leave the user's device; conversion runs client-side.",
    "- Limits: 500 MB per video, 50 MB per image (browser memory).",
    "- Image formats: PNG, JPG, WebP, AVIF, GIF, TIFF, BMP, HEIC/HEIF, SVG, ICO.",
    "- Video formats: MP4, WebM, MOV, MKV, AVI, FLV, 3GP, TS, M4V, WMV; video to GIF; audio extraction to MP3, AAC, WAV, OGG.",
    "- Languages: English, Portuguese, Spanish.",
    "",
  ];
}

function toolLines() {
  return getAllToolSlugs().map((slug) => {
    const title = toolMeta[`${slug}-title`] ?? slug;
    const desc = toolMeta[`${slug}-desc`] ?? "";
    return `- [${title}](${BASE_URL}/tools/${slug}): ${desc}`;
  });
}

function conversionLines() {
  return conversions.map(
    (c) =>
      `- [${c.fromFormat} to ${c.toFormat}](${BASE_URL}/convert/${c.slug}): convert ${c.fromFormat} to ${c.toFormat} in the browser (uses ${BASE_URL}/tools/${c.toolSlug}).`,
  );
}

function articleLines() {
  return getAllArticles("en").map(
    (a) => `- [${a.title}](${BASE_URL}/blog/${a.slug}): ${a.description}`,
  );
}

function footer() {
  return [
    "## Optional",
    "",
    `- [About](${BASE_URL}/about): who builds ConverterUp and how it works.`,
    `- [Privacy policy](${BASE_URL}/privacy)`,
    `- [Portuguese articles](${BASE_URL}/pt/blog)`,
    `- [Spanish articles](${BASE_URL}/es/blog)`,
    `- [Full text for LLMs](${BASE_URL}/llms-full.txt)`,
    "",
  ];
}

export function buildLlmsTxt(): string {
  return [
    ...header(),
    "## Tools",
    "",
    ...toolLines(),
    "",
    "## Format conversions",
    "",
    ...conversionLines(),
    "",
    "## Guides",
    "",
    ...articleLines(),
    "",
    ...footer(),
  ].join("\n");
}

function toolDetail(slug: string): string[] {
  const seo = toolSeo[slug];
  const lines = [
    `### ${toolMeta[`${slug}-title`] ?? slug}`,
    "",
    `URL: ${BASE_URL}/tools/${slug}`,
    "",
  ];
  if (!seo) return [...lines, toolMeta[`${slug}-desc`] ?? "", ""];

  if (typeof seo.intro === "string") lines.push(stripHtml(seo.intro), "");
  for (let i = 1; i <= 6; i++) {
    const section = seo[`section${i}`] as Record<string, string> | undefined;
    if (!section?.heading) break;
    lines.push(`#### ${section.heading}`, "");
    for (let j = 1; j <= 5; j++) {
      const p = section[`p${j}`];
      if (!p) break;
      lines.push(stripHtml(p), "");
    }
  }
  for (let i = 1; i <= 10; i++) {
    const q = seo[`q${i}`];
    const a = seo[`a${i}`];
    if (typeof q !== "string" || typeof a !== "string") break;
    lines.push(`**Q: ${stripHtml(q)}**`, "", stripHtml(a), "");
  }
  return lines;
}

export function buildLlmsFullTxt(): string {
  return [
    ...header(),
    "## Tools in detail",
    "",
    ...getAllToolSlugs().flatMap(toolDetail),
    "## Format conversions",
    "",
    ...conversionLines(),
    "",
    "## Guides",
    "",
    ...articleLines(),
    "",
    ...footer(),
  ].join("\n");
}
