import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Custom hook to debounce any value.
 * Prevents excessive API calls when rapidly changing values (e.g., search input)
 * Solves Issue #76: Prevent API Token Exhaustion via Debounced Requests
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before updating the debounced value (default: 500ms)
 * @returns The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 1000);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for debouncing async callback functions.
 * Prevents rapid consecutive API calls (e.g., during search, autocomplete)
 * Solves Issue #76: Prevent API Token Exhaustion via Debounced Requests
 * 
 * @param callback - The async function to debounce
 * @param delay - Delay in milliseconds before executing callback (default: 500ms)
 * @returns Debounced callback function and a function to cancel pending execution
 * 
 * @example
 * const debouncedSearch = useDebouncedCallback(async (term: string) => {
 *   const results = await fetch(`/api/search?q=${term}`);
 *   setResults(await results.json());
 * }, 1000);
 * 
 * const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   debouncedSearch(e.target.value);
 * };
 */
export function useDebouncedCallback<T extends (...args: any[]) => Promise<void> | void>(
  callback: T,
  delay: number = 500
): [T, () => void] {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return [debouncedCallback, cancel];
}

/**
 * Custom hook for debouncing API calls with loading and error states.
 * Combines debouncing with loading indicators and error handling.
 * Solves Issue #76: Prevent API Token Exhaustion via Debounced Requests
 * 
 * @param asyncFunction - The async function to call (typically an API call)
 * @param delay - Delay in milliseconds before executing (default: 500ms)
 * @returns Object with { execute, isLoading, error, cancel }
 * 
 * @example
 * const { execute: searchHospitals, isLoading, error } = useDebouncedAsync(
 *   async (pincode: string) => {
 *     const response = await fetch(`/hospitals?pincode=${pincode}`);
 *     return response.json();
 *   },
 *   1000
 * );
 * 
 * const handleSearch = (pincode: string) => {
 *   searchHospitals(pincode);
 * };
 */
export function useDebouncedAsync<Args extends any[], Result>(
  asyncFunction: (...args: Args) => Promise<Result>,
  delay: number = 500
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const execute = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await asyncFunction(...args);
          return result;
        } catch (err) {
          const error = err instanceof Error ? err : new Error('An error occurred');
          setError(error);
          throw error;
        } finally {
          setIsLoading(false);
        }
      }, delay);
    },
    [asyncFunction, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsLoading(false);
    }
  }, []);

  return { execute, isLoading, error, cancel };
}

/**
 * Utility function to debounce any function (not just React hooks).
 * Use in non-React contexts or for debouncing regular functions.
 * 
 * @param func - The function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced function
 * 
 * @example
 * const debouncedResize = debounce(handleWindowResize, 300);
 * window.addEventListener('resize', debouncedResize);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Throttle function to limit execution frequency.
 * Use when debounce is too aggressive and you need regular updates.
 * 
 * @param func - The function to throttle
 * @param limit - Minimum milliseconds between executions (default: 1000ms)
 * @returns Throttled function
 * 
 * @example
 * const throttledScroll = throttle(handleScroll, 300);
 * window.addEventListener('scroll', throttledScroll);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 1000
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}