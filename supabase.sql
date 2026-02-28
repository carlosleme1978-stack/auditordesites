-- Auditor Digital Portugal — SQL (Supabase)
create extension if not exists pgcrypto;

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'created', -- created | paid | running | done | failed
  audit_type text not null,              -- site | instagram | copy | combo
  input jsonb not null default '{}'::jsonb,
  report jsonb,
  token text not null unique,
  email text,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  error text
);

create index if not exists audits_status_idx on public.audits(status);
create index if not exists audits_token_idx on public.audits(token);

alter table public.audits enable row level security;

-- Este MVP usa SUPABASE_SERVICE_ROLE_KEY no servidor (bypass RLS),
-- então não expomos policies públicas por padrão.
