
import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

// Overloaded function signatures for backward compatibility
export function useInView(options?: UseInViewOptions): { ref: React.RefObject<HTMLElement>; isInView: boolean };
export function useInView(target: React.RefObject<HTMLElement>, options?: UseInViewOptions): boolean;
export function useInView(
  targetOrOptions?: React.RefObject<HTMLElement> | UseInViewOptions,
  options?: UseInViewOptions
) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  // Determine if first argument is a ref or options
  const isFirstArgRef = targetOrOptions && 'current' in targetOrOptions;
  const target = isFirstArgRef ? targetOrOptions as React.RefObject<HTMLElement> : null;
  const finalOptions = isFirstArgRef ? options || {} : (targetOrOptions as UseInViewOptions) || {};
  const elementRef = target || ref;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: finalOptions.threshold || 0.1,
        rootMargin: finalOptions.rootMargin || '0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [finalOptions.threshold, finalOptions.rootMargin, elementRef]);

  return target ? isInView : { ref, isInView };
}
