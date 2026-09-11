const encoder = new TextEncoder();

export function requiredSecret(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export async function hmacSha256Hex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function signaturesMatch(expected: string, received: string): boolean {
  if (expected.length !== received.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ received.charCodeAt(index);
  }
  return difference === 0;
}

export async function createRazorpayOrder(input: {
  amount: number;
  currency: string;
  receipt: string;
  notes: Record<string, string>;
}): Promise<{ id: string }> {
  const keyId = requiredSecret("RAZORPAY_KEY_ID");
  const keySecret = requiredSecret("RAZORPAY_KEY_SECRET");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    }),
  });

  const responseBody = await response.text();
  if (!response.ok) {
    let errorCode = `HTTP_${response.status}`;
    let errorDescription = "";
    try {
      const errorBody = JSON.parse(responseBody);
      if (typeof errorBody?.error?.code === "string") errorCode = errorBody.error.code;
      if (typeof errorBody?.error?.description === "string") errorDescription = errorBody.error.description;
    } catch {
      console.error("[RAZORPAY_ORDER] Non-JSON error response", responseBody);
    }
    console.error("[RAZORPAY_ORDER] Provider rejected order", response.status, responseBody);
    throw new Error(`Razorpay order creation failed (${errorCode})${errorDescription ? `: ${errorDescription}` : ""}`);
  }

  const order = JSON.parse(responseBody);
  if (typeof order.id !== "string") {
    throw new Error("Razorpay returned an invalid order");
  }
  return { id: order.id };
}
