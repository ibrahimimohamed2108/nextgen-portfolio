
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, RotateCcw, ZoomIn, ZoomOut, Move, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedControlsProps {
  show: boolean;
  onHide: () => void;
}

export const EnhancedControls: React.FC<EnhancedControlsProps> = ({ show, onHide }) => {
  const { t } = useLanguage();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (show) {
      // Auto-hide after 8 seconds
      timeoutRef.current = setTimeout(() => {
        onHide();
      }, 8000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [show, onHide]);

  const controls = [
    {
      icon: Hand,
      title: t('3d.controls.click') || 'Click & Navigate',
      description: t('3d.controls.clickDesc') || 'Click on floating sections to navigate'
    },
    {
      icon: RotateCcw,
      title: t('3d.controls.rotate') || 'Rotate View',
      description: t('3d.controls.rotateDesc') || 'Drag to rotate the camera around the scene'
    },
    {
      icon: ZoomIn,
      title: t('3d.controls.zoom') || 'Zoom',
      description: t('3d.controls.zoomDesc') || 'Scroll wheel to zoom in and out'
    },
    {
      icon: Move,
      title: t('3d.controls.pan') || 'Pan View',
      description: t('3d.controls.panDesc') || 'Right-click and drag to pan the view'
    }
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-32 left-4 z-50 bg-background/95 backdrop-blur-md rounded-xl p-6 border shadow-2xl max-w-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">
                {t('3d.controls.title') || '3D Controls'}
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onHide}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-3">
            {controls.map((control, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <control.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{control.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {control.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              {t('3d.controls.tip') || 'Tip: This panel will auto-hide in a few seconds'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
