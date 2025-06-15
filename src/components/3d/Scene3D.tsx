
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, PerspectiveCamera, Stars, Cloud, Sparkles } from '@react-three/drei';
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
    { pos: new Vector3(0, 0, 12), lookAt: new Vector3(0, 0, 0) }, // Hero
    { pos: new Vector3(-10, 3, 8), lookAt: new Vector3(-8, 2, 0) }, // Experience
    { pos: new Vector3(10, -3, 8), lookAt: new Vector3(8, -2, 0) }, // Education
    { pos: new Vector3(0, 10, 6), lookAt: new Vector3(0, 6, 0) }, // Skills
    { pos: new Vector3(0, -10, 6), lookAt: new Vector3(0, -6, 0) }, // Contact
  ];

  useFrame(() => {
    const target = positions[currentSection] || positions[0];
    targetPosition.current.lerp(target.pos, 0.03);
    targetLookAt.current.lerp(target.lookAt, 0.03);
    
    camera.position.copy(targetPosition.current);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

const FloatingSection = ({ 
  position, 
  children, 
  isActive,
  onClick,
  sectionIndex 
}: { 
  position: [number, number, number]; 
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  sectionIndex: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Different rotation speeds for each section
      meshRef.current.rotation.y += 0.002 + (sectionIndex * 0.001);
      meshRef.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.5 + sectionIndex) * 0.002;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3 + sectionIndex * 0.5) * 0.02;
      
      // Enhanced scale effect
      const targetScale = isActive ? 1.2 : hovered ? 1.08 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const sectionColors = [
    '#3b82f6', // Blue for Hero
    '#10b981', // Green for Experience  
    '#f59e0b', // Orange for Education
    '#8b5cf6', // Purple for Skills
    '#ef4444', // Red for Contact
  ];

  return (
    <Float speed={1.5 + sectionIndex * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        ref={meshRef} 
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main panel */}
        <mesh>
          <boxGeometry args={[4.5, 3.5, 0.3]} />
          <meshStandardMaterial 
            color={isActive ? sectionColors[sectionIndex] : (theme === 'dark' ? '#1f2937' : '#f3f4f6')}
            transparent
            opacity={isActive ? 0.9 : hovered ? 0.8 : 0.7}
            roughness={0.1}
            metalness={0.3}
            emissive={isActive ? sectionColors[sectionIndex] : '#000000'}
            emissiveIntensity={isActive ? 0.1 : 0}
          />
        </mesh>
        
        {/* Glowing edge effect */}
        {isActive && (
          <mesh>
            <boxGeometry args={[4.7, 3.7, 0.1]} />
            <meshBasicMaterial 
              color={sectionColors[sectionIndex]}
              transparent
              opacity={0.3}
            />
          </mesh>
        )}
        
        {/* Content container */}
        <group position={[0, 0, 0.2]}>
          {children}
        </group>
        
        {/* Sparkles around active section */}
        {isActive && (
          <Sparkles 
            count={50} 
            scale={8} 
            size={3} 
            speed={0.5}
            color={sectionColors[sectionIndex]}
          />
        )}
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
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (textRef.current && hovered) {
      textRef.current.position.y += Math.sin(state.clock.elapsedTime * 3) * 0.01;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={size}
      color={hovered ? '#3b82f6' : (theme === 'dark' ? '#ffffff' : '#000000')}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      font="/fonts/inter-medium.woff"
      outlineWidth={hovered ? 0.01 : 0}
      outlineColor="#3b82f6"
    >
      {text}
    </Text>
  );
};

const EnhancedParticleField = () => {
  const { theme } = useTheme();
  const particlesRef = useRef<THREE.Points>(null);
  const particlePositions = useRef<Float32Array>();
  
  const particleCount = 2000;
  
  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a more interesting distribution
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    particlePositions.current = positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current && particlePositions.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0003;
      
      // Animate individual particles
      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions.current[i] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
        particlePositions.current[i + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.001;
      }
      
      if (particlesRef.current.geometry.attributes.position) {
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlePositions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={theme === 'dark' ? '#3b82f6' : '#1e40af'}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
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

  if (webglSupported === null) {
    return <LoadingSpinner />;
  }

  if (!webglSupported || renderError) {
    return (
      <WebGLErrorFallback 
        onFallbackTo2D={onWebGLError || (() => {})} 
      />
    );
  }

  const sections = [
    { key: 'hero', title: t('nav.about') || 'About', position: [0, 0, 0] as [number, number, number] },
    { key: 'experience', title: t('nav.experience') || 'Experience', position: [-8, 3, 0] as [number, number, number] },
    { key: 'education', title: t('nav.education') || 'Education', position: [8, -3, 0] as [number, number, number] },
    { key: 'skills', title: t('nav.skills') || 'Skills', position: [0, 7, 0] as [number, number, number] },
    { key: 'contact', title: t('nav.contact') || 'Contact', position: [0, -7, 0] as [number, number, number] },
  ];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: true
        }}
        camera={{ position: [0, 0, 12], fov: 60 }}
        onCreated={(state) => {
          console.log('Canvas created successfully');
          state.gl.setClearColor(new THREE.Color(theme === 'dark' ? '#000000' : '#ffffff'), 0);
        }}
        onError={handleCanvasError}
        fallback={<WebGLErrorFallback onFallbackTo2D={onWebGLError || (() => {})} />}
        performance={{ min: 0.8 }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Environment */}
          <Environment preset="city" />
          <fog attach="fog" args={[theme === 'dark' ? '#000000' : '#ffffff', 20, 100]} />
          
          {/* Camera setup */}
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            maxDistance={25}
            minDistance={5}
            autoRotate={false}
            dampingFactor={0.05}
            enableDamping={true}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color={theme === 'dark' ? '#3b82f6' : '#1e40af'} />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
            color="#ffffff"
          />
          
          {/* Background Elements */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <EnhancedParticleField />
          
          {/* Floating clouds for atmosphere */}
          <Cloud
            position={[-20, 10, -20]}
            speed={0.2}
            opacity={0.3}
            width={10}
            depth={1.5}
            segments={20}
          />
          <Cloud
            position={[20, -10, -20]}
            speed={0.3}
            opacity={0.2}
            width={8}
            depth={1.5}
            segments={15}
          />
          
          {/* Interactive Sections */}
          {sections.map((section, index) => (
            <FloatingSection
              key={section.key}
              position={section.position}
              isActive={currentSection === index}
              onClick={() => onSectionChange(index)}
              sectionIndex={index}
            >
              <InteractiveText
                text={section.title}
                position={[0, 0, 0]}
                size={0.5}
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
