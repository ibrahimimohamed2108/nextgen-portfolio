

import { useEffect, useRef, useState } from 'react';
import { 
  Engine, 
  Scene, 
  Vector3, 
  HemisphericLight, 
  DirectionalLight, 
  Color3, 
  Color4,
  MeshBuilder, 
  StandardMaterial, 
  Animation, 
  BezierCurveEase, 
  FreeCamera,
  ActionManager,
  ExecuteCodeAction
} from '@babylonjs/core';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraphicsCapabilities } from '@/utils/webgpuUtils';

interface BabylonSceneProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
  capabilities: GraphicsCapabilities;
  onError?: () => void;
}

export const BabylonScene: React.FC<BabylonSceneProps> = ({
  currentSection,
  onSectionChange,
  capabilities,
  onError
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const cameraRef = useRef<FreeCamera | null>(null);
  const sectionsRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { theme } = useTheme();
  const { t } = useLanguage();

  const sections = [
    { key: 'hero', title: t('nav.about') || 'About', position: new Vector3(0, 0, 0), color: '#3b82f6' },
    { key: 'experience', title: t('nav.experience') || 'Experience', position: new Vector3(-8, 3, 0), color: '#10b981' },
    { key: 'education', title: t('nav.education') || 'Education', position: new Vector3(8, -3, 0), color: '#f59e0b' },
    { key: 'skills', title: t('nav.skills') || 'Skills', position: new Vector3(0, 7, 0), color: '#8b5cf6' },
    { key: 'contact', title: t('nav.contact') || 'Contact', position: new Vector3(0, -7, 0), color: '#ef4444' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const initScene = async () => {
      try {
        console.log('Initializing Babylon.js scene with capabilities:', capabilities);
        
        // Create engine with appropriate settings
        const engineOptions = {
          antialias: true,
          stencil: true,
          preserveDrawingBuffer: false,
          premultipliedAlpha: false,
          alpha: true,
          powerPreference: capabilities.performanceLevel === 'high' ? 'high-performance' as const : 'default' as const
        };

        const engine = new Engine(canvasRef.current, true, engineOptions);
        engineRef.current = engine;

        // Create scene
        const scene = new Scene(engine);
        sceneRef.current = scene;
        
        // Set background color based on theme
        scene.clearColor = new Color4(
          theme === 'dark' ? 0 : 1,
          theme === 'dark' ? 0 : 1,
          theme === 'dark' ? 0 : 1,
          1
        );

        // Create camera
        const camera = new FreeCamera('camera', new Vector3(0, 0, 12), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvasRef.current, true);
        cameraRef.current = camera;

        // Enhanced lighting setup
        const ambientLight = new HemisphericLight('ambientLight', new Vector3(0, 1, 0), scene);
        ambientLight.intensity = 0.6;

        const directionalLight = new DirectionalLight('directionalLight', new Vector3(-1, -1, -1), scene);
        directionalLight.intensity = 0.8;
        directionalLight.diffuse = new Color3(1, 1, 1);

        // Create floating sections
        sectionsRef.current = sections.map((sectionData, index) => {
          // Main panel
          const panel = MeshBuilder.CreateBox(`panel-${index}`, { 
            width: 4.5, 
            height: 3.5, 
            depth: 0.3 
          }, scene);
          
          panel.position = sectionData.position.clone();
          
          // Material with theme-based colors
          const material = new StandardMaterial(`material-${index}`, scene);
          material.diffuseColor = Color3.FromHexString(sectionData.color);
          material.emissiveColor = Color3.FromHexString(sectionData.color).scale(0.1);
          material.specularColor = new Color3(0.3, 0.3, 0.3);
          panel.material = material;

          // Add click interaction
          panel.actionManager = new ActionManager(scene);
          panel.actionManager.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => onSectionChange(index)
          ));

          // Floating animation
          const animationFloat = Animation.CreateAndStartAnimation(
            `float-${index}`,
            panel,
            'position.y',
            30,
            120,
            panel.position.y,
            panel.position.y + 0.5,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          // Rotation animation
          const animationRotation = Animation.CreateAndStartAnimation(
            `rotate-${index}`,
            panel,
            'rotation.y',
            30,
            300 + index * 100,
            0,
            Math.PI * 2,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          return {
            mesh: panel,
            material,
            index,
            sectionData
          };
        });

        // Render loop
        engine.runRenderLoop(() => {
          if (scene && !scene.isDisposed) {
            scene.render();
          }
        });

        // Handle resize
        const handleResize = () => {
          engine.resize();
        };
        window.addEventListener('resize', handleResize);

        setIsLoading(false);
        console.log('Babylon.js scene initialized successfully');

        return () => {
          window.removeEventListener('resize', handleResize);
          scene.dispose();
          engine.dispose();
        };

      } catch (error) {
        console.error('Failed to initialize Babylon.js scene:', error);
        setIsLoading(false);
        if (onError) onError();
      }
    };

    initScene();
  }, [theme, capabilities]);

  // Update active section highlighting
  useEffect(() => {
    if (!sectionsRef.current.length) return;

    sectionsRef.current.forEach((section, index) => {
      if (section.material) {
        const isActive = index === currentSection;
        const baseColor = Color3.FromHexString(section.sectionData.color);
        
        section.material.emissiveColor = isActive 
          ? baseColor.scale(0.3)
          : baseColor.scale(0.1);
        
        // Scale animation for active section
        const targetScale = isActive ? 1.2 : 1;
        Animation.CreateAndStartAnimation(
          `scale-${index}`,
          section.mesh,
          'scaling',
          30,
          30,
          section.mesh.scaling,
          new Vector3(targetScale, targetScale, targetScale),
          Animation.ANIMATIONLOOPMODE_CONSTANT
        );
      }
    });
  }, [currentSection]);

  // Camera transitions
  useEffect(() => {
    if (!cameraRef.current || !sectionsRef.current.length) return;

    const camera = cameraRef.current;
    const targetSection = sectionsRef.current[currentSection];
    
    if (targetSection) {
      const targetPosition = targetSection.sectionData.position.clone();
      targetPosition.z += 8; // Offset from the panel
      
      // Smooth camera transition
      Animation.CreateAndStartAnimation(
        'cameraMove',
        camera,
        'position',
        60,
        60,
        camera.position,
        targetPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT,
        new BezierCurveEase(0.25, 0.1, 0.25, 1)
      );
    }
  }, [currentSection]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Initializing Advanced 3D Scene...</p>
        </div>
      </div>
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 w-full h-full"
      style={{ 
        width: '100%', 
        height: '100%',
        touchAction: 'none'
      }}
    />
  );
};

