import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950 px-4">
      {/* Decorative background blurs (consistent with other pages) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-blue-50 dark:bg-blue-900/50 mb-8"
        >
          <ExclamationTriangleIcon className="h-10 w-10 text-primary-500" />
        </motion.div>

        <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back to safety.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl transition-shadow"
        >
          <HomeIcon className="h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}