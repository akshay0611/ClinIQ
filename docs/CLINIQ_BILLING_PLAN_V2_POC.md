# ClinIQ Billing & Subscription Architecture — V2 (POC)

> **This is a proof of concept for validating the separation between ClinIQ-owned payments and EduLinkUp-owned Premium entitlements. It is not the final production billing architecture.**

> **Status:** POC implementation baseline.  
> **Predecessor:** `CLINIQ_BILLING_PLAN.md` (V1) — original architecture plan, simplified aggressively for POC scope.

---

## 1. Architecture Summary

This POC proves two independent flows:

**FLOW A — ClinIQ Direct Purchase:**
A user purchases ClinIQ Plan A or Plan B through ClinIQ's own Razorpay account. After successful payment, ClinIQ grants the corresponding entitlement. This proves ClinIQ can independently sell its own products.

**FLOW B — EduLinkUp Premium → ClinIQ Access:**
A user who owns EduLinkUp Premium (which includes `cliniq.access`) authenticates to ClinIQ via EduLinkUp SSO. ClinIQ checks the user's EduLinkUp entitlements. If `cliniq.access = true`, ClinIQ grants access. This proves EduLinkUp Premium can unlock ClinIQ without ClinIQ processing any payment.

Both flows are fully independent. No secrets are shared between them.

---

## 2. Database Model

### 2.1 `plans` — Product Catalog

```sql
create table public.plans (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  price_paise   integer not null,
  currency      text not null default 'INR',
  features      jsonb not null default '[]'::jsonb,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger on_plan_update before update on public.plans
  for each row execute function handle_updated_at();

alter table public.plans enable row level security;
create policy "Plans are publicly readable"
  on public.plans for select using (is_active = true);
```

**Seed data:**

```sql
insert into public.plans (slug, name, description, price_paise, features) values
  ('plan_a', 'ClinIQ Plan A', 'Basic healthcare access', 10000,
   '["basic_symptom_checker", "hospital_finder", "health_blog", "email_support"]'::jsonb),
  ('plan_b', 'ClinIQ Plan B', 'Advanced medical features', 20000,
   '["basic_symptom_checker", "hospital_finder", "health_blog", "email_support",
     "advanced_symptom_analysis", "priority_appointments", "full_drug_database",
     "medical_dictionary", "priority_support"]'::jsonb);
```

### 2.2 `payments` — Purchase Records

Each row represents a one-time purchase attempt. Status progresses: `created` → `captured` or `failed`.

```sql
create table public.payments (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  plan_id               uuid not null references public.plans(id),
  razorpay_order_id     text,
  razorpay_payment_id   text unique,
  amount_paise          integer not null,
  currency              text not null default 'INR',
  status                text not null default 'created'
                        check (status in ('created', 'captured', 'failed')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create trigger on_payment_update before update on public.payments
  for each row execute function handle_updated_at();

create unique index idx_payments_user_plan_created
  on public.payments(user_id, plan_id, created_at);

alter table public.payments enable row level security;
create policy "Users read own payments"
  on public.payments for select
  using (auth.uid() = user_id);
```

**Why `razorpay_payment_id` is UNIQUE:** Prevents duplicate entitlement from duplicate webhook deliveries. If the same payment event arrives twice, the second INSERT fails on the unique constraint — no duplicate processing.

### 2.3 `entitlements` — Access Grants

Derived from successful payments. One row per (user, feature). The `source` field distinguishes ClinIQ purchases from EduLinkUp Premium access.

```sql
create table public.entitlements (
  user_id       uuid not null references auth.users(id) on delete cascade,
  feature_key   text not null,
  source        text not null default 'cliniq_purchase'
                check (source in ('cliniq_purchase', 'edulinkup_premium')),
  granted_at    timestamptz not null default now(),
  payment_id    uuid references public.payments(id),
  primary key (user_id, feature_key)
);

alter table public.entitlements enable row level security;
create policy "Users read own entitlements"
  on public.entitlements for select
  using (auth.uid() = user_id);
```

**Notes:**
- For ClinIQ purchases: `source = 'cliniq_purchase'`, `payment_id` references the payment.
- For EduLinkUp Premium: `source = 'edulinkup_premium'`, `payment_id` is NULL (EduLinkUp owns the payment record).
- Only `service_role` (Edge Functions) can INSERT/DELETE entitlements.

### 2.4 Entity Relationship

```
auth.users
    │
    ├──→ payments (1:N)
    │       │
    │       └──→ plans (N:1)
    │
    └──→ entitlements (1:N)
            │
            └──→ plans (via feature_key, not FK)
```

---

## 3. API / Edge Function Model

### 3.1 `create-checkout`

**Purpose:** Create a Razorpay order and return checkout details.

**Endpoint:** `POST /functions/v1/create-checkout`  
**Auth:** Supabase JWT (authenticated user).

**Request:**
```json
{ "plan_id": "uuid" }
```

**Logic:**
1. Validate `plan_id` exists and `is_active = true`.
2. Read `price_paise` from DB (not from client).
3. Create Razorpay order via Razorpay API.
4. Insert row into `payments` with `status = 'created'`.
5. Return `{ order_id, amount_paise, currency, key_id }`.

**Response:**
```json
{ "order_id": "order_xxx", "amount_paise": 10000, "currency": "INR", "key_id": "rzp_test_xxx" }
```

### 3.2 `verify-payment`

**Purpose:** Client calls this after Razorpay modal closes successfully.

**Endpoint:** `POST /functions/v1/verify-payment`  
**Auth:** Supabase JWT.

**Request:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "xxx"
}
```

**Logic:**
1. Verify HMAC signature: `HMAC-SHA256(order_id + "|" + payment_id, RAZORPAY_KEY_SECRET)`.
2. Update `payments` row: set `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, `status = 'captured'`.
3. Create `entitlements` rows from the plan's `features` JSON.
4. Return `{ status: 'captured', entitlements: [...] }`.

### 3.3 `handle-webhook`

**Purpose:** Receive Razorpay webhook events (authoritative async confirmation).

**Endpoint:** `POST /functions/v1/handle-webhook`  
**Auth:** Razorpay webhook signature verification.

**Events handled (POC):**
- `payment.captured` → Update `payments.status = 'captured'`. Create `entitlements` if not already created. Idempotent: skip if `status` already `'captured'`.
- `payment.failed` → Update `payments.status = 'failed'`.

**Logic:**
1. Verify `X-Razorpay-Signature` header using `RAZORPAY_WEBHOOK_SECRET`.
2. Parse event payload.
3. Find payment by `razorpay_payment_id`.
4. If payment not found, return 200 OK (ignore — may be for a different system).
5. If payment `status` already matches event intent, return 200 OK (idempotent).
6. Update payment status.
7. If `payment.captured`: create entitlements from plan features.
8. Return 200 OK.

**POC simplification:** No elaborate webhook processing framework. Basic idempotency via `razorpay_payment_id` UNIQUE and status check before update.

### 3.4 `check-entitlement`

**Purpose:** Check if the current user has a specific entitlement.

**Endpoint:** `POST /functions/v1/check-entitlement`  
**Auth:** Supabase JWT.

**Request:**
```json
{ "feature_key": "advanced_symptom_analysis" }
```

**Response:**
```json
{ "entitled": true, "source": "cliniq_purchase" }
```

**Logic:**
1. Query `entitlements` WHERE `user_id = auth.uid()` AND `feature_key = $1`.
2. Return `{ entitled: true/false, source: ... }`.

---

## 4. ClinIQ Payment Flow (Flow A)

```
User clicks "Get Started" on Plan A/B
    │
    ▼
Client calls create-checkout { plan_id }
    │
    ▼
Edge Function:
  1. Validates plan, reads price from DB
  2. Creates Razorpay order
  3. Inserts payment row (status: 'created')
  4. Returns { order_id, amount, key_id }
    │
    ▼
Client opens Razorpay Checkout Modal
  - User completes payment (UPI / Card / Netbanking)
    │
    ├── Success ──► Client calls verify-payment
    │                   │
    │                   ▼
    │               Edge Function:
    │                 1. Verifies HMAC signature
    │                 2. Updates payment → 'captured'
    │                 3. Creates entitlements from plan features
    │                 4. Returns entitlements
    │                   │
    │                   ▼
    │               Client refreshes entitlement state
    │               User sees success, has access
    │
    └── Failure ──► Client shows error
                    Webhook eventually sets payment → 'failed'
```

**Payment authority:** The client callback alone does NOT grant access. Entitlements are created by the server (verify-payment or webhook). The webhook is the authoritative async source. The verify-payment provides immediate UX.

---

## 5. EduLinkUp Premium → ClinIQ Access (Flow B)

```
User owns EduLinkUp Premium (includes cliniq.access)
    │
    ▼
User opens ClinIQ → "Login with EduLinkUp"
    │
    ▼
ClinIQ redirects to EduLinkUp OAuth
  (existing SSO implementation — see elu-build-sso-architecture.md)
    │
    ▼
EduLinkUp authenticates user → redirects back with auth code
    │
    ▼
ClinIQ Supabase exchanges code for tokens (PKCE)
  → Local ClinIQ session created
    │
    ▼
ClinIQ checks EduLinkUp entitlements
  → Looks for cliniq.access in EduLinkUp entitlement response
    │
    ├── cliniq.access = true
    │       │
    │       ▼
    │   ClinIQ grants access (creates entitlements with source = 'edulinkup_premium')
    │   User can use ClinIQ
    │
    └── cliniq.access = false (or missing)
            │
            ▼
        ClinIQ shows premium CTA / limited access
```

**What ClinIQ does NOT do in this flow:**
- Does NOT process any payment.
- Does NOT receive EduLinkUp Razorpay credentials.
- Does NOT create a fake ClinIQ purchase record.
- Does NOT become the source of truth for EduLinkUp Premium.

**What ClinIQ DOES:**
- Authenticates the user via EduLinkUp SSO (existing implementation).
- Checks EduLinkUp entitlements for `cliniq.access`.
- Grants ClinIQ access based on verified entitlement.

**EduLinkUp remains authoritative for:** identity, Premium entitlement, `cliniq.access`.  
**ClinIQ remains authoritative for:** its own Plan A/B purchases, its own ClinIQ entitlements.

---

## 6. Security Boundary

| Secret | Location | Client Access |
|--------|----------|---------------|
| `RAZORPAY_KEY_ID` | Edge Function env | Yes — returned to client for checkout modal |
| `RAZORPAY_KEY_SECRET` | Edge Function env | **Never** |
| `RAZORPAY_WEBHOOK_SECRET` | Edge Function env | **Never** |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Function env | **Never** |
| EduLinkUp secrets | EduLinkUp's own env | **Never in ClinIQ** |

**RLS enforcement:**
- `payments`: users can only SELECT their own rows.
- `entitlements`: users can only SELECT their own rows.
- `plans`: publicly readable (active plans only).
- Only `service_role` (Edge Functions) can INSERT/UPDATE on `payments` and `entitlements`.

**Client-side feature gating** is UX only. Server-side entitlement check via `check-entitlement` is the authoritative check for critical operations.

---

## 7. Three-Phase Implementation Plan

### Phase 1 — ClinIQ Billing Foundation

**Objective:** Database foundation, pricing page from DB, checkout page shell.

**Database:**
- Create `plans`, `payments`, `entitlements` tables via Supabase migration.
- RLS policies on all tables.
- Seed Plan A and Plan B.

**Client:**
- Update `Pricing.tsx` to read plans from DB (or keep hardcoded as fallback).
- Create `Checkout.tsx` page at `/checkout?plan=<plan_id>`.
- "Get Started" buttons navigate to checkout page.
- EduLinkUp Premium continues to link externally.

**Files:**
- `supabase/migrations/<timestamp>_add_billing_tables.sql`
- `src/types/billing.ts`
- `src/pages/Checkout.tsx`
- `src/pages/Pricing.tsx` (modify)

**No Edge Functions in this phase.**

**HARD CHECKPOINT:**
- [ ] Plans display correctly (from DB or hardcoded fallback).
- [ ] EduLinkUp Premium link works.
- [ ] Checkout page renders.
- [ ] RLS protects `payments` and `entitlements`.

---

### Phase 2 — ClinIQ Razorpay POC

**Objective:** Payment processing via Razorpay Test Mode. Complete checkout flow.

**Edge Functions:**
- `create-checkout` — Create Razorpay order.
- `verify-payment` — Verify signature, update payment, grant entitlements.
- `handle-webhook` — Process `payment.captured` and `payment.failed`.

**Client:**
- Razorpay SDK integration in `Checkout.tsx`.
- `SubscriptionContext` (or `EntitlementContext`) for caching entitlement state.
- Success/failure pages.
- Entitlement checks in feature pages.

**Database:**
- No schema changes beyond Phase 1.

**Security:**
- `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` in Edge Function env only.
- Webhook signature verification on every inbound webhook.
- `razorpay_payment_id` UNIQUE prevents duplicate entitlement.

**HARD CHECKPOINT:**
- [ ] Plan A checkout works end-to-end (Razorpay Test Mode).
- [ ] Plan B checkout works end-to-end (Razorpay Test Mode).
- [ ] Successful payment → entitlement granted.
- [ ] Failed payment → no entitlement.
- [ ] Duplicate webhook → no duplicate entitlement.
- [ ] Razorpay key_secret never reaches client.

---

### Phase 3 — EduLinkUp Premium → ClinIQ Access

**Objective:** Prove EduLinkUp Premium unlocks ClinIQ via SSO + entitlement check.

**Integration:**
- Reuse existing EduLinkUp SSO implementation (`elu-build-sso-architecture.md`).
- After SSO login, check EduLinkUp entitlements for `cliniq.access`.
- If present: create entitlements with `source = 'edulinkup_premium'`.
- Gate ClinIQ application access based on entitlement.

**Client:**
- EduLinkUp SSO login flow (existing).
- Entitlement check after login.
- Premium CTA for non-Premium users.

**No database changes. No new Edge Functions beyond Phase 2.**

**HARD CHECKPOINT:**
- [ ] EduLinkUp Premium user can authenticate to ClinIQ.
- [ ] ClinIQ checks `cliniq.access` entitlement.
- [ ] ClinIQ grants access when `cliniq.access = true`.
- [ ] Non-Premium EduLinkUp user sees premium CTA.
- [ ] ClinIQ does not need EduLinkUp Razorpay credentials.
- [ ] EduLinkUp does not need ClinIQ Razorpay credentials.

---

## 8. Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | ClinIQ Plan A can initiate a Razorpay Test Mode payment. |
| 2 | ClinIQ Plan B can initiate a Razorpay Test Mode payment. |
| 3 | ClinIQ payment is processed through ClinIQ's Razorpay account. |
| 4 | Successful ClinIQ payment results in ClinIQ entitlement. |
| 5 | Failed ClinIQ payment does not grant entitlement. |
| 6 | Duplicate payment/webhook processing does not create duplicate entitlement. |
| 7 | EduLinkUp Premium contains `cliniq.access`. |
| 8 | A user with `cliniq.access` can authenticate to ClinIQ using EduLinkUp SSO. |
| 9 | ClinIQ grants access based on verified `cliniq.access`. |
| 10 | A user without `cliniq.access` cannot unlock ClinIQ through EduLinkUp SSO alone. |
| 11 | ClinIQ does not need EduLinkUp Razorpay credentials. |
| 12 | EduLinkUp does not need ClinIQ Razorpay credentials. |
| 13 | ClinIQ billing and EduLinkUp Premium billing remain independent. |

---

## 9. Explicitly Out of Scope

The following are NOT implemented or designed in this POC:

1. Recurring payments / subscriptions.
2. Razorpay subscription API.
3. Monthly / annual renewal.
4. Cancellation / cancellation-pending states.
5. Subscription reactivation.
6. Past-due / grace periods.
7. Trials.
8. Refund automation.
9. Revenue sharing / marketplace settlement.
10. Razorpay Route / linked accounts.
11. Complex subscription state machines.
12. Production-grade reconciliation infrastructure.
13. Lease-based webhook workers.
14. Admin billing dashboard.
15. Complex audit/event infrastructure.
16. Billing analytics / tax engine / invoicing.
17. Multi-currency.
18. Enterprise-grade retry infrastructure.

These may be future work. This POC does not solve future problems.

---

## 10. Implementation Status

**V2 is the POC implementation baseline.**

This document replaces the original V1 architecture plan and all previous V2–V4.2 iterations. The architecture is simplified to prove two independent flows: ClinIQ direct purchase and EduLinkUp Premium → ClinIQ access.

The next action is **IMPLEMENTATION of the 3 POC phases**.

---

*Document version: V2 (POC)*  
*Created: 2026-09-11*  
*Status: POC implementation baseline. Ready for implementation.*  
*Replaces: `CLINIQ_BILLING_PLAN.md` (V1) and all V2–V4.2 iterations.*