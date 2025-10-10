import React from 'react';

const DoctorCardSkeleton: React.FC = () => {
  return (
    <div className="h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-800/90 backdrop-blur-sm border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30 flex flex-col animate-pulse">
      <div className="relative">
        <div className="w-full h-52 bg-gray-200 dark:bg-neutral-700/50" />
        <div className="absolute -bottom-12 left-4 w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800 overflow-hidden shadow-lg bg-gray-200 dark:bg-neutral-700/50" />
      </div>
      <div className="p-5 pt-14 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="h-6 w-40 bg-gray-200 dark:bg-neutral-700/50 rounded mb-2" />
          <div className="h-5 w-28 bg-blue-100 dark:bg-blue-900/40 rounded" />
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 mr-3" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-neutral-700/50 rounded" />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 mr-3" />
            <div className="h-4 w-48 bg-gray-200 dark:bg-neutral-700/50 rounded" />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 mr-3" />
            <div className="h-4 w-40 bg-gray-200 dark:bg-neutral-700/50 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="h-10 bg-gray-200 dark:bg-neutral-700/50 rounded" />
          <div className="h-10 bg-gray-200 dark:bg-neutral-700/50 rounded" />
        </div>
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;


