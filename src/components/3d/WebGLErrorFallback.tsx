
import { AlertTriangle, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface WebGLErrorFallbackProps {
  onFallbackTo2D: () => void;
}

export const WebGLErrorFallback: React.FC<WebGLErrorFallbackProps> = ({ onFallbackTo2D }) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {t('webgl.error.title') || '3D Not Available'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('webgl.error.description') || 'Your browser does not support WebGL or it has been disabled. This is required for 3D features.'}
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={onFallbackTo2D} className="w-full">
            <Monitor className="h-4 w-4 mr-2" />
            {t('webgl.fallback.button') || 'Switch to 2D View'}
          </Button>
          
          <div className="text-xs text-muted-foreground">
            <p className="mb-2">{t('webgl.help.title') || 'To enable 3D features:'}</p>
            <ul className="text-left space-y-1">
              <li>• {t('webgl.help.update') || 'Update your browser'}</li>
              <li>• {t('webgl.help.hardware') || 'Enable hardware acceleration'}</li>
              <li>• {t('webgl.help.extensions') || 'Check browser extensions'}</li>
              <li>• {t('webgl.help.browser') || 'Try a different browser'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
