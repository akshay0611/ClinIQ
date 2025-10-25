import React from "react";

const DrugCardSkeleton: React.FC = () => {
  return (
    <div className="border-b border-gray-100 dark:border-neutral-700/50 pb-8 last:border-b-0 animate-pulse">
      {/* Header Placeholder */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <div className="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-40 mb-3" />
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-32" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Tags Placeholder */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-neutral-700" />
          <div className="h-6 w-28 rounded-full bg-gray-200 dark:bg-neutral-700" />
          <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Uses and Dosage Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="h-5 w-16 rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-1" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-1" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
        <div>
          <div className="h-5 w-20 rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-1" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Side Effects, Interactions, Warnings Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-5 w-32 rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
            <div className="space-y-1">
              <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-neutral-700" />
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-neutral-700" />
              <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-neutral-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrugCardSkeleton;
