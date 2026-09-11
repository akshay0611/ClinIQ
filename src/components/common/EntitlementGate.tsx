import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEntitlements } from "../../context/EntitlementContext";
import PageLoader from "./PageLoader";

interface EntitlementGateProps {
  featureKey: string;
  children: React.ReactNode;
}

const EntitlementGate: React.FC<EntitlementGateProps> = ({ featureKey, children }) => {
  const { currentUser } = useAuth();
  const { isLoading, hasEntitlement } = useEntitlements();

  if (isLoading) return <PageLoader />;
  if (currentUser && hasEntitlement(featureKey)) return <>{children}</>;

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-20 dark:bg-neutral-900">
      <section className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">ClinIQ access</p>
        <h1 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white">
          This feature is included with a ClinIQ plan
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          {currentUser ? "Choose a plan to unlock this feature." : "Sign in and choose a plan to unlock this feature."}
        </p>
        <Link
          to={currentUser ? "/pricing" : "/login"}
          className="mt-6 inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
        >
          {currentUser ? "View plans" : "Sign in"}
        </Link>
      </section>
    </main>
  );
};

export default EntitlementGate;
