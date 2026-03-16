# FuelSpotter NG 🚗⛽

> A crowd-powered platform that helps Nigerians quickly find petrol stations with fuel — and understand the queue situation before driving there.

---

## The Problem

During fuel scarcity in Nigeria, drivers waste hours searching station to station. Word-of-mouth and scattered social media posts are unreliable. FuelSpotter NG solves this with real-time crowd reporting.

---

## Features

- **Live station listing** — fuel status, queue length, last update time
- **Crowd reporting** — submit updates in under 30 seconds
- **Reliability indicator** — stations with more reports are flagged as more trustworthy
- **Freshness labels** — know if info is 3 minutes or 3 hours old
- **Geolocation sorting** — sort stations by distance from your current location
- **Real-time updates** — station cards update live via Supabase Realtime

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | Next.js 14 (App Router)           |
| Styling     | Tailwind CSS                      |
| Database    | Supabase (Postgres + Realtime)    |
| Deployment  | Vercel                            |

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout with Navbar
│   ├── globals.css         # Tailwind + custom design tokens
│   ├── page.jsx            # Home page
│   ├── stations/
│   │   └── page.jsx        # Station listing
│   └── report/
│       └── page.jsx        # Crowd report form
├── components/
│   ├── Navbar.jsx          # Sticky top navigation
│   ├── StationCard.jsx     # Individual station card
│   ├── StationList.jsx     # Filterable list with geolocation
│   └── ReportForm.jsx      # Controlled report form
├── services/
│   ├── supabaseClient.js   # Supabase singleton
│   └── stationService.js   # DB read/write + realtime subscription
└── utils/
    ├── timeFormatter.js    # timeAgo(), freshnessLabel()
    ├── distanceCalculator.js  # Haversine formula + geolocation
    └── reliabilityHelper.js   # Report count → reliability tier
```

---

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-username/fuelspotter-ng.git
cd fuelspotter-ng
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** — give it the name `fuelspotter-ng`
3. Once created, go to **SQL Editor** in the left sidebar
4. Paste the full contents of `supabase-schema.sql` and click **Run**
   - This creates the `stations` and `reports` tables, enables RLS, and seeds 10 Lagos stations
5. Go to **Project Settings → API** and copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Option B — GitHub Integration

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Select your `fuelspotter-ng` repo
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your anon key
5. Click **Deploy**

---

## Database Schema

### `stations`

| Column        | Type        | Description                              |
|---------------|-------------|------------------------------------------|
| `id`          | bigint      | Auto-incrementing primary key            |
| `name`        | text        | Station name                             |
| `area`        | text        | Neighbourhood / district                 |
| `latitude`    | float8      | GPS latitude                             |
| `longitude`   | float8      | GPS longitude                            |
| `fuel_status` | text        | `available` / `nofuel` / `unknown`       |
| `queue_length`| text        | `short` / `medium` / `long` / null       |
| `last_updated`| timestamptz | When the crowd last updated this station |

### `reports`

| Column        | Type        | Description                              |
|---------------|-------------|------------------------------------------|
| `id`          | bigint      | Auto-incrementing primary key            |
| `station_id`  | bigint      | FK → stations.id                         |
| `fuel_status` | text        | What the reporter saw                    |
| `queue_length`| text        | Queue assessment                         |
| `comment`     | text        | Optional free-text note                  |
| `created_at`  | timestamptz | Report timestamp                         |

---

## Adding More Stations

Run this SQL in the Supabase SQL Editor:

```sql
insert into stations (name, area, latitude, longitude, fuel_status)
values ('Your Station Name', 'Your Area', 6.5000, 3.3500, 'unknown');
```

---

## How Reliability Works

Each station shows a reliability tier based on how many crowd reports it has received:

| Reports | Tier   | Indicator |
|---------|--------|-----------|
| 15+     | High   | 3 green bars |
| 7–14    | Medium | 2 yellow bars |
| 0–6     | Low    | 1 red bar    |

---

## Roadmap (Post-MVP)

- [ ] Map view with Mapbox or Google Maps
- [ ] Push notifications when a nearby station goes to "Available"
- [ ] User accounts and report history
- [ ] Station owner verification
- [ ] Admin panel for moderating bad reports
- [ ] Expand beyond Lagos to Abuja, Port Harcourt, Kano

---

## License

MIT — built for the hackathon. Fork and build on it freely.
