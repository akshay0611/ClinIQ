import React from "react";
import { motion } from "framer-motion";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="relative container mx-auto px-4 py-8 md:py-12 mt-16 animate-pulse">
      {/* Header Skeleton */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700" />
          <div>
            <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-48 mb-2" />
            <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-72" />
          </div>
        </div>
      </motion.header>

      {/* Stats Skeleton */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 md:mb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-700/50 p-6"
            >
              <div className="mb-4 w-12 h-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
              <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
              <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Main Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {/* Skeleton for Table/Appointments */}
          <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-700/50 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-gray-200 dark:bg-neutral-700" />
                <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-40" />
              </div>
              <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-neutral-900/30 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div>
                      <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-32 mb-1" />
                      <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-24" />
                    </div>
                  </div>
                  <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-16" />
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1 space-y-8"
        >
          {/* Skeleton for Side Panel Cards */}
          <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-gray-200 dark:bg-neutral-700" />
                <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-32" />
              </div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded mb-4" />
            <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded" />
          </div>
        </motion.section>
      </div>

      {/* Profile Form Skeleton */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-700/50 p-6 mt-8"
      >
        <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-40 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24 mb-2" />
              <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-32" />
        </div>
      </motion.section>
    </div>
  );
};

export default ProfileSkeleton;
