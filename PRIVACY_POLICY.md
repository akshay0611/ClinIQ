# ClinIQ Privacy Policy

> **Last updated:** June 2026

ClinIQ is an AI-powered health information platform. This document explains how we collect, use, and protect the data you share while using ClinIQ — in particular the data you enter into the Symptom Checker and AI Chat features.

---

## 1. What Data We Collect

### Symptom Checker & AI Chat
- The text you type describing your symptoms or health questions.
- AI-generated responses returned to you.

### Account & Profile Data
- Name, email address, and any profile details you provide during sign-up.
- Appointment booking records if you use the doctor-booking feature.

### Usage & Analytics
- Pages visited, feature interactions, and error logs (no health content is included here).

---

## 2. How We Use Your Data

| Purpose | Data Used |
|---|---|
| Generate AI symptom insights | Symptom text (sent to Gemini API at runtime) |
| Display your session history | Stored locally in your browser via `localStorage` |
| Account authentication | Email & hashed password via Supabase Auth |
| Improve the platform | Anonymised aggregated usage analytics |

**We do not sell your health data to third parties.**

---

## 3. AI Processing & Disclaimer

The Symptom Checker and Chat features are powered by **Google Gemini AI**. Your inputs are transmitted to Google's API to generate responses. Please review [Google's AI data usage policies](https://ai.google.dev/gemini-api/terms) for details on how Gemini processes data.

> ⚠️ **ClinIQ is not a medical device.** AI outputs are for informational purposes only and are not a substitute for professional medical diagnosis, advice, or treatment. Always consult a qualified healthcare provider.

---

## 4. Data Storage & Retention

- **Symptom history** is stored in your browser's `localStorage` only — it never leaves your device unless you explicitly export it.
- **Account data** is stored in Supabase (PostgreSQL) with row-level security policies enforced.
- You can delete your session data at any time using the **"Clear Conversation"** button in the Symptom Checker.
- Account deletion requests can be sent to the contact address below; we will process them within 30 days.

---

## 5. Data Security

- All data in transit is encrypted via HTTPS/TLS.
- Supabase enforces Row Level Security (RLS) so users can only access their own records.
- We do not log symptom text in plaintext server logs.

---

## 6. Your Rights

Under applicable law (including India's Digital Personal Data Protection Act, 2023) you have the right to:

- **Access** the personal data we hold about you.
- **Correct** inaccurate data.
- **Erase** your data (right to be forgotten).
- **Withdraw consent** at any time by deleting your account.

---

## 7. Cookies

ClinIQ uses minimal cookies for authentication session management only. We do not use advertising or tracking cookies.

---

## 8. Changes to This Policy

We will post updates to this file and notify registered users via email when material changes are made.

---

## 9. Contact

For privacy concerns or data deletion requests:

**Email:** teamcodexsupport@gmail.com  
*(Please use subject line: "Privacy Request – ClinIQ")*

**Project:** [github.com/akshay0611/ClinIQ](https://github.com/akshay0611/ClinIQ)
