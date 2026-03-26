# RECAST — Master Document

> Media conversion tool. 100% client-side. Private. Fast. Beautiful.

---

# Part 1: Brand Identity

## 1.1 Positioning

**Archetype:** The Magician (transformation) + The Sage (trust)
**Territory:** Competence, calm, empowerment
**Analogies:** Aesop (premium ritual), Leica (precision), Muji (honest simplicity)

**Name semiotics — "Recast":**
- Foundry/metallurgy — melt and pour into a new mold
- Theater — same content, new vessel
- Cognitive reframing — see your file differently
- The "Re-" prefix — renewal, iteration, improvement

**Voice:** Confident, minimal, factual. Like a knowledgeable friend who respects your time.

**Principles:**
1. Facts, not feelings — "Files never leave your device" > "We care about privacy"
2. Active voice, present tense
3. Minimal — say it in fewer words, then cut more
4. No permission-asking — "Drop your file" not "Would you like to convert?"

**Words to use:** convert, transform, recast, private, instant, browser-native, drop, done
**Words to avoid:** upload, cloud, AI-powered, revolutionary, seamless, robust, please, oops

**Example headlines:**
| Context | Headline |
|---------|----------|
| Hero | Convert anything. Upload nothing. |
| Privacy | Your files stay on your device. Period. |
| Speed | Browser-native speed. No server queue. |
| Formats | PNG. JPG. WebP. MP4. GIF. Whatever you need. |
| Complete | Done. |
| Error | That file didn't work. Try a different format. |
| Philosophy | Media conversion should be private, fast, and free. So we built that. |

---

## 1.2 Color System — Chromatic Shift

The brand is built around a gradient that visualizes conversion: one color transforming into another.

**Signature Gradient:**
```css
background: linear-gradient(135deg, #0D9488, #7C3AED, #F43F5E);
```
Teal (input) → Violet (processing) → Coral (output)

### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FAFAF9` | Page background — warm off-white |
| `--foreground` | `#18181B` | Primary text — near-black zinc |
| `--primary` | `#0D9488` | Brand teal — CTAs, links |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#F4F4F5` | Cards, inputs |
| `--secondary-foreground` | `#18181B` | Text on secondary |
| `--accent` | `#F43F5E` | Hot coral — alerts, highlights |
| `--accent-foreground` | `#FFFFFF` | Text on accent |
| `--muted` | `#F4F4F5` | Disabled surfaces |
| `--muted-foreground` | `#71717A` | Secondary text, labels |
| `--card` | `#FFFFFF` | Elevated card surface |
| `--card-foreground` | `#18181B` | Text on card |
| `--border` | `#E4E4E7` | Subtle borders |
| `--input` | `#E4E4E7` | Input borders |
| `--ring` | `#0D9488` | Focus ring |
| `--destructive` | `#EF4444` | Error states |

### Dark Mode (DEFAULT for landing page)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0C0A12` | Deep space — purple-tinted dark |
| `--foreground` | `#EDEDEF` | Light text |
| `--primary` | `#2DD4BF` | Neon teal — glows on dark |
| `--primary-foreground` | `#042F2E` | Dark text on primary |
| `--secondary` | `#1C1825` | Elevated dark surface |
| `--secondary-foreground` | `#EDEDEF` | Text on secondary |
| `--accent` | `#FB7185` | Vivid rose |
| `--accent-foreground` | `#FFFFFF` | Text on accent |
| `--muted` | `#1C1825` | Subdued surface |
| `--muted-foreground` | `#71717A` | Secondary text |
| `--card` | `#16131E` | Card surface |
| `--card-foreground` | `#EDEDEF` | Text on card |
| `--border` | `#2A2535` | Purple-tinted borders |
| `--input` | `#2A2535` | Input borders |
| `--ring` | `#2DD4BF` | Focus ring — neon teal |
| `--destructive` | `#EF4444` | Error states |

### Color Rules

1. Gradient appears in: hero background (subtle), accent lines, hover states, progress bars
2. Teal = primary action color (buttons, links)
3. Coral/Rose = energy (badges, highlights, secondary CTAs)
4. Violet appears ONLY in the gradient, never alone
5. Dark mode is DEFAULT for landing page
6. Light mode available via toggle (dashboard can use light)

---

## 1.3 Typography

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

1. **Syne** only for headlines and wordmark. Never for body
2. **Inter** for everything else — body, UI, inputs, buttons
3. **JetBrains Mono** for: format badges (.PNG, .MP4), file sizes, stats, code
4. Headlines: Syne 700-800, NEVER italic (Syne has no italic)
5. Emphasis in headlines via color (primary/accent), not italic
6. Headings: `tracking-tight` (-0.02em). Body: normal tracking
7. Line-height: headlines 1.1, body 1.6

---

## 1.4 Logo

### Wordmark
"RECAST" in Syne 800 (ExtraBold), uppercase, tracking -0.03em.
The crossbar of "A" replaced with an arrow (→).

Dark mode: `#EDEDEF` / Light mode: `#18181B`

### Favicon / App Icon
Two overlapping rectangles with 8-10° rotation between them:
- Rectangle 1 (input): filled with gradient teal→violet
- Rectangle 2 (output): outline only, slightly larger
- Corner radius: 3px

### Usage
- Navbar: favicon icon + "RECAST" wordmark
- Favicon: overlapping rectangles only
- Social/OG: wordmark centered on dark background with subtle gradient

---

## 1.5 Visual Language

### Corners
| Element | Radius |
|---------|--------|
| Buttons, inputs, badges | 8px |
| Cards, dropzones | 12px |
| Modals, panels | 16px |
| Pills, tags | 9999px (full round) |

### Borders
- Default: `1px solid var(--border)` — subtle
- Hover/active: `1px solid var(--primary)` — teal glow
- Focus: `2px ring var(--ring)` with offset

### Shadows & Glows
- **Zero traditional box-shadows**
- Dark mode: active elements emit subtle glow:
  ```css
  box-shadow: 0 0 20px rgba(45, 212, 191, 0.15); /* teal glow */
  ```
- Gradient accent lines (2px) on top of highlighted cards
- Hover states: background shift + glow, not shadow

### Motion
| Action | Duration | Easing |
|--------|----------|--------|
| Hover (color, glow) | 200ms | ease |
| Entrance (fade+translate) | 500ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Stagger between items | 60-80ms | — |
| Progress bar | real-time | linear |
| Button hover lift | 200ms | ease-out |
| Page load elements | 300-600ms | cubic-bezier(0.16, 1, 0.3, 1) |

Hover lift: `transform: translateY(-2px)`
Arrow shift: `transform: translateX(4px)` on group-hover

### Icons
- Library: Lucide React
- Stroke: 1.5px
- Default size: 20px (w-5 h-5)
- Color: `text-muted-foreground` default, `text-primary` when active

### Key Components

**Primary Button:**
```
bg-primary text-primary-foreground rounded-lg (8px)
hover: bg-primary/90 -translate-y-0.5 glow
font: Inter 500, uppercase, tracking-wider, 13px
height: 44px (touch-friendly)
```

**Cards:**
```
bg-card border border-border rounded-xl (12px)
hover: border-primary/30 + teal glow (dark mode)
padding: 24-32px — NO shadows
```

**Format Badges:**
```
font: JetBrains Mono 500, 11px, uppercase, rounded-full (pill)
Images: bg-primary/10 text-primary border-primary/20
Videos: bg-accent/10 text-accent border-accent/20
Audio: bg-violet-500/10 text-violet-400 border-violet-500/20
```

**Progress Bar:**
```
height: 3px, rounded-full
background: var(--border)
fill: signature gradient (teal → violet → coral)
```

**Gradient Accent Line:**
```css
height: 2px;
background: linear-gradient(90deg, #0D9488, #7C3AED, #F43F5E);
/* Animated: background-size: 200% 100% with slide animation */
```

---

# Part 2: Design Trends 2025-2026

## 2.1 Layout Trends

- **Bento grid** replaces uniform grids (Linear, Raycast pattern)
- **Sticky scroll sections** — content animates while section stays pinned
- **Contained width** (1200-1400px) with full-viewport hero breakouts
- **Asymmetric splits** (60/40, 65/35) — product visual gets the larger side
- **Gap-px pattern** — 1px gaps between cards using background color as the "border"

## 2.2 Typography Trends

- **Oversized serif/display headlines** (80-170px desktop) with tight sans body
- **Variable font weight as design element** — light 300 for body, bold 700 for emphasis
- **Monospace for technical credibility** (Vercel, Linear pattern)
- **Kinetic type on scroll** — letters/words animate in on viewport entry

## 2.3 Color & Visual Trends

- **Dark mode as default** for SaaS (Linear, Vercel, Raycast, Resend)
- **Monochromatic + single accent** color — restraint = sophistication
- **Grain/noise textures are declining** (peak 2023-2024)
- **Mesh gradients** for hero backgrounds (multi-point, low opacity)
- **Glassmorphism is in decline** — used very sparingly if at all

## 2.4 Animation & Interaction Trends

- **Lenis smooth scrolling** — interpolated scroll, standard for award sites
- **Scroll-triggered entrances** — fade up + stagger (table stakes)
- **Navbar: transparent → backdrop-blur on scroll**
- **GSAP ScrollTrigger** for scroll orchestration, Framer Motion for components
- **One 3D element** in the hero (not throughout the page)
- **Cursor-magnetic buttons** — subtle pull on hover

## 2.5 Hero Section Patterns

- **Product-as-hero** — bold headline + product screenshot/demo dominates viewport
- **Metric-driven headlines** — specific outcomes, not generic claims
- **Minimal: 3-5 elements max** — headline, subline, CTA, visual
- **Animated background textures** — dot grids, gradient shifts, low contrast

## 2.6 Component Trends

- **Cards: 1px borders, no shadows** (shadows feel dated)
- **CTA buttons: solid fill + translateY(-2px) hover**
- **Marquee/ticker** for logo bars and trust signals
- **Dense footers** (4-6 columns, treated as real estate)
- **Format badges as visual motif** — functional and decorative

## 2.7 Award-Winning SaaS References

| Brand | Key Takeaway |
|-------|-------------|
| **Linear** | Multi-layer text opacity (4 levels) > size changes. Grid-dot animations. |
| **Notion** | Whitespace discipline. Card-based modularity. |
| **Arc** | Custom display fonts = instant recognition. Noise textures for materiality. |
| **Stripe** | Gradient meshes on dark = most premium visual on the web. |
| **Raycast** | Atmospheric colored shadows (elements emit light, don't cast shadow). |

---

# Part 3: Competitor Analysis

## 3.1 Design Quality Ranking

| # | Tool | Design | Key Observation |
|---|------|--------|-----------------|
| 1 | Squoosh (Google) | Excelente | Animated blobs, wave dividers. Images only. |
| 2 | TinyPNG | Good | Panda mascot = only competitor with personality. |
| 3 | Convertio | Medium | Clean but generic. Open Sans, zero brand. |
| 4 | CloudConvert | Medium | Functional, sterile. ISO 27001. |
| 5 | FreeConvert | Weak | Decent base destroyed by aggressive ads. |
| 6 | Zamzar | Weak | Corporate blue. Most generic headline in category. |
| 7 | Online-Convert | Dated | 2015 directory style. Best logo wall (Siemens, Dell, Samsung). |
| 8 | HandBrake | Minimal | Bare-bones open-source page. Desktop only. |

## 3.2 Competitor Monetization

| Tool | Free Tier | Paid Model | Entry Price | Key Limit |
|------|-----------|------------|-------------|-----------|
| CloudConvert | 10 conv/day | Credits | Variable | Per-conversion |
| Convertio | 10 conv/day, 100MB | Subscription | $5.99/mo (annual) | File size |
| Zamzar | 50MB limit | Subscription | Unknown | File size |
| FreeConvert | 20 min/day | Subscription | $12.99/mo | Minutes |
| Online-Convert | Limited | Subscription | Unknown | Unknown |
| HandBrake | 100% free | None | $0 | Desktop only |
| Squoosh | 100% free | None | $0 | Images only |
| TinyPNG | 20/session, 5MB | Annual sub | Unknown | Size + quantity |

## 3.3 Trust Signals in the Category

| Tool | Social Proof |
|------|-------------|
| Online-Convert | Siemens, Dell, Samsung, BBC, Amazon, Uber, Ikea |
| TinyPNG | Airbnb, Microsoft, Sony, EA + named testimonials |
| Convertio | 3B files converted, 30M+ ratings |
| Zamzar | BBC, since 2006, testimonial carousel |
| CloudConvert | ISO 27001, since 2012 |
| Squoosh | Implicit Google association |
| HandBrake | Open-source credibility |
| FreeConvert | Nothing |

## 3.4 Strategic Gaps Recast Exploits

| Gap | How Recast Wins |
|-----|----------------|
| **Design** | Every competitor is sans-serif blue/gray. Recast: Syne + chromatic gradient + dark mode = instantly distinct |
| **Privacy** | Only Squoosh does client-side (images only). Recast: images + video, never uploads |
| **Mobile** | Zero competitors invest in mobile. Recast: haptic, 44px targets, PWA, Share API |
| **Ads** | FreeConvert = ad-infested. Recast: zero ads, cost ~$0 |
| **Pricing** | Competitors: credits, minutes, MB limits (confusing). Recast: free or unlimited. Period. |
| **Personality** | 6/8 competitors are visually interchangeable. Recast: gradient signature, glow effects, opinionated voice |

## 3.5 Direct Comparison

| | Recast | Convertio | FreeConvert | CloudConvert |
|---|--------|-----------|-------------|--------------|
| Free | 3 conv/day | 10 conv/day, 100MB | 20 min/day + ADS | 10 conv/day |
| Paid | $5/mo unlimited | $5.99/mo, 500MB | $12.99/mo, 1500min | Variable credits |
| Ads | Never | In free tier? | Aggressive | No |
| Privacy | 100% local | Server upload | Server upload | Server upload |
| Mobile | Optimized | Desktop-first | Desktop-first | Desktop-first |

---

# Part 4: Pricing Strategy

## 4.1 Model: Free + Unlimited Monthly

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | 3 conversions/day, all formats, full quality, no ads |
| **Unlimited** | $5/month | Unlimited conversions, all formats, no daily limits, cancel anytime |

## 4.2 Rationale

**Why 3 conversions/day (not 5 total):**
- 3/day creates return habit — user comes back tomorrow
- 5 total is a dead end — use and disappear forever
- 3/day = ~90 conversions/month free (generous for casual use)
- When they need more in a day (batch of photos, project), they pay $5

**Why $5/month unlimited:**
- Below ALL competitors (Convertio $5.99, FreeConvert $12.99)
- Strong psychological price — "less than a coffee"
- Operational cost ~$0 (client-side) = ~100% margin
- Simple: no credits, minutes, MB limits. Unlimited means unlimited
- No annual commitment — cancel anytime

**Why not credits/tokens:**
- Credits are confusing ("how many credits for video vs image?")
- Monthly subscription is predictable for user and for us
- "$5 unlimited" is more appealing than "$4.99 for 100 credits"
- Subscription creates MRR vs one-time revenue

## 4.3 Revenue Projections (Conservative)

| Users | Conversion Rate | Paying Users | MRR |
|-------|----------------|-------------|-----|
| 1,000 | 5% | 50 | $250 |
| 5,000 | 5% | 250 | $1,250 |
| 10,000 | 5% | 500 | $2,500 |
| 50,000 | 5% | 2,500 | $12,500 |

**Fixed costs:** Domain (~$12/year) + Vercel Pro ($20/month) = ~$32/month

---

# Part 5: Admin Dashboard

## 5.1 Access & Layout

- Route: `/admin`
- Protected by role check (`profiles.role = 'admin'`)
- Middleware redirects to `/` if not admin

```
Navbar (with "Admin" badge)
├── Sidebar (desktop) / Bottom tabs (mobile)
│   ├── Overview
│   ├── Users
│   ├── Conversions
│   ├── Revenue
│   └── Settings
└── Content Area
```

## 5.2 Overview

### KPI Cards (4-card grid)

| Card | Metric | Detail |
|------|--------|--------|
| Total Users | Total count | +X this week (green/red delta) |
| Active Users | Users with conversion in last 7 days | % of total |
| Revenue (MRR) | Monthly recurring revenue | Active subscribers x $5 |
| Conversions Today | Last 24h | vs 7-day average |

### Charts

| Chart | Type | Data |
|-------|------|------|
| Conversions/Day (30d) | Bar | Images (teal) vs Videos (accent) |
| Revenue/Month (6m) | Line | Cumulative MRR |
| New Users/Day (30d) | Area | Free signups vs paid upgrades |
| Conversion Funnel | Funnel | Visitors → Signups → First Conversion → Paid |

### Recent Activity (last 20 actions)

| Column | Content |
|--------|---------|
| Timestamp | When |
| User | Email (truncated) |
| Action | signup / conversion / upgrade / cancel |
| Detail | "PNG → WEBP" or "Subscribed $5/mo" |

## 5.3 Users

### Filters
- Status: All / Free / Paid / Cancelled
- Period: Today / 7 days / 30 days / All time
- Search: by email

### Table

| Column | Content |
|--------|---------|
| Email | Full email |
| Status | Badge: `FREE` (outline) / `PRO` (filled teal) / `CANCELLED` (muted) |
| Signup Date | Registration date |
| Conversions | Total (all time) |
| Last Active | Last conversion |
| Revenue | Total paid ($) |
| Actions | View / Grant credits / Ban |

### User Detail (click row)
- Full profile info
- Conversion history (table: input/output/size/date)
- Payment history
- Actions: Reset credits / Toggle pro / Ban

### User Metrics
- Total users, Free vs Paid ratio
- Churn rate (cancellations / total paid)
- Average conversions per user

## 5.4 Conversions

### Filters
- Type: All / Images / Videos / Audio Extraction
- Period: Today / 7d / 30d / Custom
- Format: filter by input or output format

### Table

| Column | Content |
|--------|---------|
| Timestamp | Date/time |
| User | Email (truncated) |
| Input | Format badge + size |
| Output | Format badge + size |
| Reduction | % (green if positive) |
| Duration | Conversion time (ms) |
| Status | completed / failed |

### Conversion Metrics
- Total all-time + today
- Top 5 most popular (e.g., PNG→WEBP, MP4→WEBM)
- Average input vs output size
- Success vs failure rate
- Distribution by type (pie: images vs video vs audio)
- Most used formats (horizontal bar)
- Peak hours (heatmap: hour x day of week)

## 5.5 Revenue

### KPI Cards

| Card | Metric |
|------|--------|
| MRR | Current monthly recurring revenue |
| Total Revenue | All-time |
| Active Subscribers | Count |
| Churn Rate | % cancellations this month |
| ARPU | Average Revenue Per User |
| LTV | Estimated Lifetime Value (ARPU / churn) |

### Charts

| Chart | Type | Data |
|-------|------|------|
| MRR/Month (12m) | Line | Trend + target |
| New Subs vs Cancellations/Month | Stacked bar | Net growth |
| Revenue/Day (30d) | Bar | Processed payments |

### Transactions Table

| Column | Content |
|--------|---------|
| Date | Timestamp |
| User | Email |
| Type | subscription / renewal / cancellation / refund |
| Amount | $5.00 / -$5.00 |
| Stripe ID | Link to Stripe dashboard |
| Status | succeeded / failed / refunded |

### Churn Alerts
- Users who cancelled in last 7 days
- Users with active sub but 0 conversions in 14 days (churn risk)

## 5.6 Settings

### General
- Free tier limit (default: 3 conversions/day)
- Subscription price (default: $5.00)
- Max file size (default: browser-dependent)

### Admin Management
- List of admin users
- Promote/remove admin by email

### System Health
- App version, last deploy, uptime

## 5.7 Database Schema Changes

### profiles — new columns
```sql
ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user';
ALTER TABLE profiles ADD COLUMN subscription_status text DEFAULT 'free';
-- Values: 'free' | 'active' | 'cancelled' | 'past_due'
ALTER TABLE profiles ADD COLUMN stripe_customer_id text;
ALTER TABLE profiles ADD COLUMN stripe_subscription_id text;
ALTER TABLE profiles ADD COLUMN subscription_start timestamptz;
ALTER TABLE profiles ADD COLUMN subscription_end timestamptz;
ALTER TABLE profiles ADD COLUMN total_conversions int DEFAULT 0;
ALTER TABLE profiles ADD COLUMN total_paid int DEFAULT 0; -- cents
```

### conversions — new columns
```sql
ALTER TABLE conversions ADD COLUMN duration_ms int;
ALTER TABLE conversions ADD COLUMN conversion_type text DEFAULT 'format';
-- Values: 'format' | 'compress' | 'resize' | 'extract_audio'
```

### New table: subscription_events
```sql
CREATE TABLE subscription_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  event_type text NOT NULL,
  -- Values: 'subscribed' | 'renewed' | 'cancelled' | 'payment_failed' | 'refunded'
  stripe_event_id text UNIQUE,
  amount int, -- cents
  created_at timestamptz DEFAULT now()
);
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;
```

### RLS for admin
```sql
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Admins can read all conversions" ON conversions
  FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Admins can read all purchases" ON purchases
  FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Admins can read subscription events" ON subscription_events
  FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
```

## 5.8 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/admin/overview` | GET | KPIs + chart data |
| `/api/admin/users` | GET | Paginated list with filters |
| `/api/admin/users/[id]` | GET | User detail |
| `/api/admin/users/[id]` | PATCH | Update role, reset credits, ban |
| `/api/admin/conversions` | GET | Paginated list with filters |
| `/api/admin/revenue` | GET | MRR, transactions, churn |
| `/api/admin/settings` | GET/PUT | App configuration |

All endpoints verify `role === 'admin'` before responding.

## 5.9 File Structure

```
app/admin/
├── layout.tsx              # Admin layout with sidebar + role check
├── page.tsx                # Overview dashboard
├── users/
│   ├── page.tsx            # Users list
│   └── [id]/page.tsx       # User detail
├── conversions/
│   └── page.tsx            # Conversions list
├── revenue/
│   └── page.tsx            # Revenue dashboard
└── settings/
    └── page.tsx            # Settings

components/admin/
├── sidebar.tsx             # Navigation sidebar
├── kpi-card.tsx            # KPI metric card
├── data-table.tsx          # Reusable table with sort/filter/pagination
├── chart-bar.tsx           # Bar chart (Recharts)
├── chart-line.tsx          # Line chart (Recharts)
├── chart-area.tsx          # Area chart (Recharts)
├── activity-feed.tsx       # Recent activity list
├── user-badge.tsx          # Status badge (FREE/PRO/CANCELLED)
└── conversion-row.tsx      # Conversion row with format badges

lib/admin.ts                # isAdmin, getOverview, etc.
```

**Charting:** Recharts (~40KB, React-native, composable)

## 5.10 Implementation Priority

1. Database migration SQL
2. Admin middleware + role check
3. Overview page (KPIs + activity feed)
4. Users page (table + search + filters)
5. Revenue page (MRR + transactions)
6. Conversions page (table + format stats)
7. Charts (Recharts)
8. Settings page
9. User detail page

---

# Part 6: Technical Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion + Lenis (smooth scroll) |
| Conversion | FFmpeg.wasm (client-side) |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| Payments | Stripe |
| Icons | Lucide React |
| Charts | Recharts (admin) |
| Deploy | Vercel Pro |
| Fonts | Syne + Inter + JetBrains Mono (Google Fonts) |
