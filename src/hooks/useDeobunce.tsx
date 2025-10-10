import { useState, useEffect, useRef } from "react";

export function useDebounce<T>(
  value: T,
  delay: number,
  onDebounceChange?: (value: T) => void
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    if (delay <= 0) {
      setDebouncedValue(value);
      return
    }
    const validDelay = Math.max(0, Math.min(delay, 10000));

    const handler = setTimeout(() => {
      if (value !== previousValueRef.current) {
        setDebouncedValue(value);
        previousValueRef.current = value;
        onDebounceChange?.(value)
      } 
    }, validDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onDebounceChange]);

  return debouncedValue;
}
