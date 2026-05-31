create table if not exists public.keep_alive (
  id bigint generated always as identity primary key,
  pinged_at timestamptz not null default now(),
  source text not null default 'github-actions'
);

-- Only the service role can insert; no public access needed
alter table public.keep_alive enable row level security;

-- Monitoring queries (run in Supabase SQL Editor):
--
-- Latest heartbeats:
--   select * from public.keep_alive order by pinged_at desc limit 20;
--
-- Heartbeat frequency by day:
--   select date_trunc('day', pinged_at) as day, count(*) as pings
--   from public.keep_alive group by 1 order by 1 desc;
--
-- Last successful activity:
--   select max(pinged_at) as last_ping from public.keep_alive;
