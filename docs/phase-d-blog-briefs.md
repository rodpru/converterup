# Phase D — Locale-Native Blog Posts (Authoring Briefs)

Status: not yet authored. Writing 22 × 1500-word original posts is ~24h of focused work and was deferred from the SEO automation session. This file is the production brief — hand each entry to a translator/copywriter (human or LLM) and fill in `data/articles.json` + render them via the existing blog template.

Post format and structure are already defined by `lib/blog.ts` and `data/articles.json`. New posts must include: `slug`, `title`, `description`, `category`, `lang`, `publishedAt`, `toolHref` (when applicable), `content` (markdown body).

---

## Why these specific posts (not translations of EN)

Existing PT/ES blog content is mostly translation of EN articles → competes against itself in semantic clusters and misses locale-only intent (Bizum, MB Way, Pix, Mercado Pago, DNI, NIF, etc.). The 22 posts below target queries that *don't exist* in English search.

Each post should:
- Be 1200–1800 words, authored in target locale (no translation tone).
- Lead with the search query in the H1, repeated in the first 100 words.
- Embed a CTA to the relevant ConverterUp tool (provided per post).
- Link out once to a high-authority external source (Mozilla, Stripe docs, government site).
- Include 2–3 internal links to related ConverterUp posts in the same locale.
- Carry `Article` + `BreadcrumbList` JSON-LD (already handled by blog renderer).
- Use locale-native idioms — no machine-translation tone.

---

## PT (Portugal + Brazil) — 10 posts

### 1. Como reduzir tamanho de imagem para anexar em email (Outlook, Gmail)
- **slug**: `como-reduzir-tamanho-imagem-email`
- **toolHref**: `/tools/image-compressor`
- **target query**: "reduzir tamanho imagem email", "comprimir imagem para enviar por email"
- **angle**: Outlook 25 MB / Gmail 25 MB attachment limits, recommend WebP for inline + JPG for attachment
- **internal links**: image-compressor tool + `/blog/png-vs-jpg-vs-webp`

### 2. Como converter PDF para JPG sem aplicação (browser only)
- **slug**: `como-converter-pdf-para-jpg-sem-app`
- **toolHref**: `/tools/image-compressor`
- **target query**: "converter pdf para jpg sem app", "pdf para jpg online"
- **angle**: print-to-PDF screenshot trick + image-compressor for downscale
- **internal links**: image-compressor + image-resizer

### 3. Como criar QR code Multibanco / MB Way
- **slug**: `como-criar-qr-code-mbway-multibanco`
- **toolHref**: `/tools/qr-code-generator`
- **target query**: "qr code mbway", "qr multibanco gerar"
- **angle**: explain MB Way deep links (vs SEPA QR), generate scannable QR with logo
- **internal links**: qr-code-generator + stripe-fee-calculator

### 4. Como comprimir vídeo para WhatsApp sem perder qualidade
- **slug**: `comprimir-video-whatsapp-sem-perder-qualidade`
- **toolHref**: `/tools/video-to-gif`
- **target query**: "comprimir vídeo whatsapp", "reduzir tamanho vídeo whatsapp"
- **angle**: 16 MB / 100 MB WhatsApp Business limits, H.264 + AAC settings
- **internal links**: video-to-gif + video-frame-extractor

### 5. Calcular taxas Stripe vs PayPal vs MB Way
- **slug**: `taxas-stripe-vs-paypal-vs-mbway`
- **toolHref**: `/tools/stripe-fee-calculator`
- **target query**: "taxas stripe vs paypal", "comparar taxas pagamento online portugal"
- **angle**: PT-specific comparison table, explain SEPA vs cartão internacional fees
- **internal links**: stripe-fee-calculator + post #3

### 6. Como gerar QR code para Pix (Brasil)
- **slug**: `como-gerar-qr-code-pix-brasil`
- **toolHref**: `/tools/qr-code-generator`
- **target query**: "gerar qr code pix", "criar qr pix online"
- **angle**: Pix EMVCo BR Code structure, copy-paste payload field, scan with Pix-enabled banking app
- **internal links**: qr-code-generator + post #3

### 7. Como reduzir foto para Cartão de Cidadão online
- **slug**: `reduzir-foto-cartao-cidadao-online`
- **toolHref**: `/tools/image-resizer`
- **target query**: "foto cartão de cidadão tamanho", "reduzir foto cc online"
- **angle**: official 35×45 mm and 26×31 mm sizing, white background requirement, 300 DPI
- **internal links**: image-resizer + image-compressor

### 8. Como criar favicon para WordPress sem plugin
- **slug**: `criar-favicon-wordpress-sem-plugin`
- **toolHref**: `/tools/favicon-generator`
- **target query**: "favicon wordpress sem plugin", "adicionar favicon wp manualmente"
- **angle**: theme.php approach + Customizer Site Identity option
- **internal links**: favicon-generator + svg-to-png

### 9. Como extrair frames de vídeo TikTok
- **slug**: `extrair-frames-video-tiktok`
- **toolHref**: `/tools/video-frame-extractor`
- **target query**: "extrair frames tiktok", "tirar foto vídeo tiktok"
- **angle**: 1080×1920 vertical format, frame extraction at exact timestamp
- **internal links**: video-frame-extractor + video-to-gif

### 10. Como validar NIF em JSON
- **slug**: `validar-nif-json-portugal`
- **toolHref**: `/tools/json-viewer`
- **target query**: "validar nif json", "regex nif portugal"
- **angle**: developer guide — regex `^[1-9][0-9]{8}$` + check-digit algorithm
- **internal links**: json-viewer + uuid-generator

---

## ES (Spain + LATAM) — 12 posts

### 1. Cómo comprimir imágenes para WhatsApp en alta calidad
- **slug**: `comprimir-imagenes-whatsapp-alta-calidad`
- **toolHref**: `/tools/image-compressor`
- **target query**: "comprimir imagen whatsapp", "reducir tamaño imagen whatsapp"
- **angle**: WhatsApp 16 MB / 100 MB Business; "Documento" send method to bypass auto-compression
- **internal links**: image-compressor + `/blog/png-vs-jpg-vs-webp-diferencias-y-cual-usar`

### 2. Cómo convertir vídeo de TikTok a GIF
- **slug**: `convertir-video-tiktok-a-gif`
- **toolHref**: `/tools/video-to-gif`
- **target query**: "convertir tiktok a gif", "tiktok a gif online"
- **angle**: download MP4 from share link → upload → trim → export GIF
- **internal links**: video-to-gif + video-frame-extractor

### 3. Calcular comisiones Stripe vs Mercado Pago vs PayPal
- **slug**: `comisiones-stripe-vs-mercadopago-vs-paypal`
- **toolHref**: `/tools/stripe-fee-calculator`
- **target query**: "comisiones stripe vs mercado pago", "comparar comisiones procesadores pago"
- **angle**: LATAM-critical, MX/AR/CO market rates table
- **internal links**: stripe-fee-calculator + post #4

### 4. Cómo crear código QR para Bizum / Yape / Pix
- **slug**: `crear-codigo-qr-bizum-yape-pix`
- **toolHref**: `/tools/qr-code-generator`
- **target query**: "qr bizum", "qr yape", "qr pix españa"
- **angle**: country-by-country: Bizum (ES), Yape (PE), Pix (BR), with payload examples
- **internal links**: qr-code-generator + post #3

### 5. Cómo redimensionar foto carnet de identidad / DNI
- **slug**: `redimensionar-foto-dni-carnet-identidad`
- **toolHref**: `/tools/image-resizer`
- **target query**: "foto dni tamaño", "redimensionar foto carnet"
- **angle**: ES 32×26 mm DNI; AR 4×4 cm cédula; MX INE specs; 300 DPI white background
- **internal links**: image-resizer + image-compressor

### 6. Cómo extraer paleta de colores de un logo
- **slug**: `extraer-paleta-colores-logo`
- **toolHref**: `/tools/color-palette`
- **target query**: "extraer colores logo", "paleta colores imagen online"
- **angle**: brand-design use case, 8-color extraction workflow + HEX export
- **internal links**: color-palette + favicon-generator

### 7. Convertir SVG a PNG para Canva sin perder calidad
- **slug**: `convertir-svg-png-canva-sin-perder-calidad`
- **toolHref**: `/tools/svg-to-png`
- **target query**: "svg a png canva", "convertir svg a png alta calidad"
- **angle**: Canva PNG-only upload limits, 4× scale workflow
- **internal links**: svg-to-png + post #6

### 8. Cómo eliminar metadatos de fotos antes de publicar en redes
- **slug**: `eliminar-metadatos-fotos-redes-sociales`
- **toolHref**: `/tools/exif-viewer`
- **target query**: "quitar metadatos foto", "eliminar exif imagen online"
- **angle**: privacy angle — GPS leak risk in published photos, EXIF-strip workflow
- **internal links**: exif-viewer + image-compressor

### 9. Cómo crear favicon para Shopify / Tiendanube
- **slug**: `crear-favicon-shopify-tiendanube`
- **toolHref**: `/tools/favicon-generator`
- **target query**: "favicon shopify", "favicon tiendanube"
- **angle**: theme settings → Brand → Favicon, 32×32 minimum
- **internal links**: favicon-generator + svg-to-png

### 10. Cómo convertir CSV de Excel a JSON para API
- **slug**: `convertir-csv-excel-json-api`
- **toolHref**: `/tools/csv-to-json`
- **target query**: "convertir csv excel a json", "csv a json api"
- **angle**: Excel "Save As CSV UTF-8" caveats + REST POST body example
- **internal links**: csv-to-json + json-viewer

### 11. Cómo reducir tamaño de PDF (con conversor a imágenes)
- **slug**: `reducir-tamano-pdf-conversor-imagenes`
- **toolHref**: `/tools/image-compressor`
- **target query**: "reducir tamaño pdf online", "comprimir pdf"
- **angle**: print-to-PDF as image route + JPG compression at 60 % quality
- **internal links**: image-compressor + image-resizer

### 12. Cómo bajar miniatura de YouTube en 4K para tesis
- **slug**: `bajar-miniatura-youtube-4k-tesis`
- **toolHref**: `/tools/youtube-thumbnail-downloader`
- **target query**: "miniatura youtube 4k", "thumbnail youtube alta resolución"
- **angle**: maxresdefault.jpg URL pattern + academic citation guidance
- **internal links**: youtube-thumbnail-downloader + image-compressor

---

## Production workflow

For each post:
1. Author the markdown body in the target locale (no translation pivot through EN).
2. Add to `data/articles.json` with all required fields.
3. Verify it renders at `/{locale}/blog/{slug}` (already handled by `app/[locale]/blog/[slug]/page.tsx`).
4. Submit URL to Google Search Console for indexing (top of `docs/GSC.md` priority queue).
5. Track in GSC: target avg position < 12 within 30 days.

## Recommended cadence

- 1 post/day, 5 days/week → 22 posts in ~5 weeks.
- Alternate languages (PT post Mon, ES post Tue, etc) — keeps both clusters growing in parallel.
- Track GSC weekly; if a post's first-week impressions are < 5, rewrite the title before week 2.
