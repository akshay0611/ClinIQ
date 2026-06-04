import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Layout Components (kept eager — they render on every page)
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import PageLoader from "./components/common/PageLoader";
import AutoScrollToTop from "./components/common/autoScrollToTop";

// Pages (lazy-loaded so each route is split into its own chunk)
const Home = lazy(() => import("./pages/Home"));
const SymptomChecker = lazy(() => import("./pages/SymptomChecker"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const Faq = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MedicalDictionary = lazy(() => import("./pages/MedicalDictionary"));
const DrugDatabase = lazy(() => import("./pages/DrugDatabase"));
const Webinars = lazy(() => import("./pages/Webinars"));
const FirstAidGuides = lazy(() => import("./pages/FirstAidGuides"));
const ResearchPapers = lazy(() => import("./pages/ResearchPapers"));
const HealthBlog = lazy(() => import("./pages/HealthBlog"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const DoctorProfilePage = lazy(() => import("./pages/DoctorProfilePage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AutoScrollToTop />
          <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
            <Navbar />

            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/symptom-check" element={<SymptomChecker />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/doctors/:id" element={<DoctorProfilePage />} />
                  <Route path="/appointment/:id" element={<Appointment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/hospitals" element={<Hospitals />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/termsofservice" element={<TermsOfService />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/medical-dictionary"
                    element={<MedicalDictionary />}
                  />
                  <Route path="/drug-database" element={<DrugDatabase />} />
                  <Route path="/webinars" element={<Webinars />} />
                  <Route path="/first-aid-guides" element={<FirstAidGuides />} />
                  <Route path="/research-papers" element={<ResearchPapers />} />
                  <Route path="/health-blog" element={<HealthBlog />} />
                  <Route path="/health-blog/:id" element={<BlogPostPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* Catch-all route for unknown URLs */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />

            {/* Back to Top Button */}
            <BackToTop />
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </Router>
        <Analytics />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
