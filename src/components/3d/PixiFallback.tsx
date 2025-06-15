
import { useEffect, useRef, useState } from 'react';
import { Application, Graphics, Text, Container, Ticker } from 'pixi.js';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface PixiFallbackProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
  onError?: () => void;
}

export const PixiFallback: React.FC<PixiFallbackProps> = ({
  currentSection,
  onSectionChange,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const sectionsRef = useRef<Container[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { theme } = useTheme();
  const { t } = useLanguage();

  const sections = [
    { key: 'hero', title: t('nav.about') || 'About', x: 400, y: 300, color: 0x3b82f6 },
    { key: 'experience', title: t('nav.experience') || 'Experience', x: 200, y: 200, color: 0x10b981 },
    { key: 'education', title: t('nav.education') || 'Education', x: 600, y: 400, color: 0xf59e0b },
    { key: 'skills', title: t('nav.skills') || 'Skills', x: 400, y: 150, color: 0x8b5cf6 },
    { key: 'contact', title: t('nav.contact') || 'Contact', x: 400, y: 450, color: 0xef4444 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const initPixi = async () => {
      try {
        console.log('Initializing PIXI.js fallback scene');
        
        const app = new Application();
        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: theme === 'dark' ? 0x000000 : 0xffffff,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        appRef.current = app;
        containerRef.current.appendChild(app.canvas);

        // Create animated sections
        sectionsRef.current = sections.map((sectionData, index) => {
          const sectionContainer = new Container();
          
          // Create panel background
          const panel = new Graphics();
          panel.rect(-120, -60, 240, 120);
          panel.fill({ color: sectionData.color, alpha: 0.7 });
          panel.stroke({ color: sectionData.color, width: 2 });
          
          // Create text
          const text = new Text({
            text: sectionData.title,
            style: {
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: 16,
              fill: theme === 'dark' ? 0xffffff : 0x000000,
              fontWeight: 'bold',
              align: 'center'
            }
          });
          text.anchor.set(0.5);
          
          sectionContainer.addChild(panel, text);
          sectionContainer.x = sectionData.x;
          sectionContainer.y = sectionData.y;
          sectionContainer.interactive = true;
          sectionContainer.cursor = 'pointer';
          
          // Click handler
          sectionContainer.on('pointerdown', () => onSectionChange(index));
          
          // Hover effects
          sectionContainer.on('pointerover', () => {
            sectionContainer.scale.set(1.1);
          });
          sectionContainer.on('pointerout', () => {
            if (index !== currentSection) {
              sectionContainer.scale.set(1);
            }
          });

          app.stage.addChild(sectionContainer);
          return sectionContainer;
        });

        // Animation loop
        let elapsed = 0;
        const ticker = Ticker.shared;
        ticker.add((delta) => {
          elapsed += delta.deltaTime;
          
          sectionsRef.current.forEach((section, index) => {
            // Floating animation
            section.y = sections[index].y + Math.sin(elapsed * 0.02 + index) * 10;
            
            // Gentle rotation
            section.rotation = Math.sin(elapsed * 0.01 + index) * 0.1;
          });
        });

        // Handle resize
        const handleResize = () => {
          app.renderer.resize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        setIsLoading(false);
        console.log('PIXI.js fallback initialized successfully');

        return () => {
          window.removeEventListener('resize', handleResize);
          ticker.destroy();
          app.destroy(true);
        };

      } catch (error) {
        console.error('Failed to initialize PIXI.js fallback:', error);
        setIsLoading(false);
        if (onError) onError();
      }
    };

    initPixi();
  }, [theme]);

  // Update active section
  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      const isActive = index === currentSection;
      section.scale.set(isActive ? 1.2 : 1);
      section.alpha = isActive ? 1 : 0.8;
    });
  }, [currentSection]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading Optimized 2D Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};
