import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getAdminClient, getAuthenticatedUser } from "../_shared/supabase.ts";

const defaultEntitlementsUrl = "https://edulinkup.dev/api/v1/auth/entitlements";

function getTokenSubject(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "="));
    const claims = JSON.parse(decoded) as { sub?: unknown };
    return typeof claims.sub === "string" ? claims.sub : null;
  } catch {
    return null;
  }
}

Deno.serve(async (request) => {
  const optionsResponse = handleOptions(request);
  if (optionsResponse) return optionsResponse;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const user = await getAuthenticatedUser(request);
    const body = await request.json();
    const providerToken = typeof body.provider_token === "string" ? body.provider_token : "";
    if (!providerToken) return jsonResponse({ entitled: false, synced: false, reason: "provider_token_unavailable" });

    const providerSubject = getTokenSubject(providerToken);
    const providerIdentity = user.identities?.find((identity) => identity.provider === "custom:edulinkup");
    const identitySubject = providerIdentity?.identity_data?.sub || providerIdentity?.identity_id;
    if (!providerSubject || !identitySubject || providerSubject !== identitySubject) {
      return jsonResponse({ entitled: false, synced: false, reason: "identity_binding_failed" }, 403);
    }

    const response = await fetch(Deno.env.get("EDULINKUP_ENTITLEMENTS_URL") || defaultEntitlementsUrl, {
      headers: { Authorization: `Bearer ${providerToken}` },
    });
    if (!response.ok) {
      const providerBody = await response.text();
      let providerMessage = "EduLinkUp entitlement verification failed";
      try {
        const parsed = JSON.parse(providerBody) as { message?: unknown };
        if (typeof parsed.message === "string") providerMessage = parsed.message;
      } catch {
        // Keep provider response details out of the client if it is not JSON.
      }
      return jsonResponse({
        entitled: false,
        synced: false,
        reason: "edulinkup_api_rejected",
        provider_status: response.status,
        message: providerMessage,
      });
    }

    const result = await response.json();
    console.log("[EDULINKUP_ENTITLEMENTS]", JSON.stringify(result));
    const premiumEntitled = result?.entitlements?.["cliniq.access"]?.allowed === true;
    const marketplaceEntitled = result?.entitlements?.["cliniq.plan_a_marketplace"]?.allowed === true;
    const planBMarketplaceEntitled = result?.entitlements?.["cliniq.plan_b_marketplace"]?.allowed === true;
    const admin = getAdminClient();

    // Sync premium access (cliniq.access → cliniq_access)
    if (premiumEntitled) {
      const { error } = await admin.from("entitlements").upsert(
        {
          user_id: user.id,
          feature_key: "cliniq_access",
          source: "edulinkup_premium",
          payment_id: null,
        },
        { onConflict: "user_id,feature_key", ignoreDuplicates: true },
      );
      if (error) throw new Error("Unable to cache EduLinkUp access");
    } else {
      const { error } = await admin
        .from("entitlements")
        .delete()
        .eq("user_id", user.id)
        .eq("source", "edulinkup_premium");
      if (error) throw new Error("Unable to clear EduLinkUp access cache");
    }

    // Sync marketplace access based on which plan was purchased.
    // cliniq.plan_a_marketplace → Plan A features (₹100)
    // cliniq.plan_b_marketplace → Plan B features (₹200)
    const PLAN_A_FEATURES = [
      "marketplace_access",
      "basic_symptom_checker",
      "hospital_finder",
      "health_blog",
      "email_support",
    ];
    const PLAN_B_FEATURES = [
      "marketplace_access",
      "basic_symptom_checker",
      "hospital_finder",
      "health_blog",
      "email_support",
      "advanced_symptom_analysis",
      "priority_appointments",
      "full_drug_database",
      "medical_dictionary",
      "priority_support",
    ];

    // Clear any existing marketplace-sourced entitlements first, then grant the correct plan.
    const { error: clearError } = await admin
      .from("entitlements")
      .delete()
      .eq("user_id", user.id)
      .eq("source", "edulinkup_marketplace");
    if (clearError) throw new Error("Unable to clear EduLinkUp marketplace access cache");

    // Plan B takes precedence over Plan A if user has both.
    if (planBMarketplaceEntitled) {
      const rows = PLAN_B_FEATURES.map((featureKey) => ({
        user_id: user.id,
        feature_key: featureKey,
        source: "edulinkup_marketplace",
        payment_id: null,
      }));
      const { error } = await admin.from("entitlements").upsert(
        rows,
        { onConflict: "user_id,feature_key", ignoreDuplicates: true },
      );
      if (error) throw new Error("Unable to cache EduLinkUp Plan B marketplace access");
    } else if (marketplaceEntitled) {
      const rows = PLAN_A_FEATURES.map((featureKey) => ({
        user_id: user.id,
        feature_key: featureKey,
        source: "edulinkup_marketplace",
        payment_id: null,
      }));
      const { error } = await admin.from("entitlements").upsert(
        rows,
        { onConflict: "user_id,feature_key", ignoreDuplicates: true },
      );
      if (error) throw new Error("Unable to cache EduLinkUp Plan A marketplace access");
    }

    const entitled = premiumEntitled || marketplaceEntitled || planBMarketplaceEntitled;
    const source = premiumEntitled ? "edulinkup_premium" : planBMarketplaceEntitled ? "edulinkup_marketplace" : marketplaceEntitled ? "edulinkup_marketplace" : null;
    return jsonResponse({ entitled, source, synced: true });
  } catch (error) {
    console.error("[EDULINKUP_ACCESS]", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unable to sync EduLinkUp access" }, 400);
  }
});
