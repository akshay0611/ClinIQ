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
    const entitled = result?.entitlements?.["cliniq.access"]?.allowed === true;
    const admin = getAdminClient();

    if (entitled) {
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

    return jsonResponse({ entitled, source: entitled ? "edulinkup_premium" : null, synced: true });
  } catch (error) {
    console.error("[EDULINKUP_ACCESS]", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unable to sync EduLinkUp access" }, 400);
  }
});
