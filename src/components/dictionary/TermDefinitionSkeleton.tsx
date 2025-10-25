import React from "react";

const TermDefinitionSkeleton: React.FC = () => {
  return (
    <div className="border-b border-gray-100 dark:border-neutral-700/50 pb-6 last:border-b-0 animate-pulse">
      {/* Term Placeholder */}
      <div className="h-7 w-40 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />

      {/* Tags Placeholder */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-28 rounded-full bg-gray-200 dark:bg-neutral-700" />
          <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Definition Placeholder */}
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
      <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-neutral-700 mb-3" />

      {/* Usage Placeholder */}
      <div className="h-4 w-16 rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700 mb-1" />
      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-700 mb-3" />

      {/* Related Terms Placeholder */}
      <div className="h-4 w-28 rounded bg-gray-200 dark:bg-neutral-700 mb-2" />
      <div className="flex flex-wrap gap-2 mt-2">
        <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-neutral-700" />
        <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-neutral-700" />
        <div className="h-7 w-16 rounded-full bg-gray-200 dark:bg-neutral-700" />
      </div>
    </div>
  );
};

export default TermDefinitionSkeleton;
