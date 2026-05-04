# Client-Side Migration & AdSense Plan

**Branch:** `client-side-adsense-refactor`
**Goal:** Remove all backend (Supabase, Stripe, CloudConvert, internal dashboards). Make app fully client-side. Monetize with Google AdSense. Become passive SEO-driven business.

---

## 1. Scope & Outcome

### In Scope
- Delete auth (Supabase) and paywall (Stripe).
- Replace CloudConvert (paid video API) with `ffmpeg.wasm` for all video conversion.
- Delete `/dashboard`, `/internal/*`, `(auth)/*` routes.
- Delete all `/api/*` route handlers except — none (all go).
- Add legal pages required by AdSense.
- Wire AdSense slots after approval.
- Keep blog, i18n (en/pt/es), SEO metadata, sitemap, JSON-LD.

### Out of Scope (deferred / not done here)
- AdSense submission itself (depends on traffic threshold).
- Migrating analytics. Vercel Analytics stays. Add GA4 separately.
- Any new tool. Existing tools keep current UX, only auth/credits stripped.

### Success Criteria
- `pnpm build` passes with zero `@supabase/*`, `stripe`, or `/api/*` references.
- All 22 tools work offline-capable (no network calls except CDN for `ffmpeg-core`).
- No Supabase env vars required to run app.
- Bundle size for tool routes does not regress >10%.
- Lighthouse SEO score ≥ 95 on every tool page.

---

## 2. Inventory — What Exists Today

### Backend / Paid Services (TO REMOVE)
| Surface | Files |
|---|---|
| Stripe checkout & webhook | `app/api/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`, `app/api/portal/route.ts`, `app/api/subscription/sync/route.ts`, `lib/stripe.ts` |
| Credit system | `app/api/credits/route.ts`, `app/api/credits/deduct/route.ts`, `lib/credits.ts`, `components/credit-badge.tsx`, `components/upgrade-modal.tsx` |
| CloudConvert (video) | `app/api/convert/route.ts`, `convertViaServer()` in `lib/conversion.ts` |
| Supabase auth | `lib/supabase/{client,server,middleware}.ts`, `app/[locale]/(auth)/{login,signup,callback}` |
| Tool-events tracking | `app/api/tool-events/route.ts`, `lib/track-tool.ts`, `components/tool-gate.tsx`, `lib/use-tool-auth.ts`, `components/signup-gate-modal.tsx`, `lib/tool-result-cache.ts` |
| Internal dashboards | `app/[locale]/internal/*`, `components/admin/*`, `lib/admin.ts` |
| Dashboard page | `app/[locale]/dashboard/{page,layout}.tsx` (uses credits + convertViaServer) |
| Account UI | `components/account-menu.tsx` |
| DB | `supabase/migrations/*` (keep folder for history; archive to `supabase.archive/`) |
| Middleware Supabase hook | `lib/supabase/middleware.ts`, call in `proxy.ts` |

### Already Client-Side (KEEP AS-IS)
- 22 tools under `app/[locale]/tools/*` (logic in `*.tsx` files: converter/extractor/etc).
- `lib/ffmpeg.ts`, `lib/conversion.ts` (already supports ffmpeg.wasm path).
- Blog (`app/[locale]/blog/*`), i18n (`messages/*.json`, `i18n/*.ts`), SEO (`lib/seo.ts`, `lib/og-image.tsx`, `components/json-ld.tsx`, `components/tool-json-ld.tsx`, `app/sitemap.ts`, `app/robots.ts`).
- Landing (`components/landing/*`).
- `proxy.ts` redirect logic (legacy slugs).

### Couplings — Tools That Currently Import Auth/Credits
20 tool client components use `ToolGate` / `useToolAuth` / `signup-gate-modal`. Removing the gate is mechanical: replace `<ToolGate>` wrapper with direct render and replace `gatedDownload(fn)` with `fn()`. List of files in section 4.

---

## 3. Architecture After Refactor

```
Browser
  ├─ Static pages (Next.js, no API routes)
  ├─ ffmpeg.wasm  ←  cdn.jsdelivr.net/npm/@ffmpeg/core-mt
  ├─ Tools execute 100% in-page
  └─ AdSense script (ads injected into reserved slots)

Vercel
  └─ Serves static build only. No serverless functions.
```

- No DB. No auth. No webhooks. No env vars beyond optional `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADSENSE_CLIENT`.
- Vercel can drop to **Hobby** plan — no Pro features needed.
- `proxy.ts` middleware kept ONLY for legacy redirects + next-intl. Supabase merge dropped.

---

## 4. Migration Phases

Each phase is a separate commit (or PR if we split). Phases are linear: do not skip.

### Phase 0 — Branch & Plan (DONE)
- Branch `client-side-adsense-refactor` created.
- This document committed.

### Phase 1 — Video Conversion: kill CloudConvert
**Why first:** unblocks deletion of `/api/convert` and Stripe (no paid tier reason left).

**Changes:**
1. `lib/conversion.ts`
   - Delete `convertViaServer()`.
   - Delete `SERVER_THRESHOLD` and the size-based routing branch.
   - Always use `ffmpeg.wasm` path.
2. `lib/ffmpeg.ts`
   - Add a hard size limit (recommend **500 MB** for video, **50 MB** for images). Throw clear error above limit.
   - Add memory-pressure UX hint in error: "File too large for browser conversion. Try compressing first or splitting."
3. Add cross-origin isolation headers in `next.config.ts` so `@ffmpeg/core-mt` (multi-thread) loads:
   ```ts
   { key: "Cross-Origin-Opener-Policy", value: "same-origin" }
   { key: "Cross-Origin-Embedder-Policy", value: "require-corp" }
   ```
   Audit: COEP can break iframes (YouTube embeds in blog?). Add per-route opt-out if needed via separate `headers()` patterns. AdSense iframes also need vetting — Google AdSense ads with `crossorigin="anonymous"` work under COEP, but verify before phase 9.
4. Delete `app/api/convert/route.ts`.

**Verify:** Convert a 100 MB MP4 → WebM in dashboard. Convert image. Check progress reporting. No CloudConvert env vars needed.

### Phase 2 — Strip credits & paywall
**Files to delete:**
- `app/api/credits/route.ts`
- `app/api/credits/deduct/route.ts`
- `app/api/checkout/route.ts`
- `app/api/portal/route.ts`
- `app/api/subscription/sync/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `lib/credits.ts`
- `lib/stripe.ts`
- `components/credit-badge.tsx`
- `components/upgrade-modal.tsx`

**Files to edit:**
- `app/[locale]/dashboard/page.tsx` — remove credit check, `setShowUpgrade`, `errorIsCredits`, `upgraded=true` query handler, `<CreditBadge>`, `<UpgradeModal>`, `/api/credits/deduct` post-download fetch.
- `components/tool-gate.tsx` — see Phase 3.
- `package.json` — remove `stripe`, `@stripe/stripe-js`. Remove `stripe:listen` script.
- `components/landing/pricing.tsx` — replace with "Free forever" section or delete and update landing layout.
- `components/landing/navbar.tsx` — remove `#pricing` link.
- `messages/{en,pt,es}.json` — drop pricing-related keys (or keep neutral copy "Free").

**Verify:** Build passes. No `stripe` import in repo. Convert without auth.

### Phase 3 — Strip auth & tool-gate
**Files to delete:**
- `app/[locale]/(auth)/` (entire group)
- `lib/supabase/{client,server,middleware}.ts`
- `lib/use-tool-auth.ts`
- `lib/tool-result-cache.ts` (was for resuming downloads after OAuth)
- `components/tool-gate.tsx`
- `components/signup-gate-modal.tsx`
- `components/account-menu.tsx`
- `app/api/tool-events/route.ts`
- `lib/track-tool.ts`
- `components/admin/*`
- `app/[locale]/internal/*`
- `lib/admin.ts`

**Files to edit:**
- All 20 tool client components (`app/[locale]/tools/*/{converter,minifier,viewer,…}.tsx`) — replace pattern:
  ```tsx
  // before
  <ToolGate toolName="x">{({ gatedDownload, trackStarted, trackCompleted }) => ...}</ToolGate>
  // after
  // direct render. gatedDownload(fn) → fn(). trackStarted/trackCompleted → no-op or remove call sites.
  ```
- `components/landing/navbar.tsx` — remove Supabase `getUser` and `isLoggedIn` state. Remove `<AccountMenu />` reference. Delete sign-in/sign-up CTAs.
- `proxy.ts` — remove `updateSession` import + call. Keep redirects + next-intl only.
- `package.json` — remove `@supabase/ssr`, `@supabase/supabase-js`.
- `supabase/` folder — move to `supabase.archive/` (or delete; we have git history).

**Tools to refactor (20 files):**
```
app/[locale]/tools/base64-decode/decoder.tsx
app/[locale]/tools/case-converter/converter.tsx (uses tool-events?)
app/[locale]/tools/color-palette/extractor.tsx
app/[locale]/tools/csv-to-json/converter.tsx
app/[locale]/tools/css-minifier/minifier.tsx
app/[locale]/tools/exif-viewer/viewer.tsx
app/[locale]/tools/favicon-generator/generator.tsx
app/[locale]/tools/hex-to-decimal/converter.tsx
app/[locale]/tools/html-minifier/minifier.tsx
app/[locale]/tools/image-compressor/compressor.tsx
app/[locale]/tools/image-resizer/resizer.tsx
app/[locale]/tools/image-to-base64/encoder.tsx
app/[locale]/tools/json-viewer/viewer.tsx
app/[locale]/tools/qr-code-generator/generator.tsx
app/[locale]/tools/stripe-fee-calculator/calculator.tsx
app/[locale]/tools/svg-to-png/converter.tsx
app/[locale]/tools/text-repeater/repeater.tsx
app/[locale]/tools/uuid-generator/generator.tsx
app/[locale]/tools/video-frame-extractor/extractor.tsx
app/[locale]/tools/video-to-gif/converter.tsx
app/[locale]/tools/vtt-to-srt/converter.tsx
app/[locale]/tools/youtube-thumbnail-downloader/thumbnail-downloader.tsx
```
*Note: `stripe-fee-calculator/page.tsx` references "stripe" in the slug only — pure calculator UI, keep it.*

**Verify:** Visit every tool, run a conversion, click download. No login prompt. No 404 on assets.

### Phase 4 — Dashboard fate
**Decision needed (you):** delete `/dashboard` entirely or keep as a no-auth meta-tool that just routes to specific tools?

**Recommended:** keep but simplify. Reasons:
- `/dashboard` is the historic landing for image/video conversion.
- Removing it breaks inbound links and existing redirects in `proxy.ts`.

**Changes if kept:**
- Strip credit check, upgrade modal, deduct call.
- Keep upload → convert → download flow only.
- Title becomes generic "Convert media" instead of crediting "3 free conversions".

**Changes if deleted:**
- Remove `app/[locale]/dashboard/`.
- Update `proxy.ts` `toolRedirects` → point old slugs to `/tools` index (already partially done).
- Update sitemap.

### Phase 5 — Cleanup ancillary
- `lib/conversion.ts` — re-check after Phase 1: drop unused params, drop `extractAudio` if no UI uses it (verify).
- `messages/*.json` — drop translation keys for: credits, signup-gate, account, internal, pricing.
- `data/*` — audit any seed for tools/users/conversions. Keep only blog/marketing data.
- Delete `.env.local` Stripe/Supabase/CloudConvert vars (manual).
- Update `README.md` and `CLAUDE.md` env-vars section. Remove Nutrient/PDF references that no longer apply (CLAUDE.md still mentions PDF — stale).

### Phase 6 — Legal pages (AdSense prerequisites)
Required for AdSense approval:
- `/privacy` — covers cookies, AdSense, Google fonts CDN, Vercel Analytics.
- `/terms` — usage terms, no warranty, jurisdiction.
- `/about` — who built it, contact channel.
- `/contact` — email or form (mailto: `rgp.prt@gmail.com` works to start).
- `/cookies` — optional but helps.

**Implementation:**
- Static MDX or `.tsx` pages under `app/[locale]/(legal)/{privacy,terms,about,contact}/page.tsx`.
- Localize: minimum English; PT/ES can be EN until traffic justifies.
- Footer links updated (`components/landing/footer.tsx`).
- Sitemap updated (`app/sitemap.ts`).
- `proxy.ts` — remove redirects that point legal slugs to `/`.

### Phase 7 — Analytics (lightweight)
- Keep `@vercel/analytics`.
- Add **GA4** via `<Script>` tag in `app/[locale]/layout.tsx` gated on `NEXT_PUBLIC_GA_ID`.
- No GTM unless we add Search Console events later.
- Cookie consent: required in EU. Use a minimal banner (e.g. lightweight component, no third-party SDK) honoring AdSense personalization toggle.

### Phase 8 — Cookie consent
AdSense + GA4 require consent in EU. Build a tiny consent banner:
- LocalStorage key `cu-consent` = `granted | denied | undefined`.
- Default: ads served as **non-personalized** until granted (`adsbygoogle.requestNonPersonalizedAds = 1`).
- GA4 only fires after consent (set `gtag('consent', 'update', …)`).

### Phase 9 — AdSense integration (post-approval)
**Pre-req:** AdSense approved (see threshold guidance below).

**Changes:**
1. Add `<Script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX">` in `<head>` of `[locale]/layout.tsx`.
2. Create `<AdSlot />` component (`components/ads/ad-slot.tsx`):
   - Reserved height (avoid CLS).
   - `data-ad-client`, `data-ad-slot`, `data-ad-format="auto"`, `data-full-width-responsive="true"`.
   - SSR-safe; pushes to `adsbygoogle` only after mount + consent.
3. Slot placements:
   - Tool page: between intro section and tool UI (above-the-fold leaderboard) AND below tool result section.
   - Blog post: in-article (after first ~300 words) + below related posts.
   - **No ads** on `/`, `/dashboard`, legal pages (lower CTR, looks spammy).
4. Validate `ads.txt` placed at `public/ads.txt`:
   ```
   google.com, pub-XXXXXXX, DIRECT, f08c47fec0942fa0
   ```

### Phase 10 — Final pass
- Run `pnpm build && pnpm lint && pnpm format`.
- Manual QA every tool + every blog locale.
- Run Lighthouse on 5 representative pages (home, blog post, image tool, video tool, legal page). Targets: SEO 95+, Performance 90+ desktop, 80+ mobile.
- Update `docs/SEO-free-suggestions.md` with new structure.
- Open PR.

---

## 5. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| ffmpeg.wasm OOM on large videos | High | User-facing failure | Hard 500 MB cap, clear error, suggest pre-compression |
| COEP/COOP breaks YouTube/AdSense iframes | Medium | Blog embeds + ads broken | Test before merge; can scope COEP to tool routes only via per-path headers |
| AdSense rejection (low traffic / thin content) | High first attempt | 30-day re-apply wait | Postpone submission until ≥50–100 daily organic visits + 30+ pages indexed |
| Dropping auth invalidates inbound links to `/login` | Low | 404s | Add 301 in `proxy.ts` `staticRedirects` for `/login`, `/signup`, `/dashboard?upgraded=*` |
| Loss of telemetry (which tools convert most) | Medium | Cannot prioritize SEO content | GA4 events on tool completion; Search Console for queries |
| Bundle bloat from `ffmpeg.wasm` always loaded | Medium | Slow LCP on tool pages | Already lazy-loaded inside `loadFFmpeg()`; verify it never enters initial chunk. Keep `dynamic(import, { ssr:false })` pattern |
| Cookie banner annoys users → bounce | Low | SEO ranking dip | Keep banner small, dismissible, non-blocking |
| AdSense blocks app from EEA without consent | High | EU revenue zero without banner | Phase 8 (banner) is hard prereq for Phase 9 |

---

## 6. AdSense Approval Threshold (Practical)

Google does not publish a number. Empirical floor for technical/utility sites:

| Factor | Minimum |
|---|---|
| Domain age | 3 months (some asian regions: 6m; PT/EU: 3m) |
| Indexed pages with unique content | ≥ 20–30 |
| Daily organic visits | 50–100 |
| Required legal pages | Privacy, Terms, About, Contact |
| Site finished (no "coming soon", no broken tools) | Required |
| Original content (no scraped) | Required |
| Domain (not subdomain of free host) | `converterup.com` ✓ |

**Common rejection reasons:**
- "Low value content" — tool pages with only UI, no descriptive text. Mitigation: each tool already has `tool-schemas.ts` SEO copy; expand FAQ section per tool.
- "Site under construction" — submit only after Phases 1–8 are merged.
- Missing privacy mention of cookies + ads.
- Insufficient navigation (footer, related links).

**Plan:** finish refactor → wait 30–60 days monitoring GSC traffic → submit AdSense → if rejected, fix cited reason and reapply after 30 days.

---

## 7. Decisions Required Before Phase 1

1. **Dashboard fate** — delete or keep stripped? *(see Phase 4)*
2. **Pricing section on landing** — replace with "Always free" or remove section entirely?
3. **GA4** — add now or defer?
4. **Locale strategy for legal pages** — EN-only or full PT/ES translations now?
5. **Vercel plan** — downgrade to Hobby after merge? (no edge functions left, fits Hobby quotas)

---

## 8. Rollback Plan

- All work on `client-side-adsense-refactor`. `main` untouched.
- If post-merge AdSense rejection or critical bug: `git revert` the merge commit, redeploy.
- Supabase project paused (not deleted) until 30 days post-merge — gives reversibility window if traffic drops unexpectedly and we want auth back.
- Stripe products archived (not deleted) — same reasoning.

---

## 9. Estimated Effort

| Phase | Effort |
|---|---|
| 1 — ffmpeg-only video | 0.5 day |
| 2 — strip credits/Stripe | 0.5 day |
| 3 — strip auth + 20 tools | 1 day |
| 4 — dashboard decision + edits | 0.5 day |
| 5 — cleanup | 0.5 day |
| 6 — legal pages (EN) | 0.5 day |
| 7 — GA4 | 0.25 day |
| 8 — cookie banner | 0.5 day |
| 9 — AdSense integration | 0.5 day |
| 10 — QA + Lighthouse + PR | 0.5 day |
| **Total** | **~5 days focused work** |

---

## 10. Open Questions

- Does the existing `/api/tool-events` data have any historical value (export before delete)?
- Any active Stripe subscriptions to refund/cancel before deleting webhook? Check Stripe dashboard before phase 2.
- Is `converterup.com` already 3+ months old? (Affects AdSense submission window.)
