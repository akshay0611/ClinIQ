import React from "react";

const WebinarCardSkeleton: React.FC = () => {
  return (
    <div className="group relative bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-neutral-700/50 shadow-lg animate-pulse overflow-hidden">
      {/* Image Placeholder */}
      <div className="relative h-56 bg-gray-200 dark:bg-neutral-700">
        <div className="absolute top-4 right-4 h-6 w-20 rounded-full bg-gray-300 dark:bg-neutral-600" />
      </div>

      <div className="p-8">
        {/* Topic Placeholder */}
        <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-neutral-700 mb-4" />

        {/* Title Placeholder */}
        <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />

        {/* Description Placeholder */}
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-neutral-700 mb-6" />

        {/* Info Placeholders */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-neutral-700" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-700" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-neutral-700" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-700" />
              <div className="h-4 w-20 rounded bg-gray-200 dark:bg-neutral-700" />
            </div>
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-neutral-700" />
      </div>
    </div>
  );
};

export default WebinarCardSkeleton;
