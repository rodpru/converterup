import type { Conversion } from "@/data/conversions";
import { type FormatInfo, getFormat } from "@/data/formats";

/** A translation key under the `Convert` namespace plus its ICU params. */
export interface Msg {
  key: string;
  params?: Record<string, string | number>;
}

export interface CompareRow {
  label: string;
  from: Msg | string;
  to: Msg | string;
}

export interface FormatComparison {
  from: FormatInfo;
  to: FormatInfo;
  rows: CompareRow[];
  notes: Msg[];
  faqs: Array<{ q: Msg; a: Msg }>;
  /** Worked values for number-system pairs. */
  examples?: Array<{ from: string; to: string }>;
}

const REFERENCE_NUMBERS = [
  1, 2, 7, 8, 10, 15, 16, 32, 64, 100, 127, 128, 255, 256, 1000, 1024,
];

const EXAMPLE_NUMBERS = [255, 2026, 4095, 1000, 512, 777, 3600, 65535];

function hashSlug(slug: string): number {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

function yesNo(v: boolean | undefined): Msg | string {
  if (v === undefined) return "—";
  return { key: v ? "val.yes" : "val.no" };
}

function enumVal(prefix: string, v: string | undefined): Msg | string {
  return v ? { key: `val.${prefix}.${v}` } : "—";
}

function colors(f: FormatInfo): Msg | string {
  if (f.maxColors) return { key: "val.colorsMax", params: { n: f.maxColors } };
  if (f.kind === "raster") return { key: "val.colorsTrue" };
  if (f.kind === "vector") return { key: "val.colorsTrue" };
  return "—";
}

function introduced(f: FormatInfo): string {
  if (f.year && f.developer) return `${f.year} · ${f.developer}`;
  return f.developer ?? (f.year ? String(f.year) : "—");
}

function buildRows(from: FormatInfo, to: FormatInfo): CompareRow[] {
  const rows: CompareRow[] = [];
  const add = (
    label: string,
    pick: (f: FormatInfo) => Msg | string,
    show: boolean,
  ) => {
    if (show) rows.push({ label, from: pick(from), to: pick(to) });
  };
  const either = <K extends keyof FormatInfo>(k: K) =>
    from[k] !== undefined || to[k] !== undefined;
  const visual = (f: FormatInfo) =>
    f.kind === "raster" || f.kind === "vector" || f.kind === "document";

  add("row.kind", (f) => ({ key: `val.kind.${f.kind}` }), true);
  add(
    "row.compression",
    (f) => enumVal("compression", f.compression),
    either("compression"),
  );
  add(
    "row.transparency",
    (f) => enumVal("transparency", f.transparency),
    visual(from) || visual(to),
  );
  add(
    "row.animation",
    (f) => yesNo(f.animation),
    (visual(from) || visual(to)) && either("animation"),
  );
  add(
    "row.colors",
    colors,
    (visual(from) || visual(to)) && either("maxColors"),
  );
  add("row.bitDepth", (f) => f.bitDepth ?? "—", either("bitDepth"));
  add("row.audio", (f) => yesNo(f.audio ?? false), either("audio"));
  add("row.codecs", (f) => f.codecs?.join(", ") ?? "—", either("codecs"));
  add("row.base", (f) => (f.base ? String(f.base) : "—"), either("base"));
  add(
    "row.browser",
    (f) => enumVal("browser", f.browserSupport),
    either("browserSupport"),
  );
  add(
    "row.extensions",
    (f) => (f.extensions.length ? f.extensions.join(", ") : "—"),
    from.extensions.length > 0 || to.extensions.length > 0,
  );
  add("row.mime", (f) => f.mime ?? "—", either("mime"));
  add("row.introduced", introduced, either("year") || either("developer"));
  return rows;
}

function compressionPair(from: FormatInfo, to: FormatInfo): string {
  if (from.kind === "vector") return "vector";
  const lossy = (f: FormatInfo) => f.compression === "lossy";
  if (lossy(from) && lossy(to)) return "lossyToLossy";
  if (lossy(from)) return "lossyToLossless";
  if (lossy(to)) return "losslessToLossy";
  if (to.compression === "both") return "toFlexible";
  return "losslessToLossless";
}

function supportRank(s: FormatInfo["browserSupport"]): number {
  return { universal: 3, modern: 2, limited: 1, none: 0 }[s ?? "limited"];
}

function compatNote(from: FormatInfo, to: FormatInfo, p: Msg["params"]) {
  if (!from.browserSupport || !to.browserSupport) return undefined;
  const diff =
    supportRank(to.browserSupport) - supportRank(from.browserSupport);
  if (diff > 0) return { key: "notes.compatGain", params: p };
  if (diff < 0) return { key: "notes.compatLoss", params: p };
  return undefined;
}

function imageNotes(c: Conversion, from: FormatInfo, to: FormatInfo) {
  const p = { from: c.fromFormat, to: c.toFormat };
  const notes: Msg[] = [];
  const faqs: FormatComparison["faqs"] = [];

  if (from.id === "JFIF" && to.id === "JPG") {
    notes.push({ key: "notes.jfifSame", params: p });
  } else {
    notes.push({
      key: `notes.compression.${compressionPair(from, to)}`,
      params: p,
    });
  }

  if (from.kind === "vector")
    notes.push({ key: "notes.vectorToRaster", params: p });
  if (to.id === "ICO") notes.push({ key: "notes.toIco", params: p });
  if (to.id === "PDF") notes.push({ key: "notes.toPdf", params: p });

  const ft = from.transparency;
  const tt = to.transparency;
  let transparency: string | undefined;
  if (ft === "full" && tt === "none") transparency = "lost";
  else if (ft === "full" && tt === "binary") transparency = "binary";
  else if ((ft === "full" || ft === "binary") && tt === "full")
    transparency = "kept";
  else if (ft === "none" && tt && tt !== "none") transparency = "noneSource";
  if (transparency && transparency !== "noneSource") {
    notes.push({ key: `notes.transparency.${transparency}`, params: p });
  }

  if (from.animation && !to.animation)
    notes.push({ key: "notes.animationLost", params: p });
  if (from.animation && to.animation)
    notes.push({ key: "notes.animationKept", params: p });
  if (to.maxColors && !from.maxColors) {
    notes.push({
      key: "notes.paletteLimit",
      params: { ...p, n: to.maxColors },
    });
  }

  if (from.efficiency && to.efficiency && from.id !== "JFIF") {
    if (to.efficiency > from.efficiency)
      notes.push({ key: "notes.smaller", params: p });
    if (to.efficiency < from.efficiency)
      notes.push({ key: "notes.larger", params: p });
  }

  const compat = compatNote(from, to, p);
  if (compat) notes.push(compat);
  if (from.id === "HEIC" || from.id === "HEIF")
    notes.push({ key: "notes.fromHeic", params: p });

  faqs.push({
    q: { key: "faq.quality.q", params: p },
    a: {
      key:
        from.id === "JFIF" && to.id === "JPG"
          ? "faq.quality.jfifSame"
          : `faq.quality.${compressionPair(from, to)}`,
      params: p,
    },
  });
  if (from.animation) {
    faqs.push({
      q: { key: "faq.animation.q", params: p },
      a: {
        key: to.animation ? "faq.animation.kept" : "faq.animation.lost",
        params: p,
      },
    });
  } else if (transparency) {
    faqs.push({
      q: { key: "faq.transparency.q", params: p },
      a: { key: `faq.transparency.${transparency}`, params: p },
    });
  } else {
    faqs.push({
      q: { key: "faq.support.q", params: p },
      a: { key: `faq.support.${to.browserSupport ?? "limited"}`, params: p },
    });
  }
  return { notes, faqs };
}

function videoNotes(c: Conversion, from: FormatInfo, to: FormatInfo) {
  const p = { from: c.fromFormat, to: c.toFormat };
  const notes: Msg[] = [];
  const faqs: FormatComparison["faqs"] = [];

  if (to.id === "GIF") {
    notes.push({ key: "notes.videoToGif", params: p });
    notes.push({ key: "notes.audioDropped", params: p });
    notes.push({ key: "notes.paletteLimit", params: { ...p, n: 256 } });
  } else if (from.id === "GIF") {
    notes.push({ key: "notes.gifToVideo", params: p });
  } else {
    notes.push({
      key: "notes.reencode",
      params: { ...p, codecs: to.codecs?.slice(0, 3).join(", ") ?? "" },
    });
    notes.push({ key: "notes.audioKept", params: p });
  }
  const compat = compatNote(from, to, p);
  if (compat) notes.push(compat);
  if (from.browserSupport === "none")
    notes.push({ key: "notes.legacy", params: p });

  faqs.push({
    q: { key: "faq.support.q", params: p },
    a: { key: `faq.support.${to.browserSupport ?? "limited"}`, params: p },
  });
  faqs.push({
    q: { key: "faq.audio.q", params: p },
    a: {
      key:
        to.id === "GIF"
          ? "faq.audio.lost"
          : from.id === "GIF"
            ? "faq.audio.none"
            : "faq.audio.kept",
      params: p,
    },
  });
  return { notes, faqs };
}

function numberNotes(c: Conversion, from: FormatInfo, to: FormatInfo) {
  const fb = from.base ?? 10;
  const tb = to.base ?? 10;
  const n = EXAMPLE_NUMBERS[hashSlug(c.slug) % EXAMPLE_NUMBERS.length];
  const fv = n.toString(fb).toUpperCase();
  const tv = n.toString(tb).toUpperCase();
  const p = { from: c.fromFormat, to: c.toFormat, fromBase: fb, toBase: tb };
  const ex = { ...p, fromValue: fv, toValue: tv, decimal: n };

  const pow2 = (b: number) => b === 2 || b === 8 || b === 16;
  let method: Msg;
  if (pow2(fb) && pow2(tb) && (fb === 2 || tb === 2)) {
    const other = fb === 2 ? tb : fb;
    method = {
      key: "notes.number.group",
      params: { ...p, bits: Math.log2(other) },
    };
  } else if (pow2(fb) && pow2(tb)) {
    method = { key: "notes.number.viaBinary", params: p };
  } else if (tb === 10) {
    method = { key: "notes.number.positional", params: p };
  } else {
    method = { key: "notes.number.division", params: p };
  }

  const notes: Msg[] = [
    { key: "notes.number.bases", params: p },
    method,
    { key: "notes.number.example", params: ex },
  ];
  const faqs: FormatComparison["faqs"] = [
    { q: { key: "faq.number.methodQ", params: p }, a: method },
    {
      q: { key: "faq.number.exampleQ", params: ex },
      a: { key: "faq.number.exampleA", params: ex },
    },
  ];
  return { notes, faqs };
}

function dataNotes(c: Conversion) {
  const p = { from: c.fromFormat, to: c.toFormat };
  const group =
    c.slug === "csv-to-json"
      ? "csvJson"
      : c.slug === "vtt-to-srt"
        ? "vttSrt"
        : c.slug === "image-to-base64"
          ? "toBase64"
          : "fromBase64";
  const notes: Msg[] = [1, 2, 3].map((i) => ({
    key: `notes.${group}.n${i}`,
    params: p,
  }));
  const faqs: FormatComparison["faqs"] = [1, 2].map((i) => ({
    q: { key: `faq.${group}.q${i}`, params: p },
    a: { key: `faq.${group}.a${i}`, params: p },
  }));
  return { notes, faqs };
}

export function compareFormats(c: Conversion): FormatComparison | undefined {
  const from = getFormat(c.fromFormat);
  const to = getFormat(c.toFormat);
  if (!from || !to) return undefined;

  const { notes, faqs } =
    from.kind === "number" || to.kind === "number"
      ? numberNotes(c, from, to)
      : from.kind === "video" || to.kind === "video"
        ? videoNotes(c, from, to)
        : from.kind === "raster" ||
            from.kind === "vector" ||
            to.kind === "document"
          ? from.id === "Image" || to.id === "Image"
            ? dataNotes(c)
            : imageNotes(c, from, to)
          : dataNotes(c);

  const examples =
    from.base && to.base
      ? REFERENCE_NUMBERS.map((n) => ({
          from: n.toString(from.base as number).toUpperCase(),
          to: n.toString(to.base as number).toUpperCase(),
        }))
      : undefined;

  return { from, to, rows: buildRows(from, to), notes, faqs, examples };
}
