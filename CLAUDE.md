# CLAUDE.md

Guidance for Claude Code working in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build production bundle
npm start        # Start production server
npm run lint     # Check code with Biome
npm run format   # Auto-format code with Biome
```

## Architecture Overview

ConverterUp is a 100% client-side image / video / utility converter built with Next.js 16, React 19, and ffmpeg.wasm. No backend, no auth, no paid APIs. Monetized via Google AdSense.

### Key Directories

- `app/[locale]/` — Next.js App Router pages (landing `/`, dashboard `/dashboard`, tools `/tools/*`, blog `/blog/*`). Locales: `en`, `pt`, `es`.
- `components/` — React components (`landing/`, `blog/`, `ui/`, core components).
- `lib/` — Utilities. Highlights:
  - `ffmpeg.ts` — singleton wrapper around `@ffmpeg/ffmpeg`, lazy-loads `core-mt` from CDN.
  - `conversion.ts` — `convertMedia()` orchestrates client-side image/video conversion. Hard caps: 500 MB video, 50 MB image.
  - `seo.ts`, `og-image.tsx`, `tool-schemas.ts`, `blog.ts` — SEO + content metadata.
  - `mobile-utils.ts` — touch / orientation / share helpers.
- `messages/{en,pt,es}.json` — next-intl locale files.
- `i18n/` — next-intl routing + request config.
- `public/` — static assets, manifest, icons.
- `proxy.ts` — middleware: legacy slug redirects + next-intl.
- `docs/` — design notes, SEO docs, migration plan.

### Core Application Flow

Tools are individual `app/[locale]/tools/<slug>/page.tsx` (server, SEO) + `<component>.tsx` (client, logic). The shared `/dashboard` is the upload→convert→download landing for arbitrary media.

### ffmpeg.wasm Notes

- Multi-threaded `@ffmpeg/core-mt` requires Cross-Origin Isolation. `next.config.ts` sets `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` ONLY on `/*/tools/*` and `/*/dashboard/*` so AdSense + YouTube embeds on landing/blog still work.
- If you add an iframe to a tool route, it must serve with `Cross-Origin-Resource-Policy: cross-origin` or it will be blocked.

### File Size Limits

- Video: 500 MB hard cap (`MAX_VIDEO_SIZE`).
- Image: 50 MB hard cap (`MAX_IMAGE_SIZE`).
- Above limits: throw clear error suggesting pre-compression.

## Styling Conventions

### Design Principles

- **Editorial aesthetic**: Sharp corners (border-radius: 0 in core), serif accents (Syne/Inter/JetBrains Mono).
- **Mobile-first**: 44 px minimum touch targets.
- **Reduced motion**: components honor `usePrefersReducedMotion()`.

### Color Variables

Defined in `app/globals.css`. Dark default. Primary teal `#2DD4BF`. Background `#0C0A12`. Accent `#FB7185` (errors).

### Typography

- `Syne` — display, headlines.
- `Inter` — body / UI.
- `JetBrains Mono` — labels, mono accents.

## Patterns

### Dynamic Imports

`ffmpeg.wasm` and viewer-style libs are loaded inside client components only — never imported at module top level on a server component.

### Component Composition

Use Radix UI Slot via shadcn-style `Button asChild` pattern.

## Environment Variables

None required. App runs fully client-side.

Optional (Phase 7+):
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID.
- `NEXT_PUBLIC_ADSENSE_CLIENT` — AdSense publisher ID (`ca-pub-...`).

## Configuration

- **TypeScript** strict, bundler resolution, `@/*` alias.
- **Biome** 2-space indent, organized imports.
- **React Compiler** enabled in `next.config.ts`.
- **Tailwind 4** via PostCSS, theme in `globals.css`.

## Migration Reference

See `docs/CLIENT-SIDE-MIGRATION.md` for the in-progress plan removing Supabase / Stripe / CloudConvert.
