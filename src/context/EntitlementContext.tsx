import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../services/supabaseClient";
import { syncEduLinkUpAccess } from "../services/edulinkupEntitlements";

interface Entitlement {
  feature_key: string;
  source: "cliniq_purchase" | "edulinkup_premium" | "edulinkup_marketplace";
  granted_at: string;
}

interface EntitlementContextValue {
  entitlements: Entitlement[];
  isLoading: boolean;
  activePlan: { slug: "plan_a" | "plan_b"; name: string } | null;
  hasClinIQAccess: boolean;
  accessSource: "cliniq_purchase" | "edulinkup_premium" | "edulinkup_marketplace" | null;
  refreshEntitlements: () => Promise<void>;
  hasEntitlement: (featureKey: string) => boolean;
}

const EntitlementContext = createContext<EntitlementContextValue | undefined>(undefined);

export const EntitlementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasEntitlement = (featureKey: string) => entitlements.some((entitlement) => entitlement.feature_key === featureKey);
  const activePlan = hasEntitlement("advanced_symptom_analysis")
    ? { slug: "plan_b" as const, name: "ClinIQ Plan B" }
    : hasEntitlement("basic_symptom_checker")
      ? { slug: "plan_a" as const, name: "ClinIQ Plan A" }
      : null;
  const hasClinIQAccess = Boolean(activePlan || hasEntitlement("cliniq_access") || hasEntitlement("marketplace_access"));
  const accessSource = hasEntitlement("cliniq_access")
    ? "edulinkup_premium" as const
    : hasEntitlement("marketplace_access")
      ? "edulinkup_marketplace" as const
      : activePlan
        ? "cliniq_purchase" as const
        : null;

  const refreshEntitlements = useCallback(async () => {
    if (!currentUser) {
      setEntitlements([]);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("entitlements")
      .select("feature_key, source, granted_at")
      .eq("user_id", currentUser.id);
    setIsLoading(false);

    if (error) {
      console.error("[ENTITLEMENTS] Failed to load entitlements:", error);
      return;
    }
    setEntitlements(data || []);
  }, [currentUser]);

  useEffect(() => {
    const syncAndRefresh = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.provider_token) {
        await syncEduLinkUpAccess(data.session);
      }
      await refreshEntitlements();
    };

    void syncAndRefresh();
  }, [currentUser?.id, refreshEntitlements]);

  return (
    <EntitlementContext.Provider
      value={{
        entitlements,
        isLoading,
        activePlan,
        hasClinIQAccess,
        accessSource,
        refreshEntitlements,
        hasEntitlement,
      }}
    >
      {children}
    </EntitlementContext.Provider>
  );
};

export const useEntitlements = () => {
  const context = useContext(EntitlementContext);
  if (!context) throw new Error("useEntitlements must be used within an EntitlementProvider");
  return context;
};
