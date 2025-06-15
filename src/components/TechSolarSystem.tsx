
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { techData } from '@/data/techStackData';
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

  const solarSystemVariants = {
    hidden: { 
      scale: 0.85, 
      opacity: 0,
      rotateY: -20
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 90,
        duration: 1.5,
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      <BackgroundStars />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack Solar System
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my technical universe where each planet represents a technology domain, 
            scattered beautifully across the cosmic landscape with their orbiting tools and frameworks.
          </p>
        </motion.div>

        {/* Solar System Container */}
        <div className="relative w-full max-w-6xl mx-auto">
          <motion.div 
            className="solar-system relative mx-auto"
            style={{ 
              width: '1200px', 
              height: '1200px',
              perspective: '1200px'
            }}
            variants={solarSystemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <CentralSun />

            {/* Planets with uniform distribution around the sun */}
            {techData.map((category, planetIndex) => (
              <TechPlanet
                key={category.name}
                category={category}
                planetIndex={planetIndex}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <TechLegend techData={techData} />
        </motion.div>
      </div>
    </section>
  );
};

export default TechSolarSystem;
