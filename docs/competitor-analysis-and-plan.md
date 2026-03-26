# Recast — Competitor Analysis & Strategy Plan

## Competitor Landscape

### Design Quality Ranking

| # | Tool | Design | Notes |
|---|------|--------|-------|
| 1 | Squoosh (Google) | Excelente | Benchmark visual. Animacoes, blobs, wave dividers. Apenas imagens. |
| 2 | TinyPNG | Bom | Personalidade via mascote panda. Apenas compressao de imagens. |
| 3 | Convertio | Medio | Limpo mas generico. Open Sans, sem personalidade. |
| 4 | CloudConvert | Medio | Funcional, esteril. ISO 27001 como diferenciador. |
| 5 | FreeConvert | Fraco | Base decente destruida por ads agressivos. |
| 6 | Zamzar | Fraco | Corporate blue. Headline mais generica da categoria. |
| 7 | Online-Convert | Datado | Estilo diretorio de 2015. Melhor logo wall (Siemens, Dell, Samsung). |
| 8 | HandBrake | Minimo | Pagina open-source basica. Desktop only. |

### Monetizacao dos Concorrentes

| Tool | Free Tier | Modelo Pago | Preco Entrada | Limite Principal |
|------|-----------|-------------|---------------|------------------|
| CloudConvert | 10 conv/dia | Creditos (one-time ou sub) | Variavel | Creditos por conversao |
| Convertio | 10 conv/dia, 100MB | Subscricao mensal | $5.99/mes (anual) | Tamanho ficheiro |
| Zamzar | 50MB limite | Subscricao | Desconhecido | Tamanho ficheiro |
| FreeConvert | 20 min/dia | Subscricao mensal | $12.99/mes | Minutos de conversao |
| Online-Convert | Limitado | Subscricao | Desconhecido | Desconhecido |
| HandBrake | 100% gratis | Nenhum | $0 | Desktop only |
| Squoosh | 100% gratis | Nenhum | $0 | Apenas imagens |
| TinyPNG | 20/sessao, 5MB | Subscricao anual | Desconhecido | Tamanho e quantidade |

### Trust Signals

| Tool | Social Proof |
|------|-------------|
| Online-Convert | Siemens, Dell, Samsung, BBC, Amazon, Uber, Ikea |
| TinyPNG | Airbnb, Microsoft, Sony, EA + testemunhos nomeados |
| Convertio | 3B ficheiros convertidos, 30M+ ratings |
| Zamzar | BBC, desde 2006, carousel de testemunhos |
| CloudConvert | ISO 27001, desde 2012 |
| Squoosh | Associacao implicita Google |
| HandBrake | Credibilidade open-source |
| FreeConvert | Nada |

---

## Gaps Estrategicos — O que o Recast Explora

### 1. Design Editorial (Gap ENORME)
- **Todos** os concorrentes usam sans-serif, paletas azul/cinza, estetica corporate
- Nenhum usa serif. Nenhum tem sharp corners. Nenhum tem personalidade visual
- Recast com Fraunces + editorial shadows + cores quentes = imediatamente distinto
- Referencia: "Monocle magazine meets file conversion tool"

### 2. Client-Side = Privacidade Real
- Apenas Squoosh faz client-side (e so imagens)
- Todos os outros uploadam ficheiros para servidores
- Concorrentes dizem: "Apagamos os seus ficheiros"
- Recast diz: "Os ficheiros nunca saem do seu dispositivo"
- Mensagem afirmativa vs defensiva

### 3. Mobile-First (Inexistente na Concorrencia)
- Zero concorrentes investem em mobile
- Recast: haptic feedback, 44px touch targets, PWA standalone, Web Share API
- Converter media no telemovel e uma necessidade real (fotos, videos do WhatsApp)

### 4. Zero Ads
- FreeConvert e inundado de ads (3+ ad slots por pagina)
- Convertio sugere que free tier tem ads
- Recast: custo operacional ~0 = nao precisa de ads nunca

### 5. Pricing Simples vs Complexidade
- CloudConvert: creditos variaveis por tipo de conversao
- FreeConvert: "minutos de conversao"
- Convertio: limites de MB + conversoes + concurrent
- Tudo confuso. Recast: **free ou ilimitado. Ponto.**

---

## Pricing Strategy — Recast

### Modelo: Free + Unlimited Monthly

| Tier | Preco | O que inclui |
|------|-------|-------------|
| **Free** | $0 | 3 conversoes/dia (imagens + videos), todos os formatos, qualidade total, sem ads |
| **Unlimited** | $5/mes | Conversoes ilimitadas, todos os formatos, sem limites diarios |

### Racional

**Porque 3 conversoes/dia free (nao 5 total):**
- 3/dia cria habito de retorno — o utilizador volta amanha
- 5 total e um dead end — usa e nunca mais volta
- 3/dia = ~90 conversoes/mes gratis (generoso o suficiente para uso casual)
- Quando precisa de mais num dia (batch de fotos, projeto), paga $5

**Porque $5/mes ilimitado:**
- Abaixo de TODOS os concorrentes (Convertio $5.99, FreeConvert $12.99)
- Preco psicologico forte — "menos que um cafe"
- Custo operacional ~0 (client-side) = margem de ~100%
- Simples: nao ha creditos, minutos, MB limits. Ilimitado e ilimitado.
- Sem compromisso anual — cancela quando quiser

**Porque nao creditos/tokens (modelo anterior):**
- Creditos sao confusos ("quantos creditos custa um video vs imagem?")
- Subscricao mensal e previsivel para o utilizador e para nos
- $5 ilimitado e mais apelativo que "$4.99 por 100 creditos"
- Modelo de subscricao cria receita recorrente (MRR) vs one-time

**Revenue projection (conservador):**
- 1000 users free → 5% conversao → 50 pagantes → $250/mes MRR
- 10000 users free → 5% conversao → 500 pagantes → $2500/mes MRR
- Custo: dominio (~$12/ano) + Vercel Pro ($20/mes) = ~$32/mes fixo

### Comparacao Direta

| | Recast | Convertio | FreeConvert | CloudConvert |
|---|--------|-----------|-------------|--------------|
| Free | 3 conv/dia | 10 conv/dia, 100MB | 20 min/dia + ADS | 10 conv/dia |
| Pago | $5/mes ilimitado | $5.99/mes, 500MB | $12.99/mes, 1500min | Creditos variaveis |
| Ads | Nunca | No free tier? | Sim, agressivos | Nao |
| Privacidade | 100% local | Upload servidor | Upload servidor | Upload servidor |
| Mobile | Otimizado | Desktop-first | Desktop-first | Desktop-first |

---

## Ajustes a Implementar na Landing Page

### 1. Hero — Reforcar Privacidade
- Atual: "100% Client-Side Media Conversion"
- Melhorar: "Your files never leave your device."
- Adicionar badge visual: icone cadeado + "Processed locally"

### 2. Pricing — Simplificar para 2 Tiers
- Remover modelo de 3 tiers (Free/Creator/Studio)
- Novo: apenas **Free** (3/dia) e **Unlimited** ($5/mes)
- Card unico com toggle free/paid
- Mais limpo, menos decisoes para o utilizador

### 3. Comparison Table — Dados Reais
- Atualizar com precos reais dos concorrentes
- Adicionar linha "Ads" (Recast: Never)
- Adicionar linha "Price" ($5/mes vs $5.99-$12.99)

### 4. Trust Signals — Adicionar Metricas
- Contador animado: "X files converted" (quando tivermos dados)
- "100% processed in your browser" com icone
- Tempo medio de conversao

### 5. Copy — Voz Editorial
- Menos generico, mais opinionado
- "Every other converter uploads your files to their servers. We don't."
- "No ads. No tracking. No uploads. Just conversions."

### 6. Live Demo — Tornar Interativo
- Permitir drop de ficheiro real na landing page
- Converter 1 ficheiro gratis sem signup (taste of the product)
- Converter e mostrar resultado → CTA "Want more? Sign up free"

---

## Implementacao (por ordem de prioridade)

1. **Atualizar pricing** — 2 tiers (Free 3/dia + Unlimited $5/mes)
2. **Hero copy** — privacidade como mensagem principal
3. **Comparison table** — precos reais, linha de ads
4. **Pricing section** — simplificar para 2 cards
5. **DB schema** — ajustar para subscricao mensal vs creditos
6. **Stripe** — criar produto de subscricao ($5/mes)
7. **Credit logic** — 3 conversoes/dia free, ilimitado para subscribers
8. **Landing copy** — voz mais editorial e opinionada
