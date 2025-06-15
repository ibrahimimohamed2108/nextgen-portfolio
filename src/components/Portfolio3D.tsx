
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Contact from './Contact';
import Projects from './Projects';
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
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <Header />

      <main className="relative z-10">
        {sections.map((Section, index) => (
          <div
            key={Section.id}
            className="min-h-screen"
            style={{ height: index === 1 ? 'auto' : '100vh' }} // Story section has auto height for scrolling
          >
            <Section.component />
          </div>
        ))}
      </main>

      <InteractiveTerminal />
    </div>
  );
};

export default Portfolio3D;
