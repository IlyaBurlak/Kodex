import { useEffect, useMemo, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delayMs: number): T {
  const timeoutRef = useRef<number | undefined>(undefined);
  const saved = useRef(fn);
  saved.current = fn;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return useMemo(() => {
    const debounced = ((...args: any[]) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => saved.current(...args), delayMs);
    }) as T;
    return debounced;
  }, [delayMs]);
}
