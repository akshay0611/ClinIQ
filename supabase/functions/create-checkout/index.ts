import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { createRazorpayOrder, requiredSecret } from "../_shared/razorpay.ts";
import { getAdminClient, getAuthenticatedUser } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const optionsResponse = handleOptions(request);
  if (optionsResponse) return optionsResponse;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const user = await getAuthenticatedUser(request);
    const body = await request.json();
    const planId = typeof body.plan_id === "string" ? body.plan_id : "";
    if (!planId) return jsonResponse({ error: "plan_id is required" }, 400);

    const admin = getAdminClient();
    const { data: plan, error: planError } = await admin
      .from("plans")
      .select("id, price_paise, currency")
      .eq("id", planId)
      .eq("is_active", true)
      .maybeSingle();

    if (planError || !plan) return jsonResponse({ error: "Active plan not found" }, 404);

    const { data: payment, error: paymentError } = await admin
      .from("payments")
      .insert({
        user_id: user.id,
        plan_id: plan.id,
        amount_paise: plan.price_paise,
        currency: plan.currency,
        status: "created",
      })
      .select("id")
      .single();

    if (paymentError || !payment) return jsonResponse({ error: "Unable to create payment" }, 500);

    try {
      const order = await createRazorpayOrder({
        amount: plan.price_paise,
        currency: plan.currency,
        receipt: `c_${payment.id.replaceAll("-", "")}`,
        notes: { payment_id: payment.id, user_id: user.id, plan_id: plan.id },
      });
      const { error: updateError } = await admin
        .from("payments")
        .update({ razorpay_order_id: order.id })
        .eq("id", payment.id);

      if (updateError) throw new Error("Unable to bind Razorpay order");

      return jsonResponse({
        order_id: order.id,
        amount_paise: plan.price_paise,
        currency: plan.currency,
        key_id: requiredSecret("RAZORPAY_KEY_ID"),
      });
    } catch (error) {
      await admin.from("payments").update({ status: "failed" }).eq("id", payment.id);
      throw error;
    }
  } catch (error) {
    console.error("[CLINIQ_CHECKOUT]", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unable to create checkout" }, 400);
  }
});
