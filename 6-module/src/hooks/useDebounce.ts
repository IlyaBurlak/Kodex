import { useEffect, useMemo, useRef } from 'react';

// eslint-disable-next-line no-unused-vars
export function useDebounce<T extends (...args: any[]) => void>(fn: T, delayMs: number): T {
  const timeoutRef = useRef<number | undefined>(undefined);
  const saved = useRef(fn);
  saved.current = fn;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return useMemo(() => {
    const debounced = ((...args: Parameters<T>) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => saved.current(...args), delayMs);
    }) as T;
    return debounced;
  }, [delayMs]);
}
