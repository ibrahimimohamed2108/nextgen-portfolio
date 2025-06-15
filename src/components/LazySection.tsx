
import { Suspense, lazy, ComponentType } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  componentImport: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const LazySection = ({ 
  componentImport, 
  fallback, 
  className = '',
  ...props 
}: LazySectionProps) => {
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: '100px',
    freezeOnceVisible: true
  });

  const LazyComponent = lazy(componentImport);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {isInView && (
        <ErrorBoundary>
          <Suspense fallback={fallback || <LoadingSpinner text="Loading section..." />}>
            <LazyComponent {...props} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default LazySection;
