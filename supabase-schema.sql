-- ============================================================
-- FuelSpotter NG — Supabase SQL Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. STATIONS TABLE
-- Stores each petrol station and its current crowd-reported status.
create table if not exists stations (
  id           bigint generated always as identity primary key,
  name         text not null,
  area         text not null,
  latitude     double precision,
  longitude    double precision,
  fuel_status  text not null default 'unknown'
                 check (fuel_status in ('available', 'nofuel', 'unknown')),
  queue_length text
                 check (queue_length in ('short', 'medium', 'long') or queue_length is null),
  last_updated timestamptz default now(),
  created_at   timestamptz default now()
);

-- 2. REPORTS TABLE
-- Each crowd-submitted report. Source of truth for history + reliability.
create table if not exists reports (
  id           bigint generated always as identity primary key,
  station_id   bigint not null references stations(id) on delete cascade,
  fuel_status  text not null
                 check (fuel_status in ('available', 'nofuel')),
  queue_length text
                 check (queue_length in ('short', 'medium', 'long') or queue_length is null),
  comment      text,
  created_at   timestamptz default now()
);

-- 3. INDEXES
create index if not exists reports_station_id_idx on reports(station_id);
create index if not exists stations_fuel_status_idx on stations(fuel_status);
create index if not exists stations_last_updated_idx on stations(last_updated desc);

-- 4. ROW LEVEL SECURITY
-- Allow public reads. Only authenticated users (or anon) can insert reports.
alter table stations enable row level security;
alter table reports  enable row level security;

-- Anyone can read stations
create policy "Public read stations"
  on stations for select using (true);

-- Anyone can read reports
create policy "Public read reports"
  on reports for select using (true);

-- Anyone can insert a report (anon key is fine for MVP)
create policy "Public insert reports"
  on reports for insert with check (true);

-- Anyone can update a station (triggered by report submission)
create policy "Public update stations"
  on stations for update using (true);

-- 5. REAL-TIME
-- Enable real-time updates for the stations table
alter publication supabase_realtime add table stations;

-- ============================================================
-- SEED DATA — Lagos petrol stations
-- ============================================================

insert into stations (name, area, latitude, longitude, fuel_status, queue_length, last_updated) values
  ('Mobil Petrol Station',      'Ikeja',          6.5955,  3.3384, 'available', 'medium',  now() - interval '3 minutes'),
  ('NNPC Mega Station',         'Lekki Phase 1',  6.4281,  3.5237, 'available', 'long',    now() - interval '8 minutes'),
  ('Total Energies',            'Yaba',           6.5095,  3.3711, 'nofuel',    null,      now() - interval '25 minutes'),
  ('Ardova Petroleum',          'Victoria Island',6.4248,  3.4177, 'available', 'short',   now() - interval '1 minute'),
  ('Conoil',                    'Surulere',       6.4967,  3.3515, 'unknown',   null,      now() - interval '90 minutes'),
  ('AP (Forte Oil)',            'Maryland',       6.5538,  3.3590, 'nofuel',    null,      now() - interval '12 minutes'),
  ('Oando Filling Station',     'Ikorodu',        6.6194,  3.5078, 'available', 'medium',  now() - interval '5 minutes'),
  ('Nipco Petrol Station',      'Ajah',           6.4659,  3.5826, 'unknown',   null,      now() - interval '3 hours'),
  ('MRS Oil',                   'Apapa',          6.4480,  3.3602, 'available', 'short',   now() - interval '15 minutes'),
  ('Rainoil',                   'Gbagada',        6.5570,  3.3859, 'nofuel',    null,      now() - interval '40 minutes');
