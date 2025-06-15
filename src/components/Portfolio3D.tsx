
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Contact from './Contact';
import Projects from './Projects';
import Gallery3D from './Gallery3D';
import { InteractiveTerminal } from './interactive/InteractiveTerminal';
import { ParticleBackground } from './ParticleBackground';
import { ImmersiveStory } from './story/ImmersiveStory';

const Portfolio3D = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { component: Hero, id: 'hero' },
    { component: ImmersiveStory, id: 'story' },
    { component: Experience, id: 'experience' },
    { component: Education, id: 'education' },
    { component: Skills, id: 'skills' },
    { component: Gallery3D, id: 'gallery3d' },
    { component: Projects, id: 'projects' },
    { component: Contact, id: 'contact' },
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

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      
      <Header />

      <main className="relative z-10">
        {sections.map((Section, index) => (
          <section
            key={Section.id}
            id={Section.id}
            className="relative w-full"
            style={{ 
              minHeight: index === 1 ? 'auto' : '100vh',
              paddingTop: index === 0 ? '0' : '0',
              isolation: 'isolate'
            }}
          >
            <div className="relative z-10">
              <Section.component />
            </div>
          </section>
        ))}
      </main>

      <InteractiveTerminal />
    </div>
  );
};

export default Portfolio3D;
