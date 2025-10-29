import React from "react";
// import { motion } from "framer-motion";

const SymptomResultsSkeleton: React.FC = () => {
  return (
    <div className="mt-8 bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl animate-pulse">
      {/* PDF Button Placeholder */}
      <div className="mb-8 h-12 w-full rounded-xl bg-gray-200 dark:bg-neutral-700" />

      {/* Urgency Placeholder */}
      <div className="p-8 rounded-2xl border border-gray-200 dark:border-neutral-700 mb-10">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-gray-200 dark:bg-neutral-700 mr-4 shadow-lg h-14 w-14" />
          <div className="h-8 w-40 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
        <div className="ml-1 h-6 w-3/4 rounded bg-gray-200 dark:bg-neutral-700" />
      </div>

      <hr className="my-10 border-gray-200 dark:border-neutral-700" />

      {/* Conditions Placeholder */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-56 rounded bg-gray-200 dark:bg-neutral-700" />
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 dark:border-neutral-700 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-700 p-5">
                <div className="h-6 w-3/5 rounded bg-gray-200 dark:bg-neutral-700" />
                <div className="h-6 w-1/5 rounded-full bg-gray-200 dark:bg-neutral-700" />
              </div>
              <div className="p-5 space-y-2">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-neutral-700" />
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-neutral-700 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-10 border-gray-200 dark:border-neutral-700" />

      {/* Recommendations Placeholder */}
      <div className="mb-12">
        <div className="h-8 w-64 rounded bg-gray-200 dark:bg-neutral-700 mb-6" />
        <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-700/50 p-8">
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-neutral-700 mb-5" />
          <div className="space-y-4 pl-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start">
                <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-neutral-700 mr-4 shrink-0" />
                <div className="h-5 w-full rounded bg-gray-200 dark:bg-neutral-700 pt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-10 border-gray-200 dark:border-neutral-700" />

      {/* Consultation Placeholder */}
      <div className="mb-12">
        <div className="h-6 w-48 rounded bg-gray-200 dark:bg-neutral-700 mb-5" />
        <div className="bg-gray-50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-gray-100 dark:border-neutral-700/50">
          <div className="flex items-start">
            <div className="shrink-0 mt-1 bg-gray-200 dark:bg-neutral-700 p-3 rounded-full shadow-lg h-12 w-12" />
            <div className="ml-5 flex-grow">
              <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-neutral-700 mb-3" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-1" />
              <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-neutral-700" />
            </div>
          </div>
          <div className="mt-8 h-12 w-full rounded-xl bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Disclaimer Placeholder */}
      <div className="mt-10 bg-gray-50 dark:bg-neutral-800/50 p-6 rounded-2xl border border-gray-100 dark:border-neutral-700">
        <div className="flex">
          <div className="h-6 w-6 mr-3 shrink-0 mt-0.5 bg-gray-200 dark:bg-neutral-700 rounded-full" />
          <div className="space-y-1 flex-grow">
            <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-neutral-700 font-bold" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700" />
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomResultsSkeleton;
