import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback UI. Receives reset callback and error. */
  fallback?: (props: { error: Error; resetError: () => void }) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — catches JavaScript errors anywhere in its child component
 * tree and displays a fallback UI instead of crashing the entire app.
 *
 * Particularly useful around `<Suspense>` boundaries for lazy-loaded routes,
 * where a network failure or stale deployment can cause chunk-load errors.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <Suspense fallback={<PageLoader />}>
 *     <Routes>…</Routes>
 *   </Suspense>
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetError: this.resetError,
        });
      }

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-6">
          <div className="max-w-md w-full text-center">
            {/* Error icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
              An unexpected error occurred while loading this page. This could be
              due to a network issue or a temporary problem. Please try again.
            </p>

            <button
              onClick={this.resetError}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:from-primary-600 hover:to-blue-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>

            {/* Show error details in development */}
            {import.meta.env.DEV && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                  Error details
                </summary>
                <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap break-words">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
