
import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { detectGraphicsCapabilities, getOptimalRenderer, type GraphicsCapabilities } from '@/utils/webgpuUtils';
import { WebGLErrorFallback } from './WebGLErrorFallback';

// Lazy load components for better performance
const BabylonScene = lazy(() => import('./BabylonScene').then(m => ({ default: m.BabylonScene })));
const PixiFallback = lazy(() => import('./PixiFallback').then(m => ({ default: m.PixiFallback })));

interface ModernScene3DProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
  onWebGLError?: () => void;
}

const LoadingSpinner = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-0 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

export const ModernScene3D: React.FC<ModernScene3DProps> = ({
  currentSection,
  onSectionChange,
  onWebGLError
}) => {
  const [capabilities, setCapabilities] = useState<GraphicsCapabilities | null>(null);
  const [renderer, setRenderer] = useState<'webgpu' | 'webgl' | 'canvas' | 'error'>('webgpu');
  const [isInitializing, setIsInitializing] = useState(true);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const initializeGraphics = async () => {
      console.log('Detecting graphics capabilities...');
      setIsInitializing(true);
      
      try {
        const caps = await detectGraphicsCapabilities();
        setCapabilities(caps);
        
        const optimalRenderer = getOptimalRenderer(caps);
        console.log('Optimal renderer selected:', optimalRenderer);
        setRenderer(optimalRenderer);
        
        if (optimalRenderer === 'canvas' && onWebGLError) {
          console.log('Falling back to 2D due to limited graphics support');
        }
        
      } catch (error) {
        console.error('Graphics initialization failed:', error);
        setRenderer('error');
        if (onWebGLError) onWebGLError();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeGraphics();
  }, [onWebGLError]);

  const handleRenderError = () => {
    console.log('Renderer failed, attempting fallback...');
    
    if (renderer === 'webgpu') {
      setRenderer('webgl');
    } else if (renderer === 'webgl') {
      setRenderer('canvas');
    } else {
      setRenderer('error');
      if (onWebGLError) onWebGLError();
    }
  };

  if (isInitializing || !capabilities) {
    return <LoadingSpinner message={t('3d.initializing') || 'Initializing Graphics...'} />;
  }

  if (renderer === 'error') {
    return (
      <WebGLErrorFallback 
        onFallbackTo2D={onWebGLError || (() => {})} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={<LoadingSpinner message={t('3d.loading') || 'Loading 3D Scene...'} />}>
        {renderer === 'webgpu' || renderer === 'webgl' ? (
          <BabylonScene
            currentSection={currentSection}
            onSectionChange={onSectionChange}
            capabilities={capabilities}
            onError={handleRenderError}
          />
        ) : (
          <PixiFallback
            currentSection={currentSection}
            onSectionChange={onSectionChange}
            onError={handleRenderError}
          />
        )}
      </Suspense>
      
      {/* Performance indicator */}
      <motion.div
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-background/90 backdrop-blur-sm rounded-lg border text-xs"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full ${
              renderer === 'webgpu' ? 'bg-green-500' :
              renderer === 'webgl' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
          />
          <span className="font-medium">
            {renderer === 'webgpu' ? 'WebGPU' :
             renderer === 'webgl' ? 'WebGL' : '2D Canvas'}
          </span>
          <span className="text-muted-foreground">
            {capabilities.performanceLevel}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
