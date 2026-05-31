<div align="center">

# ClinIQ – AI-Powered Health Platform

### Intelligent Symptom Analysis & Doctor Discovery for Everyone

[![CI](https://img.shields.io/badge/CI-Passing-00e5ff?style=for-the-badge&logo=githubactions&logoColor=black)](https://github.com/aksh-g/ClinIQ/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Preview-Visit%20Site-00e5ff?style=for-the-badge&logo=vercel&logoColor=black)](https://cliniq-iota.vercel.app/)
[![Issues](https://img.shields.io/badge/Open%20Issues-Contribute-ff66c4?style=for-the-badge&logo=github&logoColor=black)](https://github.com/aksh-g/ClinIQ/issues)
[![Contributing](https://img.shields.io/badge/Guide-CONTRIBUTING.md-7dff6b?style=for-the-badge&logo=bookstack&logoColor=black)](./CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

<div align="center">

![React](https://img.shields.io/badge/React.js-0b0f1a?style=flat-square&logo=react&logoColor=6cf2ff)
![TypeScript](https://img.shields.io/badge/TypeScript-0b0f1a?style=flat-square&logo=typescript&logoColor=6cf2ff)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-0b0f1a?style=flat-square&logo=tailwindcss&logoColor=6cf2ff)
![Supabase](https://img.shields.io/badge/Supabase-0b0f1a?style=flat-square&logo=supabase&logoColor=7dff6b)
![Vite](https://img.shields.io/badge/Vite-0b0f1a?style=flat-square&logo=vite&logoColor=ff7cd8)
![ELUSOC](https://img.shields.io/badge/ELUSOC_2026-0b0f1a?style=flat-square&logo=gamejolt&logoColor=ffd166)

</div>

---

## 🩺 PATIENT ZERO REPORT

ClinIQ is an innovative open-source health-tech platform that leverages AI to provide accurate symptom analysis and doctor discovery—all in one place. Our goal is to make healthcare more accessible and user-friendly for everyone.

> `ELUSOC 2026 Official Project`: This repo is officially selected and actively maintained for open-source collaboration.

---

## 🧪 CONTRIBUTOR CLEARANCE

Before claiming an issue or submitting a PR, contributors are expected to:

- ⭐ Star this repository
- 👀 Follow the maintainer on GitHub: https://github.com/akshay0611
- 🍴 Fork the repository
- 📖 Read CONTRIBUTING.md

These steps help support the project and keep contributors informed about updates and announcements.

---

## 📸 DIAGNOSTIC SNAPSHOTS

**Homepage:**
![Home Page](./public/cliniqhome.png)

**Symptom Checker:**
![Symptom Checker](./public/cliniqsymptomchecker.png)

---

## 🚨 CRITICAL CONDITION

Millions face delays and confusion when accessing healthcare. Getting a preliminary understanding of symptoms can be difficult, and finding the right specialist is often a challenge.

---

- ## 🧬 CORE SYSTEMS ONLINE

- 🧠 **AI Symptom Checker:** Get instant, personalized health insights.
- 👩‍⚕️ **Doctor Directory:** Find verified specialists by expertise.
- 💬 **Chat Interface:** An interactive way to get feedback on symptoms.
- 📱 **Responsive UI:** A modern and smooth user experience on any device.
- 🏥 **Hospital Locator:** Find nearby hospitals using your PIN code.

---

## 🏥 MEDICAL STACK

| Layer    | Technologies                                      |
| :------- | :------------------------------------------------ |
| Frontend | React.js, TypeScript, Tailwind CSS, Framer Motion |
| Backend  | Supabase                                          |
| Database | Supabase (PostgreSQL)                             |
| AI API   | Gemini API                                        |

📐 **[View Full Architecture Overview →](./ARCHITECTURE_OVERVIEW.md)**

---

## 🚑 RAPID DEPLOYMENT PROTOCOL

```sh
git clone https://github.com/YOUR_USERNAME/ClinIQ.git
cd ClinIQ
npm install
cp .env.example .env
npm run dev
```

Then open `http://localhost:5173`.

For complete setup and troubleshooting: [SETUP.md](./SETUP.md)

### 🗄️ Database Setup (Supabase)

1. Create a free project on [Supabase](https://supabase.com/).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the content of `supabase/schema.sql` and run it to create the **core tables** + policies.
4. Get your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from **Project Settings > API** and add them to your `.env` file.

> `VITE_GEMINI_API_KEY` is optional — the symptom checker falls back to mock results without it.

---

## 🧑‍⚕️ CONTRIBUTOR SPECIALIZATIONS

> These tiers are **project guidance** for onboarding and issue complexity.  
> They are not official ELUSOC points/rank rules.

| Tier | Focus Area | Typical Tasks |
|---|---|---|
| 🟩 **Medical Intern** | First contributions | README/docs updates, typo fixes, small UI polish |
| 🟦 **Resident Doctor** | Feature and bug work | Component improvements, bug fixes, API/UI refinements |
| 🟪 **Chief Surgeon** | System-level changes | Architecture refactors, performance work, deeper integrations |

---

## 📑 `// PROJECT DOSSIER`

As **Project Admin** during **Hacktoberfest 2025** and **ELUSOC 2026**, I spearheaded both the technical development and community growth of ClinIQ.

### 🏗️ Technical Contributions
- **Full-Stack Architecture:** Designed and built the entire system using React, TypeScript, Supabase, and Gemini AI—from database schema to UI components
- **Core Features:** Developed the AI symptom checker, doctor discovery system, appointment booking flow, and role-based dashboards for patients and doctors
- **Database Engineering:** Architected PostgreSQL schema with proper relationships, Row Level Security (RLS) policies, and data integrity constraints
- **UI/UX Development:** Created responsive, accessible interfaces with Tailwind CSS and smooth animations using Framer Motion

### 🤝 Community & Project Management
- **Open Source Leadership:** Managed issues and pull requests, maintaining code quality while welcoming diverse contributions from the community
- **Contributor Support:** Mentored developers (including first-time contributors) through code reviews, issue discussions, and technical guidance
- **Documentation:** Wrote clear setup guides, contributing guidelines, and inline code documentation to lower the barrier for new contributors
- **Deployment & DevOps:** Set up CI/CD pipeline and production deployment, ensuring the platform is accessible to real users

---

## 🤝 OPEN COLLABORATION

We welcome contributors of all levels.  
Start with open issues, claim one, and submit a focused PR with clean commit history.

- Contribution guide: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Issues board: [GitHub Issues](https://github.com/aksh-g/ClinIQ/issues)

### Branch Naming Convention

- `feature/feature-name` — For new features
- `fix/bug-description` — For bug fixes
- `docs/update-description` — For documentation updates
- `refactor/component-name` — For code refactoring

### Issue Labels

- `good first issue` — Ideal for newcomers
- `elusoc` — Issues for ELUSOC 2026 contributors
- `bug` — Something isn't working as expected
- `UI/UX` — Involves improving interface or user experience

---

## 🔬 RESEARCH PIPELINE

- [ ] 📊 **Advanced Dashboards:** For patients, doctors, and admins with actionable insights.
- [ ] 🔐 **Enhanced Security:** End-to-end encryption and role-based access controls.
- [ ] 🔔 **Real-time Notifications:** Appointment alerts and health reminders.

---

## 📄 LICENSE

This project is licensed under the MIT License.  
See [LICENSE](./LICENSE) for details.

---

## 💙 SUPPORT THE MISSION

If ClinIQ helps or inspires you, drop a star and share it with fellow builders.

<div align="center">

Built with care by [Akshay Kumar](https://github.com/akshay0611)

**Connect with me:**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akshaykumar0611/)
[![X](https://img.shields.io/badge/X-0b0f1a?style=flat-square&logo=x&logoColor=ffffff)](https://x.com/Aksh0605)

</div>
