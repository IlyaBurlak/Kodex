import { useEffect, useMemo, useRef } from 'react';

export function useDebounce<T extends (...args: never[]) => void>(fn: T, delayMs: number) {
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
