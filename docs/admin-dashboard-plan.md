# Recast — Admin Dashboard Plan

## Acesso

- Rota: `/admin`
- Protegido por role check (coluna `role` na tabela `profiles`, valor `admin`)
- Middleware redireciona para `/` se nao for admin
- Design: mesma estetica editorial do resto da app

---

## Layout

```
Navbar (com badge "Admin")
├── Sidebar (desktop) / Bottom tabs (mobile)
│   ├── Overview (dashboard principal)
│   ├── Users
│   ├── Conversions
│   ├── Revenue
│   └── Settings
└── Content Area
```

---

## 1. Overview (Dashboard Principal)

### KPI Cards (topo, 4 cards em grid)

| Card | Metrica | Detalhe |
|------|---------|---------|
| **Total Users** | Numero total | +X esta semana (delta verde/vermelho) |
| **Active Users** | Users com conversao nos ultimos 7 dias | % do total |
| **Revenue (MRR)** | Receita mensal recorrente | Subscribers ativos x $5 |
| **Conversions Today** | Conversoes nas ultimas 24h | vs media dos ultimos 7 dias |

### Graficos

**Conversoes por Dia (ultimos 30 dias)**
- Bar chart
- Separado por tipo: imagens (teal) vs videos (accent)
- Hover mostra numero exato

**Revenue por Mes (ultimos 6 meses)**
- Line chart
- MRR acumulado
- Marca quando houve crescimento/queda

**Novos Users por Dia (ultimos 30 dias)**
- Area chart
- Separado: signups free vs upgrades para paid

**Conversion Funnel**
- Visitantes → Signups → First Conversion → Paid Subscriber
- Percentagens entre cada passo

### Tabela — Atividade Recente (ultimas 20 acoes)

| Coluna | Conteudo |
|--------|----------|
| Timestamp | Quando |
| User | Email (truncado) |
| Acao | signup / conversion / upgrade / cancel |
| Detalhe | "PNG → WEBP" ou "Subscribed $5/mo" |

---

## 2. Users

### Filtros
- Status: All / Free / Paid / Cancelled
- Periodo: Today / 7 days / 30 days / All time
- Search: por email

### Tabela de Users

| Coluna | Conteudo |
|--------|----------|
| Email | Email completo |
| Status | Badge: `FREE` (outline) / `PRO` (filled teal) / `CANCELLED` (muted) |
| Signup Date | Data de registo |
| Conversions | Total de conversoes (all time) |
| Last Active | Ultima conversao |
| Revenue | Total pago ($) |
| Actions | Ver perfil / Dar creditos / Ban |

### User Detail (click na row)
- Informacao completa do perfil
- Historico de conversoes (tabela com input/output/size/data)
- Historico de pagamentos
- Botoes: Reset credits / Toggle pro / Ban user

### Metricas de Users
- Total users
- Free vs Paid ratio
- Churn rate (cancelamentos / total paid)
- Average conversions per user

---

## 3. Conversions

### Filtros
- Tipo: All / Images / Videos / Audio Extraction
- Periodo: Today / 7 days / 30 days / Custom
- Format: filtro por input ou output format

### Tabela de Conversoes

| Coluna | Conteudo |
|--------|----------|
| Timestamp | Data/hora |
| User | Email (truncado) |
| Input | Format badge (ex: PNG) + tamanho |
| Output | Format badge (ex: WEBP) + tamanho |
| Reduction | % de reducao (verde se positivo) |
| Duration | Tempo de conversao (ms) |
| Status | completed / failed |

### Metricas de Conversoes
- Total conversoes (all time + today)
- Top 5 conversoes mais populares (ex: PNG→WEBP, MP4→WEBM)
- Tamanho medio de input vs output
- Taxa de sucesso vs falha
- Distribuicao por tipo (pie chart: images vs video vs audio)
- Formatos mais usados (bar chart horizontal)
- Horas de pico (heatmap por hora do dia / dia da semana)

---

## 4. Revenue

### KPI Cards

| Card | Metrica |
|------|---------|
| **MRR** | Monthly Recurring Revenue atual |
| **Total Revenue** | Receita total all-time |
| **Active Subscribers** | Numero de subscribers ativos |
| **Churn Rate** | % de cancelamentos este mes |
| **ARPU** | Average Revenue Per User (total revenue / total users) |
| **LTV** | Lifetime Value estimado (ARPU / churn rate) |

### Graficos

**MRR por Mes (ultimos 12 meses)**
- Line chart com trend
- Meta de MRR se definida

**Subscricoes Novas vs Cancelamentos por Mes**
- Stacked bar chart
- Net growth = novas - cancelamentos

**Revenue por Dia (ultimos 30 dias)**
- Bar chart de pagamentos processados

### Tabela de Transacoes

| Coluna | Conteudo |
|--------|----------|
| Data | Timestamp |
| User | Email |
| Tipo | `subscription` / `renewal` / `cancellation` / `refund` |
| Valor | $5.00 / -$5.00 (refund) |
| Stripe ID | Link para Stripe dashboard |
| Status | succeeded / failed / refunded |

### Alerta de Churn
- Lista de users que cancelaram nos ultimos 7 dias
- Users com subscricao ativa mas 0 conversoes nos ultimos 14 dias (risco de churn)

---

## 5. Settings

### Configuracoes Gerais
- **Free tier limit**: input numerico (default: 3 conversoes/dia)
- **Subscription price**: input (default: $5.00)
- **Max file size**: input (default: sem limite / browser-dependent)

### Gestao de Admins
- Lista de users com role `admin`
- Promover/remover admin por email

### System Health
- Versao da app
- Ultimo deploy (timestamp)
- Uptime status

---

## Database Changes Required

### Tabela `profiles` — adicionar colunas

```sql
-- Role para distinguir admin
ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user';

-- Subscription tracking
ALTER TABLE profiles ADD COLUMN subscription_status text DEFAULT 'free';
-- Valores: 'free' | 'active' | 'cancelled' | 'past_due'

ALTER TABLE profiles ADD COLUMN stripe_customer_id text;
ALTER TABLE profiles ADD COLUMN stripe_subscription_id text;
ALTER TABLE profiles ADD COLUMN subscription_start timestamptz;
ALTER TABLE profiles ADD COLUMN subscription_end timestamptz;

-- Conversion counter (denormalized for quick queries)
ALTER TABLE profiles ADD COLUMN total_conversions int DEFAULT 0;
ALTER TABLE profiles ADD COLUMN total_paid int DEFAULT 0;
-- total_paid em centimos (500 = $5.00)
```

### Tabela `conversions` — adicionar colunas

```sql
ALTER TABLE conversions ADD COLUMN duration_ms int;
ALTER TABLE conversions ADD COLUMN conversion_type text DEFAULT 'format';
-- Valores: 'format' | 'compress' | 'resize' | 'extract_audio'
```

### Nova tabela `subscription_events`

```sql
CREATE TABLE subscription_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  event_type text NOT NULL,
  -- Valores: 'subscribed' | 'renewed' | 'cancelled' | 'payment_failed' | 'refunded'
  stripe_event_id text UNIQUE,
  amount int, -- centimos
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

-- Apenas admins podem ler (via service role key no server)
-- Sem policy de select para users normais
```

### RLS para admin

```sql
-- Admin pode ler tudo
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can read all conversions"
  ON conversions FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can read all purchases"
  ON purchases FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can read subscription events"
  ON subscription_events FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );
```

---

## API Routes (Admin)

| Route | Method | Descricao |
|-------|--------|-----------|
| `/api/admin/overview` | GET | KPIs + graficos data |
| `/api/admin/users` | GET | Lista paginada com filtros |
| `/api/admin/users/[id]` | GET | Detalhe de um user |
| `/api/admin/users/[id]` | PATCH | Update role, reset credits, ban |
| `/api/admin/conversions` | GET | Lista paginada com filtros |
| `/api/admin/revenue` | GET | MRR, transacoes, churn |
| `/api/admin/settings` | GET/PUT | Configuracoes da app |

Todos os endpoints verificam `role === 'admin'` antes de responder.

---

## File Structure

```
app/admin/
├── layout.tsx              # Admin layout com sidebar + role check
├── page.tsx                # Overview dashboard
├── users/
│   ├── page.tsx            # Users list
│   └── [id]/page.tsx       # User detail
├── conversions/
│   └── page.tsx            # Conversions list
├── revenue/
│   └── page.tsx            # Revenue dashboard
└── settings/
    └── page.tsx            # Settings page

components/admin/
├── sidebar.tsx             # Navigation sidebar
├── kpi-card.tsx            # KPI metric card
├── data-table.tsx          # Reusable data table with sort/filter/pagination
├── chart-bar.tsx           # Bar chart wrapper
├── chart-line.tsx          # Line chart wrapper
├── chart-area.tsx          # Area chart wrapper
├── activity-feed.tsx       # Recent activity list
├── user-badge.tsx          # Status badge (FREE/PRO/CANCELLED)
└── conversion-row.tsx      # Conversion table row with format badges

lib/admin.ts                # Admin helper functions (isAdmin, getOverview, etc.)
```

---

## Charting Library

**Recharts** (recharts.org)
- React-native, composable
- Lightweight (~40KB)
- Supports: Bar, Line, Area, Pie, Heatmap
- Works with Tailwind (custom colors via CSS variables)
- `npm install recharts`

---

## Implementation Priority

1. Database changes (migration SQL)
2. Admin middleware + role check
3. Overview page (KPIs + activity feed)
4. Users page (table + search + filters)
5. Revenue page (MRR + transactions)
6. Conversions page (table + format stats)
7. Charts (Recharts integration)
8. Settings page
9. User detail page
