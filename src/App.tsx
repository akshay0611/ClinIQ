import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import Dashboard from './pages/Dashboard';
import Hospitals from './pages/Hospitals';
import Faq from './pages/FAQ';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MedicalDictionary from './pages/MedicalDictionary';  
import DrugDatabase from './pages/ DrugDatabase';
import Webinars from './pages/Webinars';
import FirstAidGuides from './pages/FirstAidGuides';
import ResearchPapers from './pages/ResearchPapers';
import HealthBlog from './pages/HealthBlog';
import BlogPostPage from './pages/BlogPostPage';
import ForgotPassword from './pages/ForgotPassword';  

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/symptom-check" element={<SymptomChecker />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/appointment/:id" element={<Appointment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/termsofservice" element={<TermsOfService />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/medical-dictionary" element={<MedicalDictionary />} />
                <Route path="/drug-database" element={<DrugDatabase />} />
                <Route path="/webinars" element={<Webinars />} />
                <Route path="/first-aid-guides" element={<FirstAidGuides />} />
                <Route path="/research-papers" element={<ResearchPapers />} />
                <Route path="/health-blog" element={<HealthBlog />} />
                <Route path="/health-blog/:id" element={<BlogPostPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Add more routes as needed */}
                
               
                {/* Add routes for other pages as they're implemented */}
              </Routes>
            </main>
            
            <Footer />
          </div>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;