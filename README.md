# ClinIQ – AI-Powered Health Platform

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)](https://hacktoberfest.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

ClinIQ is an innovative open-source health-tech platform that leverages AI to provide accurate symptom analysis and doctor discovery—all in one place. Our goal is to make healthcare more accessible and user-friendly for everyone.

---

## 🚀 Live Demo

[🔗 Visit ClinIQ](https://cliniq-iota.vercel.app/)

---

## 📸 Screenshots

**Homepage:**
![Home Page](./public/cliniqhome.png)

**Symptom Checker:**
![Symptom Checker](./public/cliniqsymptomchecker.png)

---

## 💡 The Problem

Millions face delays and confusion when accessing healthcare. Getting a preliminary understanding of symptoms can be difficult, and finding the right specialist is often a challenge.

## 🩺 Our Solution

ClinIQ addresses these challenges by providing:

- 🧠 **AI Symptom Checker:** Get instant, personalized health insights.
- 👩‍⚕️ **Doctor Directory:** Find verified specialists by expertise.
- 💬 **Chat Interface:** An interactive way to get feedback on symptoms.
- 📱 **Responsive UI:** A modern and smooth user experience on any device.
- 📅 **Appointment Booking:** Book and manage appointments with ease.
- 🏥 **Hospital Locator:** Find nearby hospitals using your PIN code.

---

## 🚀 Getting Started

Follow these steps to get a local copy running:

### Prerequisites

- Node.js (v18 or higher)  
- npm or yarn  

### Installation

1. **Fork the repository**  
2. **Clone the repository**  
    ```sh
    git clone https://github.com/YOUR_USERNAME/ClinIQ.git
    ```
3. **Navigate to the project directory**  
    ```sh
    cd ClinIQ
    ```
4. **Install dependencies**  
    ```sh
    npm install
    # or
    yarn install
    ```
5. **Set up environment variables**  
   Copy `.env.example` to `.env` and fill in your keys.  
   - **Supabase:** Sign up at [https://supabase.com/](https://supabase.com/) to get `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.  
   - **Gemini API:** Get your key from [https://aistudio.google.com/api-keys](https://aistudio.google.com/api-keys).

6. **Run the development server**  
    ```sh
    npm run dev
    # or
    yarn dev
    ```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 🤝 Contributing

We welcome contributions from everyone, especially during **Hacktoberfest**! Your help is essential for making ClinIQ better.

Please read our [**CONTRIBUTING.md**](CONTRIBUTING.md) for detailed instructions.

### Branch Naming & PR Guidelines

- Create a new branch for each PR (do not commit directly to `main`).  
  Example: `fix/sign-in-text` or `feature/new-component`  
- Reference the issue in your PR title or description.  
  Example: `Fix: Sign-In Text Cut Off #2`  
- Include screenshots or GIFs for UI changes.  
- PRs will be reviewed by maintainers. Be prepared to make requested changes before merge.

### Issue Labels

- `good first issue`: Ideal for newcomers.  
- `hacktoberfest`: Issues for Hacktoberfest contributors.  
- `bug`: Something isn’t working as expected.  
- `UI/UX`: Involves improving interface or user experience.  

---

## 🧰 Tech Stack

| Layer    | Technologies                               |
| :------- | :----------------------------------------- |
| Frontend | React.js, TypeScript, Tailwind CSS, Framer Motion |
| Backend  | Supabase                                   |
| Database | Supabase (PostgreSQL)                      |
| AI API   | Gemini API                                 |

[![Built with React](https://img.shields.io/badge/Built%20with-React-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-teal.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-blueviolet.svg)](https://supabase.com/)
[![Gemini API](https://img.shields.io/badge/AI-Gemini-orange.svg)](https://developers.google.com/)

---

## 🗺️ Future Roadmap

- 📊 **Advanced Dashboards:** For patients, doctors, and admins with actionable insights.  
- 🔐 **Enhanced Security:** End-to-end encryption and role-based access controls.  
- 🔔 **Real-time Notifications:** Appointment alerts and health reminders.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⭐ Star Our Repo!

If you find ClinIQ helpful, please give it a ⭐ star on [GitHub](https://github.com/aksh-g/ClinIQ)!

---

## 📬 Contact

For questions or feedback, reach out to [akshay.allen26200@gmail.com](mailto:akshay.allen26200@gmail.com)
