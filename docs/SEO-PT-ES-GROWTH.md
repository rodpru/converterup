# SEO Growth Plan — PT/ES (Target 150 daily visitors)

**Branch context:** `client-side-adsense-refactor` (post-refactor: zero auth, zero paywall, AdSense-ready).
**Baseline:** ~15 daily visitors. **Target:** 150/day in 90 days.
**Why PT/ES:** existing 22 tools EN-only metadata in many spots, 16 PT and 16 ES blog posts already indexed (per `docs/GSC.md`), but Spanish has 500M+ native speakers vs 1.5B English — far less competition on technical long-tail queries. Portugal + Brazil is a 250M-speaker secondary market with weak local competition.

---

## 1. Where the Leverage Is — Audit

### What's already done ✓
- 22 tools live, fully client-side, no signup friction.
- 16 PT + 16 ES blog posts indexed in GSC.
- `next-intl` middleware + locale-aware sitemap.
- `generateAlternates()` hreflang tags on tools.
- JSON-LD on tool pages (WebApplication + FAQPage).

### What's leaking traffic 🔴
1. **Tool page bodies not fully localized.** Pages live at `/pt/tools/*` and `/es/tools/*` but H1, intro, FAQ, "How It Works" copy is hardcoded EN in most converters (see `app/[locale]/tools/qr-code-generator/generator.tsx` — all strings in English). PT/ES users land on EN content → bounce.
2. **Tool metadata partially localized.** Title/description may use `useTranslations` for some tools, others hardcoded.
3. **No programmatic conversion landings.** `docs/SEO-free-suggestions.md` already specced this (`/convert/png-to-jpg` × 3 locales = 360 URLs). Not built.
4. **No PT/ES-specific blog topics.** Posts are translations of EN articles. Missing locale-native intent (e.g., "calculadora taxas Mercado Pago", "converter NIF para validação", regional payment / regulation queries).
5. **Internal linking sparse.** Tools don't cross-link to translated blog posts in same locale.
6. **Core Web Vitals risk.** ffmpeg.wasm now eager-loads on tool routes. If LCP > 2.5s on mobile, ranking tanks for Spanish (mostly mobile traffic).

### What we don't know yet
- Which queries PT/ES users currently impress on (need 7-day GSC pull, filtered by country).
- Which tools have non-zero impressions in PT/ES — those get priority localization.
- Bounce rate per `/pt/*` and `/es/*` route (Vercel Analytics by country).

---

## 2. The Math (why PT/ES is realistic)

To go from 15 → 150 daily visitors we need ~135 new daily clicks. Search Console data from comparable client-side tool sites suggests CTR ~3% on positions 5-10. So we need **~4,500 daily impressions of additional indexed content**.

Conservative estimates per channel (per day, steady-state in 90 days):

| Channel | Pages | Impressions/page/day | Daily impressions | Daily clicks @ 3% |
|---|---|---|---|---|
| Tool pages, PT body localized | 22 | 30 | 660 | 20 |
| Tool pages, ES body localized | 22 | 50 | 1100 | 33 |
| Programmatic `/convert/*-to-*` PT | 30 | 25 | 750 | 22 |
| Programmatic `/convert/*-to-*` ES | 30 | 40 | 1200 | 36 |
| New PT blog posts (locale-native intent) | 10 | 20 | 200 | 6 |
| New ES blog posts (locale-native intent) | 12 | 25 | 300 | 9 |
| Existing EN traffic baseline | — | — | — | 15 |
| **Total daily clicks** | | | | **~141** |

Spanish-side numbers carry most of the goal. If we under-deliver Spanish, target slips.

---

## 3. Phased Plan — 90 Days

Each phase is sequential. Don't start a phase before the prior one ships.

### Phase A — Audit & Baseline (Week 1, 3 days)

**Goal:** know exactly where we stand before writing copy.

1. **GSC pull**, filtered by country = PT, BR, ES, MX, AR, CL, CO. Export top 100 queries + top 50 landing pages per locale. Save to `docs/seo-baseline-2026-05.csv`.
2. **Identify the 5 tools with non-zero PT impressions** and **5 with non-zero ES impressions**. These get localized first (Phase B).
3. **Audit hardcoded EN strings** in 22 tool components. List which need translation keys added. Estimated effort: 30 min/tool × 22 = 11 hours.
4. **Run PageSpeed Insights** on `/`, `/pt`, `/es`, `/tools`, `/pt/tools`, `/es/tools`, `/tools/image-compressor`, and 2-3 other top tools. Record LCP, CLS, INP for mobile + desktop.
5. **Verify hreflang.** Use `https://technicalseo.com/tools/hreflang/` on home, tools index, 1 tool, 1 blog. Fix any missing/broken pairs.
6. **Verify ffmpeg.wasm doesn't load on tool page initial render** — open DevTools Network tab on `/pt/tools/qr-code-generator`. ffmpeg should only fetch when user uploads a file.

**Deliverable:** `docs/seo-baseline-2026-05.md` with the 6 audit findings prioritized.

### Phase B — Localize the 22 Tool Pages (Weeks 2–4, ~22 hours)

**Goal:** every PT/ES tool URL must read native — title, intro, labels, FAQ, "How It Works", CTAs.

For each tool:
1. Move all hardcoded strings into `messages/{en,pt,es}.json` under `Tools.<tool-slug>.*` namespace.
2. Translate to natural PT-PT (default; PT-BR variants only if data shows BR > PT) and ES-ES (default; LATAM only if data shows MX/AR > ES).
3. Add a localized **intro paragraph** (≥80 words, keyword-rich) — Google wants substance per page.
4. Add a localized **FAQ section** (4-6 Q&A) with `FAQPage` JSON-LD (already exists for some tools — extend).
5. Update `tool-schemas.ts` to include localized `name` and `description` per locale.
6. Add localized **alt text** to any decorative imagery.

Order (highest expected return first, based on competitor SERP data):
1. `image-compressor`, `image-resizer`, `qr-code-generator`, `youtube-thumbnail-downloader`, `video-to-gif`
2. `svg-to-png`, `favicon-generator`, `image-to-base64`, `color-palette`, `exif-viewer`
3. `csv-to-json`, `json-viewer`, `base64-decode`, `html-minifier`, `css-minifier`, `uuid-generator`
4. `case-converter`, `text-repeater`, `vtt-to-srt`, `hex-to-decimal`, `video-frame-extractor`, `stripe-fee-calculator`

**Workflow:** delegate to the `translator` skill in batches of 5 tools. Verify each batch in browser before next batch.

**Deliverable:** all 22 tools pass "view PT page in browser, no English visible" test.

### Phase C — Programmatic Conversion Landing Pages (Weeks 4–6, ~16 hours)

Implements the spec already in `docs/SEO-free-suggestions.md`.

1. Build `data/conversions.ts` with ~30 conversion combos covering:
   - Image: png↔jpg, png↔webp, jpg↔webp, webp↔avif, heic→jpg, svg→png, svg→jpg
   - Video: mp4→gif, webm→gif, mov→gif, mp4→webm, mov→mp4
   - Text: csv↔json, vtt→srt, html-minify, css-minify, base64-decode, base64-encode
2. Build `app/[locale]/convert/[slug]/page.tsx` with `generateStaticParams` returning all 30 × 3 locales = 90 pages.
3. Each page = H1 + 80-word intro + 3-step "How To" + linked CTA to underlying tool + FAQ + 4 internal links to related conversions.
4. Add `HowTo` JSON-LD per page.
5. Add to sitemap (`app/sitemap.ts`).
6. Hreflang via `generateAlternates`.
7. Submit to GSC: 5 URLs/day × ~6 days for PT, then ES (GSC throttles ~10/day per property).

**Why this works:** "convert png to jpg" has 27k/mo global volume on EN, ~3k on PT, ~5k on ES. Our existing image-compressor tool already does this — we just don't have a page Google can match to that exact query.

**Deliverable:** 90 new indexed URLs, ~30 ranking 5-20 within 30 days of indexing.

### Phase D — Locale-Native Blog Posts (Weeks 6–10, ~24 hours)

Stop translating EN posts. Write **original** PT and ES content targeting queries that don't exist in English search:

**PT (Portugal + Brazil) — 10 posts:**
- "Como reduzir tamanho de imagem para anexar em email" (Outlook/Gmail limits)
- "Como converter PDF para JPG sem app" (use image-compressor + screenshot guide)
- "Como criar logotipo em SVG do zero" (free tool walkthrough)
- "Comprimir vídeo para WhatsApp sem perder qualidade" (16 MB / 100 MB limits)
- "Calcular taxa Stripe vs PayPal vs MB Way" (already have Stripe calc, add comparison)
- "Como gerar QR code Multibanco / MB Way" (PT-specific payment QR)
- "Converter NIF para JSON" (devs)
- "Como extrair frames de vídeo TikTok"
- "Como reduzir foto para Cartão de Cidadão online"
- "Como criar favicon para WordPress sem plugin"

**ES (Spain + LATAM) — 12 posts:**
- "Cómo comprimir imágenes para WhatsApp en alta calidad"
- "Cómo convertir vídeo de TikTok a GIF"
- "Calcular comisiones Stripe vs Mercado Pago vs PayPal" (LATAM critical)
- "Cómo crear código QR para Bizum / Yape / Pix"
- "Cómo redimensionar foto carnet de identidad / DNI"
- "Cómo extraer paleta de colores de un logo"
- "Convertir SVG a PNG para Canva sin perder calidad"
- "Cómo eliminar metadatos de fotos antes de publicar en redes"
- "Cómo crear favicon para Shopify / Tiendanube"
- "Cómo convertir CSV de Excel a JSON para API"
- "Cómo reducir tamaño de PDF (con conversor a imágenes)"
- "Cómo bajar miniatura de YouTube en 4K para tesis"

Pattern per post:
- 1200-1800 words (Google rewards depth on technical how-to)
- Embedded internal CTA to relevant tool (tracked in GSC as conversion paths)
- 2-3 internal links to related blog posts in same locale
- 1 outbound authoritative link (Mozilla, Stripe docs, etc) — increases trust score
- `Article` + `BreadcrumbList` JSON-LD
- Original screenshots (Spanish/Portuguese UI of the tool)
- Author bio + last-updated date (E-E-A-T)

**Deliverable:** 22 new posts (10 PT + 12 ES), each indexed within 7 days of publish.

### Phase E — Internal Linking Density (Week 8, 4 hours)

Internal links amplify the above. Audit:
1. Each tool page links to: 3 related tools (same locale), 2 related blog posts (same locale), 2 related conversion landings (same locale).
2. Each blog post links to: 1 main tool CTA, 2 related blog posts, 1 conversion landing.
3. Each conversion landing links to: 1 underlying tool, 2 related conversions, 1 related blog post.
4. Footer already lists 22 tools — verify all use `<Link>` not `<a>`.
5. **Anchor text matters.** Use descriptive anchors ("comprimir imagens online grátis"), not "click here".

Build a small `lib/internal-links.ts` that returns the locale-aware link set per page so we don't ship orphan links.

### Phase F — Backlinks PT/ES (ongoing, 4 hours/week)

EN backlink list in `docs/link-building-free.md` is global. We need locale directories:

**PT directories:**
- Sapo Tek (free tool listing)
- Pplware (comments + community pages)
- Visão (tech section)
- DEV.to lusófonos
- r/devpt, r/portugal, r/brasildev
- Tabnews.com.br (BR Hacker News)

**ES directories:**
- Genbeta (tool reviews — pitch them)
- Xataka (long shot but high authority)
- DEV.to en español
- r/spain, r/devpe, r/argentina
- Wwwhatsnew.com (Spanish tool blog)
- Hipertextual.com
- LATAM-specific: Hipertextual (MX), TecnoBlog (BR uses PT)

Outreach template (1 sentence in local language) targeting "best free tool" listicles in each language. 2 outreach emails per day, M-F → 40 attempts/month, expect 3-5 placed links (10-15% conversion is typical for unsolicited outreach).

### Phase G — Core Web Vitals (Week 6, 6 hours)

If Phase A audit shows mobile LCP > 2.5s on tool pages, this phase becomes blocking — Google demotes slow pages on Spanish where 80%+ traffic is mobile.

1. Verify ffmpeg.wasm only loads on user upload (use `dynamic(() => import(...), { ssr: false })` already in `lib/ffmpeg.ts`).
2. Inline critical CSS for tool pages (Next.js automatic, verify).
3. Lazy-load `framer-motion` heavy components below fold (`<motion.div>` blocks main thread on slow phones).
4. Audit fonts — Syne + Inter + JetBrains_Mono = 3 font families. Drop one if traffic data shows minor usage.
5. Image optimization — verify all `<img>` use `next/image` with `width`/`height`.
6. Move AdSense script (when added) to `next/script` with `strategy="afterInteractive"` — never blocking.

Target: mobile LCP < 1.8s, CLS < 0.05, INP < 200ms on 75th percentile.

### Phase H — GA4 + GSC Discipline (ongoing)

1. Install GA4 (Phase 7 of migration plan) **before** content phases ramp — need traffic source data to know which channels work.
2. Weekly GSC review (Mondays, 30 min):
   - Top 10 rising queries per locale.
   - Pages with impressions but CTR < 1% → rewrite title tag.
   - Pages with avg position 5-15 → biggest gains from internal-link boost.
3. Monthly GSC review (1st Monday): cumulative impressions per locale, identify next 5 tools/posts to optimize.

---

## 4. Effort vs Impact Map

| Phase | Hours | Expected daily clicks at 90 days | Hours per click |
|---|---|---|---|
| A. Audit | 4 | 0 (enables everything) | n/a |
| B. Tool localization | 22 | 53 | 0.4 |
| C. Programmatic landings | 16 | 58 | 0.3 |
| D. Locale-native posts | 24 | 15 | 1.6 |
| E. Internal linking | 4 | 8 (lift across all) | 0.5 |
| F. Backlinks | 16 (4 wks) | 5 direct + DA boost | 3.2 |
| G. Web Vitals | 6 | 10 (lift) | 0.6 |
| H. GA4 + GSC | 4 setup + ongoing | n/a | n/a |
| **Total** | **96** | **~141** | **0.7 avg** |

Phases B and C deliver 80% of the result. If only 40 hours available in next 30 days, do A → B → C and skip the rest.

---

## 5. Risks & Watchouts

| Risk | Likelihood | Mitigation |
|---|---|---|
| Bad PT/ES translation reads as machine output | Medium | Use `translator` skill with native review prompt; spot-check 1 in 5 strings manually |
| Programmatic landings flagged as thin/duplicate | Medium | 80-word unique intro per slug + locale + 4-6 unique FAQ each (no copy-paste across slugs) |
| Spain GDPR / cookie banner enforcement stricter than PT | High in ES | Cookie banner (Phase 8 of migration) is required; AdSense personalized = opt-in |
| AdSense rejected before traffic ramp | High first attempt | This plan delivers the volume + legal pages needed; submit only after Phase B+C ship and 30-day traffic data |
| ffmpeg.wasm tanks Web Vitals on slow phones | Medium | Phase G; gate by audit numbers from Phase A |
| Spanish search dominated by mature competitors (online-convert.com, convertio) | High | Win on long-tail combinations + "100% privado" angle (no upload) — that's still novel in ES SERP |
| Brazilian Portuguese vs European Portuguese mismatch confuses readers | Medium | Default PT-PT in `pt.json`, monitor GSC country split — if BR > PT 3:1, flip to PT-BR or add `pt-BR` locale (next-intl supports) |

---

## 6. KPIs

Track weekly. Target = 90-day position.

| Metric | Today | 30 days | 60 days | 90 days |
|---|---|---|---|---|
| Daily visitors (all) | 15 | 40 | 80 | 150 |
| Daily visitors PT | ~3 | 10 | 20 | 35 |
| Daily visitors ES | ~3 | 12 | 30 | 60 |
| Indexed URLs | ~70 | 100 | 160 | 200 |
| Avg position top 10 queries (PT) | ? | < 20 | < 12 | < 8 |
| Avg position top 10 queries (ES) | ? | < 20 | < 12 | < 8 |
| Backlinks PT/ES | 0 | 3 | 8 | 15 |
| Mobile LCP, /pt/tools/* p75 | ? | < 2.5s | < 2.0s | < 1.8s |

If at 30 days we're not on track for 30-day numbers, **stop adding content** and run Phase A audit again — likely an indexing or technical issue, not a content issue.

---

## 7. What This Plan Is NOT

- Not a paid acquisition plan. No Google Ads, no Reddit ads, no influencer spend. Cost = engineering time + a $0/mo SEO tool stack (GSC, Ahrefs Webmaster Tools free tier, PageSpeed Insights).
- Not a virality plan. Product Hunt / HN launches are good once but don't deliver recurring traffic — they're in `docs/GROWTH-PLAN.md` and stay there.
- Not an EN expansion plan. EN is competitive enough that 1 month of effort there yields less than 1 week of effort in PT/ES.

---

## 8. First Concrete Action

Before writing any new code:

1. **You** export GSC data filtered by country (PT, BR, ES, MX, AR, CL, CO) for last 90 days. CSV with `query, page, impressions, clicks, position, country`. Drop into `docs/seo-baseline-2026-05.csv`.
2. **I** generate `docs/seo-baseline-2026-05.md` with the priority list of which tools and posts to localize first based on actual non-zero impression data.
3. From there, Phase B starts.

Without baseline data we'd be guessing which 5 of 22 tools to translate first — and the wrong order costs ~3 weeks of compounding traffic.

---

## 9. Open Questions for You

1. **Translation quality bar:** native review yourself, or trust LLM PT/ES output? (Affects velocity: native review ~3× slower but +20% quality.)
2. **PT-PT vs PT-BR:** default to which? (Brazil = 5× the population, but most current visitors per `docs/GSC.md` history seem to be PT-PT given URL patterns.)
3. **Original screenshots in posts:** willing to capture, or use pure text? (Visual posts rank better but slow blog production.)
4. **Time budget:** ~10 hours/week, ~20, or full-time? Phases B+C compress from 6 weeks to 2 if you can do 30h/week.
