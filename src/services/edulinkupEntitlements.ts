import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export async function syncEduLinkUpAccess(session: Session): Promise<void> {
  if (!session.provider_token) return;

  const { data, error } = await supabase.functions.invoke("sync-edulinkup-access", {
    body: { provider_token: session.provider_token },
  });
  if (error) {
    console.error("[EDULINKUP_ACCESS] Failed to sync Premium access:", error);
  } else if (data?.synced !== true) {
    console.warn("[EDULINKUP_ACCESS] Premium access was not synced:", data);
  }
}
