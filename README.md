# College Discovery Platform

Full Stack track submission — AI Software Engineer Internship demo task.
Track A: College Discovery Platform. Features: Listing + Search, College Detail Page,
Compare Colleges, Authentication + Saved Items.

## Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Node.js ·
PostgreSQL · Prisma ORM · NextAuth (Credentials + JWT)

## What's built
- Prisma schema: User, College, Review, SavedCollege, SavedComparison
- `GET /api/colleges` — search, filter (location/fees/rating), sort, pagination
- `GET /api/colleges/[id]` — detail page data incl. reviews
- `GET /api/colleges/compare?ids=a,b,c` — 2-3 college comparison
- NextAuth credentials auth (signup, login, JWT session)
- `POST/GET /api/saved/colleges`, `DELETE /api/saved/colleges/[collegeId]`
- `POST/GET /api/saved/comparisons`, `DELETE /api/saved/comparisons/[id]`
- Frontend: listing (search/filter/pagination/compare-select), detail page,
  compare table, login/signup, save college/comparison buttons
- Seed script with 8 realistic mock colleges (courses, placements, reviews)

## What's NOT built (deliberately scoped out — see Loom video for reasoning)
- Predictor Tool (feature 4 in the doc)
- Q&A / Discussion (feature 5 in the doc)
- Deployment (not yet live — see steps below)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — get this from Neon (neon.tech), create a free Postgres project
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
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
   Visit http://localhost:3000 — it redirects to /colleges.

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
4. Deploy. Vercel runs `npm install` → `prisma generate` (via postinstall) → `next build`.
5. Run migration against production DB once, from your local machine:
   ```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   DATABASE_URL="<production-url>" npx prisma db seed
   ```

## Architecture notes (for review / Loom video)

- **Server components fetch data, client components hold interactive state**
  (e.g. `CollegeGrid` fetches server-side; `CollegeGridClient` owns compare-selection state).
- **URL search params are the source of truth for filters/pagination** — not local
  React state — so results are shareable and the back button works correctly.
- **JWT session strategy** (not database sessions) — simpler and stateless for a
  credentials-only auth flow; tradeoff is no instant server-side session revocation.
- **`placements` fields are structured** (avgPackage, highestPackage, placementRate,
  topRecruiters as separate columns) rather than free text, for queryability.
- **Money stored as integers in base currency units** (not floats), formatted for
  display (e.g. `avgPackage / 100000` → LPA) at the UI layer only.
- **Saved-item mutations are scoped by both record ID and `userId`** in delete
  queries, to prevent one user from deleting another user's saved data by
  guessing IDs.
- **Compare and Predictor/Q&A were deliberately cut** to execute 4 features well
  rather than 6 features shallowly, per the doc's "choose ANY 3-4 features" guidance.
