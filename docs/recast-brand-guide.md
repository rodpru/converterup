# Recast — Brand Guide

## A Brand Built to Be Remembered

Every media converter looks the same: blue/gray palette, sans-serif, generic SaaS layout, no personality. Recast breaks every convention.

---

## Color System

### The Signature: Chromatic Shift

The brand is built around a gradient that visualizes conversion itself — one color transforming into another. Teal (input) → Violet (processing) → Coral (output).

**Signature Gradient:**
```css
background: linear-gradient(135deg, #0D9488, #7C3AED, #F43F5E);
```

### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FAFAF9` | Page background — warm off-white, not clinical |
| `--foreground` | `#18181B` | Primary text — near-black zinc |
| `--primary` | `#0D9488` | Brand teal — CTAs, active states, links |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#F4F4F5` | Subtle surface — cards, inputs |
| `--secondary-foreground` | `#18181B` | Text on secondary |
| `--accent` | `#F43F5E` | Hot coral — alerts, highlights, energy |
| `--accent-foreground` | `#FFFFFF` | Text on accent |
| `--muted` | `#F4F4F5` | Disabled, placeholder surfaces |
| `--muted-foreground` | `#71717A` | Secondary text, labels |
| `--card` | `#FFFFFF` | Elevated card surface |
| `--card-foreground` | `#18181B` | Text on card |
| `--border` | `#E4E4E7` | Subtle borders |
| `--input` | `#E4E4E7` | Input borders |
| `--ring` | `#0D9488` | Focus ring |
| `--destructive` | `#EF4444` | Error states |
| `--destructive-foreground` | `#FFFFFF` | Text on destructive |

### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0C0A12` | Deep space — dark with subtle purple tint |
| `--foreground` | `#EDEDEF` | Light text — not pure white |
| `--primary` | `#2DD4BF` | Neon teal — glows on dark |
| `--primary-foreground` | `#042F2E` | Dark text on primary |
| `--secondary` | `#1C1825` | Elevated dark surface |
| `--secondary-foreground` | `#EDEDEF` | Text on secondary |
| `--accent` | `#FB7185` | Vivid rose — warmer on dark |
| `--accent-foreground` | `#FFFFFF` | Text on accent |
| `--muted` | `#1C1825` | Subdued surface |
| `--muted-foreground` | `#71717A` | Secondary text |
| `--card` | `#16131E` | Card surface — slightly lighter than bg |
| `--card-foreground` | `#EDEDEF` | Text on card |
| `--border` | `#2A2535` | Subtle borders — purple-tinted |
| `--input` | `#2A2535` | Input borders |
| `--ring` | `#2DD4BF` | Focus ring — neon teal |
| `--destructive` | `#EF4444` | Error states |
| `--destructive-foreground` | `#FFFFFF` | Text on destructive |

### Usage Rules

1. O gradient assinatura aparece em: hero background (subtil), accent lines, hover states, loading bars
2. Teal e a cor primaria de acao (botoes, links)
3. Coral/Rose e energia (badges, highlights, CTAs secundarios)
4. Violet aparece apenas no gradient, nunca sozinho
5. Dark mode e o DEFAULT para a landing page (mais impactante)
6. Light mode disponivel via toggle (dashboard pode usar light)

---

## Typography

### Font Stack

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| **Display** | Syne | 600, 700, 800 | system-ui, sans-serif |
| **Body** | Inter | 400, 500, 600 | system-ui, sans-serif |
| **Mono** | JetBrains Mono | 400, 500 | monospace |

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `hero` | clamp(3rem, 8vw, 6rem) | Landing hero headline |
| `h1` | clamp(2.5rem, 5vw, 4rem) | Section headings |
| `h2` | clamp(1.75rem, 3vw, 2.5rem) | Sub-section headings |
| `h3` | 1.5rem | Card titles |
| `body-lg` | 1.125rem | Lead paragraphs |
| `body` | 1rem | Default body |
| `body-sm` | 0.875rem | Secondary text |
| `caption` | 0.75rem | Labels, badges |
| `mono-sm` | 0.6875rem (11px) | Format labels, metadata |

### Type Rules

1. **Syne** so para headlines e o wordmark. Nunca para body text
2. **Inter** para tudo o resto — body, UI, inputs, buttons
3. **JetBrains Mono** para: format badges (.PNG, .MP4), file sizes, conversion stats, code
4. Headlines em Syne 700-800, NUNCA em italico (Syne nao tem italico)
5. Enfase em headlines via cor (primary/accent), nao via italico
6. Headings com `tracking-tight` (-0.02em). Body com tracking normal
7. Line-height: headlines 1.1, body 1.6

---

## Logo

### Wordmark Principal

"RECAST" em Syne 800 (ExtraBold), uppercase, tracking -0.03em.
A barra horizontal do "A" e substituida por uma seta (→).

Em dark mode: foreground color (#EDEDEF)
Em light mode: foreground color (#18181B)

### Favicon / App Icon

Dois retangulos sobrepostos com 8-10° de rotacao entre eles:
- Retangulo 1 (input): preenchido com gradient teal→violet
- Retangulo 2 (output): outline apenas, ligeiramente maior

Corner radius: 3px nos retangulos do favicon

### Usage

- Navbar: favicon icon + "RECAST" wordmark
- Favicon: apenas os retangulos sobrepostos
- Social/OG: wordmark centrado sobre fundo dark com gradient subtil

---

## Visual Language

### Corners
| Elemento | Radius |
|----------|--------|
| Buttons, inputs, badges | 8px |
| Cards, dropzones | 12px |
| Modals, panels | 16px |
| Pills, tags | 9999px (full round) |

### Borders
- Default: `1px solid var(--border)` — subtil
- Hover/active: `1px solid var(--primary)` — teal glow
- Focus: `2px ring var(--ring)` com offset

### Shadows & Glows
- **Zero box-shadows tradicionais**
- Em dark mode, elementos ativos emitem um glow suave:
  ```css
  box-shadow: 0 0 20px rgba(45, 212, 191, 0.15); /* teal glow */
  ```
- Gradient accent lines (1px) no topo de cards destacados
- Hover states: background shift + glow, nao shadow

### Motion

| Acao | Duracao | Easing |
|------|---------|--------|
| Hover (cor, glow) | 200ms | ease |
| Entrance (fade+translate) | 500ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Stagger entre items | 60-80ms | — |
| Progress bar | real-time | linear |
| Button hover lift | 200ms | ease-out |
| Page load elements | 300-600ms | cubic-bezier(0.16, 1, 0.3, 1) |

Lift no hover: `transform: translateY(-2px)`
Arrow shift: `transform: translateX(4px)` em group-hover

### Icons
- Library: Lucide React
- Stroke: 1.5px
- Size default: 20px (w-5 h-5)
- Cor: `text-muted-foreground` default, `text-primary` quando ativo

---

## Componentes Chave

### Buttons

**Primary:**
```
bg-primary text-primary-foreground
rounded-lg (8px)
hover: bg-primary/90 -translate-y-0.5 glow
font: Inter 500, uppercase, tracking-wider, 13px
height: 44px (touch-friendly)
```

**Secondary/Outline:**
```
border border-border text-foreground
rounded-lg (8px)
hover: bg-secondary border-primary
```

**Ghost:**
```
text-muted-foreground
hover: text-foreground bg-secondary
```

### Cards
```
bg-card border border-border rounded-xl (12px)
hover: border-primary/30 + subtle teal glow (dark mode)
padding: 24-32px
NO shadows
```

### Format Badges
```
font: JetBrains Mono 500, 11px, uppercase
px-3 py-1 rounded-full (pill)
Images: bg-primary/10 text-primary border-primary/20
Videos: bg-accent/10 text-accent border-accent/20
Audio: bg-violet-500/10 text-violet-400 border-violet-500/20
```

### Progress Bar
```
height: 3px
background: var(--border)
fill: gradient assinatura (teal → violet → coral)
rounded-full
```

### Gradient Accent Line
Usado no topo de cards destacados, pricing highlighted, CTA section:
```css
height: 2px;
background: linear-gradient(90deg, #0D9488, #7C3AED, #F43F5E);
```
Animado: `background-size: 200% 100%` com animation slide

---

## Landing Page Design (Dark Mode Default)

### Navbar
- Fundo: transparente → `bg-background/80 backdrop-blur-xl` on scroll
- Logo + wordmark a esquerda
- Links: Inter 500, text-muted-foreground, hover:text-foreground
- CTA: primary button com glow

### Hero
- Fundo: `--background` com gradient mesh subtil (teal/violet blobs a 3-5% opacity)
- Headline: Syne 800, hero size, branco
- Uma palavra em gradient (cor do texto = gradient assinatura via `bg-clip-text`)
- Subtext: Inter 400, text-muted-foreground
- CTA: primary button grande + outline button
- Visual direito: format morph animation com glow effects

### Sections
- Separadores: `border-t border-border` (subtil, nao intrusivo)
- Section padding: py-24 md:py-32
- Headings: Syne 700, com uma palavra/frase em gradient ou primary color
- Body: Inter 400, text-muted-foreground, max-w-xl

### Features (Bento Grid)
- Cards com `bg-card border-border rounded-xl`
- Hover: border-primary/30 + glow
- Icons em primary color
- Numero em mono, text-muted-foreground/30

### Pricing (2 cards)
- Free: bg-card, border-border
- Unlimited: bg-gradient (teal→violet) com texto branco, glow
- Ou: fundo escuro com gradient accent line no topo

### CTA Section
- Fundo: gradient mesh (teal/violet/coral a 10-15% opacity)
- Texto branco, grande
- Gradient accent line animada no topo
- Button com glow

### Footer
- Marquee: wordmark repetido em mono, very low opacity
- Links subtis, hover:primary
- Fundo: slightly darker que background

---

## O Que Muda vs Concorrentes

| Aspecto | Concorrentes | Recast |
|---------|-------------|--------|
| Cor | Azul/cinza corporate | Teal/violet/coral gradient |
| Fundo | Branco ou cinza claro | Dark mode default |
| Tipografia | Sans generico (Open Sans, system) | Syne bold + Inter |
| Personalidade | Zero | Gradient assinatura, glow effects, voice opinionada |
| Shadows | Box-shadows tradicionais | Zero shadows, glows atmosfericos |
| Corners | Variado, inconsistente | Consistente 8-12px |
| Motion | Minimal ou excessivo | Purposeful: hover lifts, staggered entrances, gradient animations |
| Mono | Inexistente | JetBrains Mono para todos os dados tecnicos |
