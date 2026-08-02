# 🏗️ ClinIQ System Architecture

Welcome to the **ClinIQ** System Architecture documentation. This document provides a comprehensive, high-level technical overview of ClinIQ's design, technology stack, directory structure, data flows, database schema, security mechanisms, and integration patterns. It is designed to help new contributors quickly understand how the application operates end-to-end.

---

## 📌 Executive Summary & Problem Solved

**ClinIQ** is an open-source, full-stack healthtech platform built to bridge the gap between patient symptoms and professional medical care. 

### Core Healthcare Problems Solved:
1. **Preliminary Triage & Symptom Understanding**: Patients often experience anxiety or delays in seeking medical attention due to a lack of immediate, accessible symptom insights. ClinIQ uses **Google's Gemini 2.0 Flash AI model** to deliver structured, multi-lingual preliminary analyses (urgency classification, potential conditions, dietary advice, and medication safety warnings).
2. **Doctor Discovery & Consultation Scheduling**: Simplifies finding verified medical specialists filtered by area of expertise, experience, consultation fees, and real-time availability.
3. **Role-Based Medical Data Management**: Provides distinct, secure portals for **Patients** (medical history, active prescriptions, appointments) and **Doctors** (schedule management, patient consultation history) powered by **Supabase (PostgreSQL) with Row Level Security (RLS)**.
4. **Medical Knowledge Accessibility**: Integrates educational tools such as a Drug Database, Medical Dictionary, First Aid Guides, Medical Research Papers, and PIN code-based Hospital Locator.

---

## 📐 High-Level Architecture Diagram

ClinIQ follows a modern **JAMstack (JavaScript, API, Markup)** architecture with a decoupled React single-page frontend, a managed Supabase backend, and external AI service integrations.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CLIENT LAYER                                        │
│  React 18 + TypeScript + Tailwind CSS + Framer Motion (Vite-bundled SPA)               │
│  - React Router v6 (Route-based Code Splitting)                                        │
│  - Context API (AuthContext, ThemeContext)                                             │
│  - i18next (Multi-language Support: EN, ES, HI)                                        │
└─────────────────────────────────────────┬──────────────────────────────────────────────┘
                                          │
                                          │ HTTP / HTTPS
                         ┌────────────────┼────────────────┬────────────────┐
                         ▼                ▼                ▼                ▼
                 ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
                 │   Supabase   │ │  Google AI   │ │ Browser Local│ │  Vercel CDN  │
                 │   Backend    │ │ (Gemini API) │ │   Storage    │ │   Hosting    │
                 └──────┬───────┘ └──────────────┘ └──────────────┘ └──────────────┘
                        │
                        ├─── Auth (JWT + Row Level Security)
                        ├─── PostgreSQL Database (`profiles`, `doctor_profiles`)
                        └─── RESTful API Auto-generated Endpoints
```

---

## 🛠️ Technology Stack Breakdown

| Layer | Technology | Purpose & Usage |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | Functional UI components, hooks, and Virtual DOM rendering. |
| **Type Safety** | **TypeScript 5** | Strict interfaces, type definitions for medical data and API payloads. |
| **Build Tool & Bundler**| **Vite 5** | Fast HMR (Hot Module Replacement), optimized ESbuild production bundles. |
| **Styling & UI** | **Tailwind CSS + Framer Motion** | Utility-first styling, dark/light theme tokens, and smooth micro-animations. |
| **State Management** | **React Context API** | Global auth session state (`AuthContext`) and theme state (`ThemeContext`). |
| **Routing** | **React Router v6** | Client-side routing, protected route guards (`ProtectedRoute.tsx`), dynamic lazy loading. |
| **Internationalization**| **i18next + react-i18next** | Dynamic translation for English (`en`), Spanish (`es`), and Hindi (`hi`). |
| **Backend & Database** | **Supabase (PostgreSQL)** | Managed PostgreSQL database, JWT authentication, auto-generated REST API, and RLS. |
| **AI Integration** | **Google Gemini API (`gemini-2.0-flash`)** | Natural language symptom interpretation, structured JSON extraction, and severity scoring. |
| **PDF & Export** | **jsPDF + jsPDF-AutoTable** | Dynamic generation of downloadable PDF medical reports and summaries. |
| **Testing** | **Vitest + Testing Library** | Unit and integration testing for service layers (`PDFExportService`, `LocalStorageService`). |

---

## 📂 Directory & Module Structure

```
ClinIQ/
├── .github/                  # GitHub Actions CI/CD workflows and issue templates
├── public/                   # Static media assets, icons, and Readme banners
├── scripts/                  # Helper scripts for development or deployment tasks
├── supabase/                 # Supabase configuration & database migrations
│   ├── migrations/           # Versioned SQL migration scripts
│   └── schema.sql            # Canonical database table schemas and RLS policies
├── src/                      # Source application code
│   ├── components/           # Reusable UI components grouped by feature area
│   │   ├── appointment/      # Booking modals, date pickers, time slot selectors
│   │   ├── common/           # Navbars, footers, loaders, protected route guards
│   │   ├── dictionary/       # Medical terminology lookup cards
│   │   ├── doctors/          # Doctor cards, search filters, detail modals
│   │   ├── drugs/            # Drug search, dosage guides, interaction warnings
│   │   ├── home/             # Hero banner, feature grids, testimonial sliders
│   │   ├── layout/           # Global page wrappers and container layouts
│   │   ├── profile/          # User and doctor profile edit forms
│   │   └── symptom-checker/  # Interactive symptom input form, results, export controls
│   ├── context/              # Global React Context providers
│   │   ├── AuthContext.tsx   # Supabase auth listener, user session, profile hydration
│   │   └── ThemeContext.tsx  # Light/dark mode toggle and persistence
│   ├── lib/                  # Shared helper libraries
│   ├── pages/                # Page-level route views (Lazy-loaded via React.lazy)
│   │   ├── Home.tsx          # Landing page
│   │   ├── SymptomChecker.tsx# AI diagnosis interface
│   │   ├── Doctors.tsx       # Specialist directory & search
│   │   ├── DoctorProfilePage.tsx # Individual doctor detail view
│   │   ├── Appointment.tsx   # Appointment booking screen
│   │   ├── Profile.tsx       # Patient/Doctor dashboard & settings
│   │   ├── Hospitals.tsx     # PIN code hospital locator
│   │   ├── MedicalDictionary.tsx # Medical reference library
│   │   ├── DrugDatabase.tsx  # Pharmaceutical reference
│   │   └── ...               # Additional content & legal pages (FAQ, Contact, Privacy)
│   ├── services/             # Core business logic & external API service integration
│   │   ├── supabaseClient.ts # Initialized Supabase JS client singleton
│   │   ├── GeminiSymptomService.ts # Gemini API prompt builder, API client & parser
│   │   ├── AppointmentValidationService.ts # Scheduling slot conflict & rule validation
│   │   ├── LocalStorageService.ts  # Fallback client storage persistence
│   │   ├── PDFExportService.ts    # jsPDF report generation logic
│   │   └── mockData.ts       # Fallback mock dataset when API credentials are absent
│   ├── types/                # Centralized TypeScript interface & type definitions
│   │   └── index.ts          # Doctor, Profile, SymptomResult, Appointment contracts
│   ├── utils/                # Pure utility functions (formatting, date helpers)
│   ├── App.tsx               # Root app router, route definitions, Toast container
│   ├── main.tsx              # Application entry point & DOM mount
│   └── i18n.ts               # Multi-language configuration setup
├── ARCHITECTURE.md           # System architecture documentation (this file)
├── CONTRIBUTING.md           # Contributor code of conduct & git workflow
├── package.json              # Dependencies and npm scripts (`dev`, `build`, `test`)
├── SETUP.md                  # Step-by-step local development setup guide
├── tailwind.config.js        # Tailwind design tokens, colors, dark mode strategy
└── vite.config.ts            # Vite bundler options & Vitest test runner configuration
```

---

## 🔄 Core Data Flows

### 1. Authentication & Session Flow
```
[ User Action: Login / Signup ]
           │
           ▼
[ Supabase Auth (Email / Password) ] ────► Returns JWT & Session
           │
           ▼
[ AuthContext Global Provider ] ──────────► Hydrates User & Fetches `profiles` Data
           │
           ▼
[ ProtectedRoute Component ] ────────────► Controls Access to Protected Views (/appointment, /profile)
```
- User credentials are sent to Supabase Auth (`supabase.auth.signInWithPassword` / `signUp`).
- Upon verification, a JWT token is stored in client memory/local storage.
- `AuthContext` listens to `onAuthStateChange` events, fetching the user's role (`patient` or `doctor`) from the `profiles` table.
- Row Level Security (RLS) policies enforce that users can only read/update their corresponding database rows.

---

### 2. AI Symptom Analysis Flow
```
[ Patient Inputs Symptoms ] ──► [ SymptomChecker Page ]
                                         │
                                         ▼
                             [ GeminiSymptomService ]
                                         │ Formats Prompt with i18n Language Target
                                         ▼
                            [ Google Gemini 2.0 Flash API ]
                                         │ Returns Structured JSON Text Response
                                         ▼
                             [ JSON Parser & Regex Matcher ]
                                         │
                                         ▼
                       [ Urgency Normalization & Validation ]
                        - Normalizes (low, medium, high, emergency)
                        - Maps severity score (1 to 4)
                        - Validates mandatory fields (conditions, diet, meds)
                                         │
                                         ▼
                           [ UI Renders Diagnostic Card ]
                                         │
                                         ▼
                        [ Optional PDF Export via jsPDF ]
```
- **Prompt Engineering**: `GeminiSymptomService` dynamically constructs a prompt specifying JSON structure constraints and the target user language (`en`, `es`, or `hi`).
- **Resilient Parsing**: Regex matching isolates JSON payloads from raw LLM responses.
- **Urgency Safety Guarantee**: Known urgency synonyms (`urgent`, `critical`) are mapped to canonical levels. Unrecognized levels trigger explicit fallback errors rather than silently downgrading severity.
- **Graceful Fallback**: If `VITE_GEMINI_API_KEY` is not present, the app gracefully falls back to mock symptom results defined in `mockData.ts`.

---

### 3. Doctor Discovery & Appointment Booking Flow
```
[ Patient Searches Doctors ] ──► Queries Supabase (`profiles` JOIN `doctor_profiles`)
                                             │
                                             ▼
                                [ Displays Doctor Cards ]
                                             │
                                             ▼
                            [ Selects Doctor & Consultation Time ]
                                             │
                                             ▼
                       [ AppointmentValidationService Validation ]
                       - Validates clinic business hours
                       - Prevents double-booking conflicts
                                             │
                                             ▼
                          [ Persists Booking / Local State ]
```

---

## 🗄️ Database Schema & Security Architecture

The database is built on PostgreSQL via Supabase, employing a relational model with primary/foreign keys and **Row Level Security (RLS)**.

```
       ┌────────────────────────┐
       │      auth.users        │ (Supabase Internal Auth)
       └───────────┬────────────┘
                   │ 1 : 1
                   ▼ (Foreign Key: id)
       ┌────────────────────────┐
       │    public.profiles     │ (User profile metadata: role, blood type, allergies)
       └───────────┬────────────┘
                   │ 1 : 1 (Optional, if role == 'doctor')
                   ▼ (Foreign Key: profile_id)
       ┌────────────────────────┐
       │ public.doctor_profiles │ (Doctor metadata: specialization, fee, schedule)
       └────────────────────────┘
```

### Table Definitions

#### 1. `public.profiles`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, FK -> `auth.users.id` | Unique ID referencing auth user |
| `full_name` | `text` | Nullable | User's full display name |
| `date_of_birth` | `date` | Nullable | Date of birth |
| `gender` | `text` | Nullable | Gender identity |
| `blood_type` | `text` | Nullable | Blood group (e.g., A+, O-) |
| `allergies` | `text[]` | Nullable | Array of known medical allergies |
| `current_medications` | `text[]` | Nullable | Array of ongoing medications |
| `emergency_contact_name` | `text` | Nullable | Emergency contact person |
| `emergency_contact_phone` | `text` | Nullable | Emergency contact phone |
| `role` | `text` | Default `'patient'` | Role discriminator (`patient` / `doctor`) |
| `updated_at` | `timestamptz` | Default `now()` | Auto-updated via trigger |

#### 2. `public.doctor_profiles`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `profile_id` | `uuid` | Primary Key, FK -> `public.profiles.id` | Reference to parent profile |
| `specialization` | `text` | Nullable | Medical field (e.g., Cardiology, Neurology) |
| `qualifications` | `text[]` | Nullable | Medical degrees / certifications |
| `experience_years` | `integer` | Default `0` | Years of clinical practice |
| `consultation_fee` | `numeric` | Default `0` | Consultation fee amount |
| `availability_schedule`| `jsonb` | Default `'[]'::jsonb` | Weekly available slots |
| `clinic_address` | `text` | Nullable | Address of clinic/hospital |
| `about` | `text` | Nullable | Biography & clinical background |

### Database Triggers & Security Policies
- **Auto-Update Trigger**: `handle_updated_at()` automatically refreshes `updated_at` timestamps on row updates.
- **Row Level Security (RLS)**:
  - `public.profiles`: Viewable by everyone (`SELECT true`); editable only by row owner (`auth.uid() = id`).
  - `public.doctor_profiles`: Viewable by everyone (`SELECT true`); editable only by doctor profile owner (`auth.uid() = profile_id`).

---

## ⚡ Performance & Security Best Practices

1. **Route-based Code Splitting**: All major pages in `src/App.tsx` use `React.lazy()` and `<Suspense>`, delivering minimal initial JS bundles and fast First Contentful Paint (FCP).
2. **Environment Variable Protection**: Client-side secrets are prefixed with `VITE_` and validated at startup in `supabaseClient.ts`. Missing keys gracefully fall back without breaking the app build.
3. **Optimistic & Defensive State Handling**: Input debouncing on search boxes, strict type validation on API responses, and centralized toast notifications for user feedback.

---

## 👥 Onboarding Checklist for Developers

When adding new features to ClinIQ:
1. **Adding a New Component**: Place feature components under `src/components/<feature-name>/`.
2. **Adding a New Page/Route**: Create the view in `src/pages/<PageName>.tsx`, wrap import with `React.lazy()` in `App.tsx`, and add a `<Route>` inside `<Routes>`.
3. **Updating Database Schema**: Add migration files inside `supabase/migrations/` and mirror updates in `supabase/schema.sql` and `src/types/index.ts`.
4. **Testing**: Run `npm run test` to execute Vitest suites and `npm run build` to confirm clean compilation before submitting PRs.

---
*Maintained by ClinIQ Open Source Core Team*
