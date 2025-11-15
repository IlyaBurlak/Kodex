import { useEffect, useMemo, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(fn: T, delayMs: number): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | undefined>(undefined);
  const saved = useRef<T>(fn);
  saved.current = fn;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return useMemo(() => {
    const debounced = (...args: Parameters<T>) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => saved.current(...args), delayMs);
    };
    return debounced;
  }, [delayMs]);
}
