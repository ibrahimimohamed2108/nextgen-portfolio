
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code, Server, Cloud, Wrench, Lightbulb, Monitor } from 'lucide-react';

interface TechCategory {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  technologies: string[];
  size: number;
  orbitRadius: number;
}

const TechSolarSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  const techData: TechCategory[] = [
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    // Clear any existing animations
    anime.remove('.planet, .moon');

    // Animate planets orbiting around the center
    techData.forEach((category, index) => {
      const planetSelector = `.planet-${index}`;
      
      // Planet orbital animation
      anime({
        targets: planetSelector,
        rotate: '360deg',
        duration: 15000 + (index * 3000), // Different speeds for each planet
        easing: 'linear',
        loop: true,
        delay: index * 500
      });

      // Moon orbital animations
      category.technologies.forEach((_, moonIndex) => {
        const moonSelector = `.moon-${index}-${moonIndex}`;
        
        anime({
          targets: moonSelector,
          rotate: '360deg',
          duration: 8000 + (moonIndex * 200), // Different speeds for each moon
          easing: 'linear',
          loop: true,
          delay: (index * 500) + (moonIndex * 100)
        });
      });
    });

    // Entrance animation for the entire system
    anime({
      targets: '.solar-system',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutElastic(1, .8)',
      delay: 500
    });

    // Stagger animation for planets
    anime({
      targets: '.planet-container',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(200, {start: 1000}),
      easing: 'easeOutBack(1.7)'
    });

  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack Solar System
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my technical universe where each planet represents a technology domain, 
            and moons orbit with the tools and frameworks within each category.
          </p>
        </div>

        {/* Solar System Container */}
        <div className="relative w-full max-w-6xl mx-auto">
          <div 
            className="solar-system relative mx-auto"
            style={{ width: '1200px', height: '1200px' }}
          >
            {/* Central Sun */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center z-20">
              <span className="text-white font-bold text-sm">ME</span>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>

            {/* Planets and their orbits */}
            {techData.map((category, planetIndex) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Orbit ring */}
                  <div 
                    className="absolute border border-gray-600/30 rounded-full"
                    style={{
                      width: category.orbitRadius * 2,
                      height: category.orbitRadius * 2,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                  
                  {/* Planet orbit container */}
                  <div 
                    className={`planet planet-${planetIndex} absolute`}
                    style={{
                      width: category.orbitRadius * 2,
                      height: category.orbitRadius * 2,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Planet */}
                    <div 
                      className="planet-container absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        width: category.size,
                        height: category.size
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-full shadow-lg flex items-center justify-center text-white font-semibold text-xs transition-transform hover:scale-110"
                        style={{ backgroundColor: category.color }}
                      >
                        <Icon size={category.size * 0.4} />
                      </div>
                      
                      {/* Planet label */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {category.name}
                      </div>

                      {/* Moons orbit around planet */}
                      {category.technologies.map((tech, moonIndex) => {
                        const moonOrbitRadius = category.size * 0.8 + (moonIndex % 3) * 20;
                        const moonSize = 16 - (moonIndex % 3) * 2;
                        
                        return (
                          <div
                            key={tech}
                            className={`moon moon-${planetIndex}-${moonIndex} absolute`}
                            style={{
                              width: moonOrbitRadius * 2,
                              height: moonOrbitRadius * 2,
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            <div 
                              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
                              style={{
                                width: moonSize,
                                height: moonSize
                              }}
                            >
                              <div 
                                className="w-full h-full rounded-full bg-gray-300 shadow-md transition-all hover:scale-125 hover:bg-white cursor-pointer"
                                title={tech}
                              />
                              
                              {/* Moon tooltip */}
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                                {tech}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {techData.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="flex items-center gap-2 text-white">
                <div 
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon size={10} />
                </div>
                <span className="text-sm">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechSolarSystem;
