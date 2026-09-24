/**
 * Language-neutral facts about every format referenced in `data/conversions.ts`.
 * Localized prose lives in the `Formats` namespace of `messages/*.json`, keyed by `id`.
 * Fields are left undefined when the fact is uncertain or not applicable.
 */

export type FormatKind =
  | "raster"
  | "vector"
  | "document"
  | "video"
  | "subtitle"
  | "data"
  | "encoding"
  | "number";

export type Compression = "lossy" | "lossless" | "both" | "none";
export type Transparency = "full" | "binary" | "none";
export type BrowserSupport = "universal" | "modern" | "limited" | "none";

export interface FormatInfo {
  id: string;
  kind: FormatKind;
  extensions: string[];
  mime?: string;
  compression?: Compression;
  transparency?: Transparency;
  animation?: boolean;
  audio?: boolean;
  /** Maximum palette size, when the format is palette-limited. */
  maxColors?: number;
  bitDepth?: string;
  codecs?: string[];
  developer?: string;
  year?: number;
  browserSupport?: BrowserSupport;
  /** Numeral system base, for number formats. */
  base?: number;
  /**
   * Relative storage efficiency for raster images (1 = largest files, 5 = smallest).
   * Used only to phrase "usually smaller/larger" hints, never displayed.
   */
  efficiency?: number;
}

export const formats: Record<string, FormatInfo> = {
  PNG: {
    id: "PNG",
    kind: "raster",
    extensions: [".png"],
    mime: "image/png",
    compression: "lossless",
    transparency: "full",
    bitDepth: "1–16 bit/channel",
    developer: "PNG Development Group / W3C",
    year: 1996,
    browserSupport: "universal",
    efficiency: 2,
  },
  JPG: {
    id: "JPG",
    kind: "raster",
    extensions: [".jpg", ".jpeg"],
    mime: "image/jpeg",
    compression: "lossy",
    transparency: "none",
    animation: false,
    bitDepth: "8 bit/channel",
    developer: "Joint Photographic Experts Group",
    year: 1992,
    browserSupport: "universal",
    efficiency: 3,
  },
  JFIF: {
    id: "JFIF",
    kind: "raster",
    extensions: [".jfif"],
    mime: "image/jpeg",
    compression: "lossy",
    transparency: "none",
    animation: false,
    bitDepth: "8 bit/channel",
    developer: "C-Cube Microsystems",
    year: 1992,
    browserSupport: "universal",
    efficiency: 3,
  },
  WebP: {
    id: "WebP",
    kind: "raster",
    extensions: [".webp"],
    mime: "image/webp",
    compression: "both",
    transparency: "full",
    animation: true,
    bitDepth: "8 bit/channel",
    developer: "Google",
    year: 2010,
    browserSupport: "modern",
    efficiency: 4,
  },
  AVIF: {
    id: "AVIF",
    kind: "raster",
    extensions: [".avif"],
    mime: "image/avif",
    compression: "both",
    transparency: "full",
    animation: true,
    bitDepth: "8, 10, 12 bit/channel",
    developer: "Alliance for Open Media",
    year: 2019,
    browserSupport: "modern",
    efficiency: 5,
  },
  GIF: {
    id: "GIF",
    kind: "raster",
    extensions: [".gif"],
    mime: "image/gif",
    compression: "lossless",
    transparency: "binary",
    animation: true,
    maxColors: 256,
    bitDepth: "8 bit (palette)",
    developer: "CompuServe",
    year: 1987,
    browserSupport: "universal",
    efficiency: 2,
  },
  BMP: {
    id: "BMP",
    kind: "raster",
    extensions: [".bmp"],
    mime: "image/bmp",
    compression: "none",
    animation: false,
    bitDepth: "1–32 bit/pixel",
    developer: "Microsoft",
    browserSupport: "universal",
    efficiency: 1,
  },
  TIFF: {
    id: "TIFF",
    kind: "raster",
    extensions: [".tif", ".tiff"],
    mime: "image/tiff",
    compression: "both",
    transparency: "full",
    animation: false,
    bitDepth: "8, 16, 32 bit/channel",
    developer: "Aldus (now Adobe)",
    year: 1986,
    browserSupport: "limited",
    efficiency: 1,
  },
  ICO: {
    id: "ICO",
    kind: "raster",
    extensions: [".ico"],
    mime: "image/vnd.microsoft.icon",
    compression: "lossless",
    transparency: "full",
    animation: false,
    developer: "Microsoft",
    browserSupport: "universal",
  },
  SVG: {
    id: "SVG",
    kind: "vector",
    extensions: [".svg"],
    mime: "image/svg+xml",
    compression: "none",
    transparency: "full",
    animation: true,
    developer: "W3C",
    year: 2001,
    browserSupport: "universal",
  },
  HEIC: {
    id: "HEIC",
    kind: "raster",
    extensions: [".heic"],
    mime: "image/heic",
    compression: "lossy",
    transparency: "full",
    bitDepth: "8, 10 bit/channel",
    codecs: ["HEVC (H.265)"],
    developer: "MPEG (ISO/IEC 23008-12)",
    browserSupport: "limited",
    efficiency: 5,
  },
  HEIF: {
    id: "HEIF",
    kind: "raster",
    extensions: [".heif"],
    mime: "image/heif",
    compression: "lossy",
    transparency: "full",
    bitDepth: "8, 10 bit/channel",
    codecs: ["HEVC (H.265)", "AVC (H.264)", "JPEG"],
    developer: "MPEG (ISO/IEC 23008-12)",
    year: 2015,
    browserSupport: "limited",
    efficiency: 5,
  },
  PDF: {
    id: "PDF",
    kind: "document",
    extensions: [".pdf"],
    mime: "application/pdf",
    compression: "both",
    transparency: "full",
    animation: false,
    developer: "Adobe (ISO 32000)",
    year: 1993,
    browserSupport: "universal",
  },
  Image: {
    id: "Image",
    kind: "raster",
    extensions: [".png", ".jpg", ".webp", ".gif", ".svg"],
  },
  MP4: {
    id: "MP4",
    kind: "video",
    extensions: [".mp4"],
    mime: "video/mp4",
    compression: "lossy",
    audio: true,
    codecs: ["H.264", "H.265", "AV1", "AAC"],
    developer: "MPEG (ISO/IEC 14496-14)",
    year: 2003,
    browserSupport: "universal",
  },
  WebM: {
    id: "WebM",
    kind: "video",
    extensions: [".webm"],
    mime: "video/webm",
    compression: "lossy",
    audio: true,
    codecs: ["VP8", "VP9", "AV1", "Vorbis", "Opus"],
    developer: "Google",
    year: 2010,
    browserSupport: "modern",
  },
  MOV: {
    id: "MOV",
    kind: "video",
    extensions: [".mov"],
    mime: "video/quicktime",
    compression: "lossy",
    audio: true,
    codecs: ["H.264", "HEVC", "ProRes", "AAC"],
    developer: "Apple",
    year: 1991,
    browserSupport: "limited",
  },
  AVI: {
    id: "AVI",
    kind: "video",
    extensions: [".avi"],
    mime: "video/x-msvideo",
    audio: true,
    codecs: ["MPEG-4 Part 2 (DivX/Xvid)", "MJPEG", "MP3"],
    developer: "Microsoft",
    year: 1992,
    browserSupport: "none",
  },
  MKV: {
    id: "MKV",
    kind: "video",
    extensions: [".mkv"],
    mime: "video/x-matroska",
    audio: true,
    codecs: ["H.264", "HEVC", "VP9", "AV1", "AAC", "Opus", "FLAC"],
    developer: "Matroska",
    year: 2002,
    browserSupport: "limited",
  },
  FLV: {
    id: "FLV",
    kind: "video",
    extensions: [".flv"],
    mime: "video/x-flv",
    compression: "lossy",
    audio: true,
    codecs: ["Sorenson Spark", "VP6", "H.264", "MP3", "AAC"],
    developer: "Macromedia (now Adobe)",
    browserSupport: "none",
  },
  "3GP": {
    id: "3GP",
    kind: "video",
    extensions: [".3gp"],
    mime: "video/3gpp",
    compression: "lossy",
    audio: true,
    codecs: ["H.263", "H.264", "AMR", "AAC"],
    developer: "3GPP",
    browserSupport: "limited",
  },
  TS: {
    id: "TS",
    kind: "video",
    extensions: [".ts", ".m2ts"],
    mime: "video/mp2t",
    compression: "lossy",
    audio: true,
    codecs: ["MPEG-2", "H.264", "HEVC", "AAC", "AC-3"],
    developer: "MPEG (ISO/IEC 13818-1)",
    year: 1995,
    browserSupport: "limited",
  },
  M4V: {
    id: "M4V",
    kind: "video",
    extensions: [".m4v"],
    mime: "video/x-m4v",
    compression: "lossy",
    audio: true,
    codecs: ["H.264", "AAC"],
    developer: "Apple",
  },
  WMV: {
    id: "WMV",
    kind: "video",
    extensions: [".wmv"],
    mime: "video/x-ms-wmv",
    compression: "lossy",
    audio: true,
    codecs: ["WMV 7/8/9 (VC-1)", "WMA"],
    developer: "Microsoft",
    year: 1999,
    browserSupport: "none",
  },
  CSV: {
    id: "CSV",
    kind: "data",
    extensions: [".csv"],
    mime: "text/csv",
    developer: "IETF (RFC 4180)",
    year: 2005,
  },
  JSON: {
    id: "JSON",
    kind: "data",
    extensions: [".json"],
    mime: "application/json",
    developer: "Douglas Crockford (ECMA-404, RFC 8259)",
    year: 2001,
  },
  VTT: {
    id: "VTT",
    kind: "subtitle",
    extensions: [".vtt"],
    mime: "text/vtt",
    developer: "W3C (WebVTT)",
    browserSupport: "universal",
  },
  SRT: {
    id: "SRT",
    kind: "subtitle",
    extensions: [".srt"],
    mime: "application/x-subrip",
    developer: "SubRip",
    browserSupport: "none",
  },
  Base64: {
    id: "Base64",
    kind: "encoding",
    extensions: [".txt", "data: URI"],
    developer: "IETF (RFC 4648)",
    year: 2006,
  },
  Hex: { id: "Hex", kind: "number", extensions: [], base: 16 },
  Decimal: { id: "Decimal", kind: "number", extensions: [], base: 10 },
  Binary: { id: "Binary", kind: "number", extensions: [], base: 2 },
  Octal: { id: "Octal", kind: "number", extensions: [], base: 8 },
};

export function getFormat(name: string): FormatInfo | undefined {
  return formats[name];
}
