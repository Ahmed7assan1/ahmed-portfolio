-- =========================================================
-- Lumina Dev Portfolio — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor.
-- Column names match the existing database tables exactly.
-- =========================================================

-- ---------------------------------------------------------
-- profile (single row: the portfolio owner)
-- ---------------------------------------------------------
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  job_title text,
  bio text,
  email text,
  phone text,
  location text,
  avatar_url text,
  cv_url text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- social_links
-- ---------------------------------------------------------
create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text,
  url text,
  icon text,
  order_index int,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- skills
-- ---------------------------------------------------------
create table if not exists skills (
  id bigint generated always as identity primary key,
  name text,
  category text,
  level smallint,
  icon text,
  order_index int
);

-- ---------------------------------------------------------
-- projects
-- ---------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text,
  github_url text,
  live_url text,
  technologies text,
  featured bool,
  order_index int,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- experience
-- ---------------------------------------------------------
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  company text,
  position text,
  start_date date,
  end_date date,
  description text,
  current_job bool,
  order_index int,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- education
-- ---------------------------------------------------------
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  institution text,
  degree text,
  field text,
  start_date date,
  end_date date,
  grade text,
  description text,
  order_index int,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- certificates
-- ---------------------------------------------------------
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title text,
  issuer text,
  issue_date date,
  credential_url text,
  image_url text,
  created_at timestamptz default now()
);

-- =========================================================
-- Row Level Security
-- Public (anon) can READ everything → needed for the portfolio
-- to display. Only authenticated users (you, the admin) can
-- write. Create your admin login in Authentication → Users.
-- =========================================================

alter table profile enable row level security;
alter table social_links enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table certificates enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['profile','social_links','skills','projects','experience','education','certificates']
  loop
    execute format('create policy "public read %1$s" on %1$s for select using (true);', t);
    execute format('create policy "auth write %1$s insert" on %1$s for insert to authenticated with check (true);', t);
    execute format('create policy "auth write %1$s update" on %1$s for update to authenticated using (true) with check (true);', t);
    execute format('create policy "auth write %1$s delete" on %1$s for delete to authenticated using (true);', t);
  end loop;
end $$;

-- =========================================================
-- Storage buckets for files uploaded from the admin dashboard
-- =========================================================
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('certificates', 'certificates', true),
  ('cv', 'cv', true),
  ('projects', 'projects', true)
on conflict (id) do update set public = excluded.public;

do $$
declare
  b text;
begin
  foreach b in array array['avatars','certificates','cv','projects']
  loop
    if not exists (select 1 from pg_policies where policyname = format('public read %s', b) and tablename = 'objects' and schemaname = 'storage') then
      execute format('create policy "public read %1$s" on storage.objects for select using (bucket_id = ''%1$s'');', b);
    end if;
    if not exists (select 1 from pg_policies where policyname = format('auth upload %s', b) and tablename = 'objects' and schemaname = 'storage') then
      execute format('create policy "auth upload %1$s" on storage.objects for insert to authenticated with check (bucket_id = ''%1$s'');', b);
    end if;
    if not exists (select 1 from pg_policies where policyname = format('auth update %s', b) and tablename = 'objects' and schemaname = 'storage') then
      execute format('create policy "auth update %1$s" on storage.objects for update to authenticated using (bucket_id = ''%1$s'');', b);
    end if;
    if not exists (select 1 from pg_policies where policyname = format('auth delete %s', b) and tablename = 'objects' and schemaname = 'storage') then
      execute format('create policy "auth delete %1$s" on storage.objects for delete to authenticated using (bucket_id = ''%1$s'');', b);
    end if;
  end loop;
end $$;
