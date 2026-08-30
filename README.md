# College Discovery Platform

Full Stack track submission — Internship demo task.
Track A: College Discovery Platform. Features: Listing + Search, College Detail Page,
Compare Colleges, Authentication + Saved Items.

## Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Node.js ·
PostgreSQL · Prisma ORM · NextAuth (Credentials + JWT)

## What's built
- Prisma schema: User, College, Course, Review, SavedCollege, SavedComparison
  — courses are a separate related table, each with its own fee and duration,
  not a flat fee shared across an entire college
- Homepage hero with a clear value proposition and feature overview
- `GET /api/colleges` — search, filter (location/fees/rating), sort, pagination,
  and an aggregate query (avg fees, avg rating) powering the listing stats bar
- `GET /api/colleges/[id]` — detail page data incl. structured per-course fees and reviews
- `GET /api/colleges/compare?ids=a,b,c` — 2-3 college comparison
- NextAuth credentials auth (signup, login, JWT session)
- `POST/GET /api/saved/colleges`, `DELETE /api/saved/colleges/[collegeId]`
- `POST/GET /api/saved/comparisons`, `DELETE /api/saved/comparisons/[id]`
- Frontend: listing (search/filter/pagination/compare-select/stats bar), detail
  page with per-course fee breakdown, compare table, login/signup, save
  college/comparison buttons, back-navigation on detail/compare/saved pages
- Seed script with 15 real Indian colleges (IITs, NITs, and top private
  institutions), each with multiple courses at individual fee points,
  placement data, and reviews

## What's NOT built (deliberately scoped out — see Loom video for reasoning)
- Predictor Tool (feature 4 in the doc)
- Q&A / Discussion (feature 5 in the doc)

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — get this from Neon (neon.tech), create a free Postgres project
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32` (or, on Windows
     without openssl: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)
   - Leave `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` as localhost for local dev

3. Run the migration (creates tables in your DB):
```bash
   npx prisma migrate dev --name init
```

4. Seed the database:
```bash
   npx prisma db seed
```

5. Run the dev server:
```bash
   npm run dev
```
   Visit http://localhost:3000 — homepage with a "Browse Colleges" CTA.

6. (Optional) Inspect your data visually:
```bash
   npx prisma studio
```

## Deploying (Vercel + Neon)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. In Vercel project settings → Environment Variables, add:
   - `DATABASE_URL` (same Neon connection string)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → your production URL (e.g. `https://your-app.vercel.app`)
   - `NEXT_PUBLIC_APP_URL` → same production URL
4. Deploy.
5. Run migration + seed against production DB once, from your local machine:
```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   DATABASE_URL="<production-url>" npx prisma db seed
```

Note: several pages and API routes are marked `export const dynamic =
"force-dynamic"` — this is required because they depend on live database
queries (search params, session data) that can't be resolved at build time,
so Next.js can't statically pre-render them.

## Architecture notes (for review / Loom video)

- **Courses have their own fees**, modeled as a separate `Course` table
  related to `College`, rather than a flat fee on the college itself — a
  computer science seat and a civil engineering seat at the same college can
  cost very differently. `College.fees` stores the lowest course fee, used
  for search/filter/sort at the listing level.
- **Server components fetch data, client components hold interactive state**
  (e.g. `CollegeGrid` fetches server-side; `CollegeGridClient` owns compare-selection state).
- **URL search params are the source of truth for filters/pagination** — not local
  React state — so results are shareable and the back button works correctly.
- **Listing stats (total, avg fees, avg rating) are computed via a Prisma
  aggregate query** against the full filtered dataset, not just the current
  page, so the numbers stay accurate as filters/pagination change.
- **JWT session strategy** (not database sessions) — simpler and stateless for a
  credentials-only auth flow; tradeoff is no instant server-side session revocation.
- **Money stored as integers in base currency units** (not floats), formatted for
  display (e.g. `fees / 100000` → LPA) at the UI layer only.
- **Saved-item mutations are scoped by both record ID and `userId`** in delete
  queries, to prevent one user from deleting another user's saved data by
  guessing IDs.
- **Compare and Predictor/Q&A were deliberately cut** to execute 4 features well
  rather than 6 features shallowly, per the doc's "choose ANY 3-4 features" guidance.
