import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getAuthenticatedUser } from "../_shared/supabase.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

Deno.serve(async (request) => {
  const optionsResponse = handleOptions(request);
  if (optionsResponse) return optionsResponse;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const user = await getAuthenticatedUser(request);
    const body = await request.json();
    const featureKey = typeof body.feature_key === "string" ? body.feature_key.trim() : "";
    if (!featureKey) return jsonResponse({ error: "feature_key is required" }, 400);

    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
    if (!url || !anonKey || !token) throw new Error("Supabase configuration is missing");

    const client = createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await client
      .from("entitlements")
      .select("source")
      .eq("user_id", user.id)
      .eq("feature_key", featureKey)
      .maybeSingle();
    if (error) throw new Error("Unable to check entitlement");

    return jsonResponse(data ? { entitled: true, source: data.source } : { entitled: false });
  } catch (error) {
    console.error("[CLINIQ_ENTITLEMENT]", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unable to check entitlement" }, 400);
  }
});
