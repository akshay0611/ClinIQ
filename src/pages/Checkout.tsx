import React, { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, LockKeyhole } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEntitlements } from "../context/EntitlementContext";
import { supabase } from "../services/supabaseClient";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

const plans = {
  plan_a: {
    name: "ClinIQ Plan A",
    price: 100,
    description: "Basic healthcare access",
    features: [
      "Basic symptom checking",
      "Find nearby hospitals",
      "Access health blog",
      "Email support",
    ],
  },
  plan_b: {
    name: "ClinIQ Plan B",
    price: 200,
    description: "Advanced medical features",
    features: [
      "Advanced symptom analysis",
      "Priority doctor appointments",
      "Full drug database access",
      "Medical dictionary access",
      "Priority support",
    ],
  },
} as const;

const Checkout: React.FC = () => {
  const { planSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { refreshEntitlements } = useEntitlements();
  const [planId, setPlanId] = useState<string | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const plan = planSlug ? plans[planSlug as keyof typeof plans] : undefined;

  useEffect(() => {
    if (!planSlug || !plan) {
      setIsLoadingPlan(false);
      return;
    }

    const loadPlan = async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("id")
        .eq("slug", planSlug)
        .eq("is_active", true)
        .maybeSingle();
      if (error || !data) {
        toast.error("This plan is not currently available.");
      } else {
        setPlanId(data.id);
      }
      setIsLoadingPlan(false);
    };

    void loadPlan();
  }, [planSlug, plan]);

  const loadRazorpay = async () => {
    if (window.Razorpay) return;
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Unable to load Razorpay Checkout"));
      document.body.appendChild(script);
    });
  };

  const startCheckout = async () => {
    if (!currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!planId || !plan) return;

    setStatus("processing");
    try {
      const { data, error } = await supabase.functions.invoke<{
        order_id: string;
        amount_paise: number;
        currency: string;
        key_id: string;
      }>("create-checkout", { body: { plan_id: planId } });
      if (error || !data) throw new Error(error?.message || "Unable to create checkout");

      await loadRazorpay();
      if (!window.Razorpay) throw new Error("Razorpay Checkout is unavailable");

      const razorpay = new window.Razorpay({
        key: data.key_id,
        amount: data.amount_paise,
        currency: data.currency,
        name: "ClinIQ",
        description: plan.description,
        order_id: data.order_id,
        handler: async (response) => {
          const { error: verifyError } = await supabase.functions.invoke("verify-payment", {
            body: response,
          });
          if (verifyError) {
            setStatus("failed");
            toast.error("Payment verification failed. Please contact support.");
            return;
          }
          await refreshEntitlements();
          setStatus("success");
          toast.success("Payment successful. ClinIQ access is now active.");
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
      razorpay.open();
    } catch (error) {
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "Unable to start payment");
    }
  };

  if (!plan) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-20 dark:bg-neutral-900">
        <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-700 dark:bg-neutral-800">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Plan not found
          </h1>
          <Link
            to="/pricing"
            className="mt-6 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft size={16} />
            Back to pricing
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-16 dark:bg-neutral-900 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/pricing"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to pricing
        </Link>

        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
          <section>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              ClinIQ purchase
            </p>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Complete your purchase
            </h1>
            <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
              Pay securely through ClinIQ's Razorpay Test Mode account.
            </p>

            <div className="mt-10 space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-neutral-700 dark:text-neutral-200">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{plan.name}</h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{plan.description}</p>
              </div>
              <LockKeyhole size={20} className="text-neutral-400" />
            </div>

            <div className="mt-8 border-y border-neutral-200 py-5 dark:border-neutral-700">
              <span className="text-4xl font-bold text-neutral-900 dark:text-white">₹{plan.price}</span>
              <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">one-time</span>
            </div>

            <button
              type="button"
              onClick={() => void startCheckout()}
              disabled={isLoadingPlan || !planId || status === "processing"}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-400"
            >
              {status === "processing"
                ? "Opening secure checkout..."
                : currentUser
                  ? "Pay securely with Razorpay"
                  : "Sign in to purchase"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-center text-sm font-medium text-emerald-600">
                Purchase captured. Your ClinIQ features are available now.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
