import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { hmacSha256Hex, requiredSecret, signaturesMatch } from "../_shared/razorpay.ts";
import { getAdminClient, grantPlanEntitlements } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const optionsResponse = handleOptions(request);
  if (optionsResponse) return optionsResponse;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const rawBody = await request.text();
    const receivedSignature = request.headers.get("X-Razorpay-Signature") || "";
    const expectedSignature = await hmacSha256Hex(rawBody, requiredSecret("RAZORPAY_WEBHOOK_SECRET"));
    if (!receivedSignature || !signaturesMatch(expectedSignature, receivedSignature)) {
      return jsonResponse({ error: "Invalid webhook signature" }, 400);
    }

    const event = JSON.parse(rawBody);
    if (event.event !== "payment.captured" && event.event !== "payment.failed") {
      return jsonResponse({ received: true });
    }

    const entity = event.payload?.payment?.entity;
    const paymentId = typeof entity?.id === "string" ? entity.id : "";
    const orderId = typeof entity?.order_id === "string" ? entity.order_id : "";
    if (!paymentId && !orderId) return jsonResponse({ received: true });

    const admin = getAdminClient();
    const paymentFields = "id, user_id, plan_id, amount_paise, currency, status, razorpay_payment_id";
    let { data: payment } = paymentId
      ? await admin.from("payments").select(paymentFields).eq("razorpay_payment_id", paymentId).maybeSingle()
      : { data: null };
    if (!payment && orderId) {
      const orderLookup = await admin.from("payments").select(paymentFields).eq("razorpay_order_id", orderId).maybeSingle();
      payment = orderLookup.data;
    }

    if (!payment) return jsonResponse({ received: true });

    if (event.event === "payment.failed") {
      if (payment.status !== "captured") {
        await admin.from("payments").update({ razorpay_payment_id: paymentId || payment.razorpay_payment_id, status: "failed" }).eq("id", payment.id);
      }
      return jsonResponse({ received: true });
    }

    const { data: plan } = await admin.from("plans").select("price_paise, currency").eq("id", payment.plan_id).single();
    if (!plan || entity.amount !== payment.amount_paise || entity.amount !== plan.price_paise || entity.currency !== plan.currency) {
      return jsonResponse({ error: "Webhook payment does not match the plan" }, 400);
    }

    const { error: updateError } = await admin
      .from("payments")
      .update({ razorpay_payment_id: paymentId || payment.razorpay_payment_id, status: "captured" })
      .eq("id", payment.id);
    if (updateError) return jsonResponse({ error: "Unable to capture webhook payment" }, 500);

    await grantPlanEntitlements(admin, payment.user_id, payment.plan_id, payment.id);
    return jsonResponse({ received: true });
  } catch (error) {
    console.error("[CLINIQ_WEBHOOK]", error);
    return jsonResponse({ error: "Unable to process webhook" }, 400);
  }
});
