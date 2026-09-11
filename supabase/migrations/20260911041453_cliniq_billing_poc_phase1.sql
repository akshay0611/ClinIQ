-- ClinIQ Billing V2 POC: one-time purchases and additive entitlements.

create table public.plans (
	id uuid primary key default gen_random_uuid(),
	slug text not null unique,
	name text not null,
	description text,
	price_paise integer not null check (price_paise > 0),
	currency text not null default 'INR',
	features jsonb not null default '[]'::jsonb,
	is_active boolean not null default true,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create trigger on_plan_update
	before update on public.plans
	for each row execute function public.handle_updated_at();

create table public.payments (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references auth.users(id) on delete cascade,
	plan_id uuid not null references public.plans(id),
	razorpay_order_id text,
	razorpay_payment_id text unique,
	amount_paise integer not null check (amount_paise > 0),
	currency text not null default 'INR',
	status text not null default 'created'
		check (status in ('created', 'captured', 'failed')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create trigger on_payment_update
	before update on public.payments
	for each row execute function public.handle_updated_at();

create table public.entitlements (
	user_id uuid not null references auth.users(id) on delete cascade,
	feature_key text not null,
	source text not null
		check (source in ('cliniq_purchase', 'edulinkup_premium')),
	granted_at timestamptz not null default now(),
	payment_id uuid references public.payments(id),
	primary key (user_id, feature_key)
);

alter table public.plans enable row level security;
alter table public.payments enable row level security;
alter table public.entitlements enable row level security;

create policy "Anyone can read active ClinIQ plans"
	on public.plans for select
	to anon, authenticated
	using (is_active = true);

create policy "Users can read their own ClinIQ payments"
	on public.payments for select
	to authenticated
	using ((select auth.uid()) = user_id);

create policy "Users can read their own ClinIQ entitlements"
	on public.entitlements for select
	to authenticated
	using ((select auth.uid()) = user_id);

insert into public.plans (slug, name, description, price_paise, features)
values
	('plan_a', 'ClinIQ Plan A', 'Basic healthcare access', 10000,
		'["basic_symptom_checker", "hospital_finder", "health_blog", "email_support"]'::jsonb),
	('plan_b', 'ClinIQ Plan B', 'Advanced medical features', 20000,
		'["basic_symptom_checker", "hospital_finder", "health_blog", "email_support", "advanced_symptom_analysis", "priority_appointments", "full_drug_database", "medical_dictionary", "priority_support"]'::jsonb);
