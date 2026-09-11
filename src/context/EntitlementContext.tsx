import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../services/supabaseClient";

interface Entitlement {
  feature_key: string;
  source: "cliniq_purchase" | "edulinkup_premium";
  granted_at: string;
}

interface EntitlementContextValue {
  entitlements: Entitlement[];
  isLoading: boolean;
  refreshEntitlements: () => Promise<void>;
  hasEntitlement: (featureKey: string) => boolean;
}

const EntitlementContext = createContext<EntitlementContextValue | undefined>(undefined);

export const EntitlementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    void refreshEntitlements();
  }, [currentUser?.id, refreshEntitlements]);

  return (
    <EntitlementContext.Provider
      value={{
        entitlements,
        isLoading,
        refreshEntitlements,
        hasEntitlement: (featureKey) => entitlements.some((entitlement) => entitlement.feature_key === featureKey),
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
