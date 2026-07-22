# Lumina Dev — Portfolio

React + Vite portfolio, built as components (not one giant file), backed by Supabase for
content (no redeploy needed to add a project) with a protected `/admin` dashboard for
managing everything.

## Stack

- React 18 + Vite
- React Router (`/` public site, `/admin` dashboard)
- Tailwind CSS, themed from `DESIGN.md` (Lumina Dev — dark glassmorphism, indigo/violet)
- Supabase (Postgres + Auth + Storage)

## 1. Install

```bash
npm install
```

## 2. Configure Supabase

1. Copy `.env.example` to `.env` and fill in:
   - `VITE_SUPABASE_URL` — Project Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY` — Project Settings → API → your publishable/anon key
     (the `sb_publishable_...` key is safe to use client-side)
2. Open the Supabase SQL Editor and run `supabase/schema.sql`. This (re)creates the 7
   tables with the exact columns the app expects, turns on Row Level Security (public
   read, authenticated write), and creates a public `portfolio-assets` storage bucket
   for images/CV uploads from the dashboard.
   > Your tables currently have 0 rows, so this is safe. If you'd rather keep your
   > existing column names, edit `src/pages/admin/adminConfig.js` to match instead.
3. Create your admin login: Authentication → Users → **Add user** (email + password).
   That's what you'll sign in with at `/admin/login`.

## 3. Run

```bash
npm run dev
```

- Public site: `http://localhost:5173/`
- Admin dashboard: `http://localhost:5173/admin/login`

## 4. Add your content

Sign in to `/admin`, then fill in, in order:

1. **Profile** — your name, title, bio, avatar, CV, contact info, stats
2. **Social Links** — GitHub, LinkedIn, etc.
3. **Skills** — name + category + proficiency %
4. **Projects** — the ones you want featured
5. **Experience** / **Education** — timeline entries
6. **Certificates** — optional

Everything shows up on the public site immediately — no rebuild needed.

## Project structure

```
src/
  components/
    layout/      Header, Footer, page shell
    ui/          Button/Card/ProgressBar/Loader — shared primitives
    sections/    Hero, About, Skills, Projects, ExperienceEducation, Certificates, Contact
    admin/       ProtectedRoute, FormField, ImageUpload
  pages/
    Home.jsx           the public one-page portfolio
    admin/
      AdminLogin.jsx
      AdminLayout.jsx    sidebar + outlet
      AdminDashboard.jsx overview / row counts
      TableManager.jsx  generic list+form+delete, driven by adminConfig.js
      adminConfig.js    field definitions for all 7 tables (edit here to add/rename fields)
  hooks/
    useSupabaseCRUD.js  generic read/create/update/delete for any table
  context/
    AuthContext.jsx     Supabase Auth session
  lib/
    supabaseClient.js
```

To add a new field to any table: add the column in Supabase, then add one line to the
matching table's `fields` array in `adminConfig.js` — the form and list pick it up
automatically. To manage a brand new table, add a new entry to `tableConfigs`.

## Deploying

Any static host works (Vercel, Netlify, Cloudflare Pages):

```bash
npm run build
```

Set the same `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` / `VITE_SUPABASE_STORAGE_BUCKET`
as environment variables on the host, then deploy the `dist/` folder.

## Notes

- The `sb_publishable_...` key is meant to be public (like the old `anon` key) — it's
  fine that it's in client-side code. Row Level Security is what actually protects
  writes: only the authenticated admin user can insert/update/delete.
- The contact section links `mailto:` to your profile email. If you want an actual
  contact form that emails you, wire it to a service like Formspree or a Supabase Edge
  Function — say the word and it can be added.
