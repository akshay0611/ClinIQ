import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ArrowRight, 
  Linkedin,
  Shield,
  Globe,
  AlertCircle
} from 'lucide-react';
import Button from '../common/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
     
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 8,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white pt-16 pb-8">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-600/5 rounded-full blur-3xl" />
      </div>
      
     
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
         
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link to="/" className="group flex items-center mb-5">
  <motion.div 
    className="w-16 h-16 mr-3" 
    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
    transition={{ duration: 0.5 }}
  >
    <img 
      src="/ClinIQ_Logo.png" 
      alt="ClinIQ Logo" 
      className="w-full h-full object-contain" 
    />
  </motion.div>

  <div>
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-primary-400 text-transparent bg-clip-text">ClinIQ</span>
    <motion.span 
      className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-primary-400 transition-all duration-300"
      initial={{ width: 0 }}
      whileHover={{ width: "100%" }}
    />
  </div>
</Link>

            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Your trusted partner for reliable health insights and connecting with healthcare professionals. We combine AI technology with medical expertise to provide accurate information when you need it most.
            </p>
<div className="flex space-x-4 mb-6">
  {[
    { 
      icon: <Facebook size={18} />, 
      color: "bg-blue-500", 
      name: "Facebook",
      url: "https://facebook.com/ClinIQ.healthcare" 
    },
    { 
      icon: <Twitter size={18} />, 
      color: "bg-blue-400", 
      name: "Twitter",
      url: "https://twitter.com/ClinIQ_health" 
    },
    { 
      icon: <Instagram size={18} />, 
      color: "bg-pink-500", 
      name: "Instagram",
      url: "https://instagram.com/ClinIQ.official" 
    },
    { 
      icon: <Linkedin size={18} />, 
      color: "bg-blue-600", 
      name: "LinkedIn",
      url: "https://linkedin.com/company/ClinIQ-health" 
    }
  ].map((social, index) => (
    <motion.a
      key={index}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${social.name}`}
      variants={socialIconVariants}
      whileHover="hover"
      whileTap="tap"
      className={`flex items-center justify-center w-10 h-10 rounded-full ${social.color} hover:shadow-lg hover:shadow-${social.color}/20 transition-all duration-300 text-white`}
    >
      {social.icon}
    </motion.a>
  ))}
</div>
            
<div className="flex items-center">
  <Shield size={16} className="text-green-400 mr-2" />
  <span className="text-sm text-green-400 font-medium">
    Compliant with Indian IT Act & Data Privacy Guidelines
  </span>
</div>

          </motion.div>

         
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center">
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-blue-400 to-primary-400 mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Symptom Checker", path: "/symptom-check" },
                { name: "Find Doctors", path: "/doctors" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "FAQ", path: "/faq" },
                { name: "Contact Us", path: "/contact" }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-primary-500/50 mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

         
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center">
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-blue-400 to-primary-400 mr-2"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Health Blog", path: "/health-blog" },
                { name: "Medical Dictionary", path: "/medical-dictionary" },
                { name: "Drug Database", path: "/drug-database" },
                { name: "Research Papers", path: "/research-papers" },
                { name: "First Aid Guides", path: "/first-aid-guides" },
                { name: "Webinars", path: "/webinars" }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-primary-500/50 mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

         
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center">
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-blue-400 to-primary-400 mr-2"></span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                  <Mail size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Email Us</p>
                  <a
                    href="mailto:teamcodexsupport@gmail.com"
                    className="text-neutral-200 hover:text-primary-400 transition-colors"
                  >
                    teamcodexsupport@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                  <Phone size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Call Us</p>
                  <a
                    href="tel:+15551234567"
                    className="text-neutral-200 hover:text-primary-400 transition-colors"
                  >
                    +91 9876543210
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                  <MapPin size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Visit Us</p>
                 <span className="text-neutral-200">
  123 Health Avenue, Medical District
  <br />
  Bangalore, Karnataka 560001
  <br />
  India
</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                  <Globe size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Operating Hours</p>
                  <span className="text-neutral-200">
                    Monday - Friday: 8am - 8pm
                    <br />
                    Weekend: 10am - 4pm
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

         
          <motion.div 
  variants={itemVariants} 
  className="lg:col-span-12 mt-6"
>
  <div className="rounded-2xl bg-gradient-to-br from-primary-900/50 to-blue-900/50 backdrop-blur-sm border border-white/5 p-6 md:p-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      
     
      <div className="w-full md:max-w-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Stay Updated with Health Insights</h3>
        <p className="text-neutral-300">
          Get the latest health tips, medical breakthroughs, and exclusive content delivered to your inbox.
        </p>
      </div>

     
      <div className="w-full md:w-auto">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg flex items-center"
          >
            <Heart className="mr-2" size={20} />
            <span>Thank you for subscribing!</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
            <div className="relative flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full min-w-0 pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-50">
                <Mail size={16} className="text-neutral-400" />
              </div>
            </div>
            <Button 
              type="submit"
              className="w-full sm:w-auto rounded-lg sm:rounded-l-none bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-400 hover:to-blue-400 text-white border-0"
            >
              <span className="hidden md:inline">Subscribe</span>
              <ArrowRight size={18} className="md:ml-2" />
            </Button>
          </form>
        )}
      </div>
    </div>
  </div>
</motion.div>

        </motion.div>

       
        <div className="mt-16 pt-6 border-t border-neutral-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="text-primary-400 mr-2"
              >
                <Heart size={16} fill="currentColor" />
              </motion.div>
              <p className="text-neutral-400 text-sm">
                © {currentYear} ClinIQ. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link to="/privacypolicy" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center">
                <Shield size={14} className="mr-1" />
                Privacy Policy
              </Link>
              <Link to="/termsofservice" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center">
                <AlertCircle size={14} className="mr-1" />
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center">
                <Globe size={14} className="mr-1" />
                Accessibility
              </Link>
              <Link to="/sitemap" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center">
                Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;