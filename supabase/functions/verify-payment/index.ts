import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { hmacSha256Hex, requiredSecret, signaturesMatch } from "../_shared/razorpay.ts";
import { getAdminClient, getAuthenticatedUser, grantPlanEntitlements } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const optionsResponse = handleOptions(request);
  if (optionsResponse) return optionsResponse;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const user = await getAuthenticatedUser(request);
    const body = await request.json();
    const orderId = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
    const paymentId = typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
    const signature = typeof body.razorpay_signature === "string" ? body.razorpay_signature : "";
    if (!orderId || !paymentId || !signature) return jsonResponse({ error: "Payment details are required" }, 400);

    const admin = getAdminClient();
    const { data: payment, error: paymentError } = await admin
      .from("payments")
      .select("id, user_id, plan_id, amount_paise, currency, status, razorpay_order_id, razorpay_payment_id")
      .eq("razorpay_order_id", orderId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (paymentError || !payment) return jsonResponse({ error: "Payment record not found" }, 404);

    const { data: plan, error: planError } = await admin
      .from("plans")
      .select("price_paise, currency")
      .eq("id", payment.plan_id)
      .single();
    if (planError || !plan || payment.amount_paise !== plan.price_paise || payment.currency !== plan.currency) {
      return jsonResponse({ error: "Payment amount does not match the plan" }, 400);
    }

    const expectedSignature = await hmacSha256Hex(`${orderId}|${paymentId}`, requiredSecret("RAZORPAY_KEY_SECRET"));
    if (!signaturesMatch(expectedSignature, signature)) return jsonResponse({ error: "Invalid payment signature" }, 400);

    const { data: existingPayment } = await admin
      .from("payments")
      .select("id")
      .eq("razorpay_payment_id", paymentId)
      .maybeSingle();
    if (existingPayment && existingPayment.id !== payment.id) return jsonResponse({ error: "Payment already linked" }, 409);

    const { error: updateError } = await admin
      .from("payments")
      .update({ razorpay_payment_id: paymentId, status: "captured" })
      .eq("id", payment.id);
    if (updateError) return jsonResponse({ error: "Unable to capture payment" }, 500);

    const features = await grantPlanEntitlements(admin, user.id, payment.plan_id, payment.id);
    return jsonResponse({ status: "captured", entitlements: features });
  } catch (error) {
    console.error("[CLINIQ_VERIFY]", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unable to verify payment" }, 400);
  }
});
