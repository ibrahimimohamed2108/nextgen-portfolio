
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { isWebGLAvailable } from '@/utils/webglUtils';
import { WebGLErrorFallback } from './WebGLErrorFallback';

interface Scene3DProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
  onWebGLError?: () => void;
}

const CameraController = ({ currentSection }: { currentSection: number }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  
  const positions = [
    { pos: new Vector3(0, 0, 10), lookAt: new Vector3(0, 0, 0) }, // Hero
    { pos: new Vector3(-8, 2, 6), lookAt: new Vector3(-8, 2, 0) }, // Experience
    { pos: new Vector3(8, -2, 6), lookAt: new Vector3(8, -2, 0) }, // Education
    { pos: new Vector3(0, 8, 4), lookAt: new Vector3(0, 6, 0) }, // Skills
    { pos: new Vector3(0, -8, 4), lookAt: new Vector3(0, -6, 0) }, // Contact
  ];

  useFrame(() => {
    const target = positions[currentSection] || positions[0];
    targetPosition.current.lerp(target.pos, 0.05);
    targetLookAt.current.lerp(target.lookAt, 0.05);
    
    camera.position.copy(targetPosition.current);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

const FloatingSection = ({ 
  position, 
  children, 
  isActive,
  onClick 
}: { 
  position: [number, number, number]; 
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
      
      // Scale effect for active/hovered sections
      const targetScale = isActive ? 1.1 : hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group 
        ref={meshRef} 
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <boxGeometry args={[4, 3, 0.2]} />
          <meshStandardMaterial 
            color={isActive ? (theme === 'dark' ? '#3b82f6' : '#1e40af') : (theme === 'dark' ? '#1f2937' : '#f3f4f6')}
            transparent
            opacity={isActive ? 0.9 : hovered ? 0.7 : 0.6}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        <group position={[0, 0, 0.2]}>
          {children}
        </group>
      </group>
    </Float>
  );
};

const InteractiveText = ({ 
  text, 
  position, 
  size = 0.3,
  onClick 
}: { 
  text: string; 
  position: [number, number, number];
  size?: number;
  onClick?: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <Text
      position={position}
      fontSize={size}
      color={hovered ? '#3b82f6' : (theme === 'dark' ? '#ffffff' : '#000000')}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      font="/fonts/inter-medium.woff"
    >
      {text}
    </Text>
  );
};

const ParticleField = () => {
  const { theme } = useTheme();
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={theme === 'dark' ? '#3b82f6' : '#1e40af'}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading 3D Scene...</p>
      </div>
    </div>
  );
};

export const Scene3D: React.FC<Scene3DProps> = ({ currentSection, onSectionChange, onWebGLError }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    const checkWebGL = () => {
      const supported = isWebGLAvailable();
      console.log('WebGL Support Check:', supported);
      setWebglSupported(supported);
      
      if (!supported && onWebGLError) {
        onWebGLError();
      }
    };

    checkWebGL();
  }, [onWebGLError]);

  const handleCanvasError = (error: any) => {
    console.error('Canvas creation failed:', error);
    setRenderError(true);
    if (onWebGLError) {
      onWebGLError();
    }
  };

  // Show loading while checking WebGL support
  if (webglSupported === null) {
    return <LoadingSpinner />;
  }

  // Show error fallback if WebGL is not supported or canvas creation failed
  if (!webglSupported || renderError) {
    return (
      <WebGLErrorFallback 
        onFallbackTo2D={onWebGLError || (() => {})} 
      />
    );
  }

  const sections = [
    { key: 'hero', title: t('nav.about') || 'About', position: [0, 0, 0] as [number, number, number] },
    { key: 'experience', title: t('nav.experience') || 'Experience', position: [-8, 2, 0] as [number, number, number] },
    { key: 'education', title: t('nav.education') || 'Education', position: [8, -2, 0] as [number, number, number] },
    { key: 'skills', title: t('nav.skills') || 'Skills', position: [0, 6, 0] as [number, number, number] },
    { key: 'contact', title: t('nav.contact') || 'Contact', position: [0, -6, 0] as [number, number, number] },
  ];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        camera={{ position: [0, 0, 10], fov: 75 }}
        onCreated={(state) => {
          console.log('Canvas created successfully');
          // Additional check when canvas is created
          if (!state.gl.getContext()) {
            handleCanvasError('No WebGL context available');
          }
        }}
        onError={handleCanvasError}
        fallback={<WebGLErrorFallback onFallbackTo2D={onWebGLError || (() => {})} />}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            enableRotate={true}
            maxDistance={15}
            minDistance={3}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color={theme === 'dark' ? '#3b82f6' : '#1e40af'} />
          
          <ParticleField />
          
          {sections.map((section, index) => (
            <FloatingSection
              key={section.key}
              position={section.position}
              isActive={currentSection === index}
              onClick={() => onSectionChange(index)}
            >
              <InteractiveText
                text={section.title}
                position={[0, 0, 0]}
                size={0.4}
                onClick={() => onSectionChange(index)}
              />
            </FloatingSection>
          ))}
          
          <CameraController currentSection={currentSection} />
        </Suspense>
      </Canvas>
    </div>
  );
};
