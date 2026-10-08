-- =========================================================
-- Ahmed Hassan Portfolio — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor.
-- =========================================================

-- ---------------------------------------------------------
-- contact_messages (Primary dynamic feature)
-- ---------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

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
-- =========================================================
alter table contact_messages enable row level security;
alter table profile enable row level security;
alter table social_links enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table certificates enable row level security;

-- Public can submit messages (anon insert only)
create policy "public insert contact_messages" on contact_messages
  for insert to anon with check (true);

-- Authenticated (admin) can read, update, delete contact messages
create policy "auth manage contact_messages" on contact_messages
  for all to authenticated using (true) with check (true);

-- Public read for static content tables
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
