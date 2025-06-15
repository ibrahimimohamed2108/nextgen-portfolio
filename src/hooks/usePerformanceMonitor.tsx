import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
}

export const usePerformanceMonitor = (componentName: string) => {
  const startTimeRef = useRef<number>();
  const metricsRef = useRef<PerformanceMetrics[]>([]);

  useEffect(() => {
    startTimeRef.current = performance.now();
    
    return () => {
      if (startTimeRef.current) {
        const renderTime = performance.now() - startTimeRef.current;
        
        metricsRef.current.push({
          renderTime,
          componentName
        });

        // Log slow renders in development
        if (process.env.NODE_ENV === 'development' && renderTime > 16) {
          console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
        }

        // Keep only last 100 metrics
        if (metricsRef.current.length > 100) {
          metricsRef.current = metricsRef.current.slice(-100);
        }
      }
    };
  });

  return {
    getMetrics: () => metricsRef.current,
    getAverageRenderTime: () => {
      const metrics = metricsRef.current.filter(m => m.componentName === componentName);
      return metrics.length > 0 
        ? metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length 
        : 0;
    }
  };
};
