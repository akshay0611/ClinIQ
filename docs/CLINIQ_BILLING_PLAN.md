# ClinIQ Billing & Subscription Architecture Plan

> **Scope:** Prepare ClinIQ's own billing/subscription foundation for future EduLinkUp marketplace integration.  
> **Boundary:** ClinIQ-owned products only. No EduLinkUp credential sharing. No marketplace logic yet.

---

## Table of Contents

1. [Current-State Analysis](#1-current-state-analysis)
2. [Proposed Target Architecture](#2-proposed-target-architecture)
3. [Database Model Proposal](#3-database-model-proposal)
4. [API Proposal](#4-api-proposal)
5. [Payment Flow](#5-payment-flow)
6. [Webhook Flow](#6-webhook-flow)
7. [Entitlement/Access Flow](#7-entitlementaccess-flow)
8. [Security Model](#8-security-model)
9. [Failure/Retry/Idempotency Model](#9-failureretryidempotency-model)
10. [Refund/Cancellation/Expiry Model](#10-refundcancellationexpiry-model)
11. [Testing Strategy](#11-testing-strategy)
12. [Migration Strategy](#12-migration-strategy)
13. [Risks](#13-risks)
14. [Open Questions / Blocking Business Decisions](#14-open-questions--blocking-business-decisions)
15. [Phase-by-Phase Implementation Plan](#15-phase-by-phase-implementation-plan)

---

## 1. Current-State Analysis

### 1.1 Project Overview

| Aspect | Current State |
|--------|--------------|
| Framework | React 18.3.1 + Vite 5.4.2 (client-side SPA) |
| Backend | Supabase (PostgreSQL + Auth + PostgREST). **No custom server.** |
| Database | 3 tables: `profiles`, `doctor_profiles`, `keep_alive` |
| Auth | Supabase Auth (email/password + EduLinkUp SSO via `@edulinkup/auth`) |
| Routing | `react-router-dom` v6 (client-side) |
| Deployment | Vercel |
| Testing | Vitest + jsdom (2 test files exist) |
| Payments | **None** |
| Feature gating | **None** |
| Edge Functions | **None** |
| Webhook endpoints | **None** |

### 1.2 Existing Pricing Page

**File:** `src/pages/Pricing.tsx` (193 lines)

| Plan | Price | Billing | CTA | Handler |
|------|-------|---------|-----|---------|
| ClinIQ Plan A | ₹100 | /month | `<button>` | **No onClick** |
| ClinIQ Plan B | ₹200 | /month | `<button>` | **No onClick** |
| EduLinkUp Premium | ₹299 | /month | `<a>` | External link to `edulinkup.dev/premium` |

Plans are hardcoded in a static array. No dynamic product data, no price IDs, no plan references.

### 1.3 Auth & User Model

**User type** (`src/types/index.ts`):
```typescript
export type UserRole = 'patient' | 'doctor';
export interface User {
  id: string;        // Supabase auth.users.id
  name: string;
  email: string;
  role?: UserRole;
  profilePicture?: string;
  preferences?: { theme: 'light' | 'dark'; notifications: boolean; };
}
```

- **No `admin` role** exists.
- Role is resolved from `profiles.role` table, defaulting to `'patient'`.
- Auth context (`src/context/AuthContext.tsx`) exposes: `currentUser`, `isLoading`, `logout`.
- No sign-up/sign-in methods in context — those live in page components (`Login.tsx`, `Signup.tsx`).
- Password reset is a **mock** (`ForgotPassword.tsx` — does not call Supabase).
- Profile row is created on first save via upsert in `Profile.tsx`, not during signup.

### 1.4 Database Schema

**Tables** (from `supabase/schema.sql`):

```
auth.users (Supabase-managed)
    │
    │ 1:1  FK: id → auth.users.id  ON DELETE CASCADE
    ▼
public.profiles
    │  id (uuid PK), full_name, date_of_birth, gender, blood_type,
    │  allergies[], current_medications[], emergency_contact_*,
    │  role (default 'patient'), updated_at (auto-trigger)
    │
    │ 1:1  FK: profile_id → profiles.id  ON DELETE CASCADE
    ▼
public.doctor_profiles
    │  profile_id (uuid PK), specialization, qualifications[],
    │  experience_years, consultation_fee, availability_schedule (jsonb),
    │  clinic_address, about

public.keep_alive (independent — heartbeat monitoring)
    │  id (bigint PK), pinged_at, source
```

### 1.5 RLS Policies

| Table | Operation | Policy | Condition |
|-------|-----------|--------|-----------|
| `profiles` | SELECT | Public read | `true` |
| `profiles` | UPDATE | Owner only | `auth.uid() = id` |
| `doctor_profiles` | SELECT | Public read | `true` |
| `doctor_profiles` | UPDATE | Owner only | `auth.uid() = profile_id` |

**Gaps:** No INSERT or DELETE policies on any table. No RLS on `keep_alive` (service-role only).

### 1.6 Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `VITE_GEMINI_API_KEY` | Optional | Gemini AI for symptom checker |
| `VITE_EDULINKUP_URL` | Optional | EduLinkUp SSO (commented out) |

**No payment-related env vars exist.**

### 1.7 Service Layer

**Directory:** `src/services/` (10 files)

Only `supabaseClient.ts` touches Supabase. All other services are client-side utilities (PDF generation, localStorage encryption, mock data, email). No centralized data access layer — Supabase is imported directly in 7+ page components.

### 1.8 Key Gaps Identified

1. **No payment processing** — Pricing page is display-only.
2. **No subscription state** — No database tables for plans, subscriptions, or payments.
3. **No feature gating** — All features accessible to all users.
4. **No server-side logic** — No Edge Functions, no webhook endpoints.
5. **No INSERT RLS policies** — Profile creation works via Supabase upsert but lacks explicit INSERT policy.
6. **No admin role** — Only `patient` and `doctor`.
7. **Password reset is mock** — No real implementation.
8. **No `/auth/callback` route** — EduLinkUp SSO callback not implemented.

---

## 2. Proposed Target Architecture

### 2.1 Architectural Principles

1. **ClinIQ owns its billing** — ClinIQ's Razorpay credentials stay in ClinIQ's Supabase Edge Functions only.
2. **Client never touches secrets** — Razorpay key_id is public (client-safe), but key_secret is server-side only.
3. **Supabase Edge Functions as server layer** — No custom backend server needed. Edge Functions handle webhook verification, payment verification, and entitlement granting.
4. **Idempotent by design** — Every write operation is safe to retry.
5. **Offline-resilient entitlements** — Client caches entitlement state; server is source of truth.
6. **Composable for future marketplace** — EduLinkUp can later sell ClinIQ products by calling ClinIQ's own APIs/Edge Functions.

### 2.2 Component Diagram

```
┌──────────────────────────────────────────────────────┐
│                    CLINIQ CLIENT (SPA)                │
│                                                      │
│  Pricing.tsx ──► CheckoutPage.tsx ──► Razorpay SDK   │
│                     │                      │         │
│                     │                 Razorpay.js     │
│                     │                 (client-side)   │
│                     ▼                                 │
│              supabase.from('subscriptions')            │
│              supabase.from('payments')                 │
│                                                      │
│  SubscriptionContext ──► Entitlement checks           │
└──────────────┬───────────────────────────┬────────────┘
               │                           │
               │ REST (supabase-js)        │ Razorpay checkout
               │                           │
┌──────────────▼───────────────────────────▼────────────┐
│                 SUPABASE PLATFORM                      │
│                                                      │
│  ┌─────────────────┐    ┌──────────────────────────┐ │
│  │   PostgreSQL     │    │   Edge Functions          │ │
│  │                  │    │                          │ │
│  │  subscriptions   │    │  verify-payment          │ │
│  │  payments        │◄───│  handle-webhook          │ │
│  │  plans (view)    │    │  create-checkout         │ │
│  │  entitlements    │    │  cancel-subscription     │ │
│  │  (materialized)  │    │                          │ │
│  └─────────────────┘    └──────────────────────────┘ │
│                                                      │
│  Auth (JWT) ──► RLS enforced                         │
└──────────────────────────────────────────────────────┘
               │
               │ Webhook (POST)
               │
┌──────────────▼──────────────────────────┐
│              RAZORPAY                    │
│                                         │
│  key_id: rzp_live_xxx (public/client)   │
│  key_secret: xxx (server-only)          │
│                                         │
│  Customer portal (optional)             │
└─────────────────────────────────────────┘
```

### 2.3 Data Flow Summary

1. **User clicks "Get Started"** → Client calls Edge Function `create-checkout` with `plan_id`.
2. **Edge Function creates Razorpay order** → Returns `order_id` + `key_id` to client.
3. **Client opens Razorpay checkout modal** → User completes payment.
4. **Razorpay fires webhook** → Edge Function `handle-webhook` verifies signature, writes `payments` + `subscriptions` rows, grants entitlements.
5. **Client polls/refreshes subscription status** → `SubscriptionContext` fetches from `subscriptions` table via RLS.
6. **Feature gates check entitlements** → `useEntitlement()` hook returns access flags.

---

## 3. Database Model Proposal

### 3.1 New Tables

#### `plans` (product catalog — admin-managed)

```sql
create table public.plans (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,          -- 'plan_a', 'plan_b'
  name          text not null,                 -- 'ClinIQ Plan A'
  description   text,
  price_inr     integer not null,              -- 10000 = ₹100.00 (stored in paise)
  billing_interval text not null default 'monthly',  -- 'monthly' | 'yearly' | 'one_time'
  features      jsonb not null default '[]',   -- structured feature list
  is_active     boolean not null default true,
  razorpay_plan_id text,                       -- mapped to Razorpay plan if recurring
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Trigger for updated_at
create trigger on_plan_update before update on public.plans
  for each row execute function handle_updated_at();
```

**RLS:**
```sql
alter table public.plans enable row level security;

-- Anyone can read active plans (for pricing page)
create policy "Plans are publicly readable"
  on public.plans for select using (is_active = true);
```

#### `subscriptions` (user subscription state)

```sql
create table public.subscriptions (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  plan_id           uuid not null references public.plans(id),
  status            text not null default 'active'
                    check (status in ('active','past_due','cancelled','expired','trialing')),
  razorpay_subscription_id text unique,        -- for recurring billing
  razorpay_customer_id     text,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  cancelled_at            timestamptz,
  metadata          jsonb not null default '{}',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger on_subscription_update before update on public.subscriptions
  for each row execute function handle_updated_at();

-- Index for fast user lookup
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_status on public.subscriptions(status);
```

**RLS:**
```sql
alter table public.subscriptions enable row level security;

-- Users can read their own subscriptions
create policy "Users read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only service_role can insert/update/delete (via Edge Functions)
```

#### `payments` (payment audit trail)

```sql
create table public.payments (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  subscription_id       uuid references public.subscriptions(id),
  plan_id               uuid not null references public.plans(id),
  razorpay_order_id     text not null,
  razorpay_payment_id   text unique,
  razorpay_signature    text,
  amount_inr            integer not null,       -- in paise
  currency              text not null default 'INR',
  status                text not null default 'created'
                        check (status in ('created','authorized','captured','failed','refunded')),
  failure_reason        text,
  refund_amount_inr     integer default 0,
  refund_id             text,
  idempotency_key       text unique not null,   -- client-generated, prevents duplicate payments
  metadata              jsonb not null default '{}',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create trigger on_payment_update before update on public.payments
  for each row execute function handle_updated_at();

create index idx_payments_user_id on public.payments(user_id);
create index idx_payments_subscription_id on public.payments(subscription_id);
create index idx_payments_razorpay_order_id on public.payments(razorpay_order_id);
```

**RLS:**
```sql
alter table public.payments enable row level security;

-- Users can read their own payments
create policy "Users read own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- Only service_role can insert/update (Edge Functions)
```

### 3.2 Why Prices in Paise (Integer)

- Avoids floating-point rounding errors.
- Razorpay API expects amounts in paise.
- `₹100.00` = `10000` paise.
- Display: `price_inr / 100` → `100.00` with `₹` prefix.

### 3.3 Why `idempotency_key` on `payments`

- Client generates a UUID before calling `create-checkout`.
- Stored as UNIQUE constraint on `payments.idempotency_key`.
- If a user clicks "Pay" twice quickly, the second call uses the same key → returns existing order instead of creating a duplicate.
- Prevents double-charging on network retries.

### 3.4 Materialized Entitlements (Future Optimization)

For Phase 3+, consider an `entitlements` table or materialized view:

```sql
create table public.entitlements (
  user_id       uuid not null references auth.users(id) on delete cascade,
  feature_key   text not null,    -- 'symptom_checker_advanced', 'drug_database_full', etc.
  granted_at    timestamptz not null default now(),
  expires_at    timestamptz,      -- null = lifetime
  source_plan_id uuid references public.plans(id),
  primary key (user_id, feature_key)
);
```

This decouples feature checks from subscription status lookups and supports granular per-feature access. Not needed in Phase 1 — subscription status check is sufficient initially.

---

## 4. API Proposal

### 4.1 Edge Functions (Supabase)

All server-side logic lives in Supabase Edge Functions (Deno runtime). No custom backend server.

#### `POST /functions/v1/create-checkout`

**Purpose:** Create a Razorpay order and return checkout details to the client.

**Request:**
```json
{
  "plan_id": "uuid",
  "idempotency_key": "uuid"
}
```

**Auth:** Requires valid Supabase JWT (authenticated user).

**Logic:**
1. Validate `plan_id` exists and `is_active = true`.
2. Check user doesn't already have an active subscription for this plan.
3. Generate Razorpay order via Razorpay API (`amount = plan.price_inr`, `receipt = idempotency_key`).
4. Insert row into `payments` with `status = 'created'`, linking to `razorpay_order_id`.
5. Return `{ order_id, amount, currency: 'INR', key_id: RAZORPAY_KEY_ID }`.

**Response:**
```json
{
  "order_id": "order_xxx",
  "amount": 10000,
  "currency": "INR",
  "key_id": "rzp_live_xxx"
}
```

#### `POST /functions/v1/handle-webhook`

**Purpose:** Receive Razorpay webhook events and process payment/subscription state changes.

**Auth:** Razorpay webhook signature verification (HMAC-SHA256). No Supabase JWT required.

**Events handled:**
- `payment.captured` — Payment successful. Update `payments.status = 'captured'`, create/update `subscriptions`.
- `payment.failed` — Payment failed. Update `payments.status = 'failed'`, set `failure_reason`.
- `subscription.activated` — Subscription active (recurring). Update `subscriptions.status = 'active'`.
- `subscription.charged` — Renewal charged. Extend `current_period_end`.
- `subscription.cancelled` — Subscription cancelled. Set `status = 'cancelled'`, `cancelled_at`.
- `subscription.halted` — Payment failed repeatedly. Set `status = 'expired'`.
- `refund.created` — Refund processed. Update `payments.refund_amount_inr`, `payments.refund_id`.

**Logic flow:**
1. Verify `x-razorpay-signature` header against `RAZORPAY_KEY_SECRET`.
2. Parse event payload.
3. Use `razorpay_payment_id` or `razorpay_subscription_id` to find existing records.
4. Update records idempotently (check current status before overwriting).
5. Return `200 OK` to Razorpay.

#### `POST /functions/v1/cancel-subscription`

**Purpose:** Allow a user to cancel their own subscription.

**Request:**
```json
{
  "subscription_id": "uuid"
}
```

**Auth:** Requires valid Supabase JWT. Must own the subscription.

**Logic:**
1. Verify `auth.uid() = subscription.user_id`.
2. Verify `subscription.status = 'active'`.
3. Call Razorpay API to cancel the subscription (set `cancel_at_period_end = true`).
4. Update `subscriptions.cancel_at_period_end = true`.

**Response:**
```json
{
  "status": "cancellation_scheduled",
  "current_period_end": "2026-10-11T00:00:00Z"
}
```

#### `POST /functions/v1/verify-payment`

**Purpose:** Client calls this after Razorpay checkout modal closes to confirm payment.

**Request:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "xxx",
  "idempotency_key": "uuid"
}
```

**Auth:** Requires valid Supabase JWT.

**Logic:**
1. Verify signature: `HMAC-SHA256(order_id + "|" + payment_id, RAZORPAY_KEY_SECRET) === signature`.
2. Fetch payment details from Razorpay API to confirm `amount` and `status`.
3. Update `payments` row: `razorpay_payment_id`, `razorpay_signature`, `status = 'captured'`.
4. Create/update `subscriptions` row.
5. Return subscription status.

### 4.2 Client-Side Service Layer

New files in `src/services/`:

```
src/services/billingService.ts       — Razorpay SDK wrapper + Edge Function calls
src/services/subscriptionService.ts  — Subscription status queries
```

New context:

```
src/context/SubscriptionContext.tsx   — Provides subscription state + entitlement checks
```

### 4.3 SubscriptionContext API

```typescript
interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  isEntitled: (featureKey: string) => boolean;
  refreshSubscription: () => Promise<void>;
}

// Usage:
const { isEntitled } = useSubscription();
if (isEntitled('drug_database_full')) { /* show feature */ }
```

---

## 5. Payment Flow

### 5.1 One-Time Payment (ClinIQ Plan A — ₹100)

```
User clicks "Get Started" on Pricing page
    │
    ▼
Client generates idempotency_key (UUID)
Client calls Edge Function: create-checkout { plan_id, idempotency_key }
    │
    ▼
Edge Function:
  1. Validates plan exists and is active
  2. Checks no existing active subscription for this plan + user
  3. Creates Razorpay order (amount: 10000 paise, receipt: idempotency_key)
  4. Inserts payment row (status: 'created')
  5. Returns { order_id, amount, currency, key_id }
    │
    ▼
Client opens Razorpay Checkout Modal (razorpay.order.open())
  - Displays amount: ₹100
  - User completes payment (UPI / Card / Netbanking)
    │
    ├── Payment Success ──► Razorpay returns { payment_id, signature }
    │   │
    │   ▼
    │   Client calls verify-payment { order_id, payment_id, signature, idempotency_key }
    │   │
    │   ▼
    │   Edge Function:
    │     1. Verifies HMAC signature
    │     2. Confirms payment with Razorpay API
    │     3. Updates payments.status → 'captured'
    │     4. Creates subscription (status: 'active', period: 30 days)
    │     5. Returns subscription details
    │   │
    │   ▼
    │   Client updates SubscriptionContext
    │   Client shows success page
    │
    └── Payment Failed ──► Client shows error toast
        Client updates payments.status → 'failed' (via Edge Function or next webhook)
```

### 5.2 Recurring Payment (ClinIQ Plan B — ₹200/month)

Same as one-time, but:
- Razorpay order is created with `subscription: true` or a Razorpay Plan is pre-created.
- `subscriptions.current_period_end` is set to `now() + 30 days`.
- Webhook `subscription.charged` extends `current_period_end` on each renewal.
- Webhook `subscription.halted` sets `status = 'expired'` if payment fails after retries.

---

## 6. Webhook Flow

### 6.1 Webhook Registration

Razorpay webhooks are configured in the Razorpay Dashboard (or via Razorpay API) to point to:

```
https://<supabase-project-ref>.supabase.co/functions/v1/handle-webhook
```

### 6.2 Events & Processing

| Razorpay Event | Handler Action | DB Update |
|---------------|----------------|-----------|
| `payment.captured` | Confirm payment success | `payments.status = 'captured'` |
| `payment.failed` | Record failure | `payments.status = 'failed'`, set `failure_reason` |
| `subscription.activated` | Activate subscription | `subscriptions.status = 'active'` |
| `subscription.charged` | Extend period | `subscriptions.current_period_end += interval` |
| `subscription.cancelled` | Mark cancelled | `subscriptions.status = 'cancelled'` |
| `subscription.halted` | Mark expired | `subscriptions.status = 'expired'` |
| `refund.created` | Record refund | `payments.refund_amount_inr`, `payments.refund_id` |

### 6.3 Webhook Security

1. **Signature verification:** Every webhook request includes `x-razorpay-signature` header. Edge Function computes HMAC-SHA256 of the raw body using `RAZORPAY_KEY_SECRET` and compares.
2. **Reject on mismatch:** Return `400 Bad Request` if signature doesn't match.
3. **Idempotent processing:** Check current status before updating. If `payments.status` is already `'captured'`, skip reprocessing.
4. **Logging:** Log all webhook events with `event_type`, `razorpay_id`, and `timestamp` for debugging.

### 6.4 Webhook Reliability

- Razorpay retries failed webhooks (up to 3 times with exponential backoff).
- Edge Function must return `200 OK` within 5 seconds or Razorpay retries.
- Heavy processing should be deferred. Keep webhook handler fast: verify → update DB → return 200.

---

## 7. Entitlement/Access Flow

### 7.1 Entitlement Check Pattern

```typescript
// In any component:
const { isEntitled } = useSubscription();

// Feature gate example:
if (!isEntitled('advanced_symptom_checker')) {
  return <UpgradePrompt feature="Advanced Symptom Checker" />;
}
// ... render feature
```

### 7.2 Feature Key Mapping

| Plan | Feature Keys Granted |
|------|---------------------|
| ClinIQ Plan A | `basic_symptom_checker`, `hospital_finder`, `health_blog`, `email_support` |
| ClinIQ Plan B | All Plan A keys + `advanced_symptom_checker`, `priority_appointments`, `full_drug_database`, `medical_dictionary`, `priority_support` |

### 7.3 Entitlement Resolution

1. `SubscriptionContext` fetches `subscriptions` table on mount (via Supabase client, RLS-scoped to current user).
2. If `subscription.status = 'active'` and `current_period_end > now()`, user is entitled.
3. `isEntitled(featureKey)` looks up the plan's `features` JSON and checks if the feature key is present.
4. Entitlement state is cached in React context; `refreshSubscription()` re-fetches from DB.

### 7.4 Offline / Stale State

- Entitlement state is fetched on app load and cached in memory.
- If Supabase is unreachable, the last-known state persists (React context doesn't clear on network error).
- This is acceptable for a client-side SPA — the worst case is a user briefly sees features they shouldn't, or doesn't see features they should.
- Server-side enforcement (Edge Functions, RLS) is the authoritative check for critical operations.

---

## 8. Security Model

### 8.1 Secrets Isolation

| Secret | Location | Client Access |
|--------|----------|---------------|
| `RAZORPAY_KEY_ID` | Edge Function env | Yes (returned to client for checkout) |
| `RAZORPAY_KEY_SECRET` | Edge Function env | **Never** |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Function env | **Never** |
| Webhook signature secret | `RAZORPAY_KEY_SECRET` | **Never** |

### 8.2 RLS Enforcement

- `subscriptions` and `payments` tables have RLS enabled.
- Users can only SELECT their own rows (`auth.uid() = user_id`).
- Only `service_role` (Edge Functions) can INSERT/UPDATE/DELETE.
- Client never bypasses RLS — the `supabaseClient.ts` uses the anon key.

### 8.3 Payment Verification

- Client-side: Razorpay SDK handles the checkout modal. Client never touches card details.
- Server-side: `verify-payment` Edge Function verifies HMAC signature and confirms with Razorpay API.
- Double verification: Both client callback and webhook confirm the payment. Webhook is authoritative.

### 8.4 Idempotency

- `idempotency_key` on `payments` table (UNIQUE constraint).
- Client generates UUID before checkout.
- Edge Function checks for existing payment with same key before creating Razorpay order.
- Prevents duplicate charges on retries/double-clicks.

### 8.5 CSRF / Replay Protection

- All Edge Function calls require Supabase JWT (via `Authorization: Bearer <token>` header).
- Webhooks are verified via Razorpay HMAC signature, not JWT.
- `idempotency_key` prevents replay of checkout requests.

---

## 9. Failure/Retry/Idempotency Model

### 9.1 Client-Side Failures

| Failure | Behavior | Recovery |
|---------|----------|----------|
| `create-checkout` network error | Show toast, keep user on pricing page | User retries |
| Razorpay modal closes (user cancels) | Show "payment cancelled" toast | User retries |
| `verify-payment` network error | Payment may have succeeded. Show "verifying..." spinner | Auto-retry 3x with exponential backoff, then poll |
| `verify-payment` timeout | Webhook will eventually confirm | Show "payment processing, check email" |

### 9.2 Server-Side Failures

| Failure | Behavior | Recovery |
|---------|----------|----------|
| Razorpay order creation fails | Return error to client | Client shows error, user retries |
| Webhook delivery fails | Razorpay retries up to 3x | Automatic |
| Edge Function timeout | Return 500, Razorpay retries webhook | Edge Function should be fast (<2s) |
| DB write fails (Edge Function) | Return error, Razorpay retries webhook | Idempotent on retry |

### 9.3 Idempotency Guarantees

1. **Checkout:** `idempotency_key` UNIQUE on `payments` → same key returns existing order.
2. **Webhook:** Check `payments.status` before update → skip if already processed.
3. **Verification:** Check `payments.razorpay_payment_id` before update → skip if already set.
4. **Subscription creation:** Check for existing `active` subscription for user + plan → skip if exists.

---

## 10. Refund/Cancellation/Expiry Model

### 10.1 Cancellation

- User clicks "Cancel Subscription" in Profile page.
- Client calls `cancel-subscription` Edge Function.
- Edge Function calls Razorpay API: `subscription.cancel({ cancel_at_cycle_end: 1 })`.
- Subscription remains active until `current_period_end`.
- After expiry, webhook `subscription.cancelled` sets `status = 'cancelled'`.
- Entitlements persist until `current_period_end`.

### 10.2 Expiry

- When `current_period_end < now()` and no renewal payment, subscription status → `expired`.
- Entitlements immediately revoked.
- User sees upgrade prompt on next feature access.

### 10.3 Refund

- Refund is initiated manually via Razorpay Dashboard (admin action).
- Webhook `refund.created` updates `payments.refund_amount_inr` and `payments.refund_id`.
- Subscription status is NOT automatically changed by refund — admin decides.
- If refund is full and subscription should be revoked, admin manually updates `subscriptions.status`.

### 10.4 Reactivation

- User with expired/cancelled subscription can purchase again.
- New checkout flow creates new subscription.
- No legacy subscription conflicts (status is checked: only `active` entitlements count).

---

## 11. Testing Strategy

### 11.1 Unit Tests (Vitest)

| Test | File | Coverage |
|------|------|----------|
| Plan price formatting | `src/services/__tests__/billingService.test.ts` | paise → ₹ display conversion |
| Entitlement checks | `src/context/__tests__/SubscriptionContext.test.ts` | `isEntitled()` logic |
| Idempotency key generation | `src/services/__tests__/billingService.test.ts` | UUID generation, uniqueness |
| Subscription status derivation | `src/context/__tests__/SubscriptionContext.test.ts` | Active, expired, cancelled states |

### 11.2 Integration Tests (Vitest + MSW)

| Test | Mock | Coverage |
|------|------|----------|
| Checkout flow | MSW mocks Edge Function responses | create-checkout → Razorpay → verify-payment |
| Webhook processing | MSW mocks Razorpay webhook payloads | payment.captured, subscription.cancelled |
| Error handling | MSW returns 500/timeout | Client retry behavior |

### 11.3 Edge Function Tests (Supabase CLI / Vitest)

| Test | Coverage |
|------|----------|
| `create-checkout` validates plan, creates order, prevents duplicates |
| `handle-webhook` verifies signature, processes events idempotently |
| `verify-payment` confirms signature, updates payment, creates subscription |
| `cancel-subscription` validates ownership, calls Razorpay API |

### 11.4 Manual / E2E Testing

| Scenario | Expected Result |
|----------|-----------------|
| Complete checkout with Razorpay test mode | Payment succeeds, subscription active |
| Complete checkout, close browser before webhook | Payment captured via webhook, subscription activates |
| Double-click "Pay" button | Idempotency prevents duplicate order |
| Cancel subscription | Active until period end, then expires |
| Expired subscription | Feature gate blocks premium features |
| Refund via Dashboard | Payment record updated, admin decides subscription |

### 11.5 Razorpay Test Mode

- Use Razorpay test keys (`rzp_test_xxx`) during development.
- Test card: `4111 1111 1111 1111`, CVV: `123`, Expiry: any future date.
- Test UPI: `success@razorpay` (success), `failure@razorpay` (failure).
- Webhook endpoint must be reachable from internet for production — use Supabase Edge Functions URL.

---

## 12. Migration Strategy

### 12.1 Schema Migration

1. Create new tables (`plans`, `subscriptions`, `payments`) via Supabase migration file.
2. Create RLS policies for new tables.
3. Create indexes for performance.
4. Seed `plans` table with initial product data (Plan A, Plan B).

### 12.2 Data Migration

- No existing subscription data to migrate.
- Seed `plans` table with current hardcoded plan data from `Pricing.tsx`.

### 12.3 Code Migration

- Update `Pricing.tsx` to read plans from Supabase (or keep hardcoded for Phase 1, fetch dynamically in Phase 2).
- Add `SubscriptionContext` to app hierarchy in `App.tsx`.
- Add `checkout` page/route.
- Update feature pages to check entitlements.

### 12.4 Rollback Plan

- If billing system causes issues, remove `SubscriptionContext` from app hierarchy.
- Remove `checkout` route.
- `Pricing.tsx` falls back to hardcoded plans (current state).
- No data loss — new tables are additive.

---

## 13. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Razorpay webhook delivery delays | Medium | Users see stale entitlements | Client-side polling + manual refresh button |
| Edge Function cold start latency | Medium | Slow checkout initiation | Keep functions lightweight; use region closest to users |
| RLS misconfiguration | Low | Data leakage | Thorough RLS testing; only service_role can write |
| Razorpay API downtime | Low | Checkout unavailable | Show "try again later" message; no data loss |
| User double-charges | Low | Financial harm | Idempotency key + payment verification |
| Supabase free tier limits | Medium | Edge Function execution limits | Monitor usage; plan upgrade path |
| EduLinkUp marketplace adds complexity | Future | Architectural coupling | ClinIQ billing is self-contained; EduLinkUp can call ClinIQ's APIs later |

---

## 14. Open Questions / Blocking Business Decisions

| # | Question | Impact | Recommendation |
|---|----------|--------|----------------|
| 1 | **ClinIQ Plan A and Plan B — are these recurring (monthly) or one-time purchases?** | Determines Razorpay order vs subscription API usage | Recommend: Plan A = one-time (₹100), Plan B = monthly subscription (₹200/month). Clarify with stakeholder. |
| 2 | **Should there be a free tier?** | Affects entitlement logic and signup flow | Recommend: Yes, freemium model. Free users get basic features. Paid users get premium. |
| 3 | **Is there a trial period?** | Affects subscription status states | Recommend: 7-day free trial for Plan B. No trial for Plan A (one-time). |
| 4 | **What features belong to Plan A vs Plan B?** | Defines feature key mapping | Must be defined before implementation. Currently hardcoded in `Pricing.tsx`. |
| 5 | **Should EduLinkUp Premium remain on the pricing page?** | UI/UX decision | Recommend: Keep it. Link to EduLinkUp's purchase flow. No ClinIQ billing involvement. |
| 6 | **Razorpay account — is it already created?** | Blocks Edge Function implementation | Verify Razorpay account exists with KYC completed. |
| 7 | **Which Razorpay plan type for recurring?** | Affects API integration approach | Recommend: Razorpay Subscriptions (not just orders) for monthly plans. |
| 8 | **Refund policy?** | Affects admin tooling and UI | Define: 7-day no-questions-asked refund? Pro-rata? Admin-only via Dashboard? |
| 9 | **Do we need an admin dashboard?** | Scope of Phase 3 | Recommend: Start with Razorpay Dashboard for admin. Build custom admin UI in Phase 4+ only if needed. |
| 10 | **Currency — INR only or multi-currency?** | Affects Razorpay configuration | Recommend: INR only for now. Razorpay supports INR natively. |

---

## 15. Phase-by-Phase Implementation Plan

---

### Phase 1: Foundation — Product Catalog & Checkout UI

**Objective:** Establish the product catalog, display real plans on the pricing page, and build the checkout UI. No payment processing yet — this phase prepares the data layer and UX.

**Existing files/components involved:**
- `src/pages/Pricing.tsx` — Currently hardcoded plans
- `supabase/schema.sql` — Will add new tables
- `src/types/index.ts` — Will add billing types
- `src/env.d.ts` — Will add Razorpay env vars

**New files/components:**
- `supabase/migrations/<timestamp>_add_billing_tables.sql` — New tables
- `src/types/billing.ts` — Billing type definitions
- `src/services/billingService.ts` — Plan fetching, checkout initiation
- `src/pages/Checkout.tsx` — Checkout page (placeholder)
- `src/components/pricing/PlanCard.tsx` — Extracted plan card component
- `src/components/pricing/FeatureList.tsx` — Extracted feature list component

**Database changes:**
```sql
-- New tables (see Section 3.1 for full DDL)
create table public.plans (...);
create table public.subscriptions (...);
create table public.payments (...);

-- RLS policies (see Section 3.1)
-- Indexes (see Section 3.1)
-- Seed data for Plan A and Plan B
```

**API changes:**
- None in Phase 1 (no Edge Functions yet).

**Security considerations:**
- `plans` table is publicly readable (active plans only).
- `subscriptions` and `payments` are RLS-protected (user can only read own).
- No secrets exposed to client.

**Tests:**
- Unit test for plan data fetching.
- Unit test for price formatting (paise → ₹ display).
- Component test for Pricing page rendering from DB data.

**Dependencies:**
- Supabase project with migration capability.
- Razorpay account (for key_id to display, not for processing yet).

**Risks:**
- Low risk — additive changes only.
- Pricing page can fall back to hardcoded data if DB fetch fails.

**Expected output:**
- Pricing page reads plans from Supabase `plans` table.
- Plan A and Plan B are displayed with correct prices and features.
- "Get Started" buttons navigate to `/checkout?plan=<plan_id>`.
- Checkout page renders with plan details and a placeholder "Coming Soon" message.
- EduLinkUp Premium continues to link externally.

**HARD APPROVAL CHECKPOINT:**
> [ ] Verify pricing page displays correct plans from database.
> [ ] Verify EduLinkUp Premium link still works.
> [ ] Verify checkout page renders correctly.
> [ ] Verify RLS policies prevent unauthorized access.

---

### Phase 2: Razorpay Integration — Payment Processing

**Objective:** Implement actual payment processing via Razorpay. User can complete checkout, payment is verified, subscription is created.

**Existing files/components involved:**
- `src/pages/Checkout.tsx` — Will add Razorpay modal integration
- `src/services/billingService.ts` — Will add checkout + verification methods
- `supabase/migrations/<timestamp>_add_billing_tables.sql` — Existing tables

**New files/components:**
- `supabase/functions/create-checkout/index.ts` — Edge Function
- `supabase/functions/handle-webhook/index.ts` — Edge Function
- `supabase/functions/verify-payment/index.ts` — Edge Function
- `src/context/SubscriptionContext.tsx` — Subscription state provider
- `src/hooks/useSubscription.ts` — Subscription context hook
- `src/pages/SubscriptionSuccess.tsx` — Post-payment success page
- `src/pages/SubscriptionFailed.tsx` — Payment failure page

**Database changes:**
```sql
-- Add RLS INSERT policy for subscriptions (service_role only via Edge Function)
-- Add RLS INSERT policy for payments (service_role only via Edge Function)
-- Add indexes if not already present
```

**API changes:**
- `POST /functions/v1/create-checkout` — Create Razorpay order
- `POST /functions/v1/verify-payment` — Verify payment signature
- `POST /functions/v1/handle-webhook` — Process Razorpay webhooks

**Security considerations:**
- `RAZORPAY_KEY_SECRET` stored in Edge Function environment only.
- Webhook signature verification on every inbound webhook.
- All Edge Functions require Supabase JWT (except webhook handler).
- Idempotency key prevents duplicate payments.

**Tests:**
- Unit tests for Edge Function logic (mock Razorpay API).
- Integration test for checkout flow (mock Edge Functions).
- Webhook event processing tests (all event types).
- Idempotency tests (duplicate checkout, duplicate webhook).

**Dependencies:**
- Razorpay account with test keys.
- Razorpay webhook URL configured.
- `razorpay` npm package for Edge Functions (Deno-compatible).

**Risks:**
- Medium risk — payment processing is critical path.
- Mitigation: Extensive test coverage, Razorpay test mode, gradual rollout.

**Expected output:**
- User clicks "Get Started" → Razorpay checkout modal opens.
- User completes payment → subscription created, success page shown.
- Webhooks update payment/subscription status.
- User's subscription status visible in Profile page.
- "Get Started" buttons are fully functional.

**HARD APPROVAL CHECKPOINT:**
> [ ] Complete checkout flow with Razorpay test mode works end-to-end.
> [ ] Webhook processing correctly updates subscription status.
> [ ] Idempotency prevents duplicate payments.
> [ ] Security: Razorpay key_secret never reaches client.
> [ ] Security: Webhook signature is verified.
> [ ] Subscription status displays correctly in Profile page.

---

### Phase 3: Entitlements & Feature Gating

**Objective:** Implement feature gating based on subscription status. Premium features are only accessible to paying users.

**Existing files/components involved:**
- `src/context/SubscriptionContext.tsx` — Will add `isEntitled()` method
- `src/components/common/ProtectedRoute.tsx` — Will extend for subscription gating
- `src/pages/SymptomChecker.tsx` — Will gate advanced features
- `src/pages/DrugDatabase.tsx` — Will gate full database access
- `src/pages/MedicalDictionary.tsx` — Will gate full dictionary access

**New files/components:**
- `src/components/common/SubscriptionGate.tsx` — Component that gates content behind subscription
- `src/components/pricing/UpgradePrompt.tsx` — Call-to-action for upgrading
- `src/hooks/useEntitlement.ts` — Granular entitlement check hook

**Database changes:**
```sql
-- Optionally: Add entitlements table for granular per-feature access
-- Or: Use plan features JSON for feature mapping (simpler approach)
```

**API changes:**
- None — entitlement checks are client-side using cached subscription data.

**Security considerations:**
- Feature gating is UX-only (client-side). Server-side enforcement is not needed for display features.
- For critical operations (e.g., API access), server-side entitlement checks via Edge Functions.
- RLS remains the authoritative data access control.

**Tests:**
- Unit tests for `isEntitled()` with various subscription states.
- Component tests for `SubscriptionGate` rendering.
- Integration test for upgrade flow (free → paid).

**Dependencies:**
- Phase 2 complete (subscription data exists).

**Risks:**
- Low risk — client-side gating only.
- Users could bypass client-side checks (acceptable for non-critical features).

**Expected output:**
- Premium features show upgrade prompt for free/basic users.
- Paid users see full feature set.
- "Upgrade" buttons appear throughout the app for free users.
- Subscription status indicator in profile/ navbar.

**HARD APPROVAL CHECKPOINT:**
> [ ] Free users see upgrade prompts on premium features.
> [ ] Paid users access all features for their plan.
> [ ] Entitlement state updates after payment.
> [ ] Edge cases: expired subscription, cancelled subscription.

---

### Phase 4: Subscription Management

**Objective:** Allow users to manage their subscriptions (view, cancel, reactivate). Add billing history.

**Existing files/components involved:**
- `src/pages/Profile.tsx` — Will add subscription management section
- `src/context/SubscriptionContext.tsx` — Will add cancellation methods

**New files/components:**
- `supabase/functions/cancel-subscription/index.ts` — Edge Function
- `src/pages/BillingHistory.tsx` — Payment history page
- `src/components/subscription/SubscriptionCard.tsx` — Subscription status display
- `src/components/subscription/CancellationDialog.tsx` — Cancel confirmation

**Database changes:**
```sql
-- No new tables needed
-- Existing tables support all required queries
```

**API changes:**
- `POST /functions/v1/cancel-subscription` — Cancel user's subscription

**Security considerations:**
- Cancellation requires JWT + ownership verification.
- No refunds automated — admin handles via Razorpay Dashboard.

**Tests:**
- Unit test for cancellation flow.
- Integration test for subscription lifecycle (active → cancelled → expired).

**Dependencies:**
- Phase 2 complete (subscription exists).

**Risks:**
- Low risk — management features are additive.

**Expected output:**
- Profile page shows current subscription status, plan name, next billing date.
- "Cancel Subscription" button with confirmation dialog.
- Billing history page shows all past payments with status and amounts.
- Cancelled subscription shows "expires on [date]" message.

**HARD APPROVAL CHECKPOINT:**
> [ ] Subscription status displays correctly.
> [ ] Cancellation flow works end-to-end.
> [ ] Billing history shows accurate payment records.
> [ ] Expired subscription correctly revokes access.

---

### Phase 5: Admin & Operational Tooling

**Objective:** Provide admin capabilities for managing plans, viewing subscriptions, and handling refunds. Start with Razorpay Dashboard, build custom UI if needed.

**Existing files/components involved:**
- `src/types/index.ts` — Will add admin role
- `src/components/common/ProtectedRoute.tsx` — Will support admin-only routes

**New files/components:**
- `src/pages/admin/PlansManager.tsx` — CRUD for plans
- `src/pages/admin/SubscriptionsList.tsx` — View all subscriptions
- `src/pages/admin/PaymentsList.tsx` — View all payments
- `src/components/admin/AdminRoute.tsx` — Admin-only route wrapper

**Database changes:**
```sql
-- Add 'admin' to UserRole enum (or text check)
-- Add RLS policies for admin access (service_role or admin role check)
```

**API changes:**
- Admin endpoints (service_role key, not client-accessible).

**Security considerations:**
- Admin access restricted to `role = 'admin'` in profiles.
- Admin operations use `service_role` key (server-side only).
- Audit logging for admin actions.

**Tests:**
- Unit tests for admin authorization.
- Integration tests for plan management.

**Dependencies:**
- Phase 2 complete.
- Admin role defined and assigned.

**Risks:**
- Medium risk — admin access is sensitive.
- Mitigation: Restrict admin role to trusted users only.

**Expected output:**
- Admin can create/edit/deactivate plans via custom UI (or Razorpay Dashboard).
- Admin can view all subscriptions and payments.
- Admin can process refunds via Razorpay Dashboard.
- Admin-only routes are protected.

**HARD APPROVAL CHECKPOINT:**
> [ ] Admin can manage plans.
> [ ] Admin can view subscription/payment data.
> [ ] Non-admin users cannot access admin routes.
> [ ] Admin actions are audited.

---

### Phase 6 (Future): EduLinkUp Marketplace Integration

**Objective:** Allow EduLinkUp to display and sell ClinIQ products through EduLinkUp's marketplace. ClinIQ's billing system is the source of truth for ClinIQ entitlements.

**Note:** This phase is OUT OF SCOPE for the current task. Documented here for architectural awareness only.

**Key considerations:**
- EduLinkUp calls ClinIQ's `create-checkout` Edge Function with EduLinkUp user identifier.
- ClinIQ creates the order and returns checkout details.
- EduLinkUp completes payment via EduLinkUp's Razorpay (or ClinIQ's — to be decided).
- Webhook confirms payment → ClinIQ grants entitlement.
- Cross-project user mapping: EduLinkUp user ID → ClinIQ user ID (via SSO or shared identifier).

**This phase will be detailed in a separate document after Phase 5 is complete.**

---

## Appendix A: File Tree — New & Modified Files

```
supabase/
  migrations/
    <timestamp>_add_billing_tables.sql    [NEW] — plans, subscriptions, payments tables
  functions/
    create-checkout/
      index.ts                            [NEW] — Edge Function
    handle-webhook/
      index.ts                            [NEW] — Edge Function
    verify-payment/
      index.ts                            [NEW] — Edge Function
    cancel-subscription/
      index.ts                            [NEW] — Edge Function
  schema.sql                              [MODIFY] — Add billing tables (or separate migration)

src/
  types/
    billing.ts                            [NEW] — Billing types
    index.ts                              [MODIFY] — Export billing types
  services/
    billingService.ts                     [NEW] — Razorpay + Edge Function calls
    subscriptionService.ts                [NEW] — Subscription queries
  context/
    SubscriptionContext.tsx               [NEW] — Subscription state provider
  hooks/
    useSubscription.ts                    [NEW] — Subscription hook
  pages/
    Checkout.tsx                          [NEW] — Checkout page
    SubscriptionSuccess.tsx               [NEW] — Payment success page
    SubscriptionFailed.tsx                [NEW] — Payment failure page
    BillingHistory.tsx                    [NEW] — Payment history page
    Pricing.tsx                           [MODIFY] — Fetch plans from DB
    Profile.tsx                           [MODIFY] — Add subscription management section
  components/
    common/
      SubscriptionGate.tsx                [NEW] — Feature gating component
    pricing/
      PlanCard.tsx                        [NEW] — Extracted plan card
      UpgradePrompt.tsx                   [NEW] — Upgrade CTA
    subscription/
      SubscriptionCard.tsx                [NEW] — Subscription status display
      CancellationDialog.tsx              [NEW] — Cancel confirmation
    admin/
      AdminRoute.tsx                      [NEW] — Admin route wrapper
      PlansManager.tsx                    [NEW] — Plan management
      SubscriptionsList.tsx               [NEW] — Subscription listing
      PaymentsList.tsx                    [NEW] — Payment listing
  pages/admin/
    PlansManager.tsx                      [NEW] — Admin plan management page
    SubscriptionsList.tsx                 [NEW] — Admin subscription listing page
    PaymentsList.tsx                      [NEW] — Admin payment listing page

.env.example                              [MODIFY] — Add VITE_RAZORPAY_KEY_ID
.env                                      [MODIFY] — Add Razorpay test/live keys
env.d.ts                                  [MODIFY] — Add Razorpay env type declarations
package.json                              [MODIFY] — Add @razorpay/razorpay-js (dev dependency for Edge Functions reference)
```

---

## Appendix B: Razorpay Configuration Checklist

- [ ] Razorpay account created and KYC completed
- [ ] Test mode keys generated (`rzp_test_xxx`)
- [ ] Live mode keys generated (`rzp_live_xxx`)
- [ ] Webhook URL configured: `https://<ref>.supabase.co/functions/v1/handle-webhook`
- [ ] Webhook events subscribed: `payment.captured`, `payment.failed`, `subscription.activated`, `subscription.charged`, `subscription.cancelled`, `subscription.halted`, `refund.created`
- [ ] Razorpay Plans created (if using subscription API): Plan A (one-time), Plan B (monthly ₹200)
- [ ] Edge Function environment variables set: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- [ ] Test mode verification: Complete a test checkout end-to-end

---

*Document created: 2026-09-11*  
*Status: Plan — Ready for stakeholder review and approval.*  
*Next step: Resolve Open Questions (Section 14), then begin Phase 1 implementation.*
