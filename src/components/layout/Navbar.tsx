import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Home, 
  Stethoscope, 
  Search, 
  Users,
  // LayoutDashboard,
  HelpCircle,
  MessageSquare,
  Info,
  Hospital
} from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };
  
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Symptom Checker', path: '/symptom-check', icon: <Stethoscope size={18} /> },
    { name: 'Find Doctors', path: '/doctors', icon: <Users size={18} /> },
    { name: 'Hospitals', path: '/hospitals', icon: <Hospital size={18} /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle size={18} /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare size={18} /> },
  ];
  
  const isActive = (path: string) => pathname === path;


  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.2
      }
    })
  };

  return (
    <motion.header 
      initial="initial"
      animate="animate"
      variants={navbarVariants}
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md shadow-md' 
          : 'bg-white dark:bg-neutral-800'
      }`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between"> 
      
        <Link to="/" className="flex items-center group" onClick={closeMenus}>
          <motion.div 
            className="flex items-center justify-center w-16 h-16 mr-2" 
            whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
          >
            {/* Replaced SVG component with img logo */}
            <img 
              src="/ClinIQ_Logo.png" 
              alt="ClinIQ Logo" 
              className="w-full h-full object-contain" 
            />
          </motion.div>
          <div className="relative overflow-hidden">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-500 text-transparent bg-clip-text dark:from-primary-400 dark:to-blue-300"> {/* Increased text size (text-xl to text-2xl) */}
              ClinIQ
            </span>
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-400 dark:to-blue-300"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Link>

       
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              custom={index}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                  isActive(item.path)
                    ? 'text-white dark:text-white bg-gradient-to-r from-primary-600 to-blue-500 shadow-sm shadow-primary-600/20 dark:shadow-primary-400/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/30'
                }`}
              >
                <span className={`${isActive(item.path) ? 'text-white' : ''}`}>{item.icon}</span>
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

       
        <div className="flex items-center">
         
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2"
            aria-label="Search"
          >
            <Search size={20} />
          </motion.button>
          
         
          <motion.button
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-blue-600" />
            )}
          </motion.button>

         
          {currentUser ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {currentUser.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700"
                  />
                ) : (
                  <div className="w-9 h-9 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-medium">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium">
                  {currentUser.name}
                </span>
              </motion.button>

              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg py-2 z-40 border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 group"
                      onClick={closeMenus}
                    >
                      <User size={16} className="mr-2 text-primary-500 group-hover:text-primary-600 dark:text-primary-400" />
                      Your Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 group"
                    >
                      <LogOut size={16} className="mr-2 text-gray-500 group-hover:text-red-500 dark:text-gray-400" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                  >
                    Log In
                  </Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary-600 to-blue-500 hover:from-primary-500 hover:to-blue-400 border-0 text-white shadow-md shadow-primary-600/20 dark:shadow-primary-500/20"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}

         
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="p-2 ml-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

     
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium ${
                      isActive(item.path)
                        ? 'text-white bg-gradient-to-r from-primary-600 to-blue-500 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={closeMenus}
                  >
                    <div className={`mr-3 ${isActive(item.path) ? 'text-white' : 'text-primary-500 dark:text-primary-400'}`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {!currentUser && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col space-y-2 px-3">
                    <Link to="/login" className="w-full" onClick={closeMenus}>
                      <Button 
                        variant="outline" 
                        fullWidth
                        className="justify-center py-3 border-primary-300 dark:border-primary-700"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup" className="w-full" onClick={closeMenus}>
                      <Button 
                        fullWidth 
                        className="justify-center py-3 bg-gradient-to-r from-primary-600 to-blue-500 border-0"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;