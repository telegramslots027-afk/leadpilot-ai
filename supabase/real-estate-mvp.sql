-- ChatBoost AI Real Estate MVP
-- Apply this migration in Supabase SQL Editor after the existing platform-schema.sql.
-- This adds agent-owned property records and consent-based visitor enquiries.
create extension if not exists pgcrypto;

alter table public.workspaces
  add column if not exists real_estate_public_key uuid not null default gen_random_uuid();

create unique index if not exists workspaces_real_estate_public_key_idx
  on public.workspaces(real_estate_public_key);

create table if not exists public.real_estate_properties (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  public_slug text not null unique,
  title text not null check (char_length(title) between 3 and 160),
  city text not null check (char_length(city) between 2 and 100),
  state_code char(2) not null,
  price numeric(14,2) not null check (price >= 0),
  bedrooms numeric(4,1) not null default 0 check (bedrooms >= 0),
  bathrooms numeric(4,1) not null default 0 check (bathrooms >= 0),
  square_feet integer check (square_feet is null or square_feet >= 0),
  description text not null default '' check (char_length(description) <= 4000),
  status text not null default 'draft'
    check (status in ('draft','published','under_contract','sold','rented')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists real_estate_properties_workspace_idx
  on public.real_estate_properties(workspace_id, created_at desc);
create index if not exists real_estate_properties_public_idx
  on public.real_estate_properties(public_slug) where status = 'published';

create table if not exists public.real_estate_leads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  property_id uuid references public.real_estate_properties(id) on delete set null,
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 40),
  intent text not null check (intent in ('buyer','seller','renter','property_management')),
  preferred_area text check (preferred_area is null or char_length(preferred_area) <= 160),
  budget_range text check (budget_range is null or char_length(budget_range) <= 80),
  timeline text check (timeline is null or char_length(timeline) <= 80),
  message text check (message is null or char_length(message) <= 2000),
  consent_at timestamptz not null,
  consent_text text not null,
  source text not null default 'website',
  status text not null default 'new'
    check (status in ('new','contacted','qualified','closed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists real_estate_leads_workspace_created_idx
  on public.real_estate_leads(workspace_id, created_at desc);
create index if not exists real_estate_leads_property_idx
  on public.real_estate_leads(property_id);

alter table public.real_estate_properties enable row level security;
alter table public.real_estate_leads enable row level security;

drop policy if exists "workspace members manage real estate properties" on public.real_estate_properties;
create policy "workspace members manage real estate properties"
  on public.real_estate_properties for all to authenticated
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "public can view published real estate properties" on public.real_estate_properties;
create policy "public can view published real estate properties"
  on public.real_estate_properties for select to anon, authenticated
  using (status = 'published');

drop policy if exists "workspace members manage real estate leads" on public.real_estate_leads;
create policy "workspace members manage real estate leads"
  on public.real_estate_leads for all to authenticated
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

-- No anonymous insert/read policies are created for lead records.
-- Public enquiries are accepted only by the server route, which validates a
-- published listing or public workspace key before using the server-only key.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in browser code.
