import { createClient, type SupabaseClient, type User } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export function getAdminClient(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server configuration");
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function getAuthenticatedUser(request: Request): Promise<User> {
  const authorization = request.headers.get("Authorization");
  const token = authorization?.replace(/^Bearer\s+/i, "");
  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!token || !url || !anonKey) {
    throw new Error("Authentication required");
  }

  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await client.auth.getUser(token);

  if (error || !data.user) {
    throw new Error("Authentication required");
  }

  return data.user;
}

export async function grantPlanEntitlements(
  admin: SupabaseClient,
  userId: string,
  planId: string,
  paymentId: string,
): Promise<string[]> {
  const { data: plan, error: planError } = await admin
    .from("plans")
    .select("features")
    .eq("id", planId)
    .single();

  if (planError || !plan) {
    throw new Error("Plan not found");
  }

  const features = Array.isArray(plan.features)
    ? plan.features.filter((feature): feature is string => typeof feature === "string" && feature.length > 0)
    : [];
  const rows = features.map((featureKey) => ({
    user_id: userId,
    feature_key: featureKey,
    source: "cliniq_purchase",
    payment_id: paymentId,
  }));

  if (rows.length > 0) {
    const { error } = await admin
      .from("entitlements")
      .upsert(rows, { onConflict: "user_id,feature_key", ignoreDuplicates: true });

    if (error) {
      throw new Error("Unable to grant ClinIQ entitlements");
    }
  }

  return features;
}
