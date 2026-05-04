# SEO Baseline — 2026-05-02

Codebase audit. Search Console country-filtered data is **pending user export** — when ready, drop `seo-baseline-2026-05.csv` next to this file and we'll re-prioritize the Phase B order.

---

## What's already correctly localized

- `app/[locale]/tools/<slug>/page.tsx` (server wrapper) — `title`, `description`, `canonical`, `hreflang` all flow through `ToolMeta.<slug>-title` / `ToolMeta.<slug>-desc` translation keys + `generateAlternates`.
- Sitemap (`app/sitemap.ts`) — emits `alternates.languages` per tool/blog URL.
- Blog routing — locale-prefixed URLs already indexed in GSC.
- `Pricing`, `Hero`, `Navigation`, `Tools`, `Footer` translation namespaces in `messages/{en,pt,es}.json`.

## What's NOT localized (the leak)

| Surface | Status | Where |
|---|---|---|
| Tool body H1, intro, "How It Works", FAQ, button labels, error strings | 🔴 hardcoded EN | All 22 `app/[locale]/tools/*/<component>.tsx` files |
| `lib/tool-schemas.ts` HowTo JSON-LD (`name`, `description`, step text) | 🔴 EN only, single export | `lib/tool-schemas.ts` |
| `<ToolJsonLd slug="..." />` | 🔴 not locale-aware (`components/tool-json-ld.tsx`) | Renders English HowTo even on `/pt` and `/es` |
| `<RelatedGuides toolHref="..." />` | ⚠️ check — likely EN copy | `components/related-guides.tsx` |
| `ConversionOptions`, `ConversionProgress`, `ConversionResult`, `ConversionError`, `FileUploader` | 🔴 hardcoded EN | `components/conversion-*.tsx`, `components/file-uploader.tsx` |
| `Pricing` section CTA + features (after refactor to single free card) | ✅ localized | `components/landing/pricing.tsx` (uses `t(...)`) |
| `CookieConsent` banner | 🔴 EN only | `components/cookie-consent.tsx` |
| Legal pages `/about`, `/privacy`, `/terms`, `/contact` | 🔴 EN only on PT/ES routes | `app/[locale]/(legal)/*` |

## Hreflang spot-check

Only `tools-grid.tsx` calls `useTranslations`. Tool components don't. So PT/ES tool URLs render English HTML body. Google interprets this as **same content under different URLs** → cannibalisation risk + lower rankings.

## ffmpeg.wasm load behaviour

`lib/ffmpeg.ts` lazy-loads `ffmpeg-core` from CDN inside `loadFFmpeg()` (called from `convertMedia` at user-upload time). Multi-thread variant gated on `crossOriginIsolated`. Headers in `next.config.ts` apply COOP/COEP only to `/tools/*` and `/dashboard/*` — landing/blog/legal not isolated, so AdSense + YouTube embeds elsewhere stay safe.

✅ ffmpeg does not block initial render of tool pages.

## Phase B priority order (provisional, until GSC data lands)

Without GSC country-filtered impressions we order by *expected* SERP volume in PT/ES based on global English benchmarks:

1. `image-compressor`
2. `image-resizer`
3. `qr-code-generator`
4. `youtube-thumbnail-downloader`
5. `video-to-gif`
6. `svg-to-png`
7. `favicon-generator`
8. `image-to-base64`
9. `color-palette`
10. `exif-viewer`
11. `csv-to-json`
12. `json-viewer`
13. `base64-decode`
14. `html-minifier`
15. `css-minifier`
16. `uuid-generator`
17. `case-converter`
18. `text-repeater`
19. `vtt-to-srt`
20. `hex-to-decimal`
21. `video-frame-extractor`
22. `stripe-fee-calculator`

Once GSC CSV arrives, swap any tool with non-zero PT/ES impressions to the top of the list.

## Next concrete step

Phase B starts. Each tool gets:
- Translation keys for every user-facing string under `Tools.<slug>.body.*` namespace.
- Native PT and ES copy.
- 80-word locale-native intro paragraph.
- 4-6 FAQ Q&A localized.
- Locale-aware HowTo JSON-LD.
