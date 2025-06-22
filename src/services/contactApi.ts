// src/services/contactApi.ts
// Simulate sending contact form data to a backend API (for demo)

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactForm(payload: ContactFormPayload): Promise<{ success: boolean }> {
  // Simulate a network call (replace with real API call in production)
  await new Promise(res => setTimeout(res, 1200));
  // Always succeed for demo
  return { success: true };
}
