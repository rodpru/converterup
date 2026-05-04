# SEO — Sugestoes FREE (Pendentes)

## 1. Programmatic SEO — Landing Pages de Conversao

### Oportunidade

Criar landing pages automaticas para pesquisas do tipo:
- "converter PNG para WebP"
- "converter CSV para JSON"
- "como comprimir JPEG"
- "como redimensionar imagem"

Estas pesquisas tem **alto intent** (o utilizador quer fazer a acao agora) e **baixa concorrencia** para combinacoes especificas.

### Estrategia

Gerar paginas a partir de dados estruturados, sem escrever conteudo manualmente para cada uma.

### Combinacoes de Alto Valor

#### Conversoes de Formato (padrao: "[formato A] para [formato B]")

| De | Para | Tool Associada | Volume Estimado |
|----|------|----------------|-----------------|
| PNG | JPG | image-compressor | Alto |
| JPG | PNG | image-compressor | Alto |
| PNG | WebP | image-compressor | Medio |
| JPG | WebP | image-compressor | Medio |
| WebP | PNG | image-compressor | Medio |
| WebP | JPG | image-compressor | Medio |
| SVG | PNG | svg-to-png | Alto |
| MP4 | GIF | video-to-gif | Alto |
| WebM | GIF | video-to-gif | Medio |
| MOV | GIF | video-to-gif | Medio |
| CSV | JSON | csv-to-json | Medio |
| VTT | SRT | vtt-to-srt | Medio |
| Imagem | Base64 | image-to-base64 | Medio |

#### Acoes (padrao: "como [acao] [formato/objeto]")

| Acao | Objeto | Tool Associada |
|------|--------|----------------|
| comprimir | imagem PNG | image-compressor |
| comprimir | imagem JPG | image-compressor |
| comprimir | foto para email | image-compressor |
| redimensionar | imagem | image-resizer |
| redimensionar | foto para Instagram | image-resizer |
| redimensionar | foto para LinkedIn | image-resizer |
| redimensionar | imagem para Twitter/X | image-resizer |
| criar | QR code | qr-code-generator |
| criar | QR code com logo | qr-code-generator |
| criar | favicon | favicon-generator |
| extrair | cores de imagem | color-palette |
| extrair | frames de video | video-frame-extractor |
| ver | dados EXIF | exif-viewer |
| remover | dados EXIF | exif-viewer |
| calcular | taxas Stripe | stripe-fee-calculator |
| formatar | JSON | json-viewer |
| validar | JSON | json-viewer |
| minificar | HTML | html-minifier |
| minificar | CSS | css-minifier |
| gerar | UUID | uuid-generator |
| descodificar | Base64 | base64-decode |
| converter | texto para maiusculas | case-converter |

### Como Implementar (FREE — Next.js Dynamic Routes)

#### Estrutura de Dados

```typescript
// data/conversions.ts
export interface Conversion {
  slug: string;           // "png-to-webp"
  fromFormat: string;     // "PNG"
  toFormat: string;       // "WebP"
  toolSlug: string;       // "image-compressor"
  toolName: string;       // "Image Compressor"
  category: string;       // "image" | "video" | "text" | "code"
}

export const conversions: Conversion[] = [
  {
    slug: "png-to-jpg",
    fromFormat: "PNG",
    toFormat: "JPG",
    toolSlug: "image-compressor",
    toolName: "Image Compressor",
    category: "image",
  },
  {
    slug: "mp4-to-gif",
    fromFormat: "MP4",
    toFormat: "GIF",
    toolSlug: "video-to-gif",
    toolName: "Video to GIF Converter",
    category: "video",
  },
  // ... mais combinacoes
];
```

#### Rota Dinamica

```
app/[locale]/convert/[slug]/page.tsx
```

#### Template da Pagina

```typescript
// app/[locale]/convert/[slug]/page.tsx
import { conversions } from "@/data/conversions";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return conversions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const conversion = conversions.find((c) => c.slug === slug);
  if (!conversion) return {};

  const title = `Convert ${conversion.fromFormat} to ${conversion.toFormat} Free Online`;
  const description = `Convert ${conversion.fromFormat} files to ${conversion.toFormat} instantly in your browser. No uploads, no registration. 100% free and private.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://converterup.com/convert/${slug}`,
      languages: {
        en: `https://converterup.com/convert/${slug}`,
        pt: `https://converterup.com/pt/convert/${slug}`,
        es: `https://converterup.com/es/convert/${slug}`,
        "x-default": `https://converterup.com/convert/${slug}`,
      },
    },
  };
}

export default async function ConvertPage({ params }) {
  const { slug } = await params;
  const conversion = conversions.find((c) => c.slug === slug);
  if (!conversion) notFound();

  return (
    // Template com:
    // - H1: "Convert {fromFormat} to {toFormat} Online Free"
    // - Breve explicacao (2-3 frases)
    // - CTA directo para a tool
    // - Seccao "How it works" (3 passos)
    // - FAQ (3-4 perguntas)
    // - Link para artigos de blog relacionados
    // - Related conversions
  );
}
```

#### JSON-LD para Cada Pagina

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Convert PNG to WebP",
  "description": "Convert PNG files to WebP format...",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Upload your PNG file",
      "text": "Drag and drop or click to select your PNG file"
    },
    {
      "@type": "HowToStep",
      "name": "Choose WebP as output format",
      "text": "Select WebP from the output format options"
    },
    {
      "@type": "HowToStep",
      "name": "Download your WebP file",
      "text": "Click download to save your converted file"
    }
  ],
  "tool": {
    "@type": "HowToTool",
    "name": "ConverterUp Image Compressor"
  },
  "totalTime": "PT30S",
  "supply": []
}
```

### Titulos por Idioma

| Slug | EN | PT | ES |
|------|----|----|-----|
| png-to-jpg | Convert PNG to JPG Free Online | Converter PNG para JPG Gratis Online | Convertir PNG a JPG Gratis Online |
| mp4-to-gif | Convert MP4 to GIF Free Online | Converter MP4 para GIF Gratis Online | Convertir MP4 a GIF Gratis Online |
| svg-to-png | Convert SVG to PNG Free Online | Converter SVG para PNG Gratis Online | Convertir SVG a PNG Gratis Online |
| csv-to-json | Convert CSV to JSON Free Online | Converter CSV para JSON Gratis Online | Convertir CSV a JSON Gratis Online |

### Escala Estimada

- **Conversoes de formato:** ~15 paginas x 3 idiomas = 45 URLs
- **Acoes "como fazer":** ~25 paginas x 3 idiomas = 75 URLs
- **Total:** ~120 novas landing pages no sitemap

### Adicionar ao Sitemap

```typescript
// Em sitemap.ts
import { conversions } from "@/data/conversions";

const conversionEntries = conversions.flatMap((c) => ({
  url: `${baseUrl}/convert/${c.slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly" as const,
  priority: 0.7,
  alternates: {
    languages: {
      en: `${baseUrl}/convert/${c.slug}`,
      pt: `${baseUrl}/pt/convert/${c.slug}`,
      es: `${baseUrl}/es/convert/${c.slug}`,
    },
  },
}));
```

### Internal Linking

Cada pagina de conversao deve linkar para:
- A tool principal (CTA forte)
- Artigos de blog relacionados
- Conversoes relacionadas (ex: "PNG to JPG" linka para "PNG to WebP", "JPG to PNG")
- A pagina de tools hub

As tool pages e artigos de blog devem linkar de volta para as paginas de conversao relevantes.

### Como Verificar Resultados (FREE)

1. **Google Search Console** → Performance → filtrar por paginas `/convert/`
2. **Google Search Console** → Indexacao → verificar que as novas paginas estao indexadas
3. **site:converterup.com/convert/** no Google → ver quantas estao indexadas
4. **Google Rich Results Test** → verificar se HowTo schema aparece
5. **Ahrefs Webmaster Tools** (gratis para sites proprios) → ver keywords organicas novas

---

## Ferramentas FREE para Monitorizar

| Ferramenta | Para que serve | URL |
|------------|----------------|-----|
| Google Search Console | Indexacao, performance, erros | https://search.google.com/search-console |
| Google PageSpeed Insights | Core Web Vitals, performance | https://pagespeed.web.dev |
| Google Rich Results Test | Validar JSON-LD/schema | https://search.google.com/test/rich-results |
| Ahrefs Webmaster Tools | Backlinks, keywords (site proprio) | https://ahrefs.com/webmaster-tools |
| Bing Webmaster Tools | Indexacao Bing, SEO reports | https://www.bing.com/webmasters |
| hreflang checker | Validar hreflang tags | https://technicalseo.com/tools/hreflang/ |
| XML Sitemap Validator | Validar sitemap | https://www.xml-sitemaps.com/validate-xml-sitemap.html |
| Schema Validator | Validar structured data | https://validator.schema.org |
