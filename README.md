# Auditor Digital Portugal (MVP) — Next.js + Stripe + Supabase + OpenAI

✅ Sem login para o cliente  
✅ Pagamento **antes** da análise (Stripe + webhook)  
✅ Entrega por **link privado** (/r/<token>)  
✅ Mobile-first + CSS premium

## 0) Pré-requisitos
- Node 20+
- Conta Stripe
- Conta Supabase
- OpenAI API key

## 1) Setup Supabase
1. Crie um projeto no Supabase
2. Vá em SQL Editor e rode o arquivo `supabase.sql`
3. Pegue:
   - Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
   - Service role key -> `SUPABASE_SERVICE_ROLE_KEY`

## 2) Setup Stripe (4 preços)
No Stripe:
1. Products -> crie 4 produtos ou 1 produto com 4 Prices:
   - Site (€9)
   - Instagram (€7)
   - Copy (€12)
   - Combo (€19)
2. Copie os `price_...` e preencha:
   - STRIPE_PRICE_SITE
   - STRIPE_PRICE_INSTAGRAM
   - STRIPE_PRICE_COPY
   - STRIPE_PRICE_COMBO

Webhook:
- Endpoint: `https://SEU_DOMINIO/api/stripe/webhook`
- Eventos: `checkout.session.completed`
- Copie o Signing Secret -> `STRIPE_WEBHOOK_SECRET`

## 3) Rodar local
```bash
npm install
cp .env.example .env
# preencha as variáveis
npm run dev
```

## 4) Fluxo do cliente (sem login)
1. /auditar -> escolhe tipo -> preenche -> paga
2. Stripe volta para /sucesso?session_id=...
3. /sucesso chama /api/audit/run
4. /api/audit/run só roda se status = paid (confirmado por webhook)
5. Entrega link privado: /r/<token>

## Segurança (importante)
- Pagamento antes: verificação via webhook do Stripe (assinatura)
- Link privado por token
- SSRF guard: bloqueia localhost / IPs privados e limita tamanho do HTML
- Supabase é acessado via Service Role somente no servidor (RLS ligado)

## Admin
Acesse: `/admin?key=ADMIN_KEY`

## Próximos upgrades
- PDF export
- Emails transacionais com link do relatório
- Painel de histórico do cliente (com login)
- Integração WordPress (publicar melhorias/metadata)
