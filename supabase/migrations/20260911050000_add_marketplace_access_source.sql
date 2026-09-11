-- Phase 5: Add edulinkup_marketplace as a valid entitlement source.

alter table public.entitlements
  drop constraint if exists entitlements_source_check;

alter table public.entitlements
  add constraint entitlements_source_check
  check (source in ('cliniq_purchase', 'edulinkup_premium', 'edulinkup_marketplace'));
