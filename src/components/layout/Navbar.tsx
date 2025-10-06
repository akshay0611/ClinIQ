import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  Home,
  Stethoscope,
  Users,
  Info,
  Hospital,
  Sparkles,
  Search,
} from "lucide-react";
import Button from "../common/Button";
import SearchModal from "../common/SearchModal";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      setScrolled(offset > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global search keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    {
      name: "Symptom Checker",
      path: "/symptom-check",
      icon: <Stethoscope size={16} />,
    },
    { name: "Find Doctors", path: "/doctors", icon: <Users size={16} /> },
    { name: "Hospitals", path: "/hospitals", icon: <Hospital size={16} /> },
    { name: "About", path: "/about", icon: <Info size={16} /> },

    // { name: 'FAQ', path: '/faq', icon: <HelpCircle size={16} /> },
    // { name: 'Contact', path: '/contact', icon: <MessageSquare size={16} /> },
  ];

  const isActive = (path: string) => pathname === path;

  // Enhanced animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={navbarVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center group relative"
          onClick={closeMenus}
        >
          <motion.div
            className="flex items-center justify-center w-12 h-12 mr-3 relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                delay: 0.2,
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <img
              src="/ClinIQ_Logo.png"
              alt="ClinIQ Logo"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </motion.div>
          <div className="relative overflow-hidden">
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-transparent bg-clip-text dark:from-primary-400 dark:via-blue-400 dark:to-purple-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ClinIQ
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              custom={index}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={item.path}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-300 group ${
                  isActive(item.path)
                    ? "text-white bg-gradient-to-r from-primary-500 to-blue-500 shadow-lg shadow-primary-500/25 dark:shadow-primary-400/25"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
                }`}
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-primary-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <motion.button
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
            aria-label="Search (Ctrl+K)"
            title="Search (Ctrl+K)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={18} />
          </motion.button>
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-blue-500" />
              )}
            </motion.div>
          </motion.button>

          {/* User Profile or Auth Buttons */}
          {currentUser ? (
            <div className="relative">
              <motion.button
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                {currentUser.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700 transition-colors duration-200"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center shadow-md transition-shadow duration-200">
                    <span className="text-white font-medium text-sm">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentUser.name}
                </span>
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-3 z-40 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl"
                  >
                    <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <User
                        size={16}
                        className="mr-3 text-primary-500 dark:text-primary-400"
                      />
                      Your Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      <LogOut
                        size={16}
                        className="mr-3 text-gray-500 dark:text-gray-400"
                      />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                >
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 border-0 text-white shadow-lg shadow-primary-500/25 dark:shadow-primary-400/25"
                >
                  <Sparkles size={14} className="mr-1" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 lg:hidden transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Mobile Search Button */}
              <motion.button
                onClick={() => {
                  setIsSearchOpen(true);
                  closeMenus();
                }}
                className="flex items-center w-full px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0, duration: 0.2 }}
              >
                <div className="mr-3 text-primary-500 dark:text-primary-400">
                  <Search size={16} />
                </div>
                Search
              </motion.button>

              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 1) * 0.03, duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "text-white bg-gradient-to-r from-primary-500 to-blue-500 shadow-lg shadow-primary-500/25"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
                    }`}
                    onClick={closeMenus}
                  >
                    <div
                      className={`mr-3 ${
                        isActive(item.path)
                          ? "text-white"
                          : "text-primary-500 dark:text-primary-400"
                      }`}
                    >
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
                  transition={{ delay: navItems.length * 0.03 }}
                  className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex flex-col space-y-3 px-4">
                    <Link to="/login" className="w-full" onClick={closeMenus}>
                      <Button
                        variant="outline"
                        fullWidth
                        className="justify-center py-3 border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup" className="w-full" onClick={closeMenus}>
                      <Button
                        fullWidth
                        className="justify-center py-3 bg-gradient-to-r from-primary-500 to-blue-500 border-0 shadow-lg shadow-primary-500/25"
                      >
                        <Sparkles size={16} className="mr-2" />
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.header>
  );
};

export default Navbar;
