-- ChatBoost AI MVP: early-access lead storage.
-- Run this in Supabase SQL Editor before enabling the lead form.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  business_name text check (business_name is null or char_length(business_name) <= 150),
  message text check (message is null or char_length(message) <= 2000),
  source text not null default 'chatboost-ai-website',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- No public SELECT/UPDATE/DELETE policies are created.
-- The server-only Supabase service-role key writes leads from the API route.
-- Never place SUPABASE_SERVICE_ROLE_KEY in a NEXT_PUBLIC_ variable.
