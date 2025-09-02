import { useEffect, useRef, useState } from "react";

type TResizeObserverResult = {
  width: number;
  height: number;
};

/**
 * Custom hook to observe element size changes using ResizeObserver
 */
export function useResizeObserver<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T>,
  TResizeObserverResult
] {
  const elementRef = useRef<T>(null);
  const [size, setSize] = useState<TResizeObserverResult>({ width: 0, height: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateSize = (entry: ResizeObserverEntry) => {
      // Cancel any pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Throttle updates using requestAnimationFrame
      rafRef.current = requestAnimationFrame(() => {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateSize(entry);
      }
    });

    resizeObserver.observe(element);

    // Set initial size
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return [elementRef, size];
}
