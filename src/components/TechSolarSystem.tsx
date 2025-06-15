
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { techData } from '@/data/techStackData';
import { createPlanetAnimations, createEntranceAnimations } from '@/utils/solarSystemAnimations';
import BackgroundStars from './solarSystem/BackgroundStars';
import CentralSun from './solarSystem/CentralSun';
import TechPlanet from './solarSystem/TechPlanet';
import TechLegend from './solarSystem/TechLegend';

const TechSolarSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

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

    createPlanetAnimations(techData);
    createEntranceAnimations();
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      <BackgroundStars />

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
            <CentralSun />

            {/* Planets and their orbits */}
            {techData.map((category, planetIndex) => (
              <TechPlanet
                key={category.name}
                category={category}
                planetIndex={planetIndex}
              />
            ))}
          </div>
        </div>

        <TechLegend techData={techData} />
      </div>
    </section>
  );
};

export default TechSolarSystem;
