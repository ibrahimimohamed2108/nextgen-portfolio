
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (
  target?: React.RefObject<HTMLElement>,
  options: UseInViewOptions = {}
) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const elementRef = target || ref;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
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
  }, [options.threshold, options.rootMargin, elementRef]);

  return target ? isInView : { ref, isInView };
};
