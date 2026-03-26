# ConverterUp — Tasklist

## Setup (fazer primeiro)

### Supabase
- [ ] Criar projeto em [supabase.com](https://supabase.com)
- [ ] Ir ao SQL Editor e executar o conteudo de `supabase/migrations/001_init.sql`
- [ ] Copiar Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copiar Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copiar Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Authentication → Providers → ativar Google OAuth
  - Criar credenciais em [console.cloud.google.com](https://console.cloud.google.com) → APIs → Credentials → OAuth 2.0
  - Redirect URI: `https://[teu-projeto].supabase.co/auth/v1/callback`
- [ ] Authentication → Providers → ativar GitHub OAuth
  - Criar OAuth App em [github.com/settings/developers](https://github.com/settings/developers)
  - Callback URL: `https://[teu-projeto].supabase.co/auth/v1/callback`
- [ ] Authentication → URL Configuration → adicionar redirect URL: `https://converterup.com/callback`

### Stripe
- [ ] Criar conta em [stripe.com](https://stripe.com) (se nao tiveres)
- [ ] Criar produto: "ConverterUp Unlimited" → $5.00/mes → Recurring
- [ ] Copiar Price ID → `STRIPE_PRICE_UNLIMITED`
- [ ] Copiar Secret Key → `STRIPE_SECRET_KEY`
- [ ] Copiar Publishable Key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Developers → Webhooks → criar endpoint:
  - URL: `https://converterup.com/api/webhooks/stripe`
  - Eventos: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] Copiar Webhook Secret → `STRIPE_WEBHOOK_SECRET`

### Dominio (GoDaddy → Vercel)
- [ ] Comprar `converterup.com` no GoDaddy
- [ ] No GoDaddy → DNS → mudar nameservers para:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- [ ] Na Vercel → Project → Settings → Domains → adicionar `converterup.com`
- [ ] Esperar propagacao DNS (pode levar 24-48h)

### Vercel
- [ ] Criar projeto na Vercel → importar repo `rodpru/converterup`
- [ ] Settings → Environment Variables → adicionar TODAS:
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
  STRIPE_SECRET_KEY=
  STRIPE_WEBHOOK_SECRET=
  STRIPE_PRICE_UNLIMITED=
  ```
- [ ] Deploy
- [ ] Verificar que `converterup.com` carrega

### .env.local (desenvolvimento local)
- [ ] Criar ficheiro `.env.local` na raiz do projeto com as mesmas vars acima
- [ ] Testar `npm run dev` localmente

---

## Testes pos-deploy

- [ ] Abrir `converterup.com` → landing page carrega
- [ ] Signup com email/password → perfil criado no Supabase
- [ ] Login funciona
- [ ] OAuth Google funciona
- [ ] OAuth GitHub funciona
- [ ] Dashboard carrega apos login
- [ ] Upload de imagem PNG → converter para WEBP → download funciona
- [ ] Upload de video MP4 → converter para WEBM → funciona
- [ ] Fazer 3 conversoes → 4a conversao bloqueada → upgrade modal aparece
- [ ] Clicar "Go Unlimited" → Stripe checkout abre
- [ ] Completar pagamento (modo teste) → subscricao ativa
- [ ] Conversoes ilimitadas apos pagamento
- [ ] `/admin` redireciona para `/` (nao es admin ainda)
- [ ] Executar no Supabase SQL: `UPDATE profiles SET role = 'admin' WHERE email = 'TEU_EMAIL';`
- [ ] `/admin` carrega com overview, users, conversions, revenue, settings

---

## SEO — Landing Pages por Conversao

### Prioridade 1 — EN (criar primeiro)
- [ ] `/convert/png-to-webp` — "Convert PNG to WebP Online Free"
- [ ] `/convert/webp-to-jpg` — "Convert WebP to JPG Online Free"
- [ ] `/convert/jpg-to-png` — "Convert JPG to PNG Online Free"
- [ ] `/convert/avif-to-png` — "AVIF to PNG Converter"
- [ ] `/convert/gif-to-mp4` — "Convert GIF to MP4 Online"
- [ ] `/convert/mp4-to-webm` — "Convert MP4 to WebM Online"
- [ ] `/convert/mp4-to-mp3` — "Extract Audio from Video"
- [ ] `/convert/compress-video` — "Compress Video Online Free"
- [ ] `/convert/compress-image` — "Compress Image Online Free"
- [ ] `/convert/resize-image` — "Resize Image Online Free"

### Prioridade 2 — PT-BR (adicionar i18n)
- [ ] Instalar `next-intl` para i18n
- [ ] Configurar locales: `en`, `pt-br`, `es`
- [ ] `/pt-br/converter/png-para-webp`
- [ ] `/pt-br/converter/webp-para-jpg`
- [ ] `/pt-br/converter/comprimir-video`
- [ ] `/pt-br/converter/comprimir-imagem`
- [ ] `/pt-br/converter/extrair-audio`

### Prioridade 3 — ES
- [ ] `/es/convertir/png-a-webp`
- [ ] `/es/convertir/comprimir-video`
- [ ] `/es/convertir/extraer-audio`

---

## Marketing

- [ ] ProductHunt launch
- [ ] Post no Reddit (r/webdev, r/selfhosted, r/InternetIsBeautiful)
- [ ] Post no Twitter/X com demo GIF
- [ ] Post no Hacker News (Show HN)
- [ ] Criar blog post: "Why we process your files in the browser, not our servers"
- [ ] Submeter a Awwwards (quando design estiver polished)
- [ ] Submeter a alternativeto.net como alternativa a CloudConvert/Convertio

---

## Melhorias Futuras

- [ ] Batch conversion (converter multiplos ficheiros de uma vez)
- [ ] Drag & drop direto na landing page (converter 1 ficheiro sem signup)
- [ ] PWA completo (offline support)
- [ ] Graficos reais no admin panel (ligar Recharts ao Supabase)
- [ ] Email transacional (welcome email, payment receipt)
- [ ] Dark/light mode toggle
- [ ] Presets: "Otimizar para Instagram", "Comprimir para email", "WhatsApp ready"
- [ ] API publica para developers
- [ ] Browser extension (Chrome/Firefox)

---

## Env Vars Reference

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_UNLIMITED=price_...
```
