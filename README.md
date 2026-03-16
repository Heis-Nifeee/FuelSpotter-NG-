# FuelSpotter-NG 🏪⛽

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-F69120.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38BDF8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

**FuelSpotter-NG** is a modern, real-time web application that empowers users to crowdsource and track fuel availability at petrol stations across Nigeria, with a focus on Lagos. In regions plagued by fuel scarcity, long queues, and unreliable information, FuelSpotter provides up-to-the-minute status updates on whether fuel is available ('available', 'nofuel', 'unknown'), queue lengths (short/medium/long/none), and reliability scores based on report volume.

Users can browse nearby stations sorted by recency or distance, submit reports with optional comments, and receive live updates via Supabase Realtime. Built with Next.js 14 App Router, Supabase Postgres + Realtime, and Tailwind CSS, it's production-ready, performant, and scalable.

## 🚀 Features

- **Real-Time Updates**: Subscribe to live changes in station status using Supabase Realtime. See new reports and status updates instantly without refreshing.
- **Crowd-Sourced Reporting**: Anyone can submit a report (fuel status + queue length). Each report atomically updates the station's current status and logs history for reliability.
- **Station Discovery**: List of stations with cards showing name, area, status, queue, last updated, and report count (reliability indicator).
- **Location-Aware Sorting**: Sort stations by proximity using Haversine distance (user's lat/lng via browser geolocation).
- **Reliability Scoring**: Visual indicators based on number of reports per station (more reports = higher confidence).
- **Report Form**: Intuitive form for submitting status updates, with validation and optimistic UI.
- **Responsive Design**: Mobile-first Tailwind UI with custom 'fuel' theme (dark mode ready).
- **Lagos Coverage**: Pre-seeded with major stations like Mobil Ikeja, NNPC Lekki, Total Yaba, Oando Ikorodu, etc.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 14 (App Router), React 18 |
| **Styling** | Tailwind CSS, PostCSS, clsx |
| **Database** | Supabase Postgres (stations + reports tables) |
| **Backend** | Supabase (Auth, Realtime, Storage, PostgREST) |
| **Utils** | date-fns, Haversine distance, custom helpers (reliability, time formatting) |
| **Deployment** | Vercel (Next.js optimized), Supabase (free tier sufficient for MVP) |

**Database Schema** (supabase-schema.sql):
- `stations`: id, name, area, latitude/longitude, fuel_status, queue_length, last_updated, reports_count.
- `reports`: id, station_id, fuel_status, queue_length, comment, created_at.
- Row Level Security: Public reads, anon inserts for reports.
- Indexes on station_id, fuel_status, last_updated.
- Realtime enabled on stations table.

## 📦 Quick Start

### 1. Clone & Install
```bash
git clone <repo> fuelspotter-ng
cd fuelspotter-ng
npm install
```

### 2. Environment Setup
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Supabase Setup
1. Create free project at [supabase.com](https://supabase.com).
2. Run `supabase-schema.sql` in SQL Editor.
3. Copy URL + anon key to `.env.local`.
4. Enable Realtime on `stations` table.

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). Test reporting!

### Scripts
- `npm run dev`: Development server.
- `npm run build`: Production build.
- `npm run start`: Production server.
- `npm run lint`: ESLint.

## 📱 Usage

1. **Browse Stations** (`/stations`): View list, sort by distance/recency.
2. **Submit Report** (`/report/{stationId}`): Select status/queue, add comment, submit.
3. **Home** (`/`): Quick overview or featured stations.

Uses browser Geolocation for distance sorting (HTTPS required in prod).

## 🚀 Deployment

1. Push to GitHub.
2. Deploy to [Vercel](https://vercel.com) (auto-detects Next.js).
3. Add env vars in Vercel dashboard.
4. Supabase project remains separate.

## 🤝 Contributing

1. Fork & PR.
2. Follow ESLint/Prettier (in jsconfig.json).
3. Add tests for new services.
4. Update seed data for more stations.

Issues: Fuel scarcity affects millions in Nigeria – contribute stations, accuracy improvements, maps integration!
