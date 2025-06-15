
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Vector3, Color } from 'three';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Scene3DProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
}

const CameraController = ({ currentSection }: { currentSection: number }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3());
  
  const positions = [
    new Vector3(0, 0, 10), // Hero
    new Vector3(-8, 2, 6), // Experience
    new Vector3(8, -2, 6), // Education
    new Vector3(0, 8, 4), // Skills
    new Vector3(0, -8, 4), // Contact
  ];

  useFrame(() => {
    const target = positions[currentSection] || positions[0];
    targetPosition.current.lerp(target, 0.02);
    camera.position.copy(targetPosition.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const FloatingSection = ({ 
  position, 
  children, 
  isActive 
}: { 
  position: [number, number, number]; 
  children: React.ReactNode;
  isActive: boolean;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <mesh>
          <boxGeometry args={[4, 3, 0.2]} />
          <meshStandardMaterial 
            color={isActive ? (theme === 'dark' ? '#3b82f6' : '#1e40af') : (theme === 'dark' ? '#1f2937' : '#f3f4f6')}
            transparent
            opacity={0.8}
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

export const Scene3D: React.FC<Scene3DProps> = ({ currentSection, onSectionChange }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const sections = [
    { key: 'hero', title: t('nav.about'), position: [0, 0, 0] as [number, number, number] },
    { key: 'experience', title: t('nav.experience'), position: [-8, 2, 0] as [number, number, number] },
    { key: 'education', title: t('nav.education'), position: [8, -2, 0] as [number, number, number] },
    { key: 'skills', title: t('nav.skills'), position: [0, 6, 0] as [number, number, number] },
    { key: 'contact', title: t('nav.contact'), position: [0, -6, 0] as [number, number, number] },
  ];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color={theme === 'dark' ? '#3b82f6' : '#1e40af'} />
          
          <ParticleField />
          
          {sections.map((section, index) => (
            <FloatingSection
              key={section.key}
              position={section.position}
              isActive={currentSection === index}
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
