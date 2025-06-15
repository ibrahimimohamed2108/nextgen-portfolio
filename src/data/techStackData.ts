
import { Code, Server, Cloud, Wrench, Lightbulb, Monitor } from 'lucide-react';
import { TechCategory } from '@/types/techStack';

export const techData: TechCategory[] = [
  {
    name: 'Frontend',
    icon: Monitor,
    color: '#3B82F6', // Blue
    technologies: ['React', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', '@react-three/fiber', '@pixi/react', 'PixiJS', 'Drei'],
    size: 80,
    orbitRadius: 150
  },
  {
    name: '3D & Visuals',
    icon: Code,
    color: '#8B5CF6', // Purple
    technologies: ['Three.js', 'Drei Effects', 'Floating Panels', 'OrbitControls', 'ParticleField', 'WebGL', 'WebGPU', 'Babylon.js'],
    size: 70,
    orbitRadius: 220
  },
  {
    name: 'Backend & Infra',
    icon: Server,
    color: '#10B981', // Green
    technologies: ['Node.js', 'npm', 'MySQL', 'Apache2', 'PHP', 'LDAP', 'Active Directory'],
    size: 75,
    orbitRadius: 290
  },
  {
    name: 'DevOps & Cloud',
    icon: Cloud,
    color: '#F59E0B', // Amber
    technologies: ['AWS', 'Jenkins', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD'],
    size: 65,
    orbitRadius: 360
  },
  {
    name: 'Tools & Utilities',
    icon: Wrench,
    color: '#EF4444', // Red
    technologies: ['Git', 'GitHub', 'GLPI', 'Mercator', 'OpenProject'],
    size: 60,
    orbitRadius: 430
  },
  {
    name: 'Concepts & Methods',
    icon: Lightbulb,
    color: '#06B6D4', // Cyan
    technologies: ['Agile', 'Scrum', 'Sprint Planning', 'OOP', 'Software Design Patterns', 'Automation', 'Infrastructure as Code'],
    size: 55,
    orbitRadius: 500
  }
];
