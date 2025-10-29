import React from "react";
import { motion } from "framer-motion";

export default function DoctorProfileSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16 animate-pulse">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white dark:bg-neutral-800/90 p-8 rounded-2xl shadow-xl"
      >
        {/* Header Placeholder */}
        <div className="flex items-center gap-8">
          <div>
            <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-48 mb-3" />
            <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-36" />
          </div>
        </div>

        {/* About Placeholder */}
        <div className="mt-8">
          <div className="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-32 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-3/4" />
        </div>

        {/* Qualifications Placeholder */}
        <div className="mt-8">
          <div className="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-48 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mb-2 ml-5" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mb-2 ml-5" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mb-2 ml-5" />
        </div>

        {/* Experience Placeholder */}
        <div className="mt-8">
          <div className="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-40 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24" />
        </div>

        {/* Fee Placeholder */}
        <div className="mt-8">
          <div className="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-52 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-16" />
        </div>

        {/* Address Placeholder */}
        <div className="mt-8">
          <div className="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-48 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-2/3" />
        </div>
      </motion.div>
    </div>
  );
}
