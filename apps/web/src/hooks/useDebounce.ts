import { useCallback, useEffect, useRef } from "react";

/**
 * Debounce a callback function
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
// biome-ignore lint/suspicious/noExplicitAny: Generic debounce needs any for flexible parameters
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
