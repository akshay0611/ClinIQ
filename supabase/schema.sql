-- ClinIQ Supabase Schema
-- This file contains the STRICT database structure for ClinIQ (2 Tables Only).

-- Function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. Profiles Table
create table public.profiles (
  id uuid not null,
  full_name text null,
  date_of_birth date null,
  gender text null,
  blood_type text null,
  allergies text[] null,
  current_medications text[] null,
  emergency_contact_name text null,
  emergency_contact_phone text null,
  updated_at timestamp with time zone null default now(),
  role text null default 'patient'::text,
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
) tablespace pg_default;

create trigger on_profile_update before
update on profiles for each row
execute function handle_updated_at ();

-- 2. Doctor Profiles Table 
create table public.doctor_profiles (
  profile_id uuid not null,
  specialization text null,
  qualifications text[] null,
  experience_years integer null default 0,
  consultation_fee numeric null default 0,
  availability_schedule jsonb null default '[]'::jsonb,
  clinic_address text null,
  about text null,
  constraint doctor_profiles_pkey primary key (profile_id),
  constraint doctor_profiles_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade
) tablespace pg_default;

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.doctor_profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);
create policy "Doctor profiles are viewable by everyone" on public.doctor_profiles for select using (true);
create policy "Doctors can update their own profile" on public.doctor_profiles for update using (auth.uid() = profile_id);
