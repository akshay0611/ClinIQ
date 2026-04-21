# Local Setup (ELUSOC / New Contributors)

This guide is the single source of truth for running ClinIQ locally.

## Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **npm**: comes with Node (this repo uses `package-lock.json`)
- **Supabase account**: required for auth + profiles
- **Gemini API key**: optional (symptom checker falls back to mock results)

## 1) Install & Run

```sh
git clone https://github.com/<YOUR_USERNAME>/ClinIQ.git
cd ClinIQ
npm install
cp .env.example .env
npm run dev
```

App runs at `http://localhost:5173`.

## 2) Environment Variables

Create `.env` from `.env.example`:

```ini
# Required (Supabase)
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Optional (Gemini)
VITE_GEMINI_API_KEY=...
```

Notes:

- `.env` is **gitignored** — never commit secrets.
- After changing `.env`, **restart** the dev server so Vite picks up new values.

## 3) Supabase Setup (Required)

ClinIQ uses Supabase for **Auth** and the **profiles** data.

### A. Create a Supabase project

1. Create a project at Supabase.
2. In the Supabase dashboard, go to **Project Settings → API** and copy:
   - `URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`
3. Paste them into your local `.env`.

### B. Create tables + RLS policies

1. Open Supabase **SQL Editor**
2. Run the SQL from `supabase/schema.sql`

This creates the **core tables** used by the app:

- `profiles`
- `doctor_profiles`

## 4) Useful Commands

```sh
npm run dev      # start dev server
npm run lint     # lint the codebase
npm run build    # production build
npm run preview  # preview production build locally
```

## Troubleshooting

- **Blank page / runtime errors**: confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set, then restart `npm run dev`.
- **Supabase 401/403**: ensure you ran `supabase/schema.sql` and the RLS policies exist.

## FAQ

- **Do I need a Gemini API key?** No. Without `VITE_GEMINI_API_KEY`, the symptom checker uses mock results (useful for UI work).
- **Should I use `npm install` or `npm ci`?** Either works; prefer `npm ci` in CI or when you want a clean, reproducible install.
