import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene3D } from './3d/Scene3D';
import { InteractiveTerminal } from './interactive/InteractiveTerminal';
import { ImmersiveStory } from './story/ImmersiveStory';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Contact from './Contact';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Layers3, MousePointer2, Sparkles } from 'lucide-react';

export const Portfolio3D = () => {
  const [view3D, setView3D] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const { t } = useLanguage();

  const sections = ['hero', 'experience', 'education', 'skills', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      if (!view3D) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const newSection = Math.floor(scrollPosition / windowHeight);
        setCurrentSection(Math.min(newSection, sections.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view3D]);

  const handleWebGLError = () => {
    setWebglError(true);
    setView3D(false);
  };

  const handle3DToggle = () => {
    if (webglError) {
      // Show a toast or alert that 3D is not available
      return;
    }
    setView3D(!view3D);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Header with 3D Toggle */}
      <Header />
      
      {/* 3D View Toggle Controls */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        <motion.button
          onClick={handle3DToggle}
          disabled={webglError}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border transition-all ${
            view3D 
              ? 'bg-primary text-primary-foreground border-primary' 
              : webglError
              ? 'bg-muted text-muted-foreground border-muted cursor-not-allowed'
              : 'bg-background/80 border-border hover:bg-primary/10'
          }`}
          whileHover={webglError ? {} : { scale: 1.05 }}
          whileTap={webglError ? {} : { scale: 0.95 }}
        >
          <Layers3 className="h-4 w-4" />
          <span className="text-sm font-medium">
            {webglError 
              ? (t('3d.unavailable') || '3D Unavailable')
              : view3D 
              ? (t('3d.exit') || 'Exit 3D') 
              : (t('3d.enter') || 'Enter 3D')
            }
          </span>
        </motion.button>

        <motion.button
          onClick={() => setShowStory(!showStory)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border transition-all ${
            showStory 
              ? 'bg-purple-600 text-white border-purple-600' 
              : 'bg-background/80 border-border hover:bg-purple-600/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">
            {showStory ? (t('story.exit') || 'Exit Story') : (t('story.enter') || 'Story Mode')}
          </span>
        </motion.button>
      </div>

      {/* 3D Instructions */}
      <AnimatePresence>
        {view3D && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-32 left-4 z-50 bg-background/90 backdrop-blur-md rounded-lg p-4 border max-w-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <MousePointer2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">{t('3d.controls') || 'Controls'}</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {t('3d.click') || 'Click sections to navigate'}</li>
              <li>• {t('3d.drag') || 'Drag to rotate view'}</li>
              <li>• {t('3d.terminal') || 'Use terminal for interactions'}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImmersiveStory />
          </motion.div>
        ) : view3D && !webglError ? (
          <motion.div
            key="3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen"
          >
            <Scene3D 
              currentSection={currentSection} 
              onSectionChange={setCurrentSection}
              onWebGLError={handleWebGLError}
            />
            
            {/* 3D Content Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="container mx-auto px-4 h-full flex items-center">
                <motion.div
                  className="max-w-md bg-background/90 backdrop-blur-md rounded-xl p-6 border pointer-events-auto"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {sections[currentSection] === 'hero' && (t('nav.about') || 'About')}
                    {sections[currentSection] === 'experience' && (t('nav.experience') || 'Experience')}
                    {sections[currentSection] === 'education' && (t('nav.education') || 'Education')}
                    {sections[currentSection] === 'skills' && (t('nav.skills') || 'Skills')}
                    {sections[currentSection] === 'contact' && (t('nav.contact') || 'Contact')}
                  </h2>
                  <p className="text-muted-foreground">
                    {sections[currentSection] === 'hero' && (t('hero.description') || 'Passionate engineering student focused on innovation and technology.')}
                    {sections[currentSection] === 'experience' && (t('experience.description') || 'Professional experience in software development and project management.')}
                    {sections[currentSection] === 'education' && (t('education.title') || 'Academic journey and continuous learning path.')}
                    {sections[currentSection] === 'skills' && (t('skills.description') || 'Technical expertise and professional competencies.')}
                    {sections[currentSection] === 'contact' && (t('contact.description') || 'Get in touch for collaborations and opportunities.')}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="2d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <main>
              <Hero />
              <Experience />
              <Education />
              <Skills />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Terminal - Always Available */}
      <InteractiveTerminal />

      {/* View Mode Indicator */}
      <div className="fixed bottom-4 left-4 z-50">
        <motion.div
          className="flex items-center gap-2 px-3 py-2 bg-background/90 backdrop-blur-md rounded-full border text-sm"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: view3D || showStory 
              ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 8px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
              : 'none'
          }}
          transition={{ duration: 2, repeat: view3D || showStory ? Infinity : 0 }}
        >
          <Eye className="h-4 w-4 text-primary" />
          <span className="font-medium">
            {showStory ? (t('story.mode') || 'Story Mode') : view3D ? (t('3d.mode') || '3D Mode') : (t('2d.mode') || '2D Mode')}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
