-- ChatBoost AI multi-tenant platform schema (Supabase/Postgres)
-- Apply only after reviewing this file. It is designed for Supabase Auth.
-- Server-side service-role access must NEVER be exposed to browser clients.

create extension if not exists pgcrypto;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  country_code char(2),
  default_currency char(3) not null default 'XAF',
  timezone text not null default 'Africa/Douala',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','admin','manager','agent','viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  preferred_language text not null default 'en' check (preferred_language in ('en','fr')),
  source text,
  status text not null default 'new' check (status in ('new','qualified','customer','inactive')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists contacts_workspace_created_idx on public.contacts(workspace_id, created_at desc);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  sku text,
  description text,
  unit_price numeric(14,2) not null default 0 check (unit_price >= 0),
  currency char(3) not null default 'XAF',
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 3 check (low_stock_threshold >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id, sku)
);
create index if not exists products_workspace_name_idx on public.products(workspace_id, name);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  order_number text not null,
  status text not null default 'pending' check (status in ('pending','confirmed','processing','fulfilled','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','pending_verification','partially_paid','paid','refunded')),
  payment_method text,
  subtotal numeric(14,2) not null default 0 check (subtotal >= 0),
  total numeric(14,2) not null default 0 check (total >= 0),
  currency char(3) not null default 'XAF',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id, order_number)
);
create index if not exists orders_workspace_created_idx on public.orders(workspace_id, created_at desc);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  line_total numeric(14,2) not null check (line_total >= 0)
);

create table if not exists public.follow_up_tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  title text not null,
  due_at timestamptz,
  status text not null default 'open' check (status in ('open','done','cancelled')),
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists tasks_workspace_due_idx on public.follow_up_tasks(workspace_id, due_at);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  channel text not null default 'website' check (channel in ('website','whatsapp','instagram','messenger','email','manual')),
  status text not null default 'open' check (status in ('open','waiting','resolved')),
  assigned_to uuid references auth.users(id) on delete set null,
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_type text not null check (sender_type in ('customer','agent','assistant','system')),
  body text not null,
  ai_generated boolean not null default false,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.content_drafts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  channel text not null default 'social',
  language text not null default 'en' check (language in ('en','fr')),
  title text,
  body text not null,
  status text not null default 'draft' check (status in ('draft','approved','published','archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  feature text not null,
  provider text,
  model text,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  estimated_cost_usd numeric(12,6) not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists ai_usage_workspace_created_idx on public.ai_usage_events(workspace_id, created_at desc);

-- Membership helper avoids recursive RLS policy evaluation.
create or replace function public.is_workspace_member(target_workspace uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.workspace_id = target_workspace and wm.user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_admin(target_workspace uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.workspace_id = target_workspace
      and wm.user_id = auth.uid()
      and wm.role in ('owner','admin')
  );
$$;

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.contacts enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.follow_up_tasks enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.content_drafts enable row level security;
alter table public.ai_usage_events enable row level security;

drop policy if exists "members read own workspaces" on public.workspaces;
create policy "members read own workspaces" on public.workspaces for select using (public.is_workspace_member(id));
drop policy if exists "members read workspace membership" on public.workspace_members;
create policy "members read workspace membership" on public.workspace_members for select using (public.is_workspace_member(workspace_id));
drop policy if exists "admins manage workspace membership" on public.workspace_members;
create policy "admins manage workspace membership" on public.workspace_members for all using (public.is_workspace_admin(workspace_id)) with check (public.is_workspace_admin(workspace_id));

do $$
declare t text;
begin
  foreach t in array array['contacts','products','orders','order_items','follow_up_tasks','conversations','messages','content_drafts','ai_usage_events'] loop
    execute format('drop policy if exists "workspace members access" on public.%I', t);
    execute format('create policy "workspace members access" on public.%I for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id))', t);
  end loop;
end $$;

-- Workspace creation and first-owner membership should be performed by a trusted
-- server-side onboarding function after auth, not by exposing the service-role key.
-- Do not create permissive anon policies. Keep service-role credentials server-only.
