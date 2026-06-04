import React from "react";

/**
 * PageLoader — lightweight fallback shown while a lazy-loaded
 * route chunk is being fetched. Matches the app's neutral theme.
 */
const PageLoader: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh] w-full"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-t-primary-500 dark:border-neutral-700 dark:border-t-primary-400" />
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default PageLoader;