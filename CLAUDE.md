# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build production bundle
npm start        # Start production server
npm run lint     # Check code with Biome
npm run format   # Auto-format code with Biome
```

## Architecture Overview

PDF Pocket Knife is a PDF editing tool built with Next.js 16, React 19, and Nutrient PDF SDK. It follows a mobile-first, editorial design aesthetic with sharp corners and serif typography.

### Key Directories

- `app/` - Next.js App Router pages (landing `/`, dashboard `/dashboard`)
- `components/` - React components (landing/, ui/, core components)
- `lib/` - Utilities (`utils.ts` for className merging, `mobile-utils.ts` for mobile hooks)
- `public/nutrient/` - Nutrient SDK WASM files and assets

### Core Application Flow

```
Landing Page (/) → Dashboard (/dashboard) → FileUploader → ActionSelector → PDFViewer
```

The dashboard is a client component managing state with React hooks:
- `selectedFile: File | null`
- `mode: "edit" | "sign" | "organize" | "annotate" | null`

### Key Components

**PDFViewer** (`components/pdf-viewer.tsx`)
- Wraps Nutrient SDK with dynamic import (no SSR)
- Configures different toolbars for mobile vs desktop
- Handles orientation-based page layouts
- Uses Web Share API with download fallback

**ActionSelector** (`components/action-selector.tsx`)
- 2x2 grid of action modes with haptic feedback on mobile
- Modes: Edit Text, Sign Document, Organize Pages, Annotate

**FileUploader** (`components/file-uploader.tsx`)
- Uses react-dropzone for drag-and-drop
- PDF files only

### Mobile Utilities (`lib/mobile-utils.ts`)

Custom hooks: `useIsMobile()`, `useOrientation()`, `usePrefersReducedMotion()`, `useIsStandalone()`

Functions: `shareFile()`, `downloadFile()`, `triggerHapticFeedback()`, `canShare()`

## Nutrient PDF SDK Reference

The project uses `@nutrient-sdk/viewer` for PDF rendering and editing.

### Basic Usage Pattern

```typescript
import NutrientViewer from "@nutrient-sdk/viewer";

// Load the viewer
const instance = await NutrientViewer.load({
  container: containerRef.current,
  document: arrayBuffer,
  baseUrl: `${window.location.origin}/nutrient/`,
  licenseKey: process.env.NEXT_PUBLIC_NUTRIENT_LICENSE_KEY,
});

// Cleanup
instance.unload();
```

### Key Configuration Options

```typescript
{
  container: HTMLElement,           // DOM element to mount viewer
  document: ArrayBuffer | string,   // PDF data or URL
  baseUrl: string,                  // Path to SDK assets
  licenseKey: string,               // License key
  toolbarItems: ToolbarItem[],      // Customize toolbar
  initialViewState: {
    zoom: "FIT_TO_WIDTH" | "FIT_TO_VIEWPORT" | number,
    layoutMode: "SINGLE" | "DOUBLE",
    sidebarMode: "THUMBNAILS" | "ANNOTATIONS" | null,
  },
  enableHistory: boolean,           // Undo/redo support
}
```

### Toolbar Items

Mobile-friendly items: `"pager"`, `"zoom-in"`, `"zoom-out"`, `"sidebar-thumbnails"`, `"annotate"`, `"ink"`

Desktop additions: `"content-editor"`, `"document-editor"`, `"highlighter"`, `"text"`, `"signature"`

### Exporting PDFs

```typescript
const pdfBuffer = await instance.exportPDF();
const blob = new Blob([pdfBuffer], { type: "application/pdf" });
```

### Supported Document Types

PDFs, DOCX, XLSX, PPTX, PNG, JPEG, TIFF - all processed client-side.

## Styling Conventions

### Design Principles

- **Editorial aesthetic**: Sharp corners (border-radius: 0), serif fonts (Fraunces), minimalist
- **Mobile-first**: All interactive elements have 44px minimum height for touch targets
- **Reduced motion support**: Components check `usePrefersReducedMotion()` before animating

### Color Variables

Light: Background `#FDFCF8`, Foreground `#1A1A1A`, Primary `#2E5C55`, Accent `#D94E3B`
Dark: Background `#1A1A1A`, Foreground `#FDFCF8`, Primary `#E6B89C`

Colors defined as CSS variables in `app/globals.css`.

### Typography

- Serif: Fraunces (headlines, editorial)
- Sans: Geist (body text, UI)
- Mono: Geist Mono (accents, labels)

### Button Variants

Using CVA in `components/ui/button.tsx`:
- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

## Key Patterns

### Dynamic Imports for PDFViewer

```typescript
const PDFViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
```

### Responsive Animation Pattern

```typescript
const prefersReducedMotion = usePrefersReducedMotion();
const animation = prefersReducedMotion ? {} : { initial: {...}, animate: {...} };
```

### Component Composition with asChild

```typescript
<Button asChild><Link href="/">Click</Link></Button>
```

Uses Radix UI Slot for flexible composition.

## Environment Variables

```
NEXT_PUBLIC_NUTRIENT_LICENSE_KEY=<license-key>
```

Required for client-side PDF viewer. Must have `NEXT_PUBLIC_` prefix.

## Configuration

- **TypeScript**: Strict mode, bundler resolution, `@/*` path alias
- **Biome**: 2-space indentation, organizes imports, Next.js/React rules
- **React Compiler**: Enabled in `next.config.ts` for automatic optimizations
- **Tailwind 4**: Using PostCSS integration, custom theme in `globals.css`

## External Resources

- [Nutrient Web SDK Guide](https://www.nutrient.io/guides/web/)
- [Nutrient API Reference](https://www.nutrient.io/api/web/)
- [Local Nutrient Docs](/docs/nutrient-docs/)
