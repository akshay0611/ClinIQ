import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  threshold?: number; // Scroll threshold in pixels before button appears
  className?: string;
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    toggleVisibility();

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}
          aria-label="Back to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp
            size={20}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
