
import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import Header from './Header';
import Hero from './Hero';
import { ParticleBackground } from './ParticleBackground';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Lazy load heavy components
const Experience = lazy(() => import('./Experience'));
const Education = lazy(() => import('./Education'));
const Skills = lazy(() => import('./Skills'));
const Contact = lazy(() => import('./Contact'));
const Projects = lazy(() => import('./Projects'));
const Gallery3D = lazy(() => import('./Gallery3D'));
const TechSolarSystem = lazy(() => import('./TechSolarSystem'));
const InteractiveTerminal = lazy(() => import('./interactive/InteractiveTerminal').then(module => ({ default: module.InteractiveTerminal })));
const ImmersiveStory = lazy(() => import('./story/ImmersiveStory').then(module => ({ default: module.ImmersiveStory })));

const Portfolio3D = () => {
  usePerformanceMonitor('Portfolio3D');
  
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { component: Hero, id: 'hero', lazy: false },
    { component: ImmersiveStory, id: 'story', lazy: true },
    { component: Experience, id: 'experience', lazy: true },
    { component: Education, id: 'education', lazy: true },
    { component: Skills, id: 'skills', lazy: true },
    { component: TechSolarSystem, id: 'tech-stack', lazy: true },
    { component: Gallery3D, id: 'gallery3d', lazy: true },
    { component: Projects, id: 'projects', lazy: true },
    { component: Contact, id: 'contact', lazy: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.round(scrollPosition / windowHeight);
      
      if (newSection !== currentSection && newSection >= 0 && newSection < sections.length) {
        setCurrentSection(newSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, isScrolling, sections.length]);

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      setIsScrolling(true);
      setCurrentSection(sectionIndex);
      
      window.scrollTo({
        top: sectionIndex * window.innerHeight,
        behavior: 'smooth'
      });

      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const renderSection = (Section: any, index: number, isLazy: boolean) => {
    if (isLazy) {
      return (
        <ErrorBoundary fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground">Failed to load section</p>
          </div>
        }>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner text="Loading section..." />
            </div>
          }>
            <Section.component />
          </Suspense>
        </ErrorBoundary>
      );
    }
    
    return <Section.component />;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      
      <Header />

      <main className="relative z-10">
        {sections.map((Section, index) => (
          <motion.section
            key={Section.id}
            id={Section.id}
            className="relative w-full"
            style={{ 
              minHeight: index === 1 ? 'auto' : '100vh',
              paddingTop: index === 0 ? '0' : '0',
              isolation: 'isolate'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative z-10">
              {renderSection(Section, index, Section.lazy)}
            </div>
          </motion.section>
        ))}
      </main>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <InteractiveTerminal />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Portfolio3D;
