import React from "react";
// import { motion } from "framer-motion";

const DoctorCardSkeleton: React.FC = () => {
  return (
    <div className="h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-800/90 backdrop-blur-sm border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30 flex flex-col animate-pulse">
      {/* Top Image Section */}
      <div className="relative">
        <div className="w-full h-52 bg-gray-200 dark:bg-neutral-700" />

        {/* Rating Badge Placeholder */}
        <div className="absolute top-4 left-4 bg-gray-200 dark:bg-neutral-700/80 h-7 w-20 rounded-full" />

        {/* Available Badge Placeholder */}
        <div className="absolute top-4 right-4 bg-gray-200 dark:bg-neutral-700/80 h-7 w-28 rounded-full" />

        {/* Profile Pic Placeholder */}
        <div className="absolute -bottom-12 left-4 w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800 bg-gray-300 dark:bg-neutral-600 shadow-lg" />
      </div>

      {/* Content Section */}
      <div className="p-5 pt-14 flex-1 flex flex-col">
        <div className="mb-4">
          {/* Doctor Name Placeholder */}
          <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
          {/* Specialization Placeholder */}
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-1/2" />
        </div>

        {/* Info Lines Placeholder */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-700 mr-3" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-700 mr-3" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-700 mr-3" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-3/4" />
          </div>
        </div>

        {/* Stats Placeholder */}
        <div className="flex justify-between mb-6 px-1">
          <div className="text-center w-1/3">
            <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mx-auto mb-1" />
            <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mx-auto" />
          </div>
          <div className="text-center w-1/3">
            <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mx-auto mb-1" />
            <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mx-auto" />
          </div>
          <div className="text-center w-1/3">
            <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mx-auto mb-1" />
            <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mx-auto" />
          </div>
        </div>

        {/* Buttons Placeholder */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="w-full h-11 rounded-lg bg-gray-200 dark:bg-neutral-700" />
          <div className="w-full h-11 rounded-lg bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;
