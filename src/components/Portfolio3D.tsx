
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene3D } from './3d/Scene3D';
import { EnhancedControls } from './3d/EnhancedControls';
import { InteractiveTerminal } from './interactive/InteractiveTerminal';
import { ImmersiveStory } from './story/ImmersiveStory';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Contact from './Contact';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Layers3, MousePointer2, Sparkles, AlertCircle, Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const Portfolio3D = () => {
  const [view3D, setView3D] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

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
    console.log('WebGL Error detected, falling back to 2D');
    setWebglError(true);
    setView3D(false);
    
    toast({
      title: "3D Mode Unavailable",
      description: "Your browser doesn't support WebGL. Switched to 2D mode.",
      variant: "destructive",
    });
  };

  const handle3DToggle = () => {
    if (webglError) {
      toast({
        title: "3D Not Available",
        description: "WebGL is not supported on your device or browser.",
        variant: "destructive",
      });
      return;
    }
    
    const newView3D = !view3D;
    setView3D(newView3D);
    
    if (newView3D) {
      setShowControls(true);
      toast({
        title: "3D Mode Activated",
        description: "Welcome to the immersive 3D experience!",
      });
    } else {
      setShowControls(false);
      toast({
        title: "2D Mode Activated",
        description: "Switched back to traditional scrolling navigation.",
      });
    }
  };

  const getSectionContent = (sectionIndex: number) => {
    const sectionData = {
      0: {
        title: t('nav.about') || 'About',
        description: t('hero.description') || 'Passionate engineering student focused on innovation and technology.',
        emoji: '👋'
      },
      1: {
        title: t('nav.experience') || 'Experience', 
        description: t('experience.description') || 'Professional experience in software development and project management.',
        emoji: '💼'
      },
      2: {
        title: t('nav.education') || 'Education',
        description: t('education.title') || 'Academic journey and continuous learning path.',
        emoji: '🎓'
      },
      3: {
        title: t('nav.skills') || 'Skills',
        description: t('skills.description') || 'Technical expertise and professional competencies.',
        emoji: '⚡'
      },
      4: {
        title: t('nav.contact') || 'Contact',
        description: t('contact.description') || 'Get in touch for collaborations and opportunities.',
        emoji: '📧'
      }
    };
    
    return sectionData[sectionIndex as keyof typeof sectionData] || sectionData[0];
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Enhanced Control Panel */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        <motion.button
          onClick={handle3DToggle}
          disabled={webglError}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border transition-all ${
            view3D 
              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25' 
              : webglError
              ? 'bg-muted text-muted-foreground border-muted cursor-not-allowed opacity-50'
              : 'bg-background/80 border-border hover:bg-primary/10 hover:border-primary/50'
          }`}
          whileHover={webglError ? {} : { scale: 1.05 }}
          whileTap={webglError ? {} : { scale: 0.95 }}
        >
          {webglError ? <AlertCircle className="h-4 w-4" /> : <Layers3 className="h-4 w-4" />}
          <span className="text-sm font-medium">
            {webglError 
              ? (t('3d.unavailable') || '3D Unavailable')
              : view3D 
              ? (t('3d.exit') || 'Exit 3D') 
              : (t('3d.enter') || 'Enter 3D')
            }
          </span>
        </motion.button>

        {/* 3D Controls Toggle */}
        {view3D && !webglError && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border bg-background/80 border-border hover:bg-blue-600/10 hover:border-blue-600/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">
              {t('3d.help') || 'Help'}
            </span>
          </motion.button>
        )}

        <motion.button
          onClick={() => setShowStory(!showStory)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border transition-all ${
            showStory 
              ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/25' 
              : 'bg-background/80 border-border hover:bg-purple-600/10 hover:border-purple-600/50'
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

      {/* Enhanced 3D Controls */}
      <EnhancedControls 
        show={showControls} 
        onHide={() => setShowControls(false)} 
      />

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
            
            {/* Enhanced 3D Content Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="container mx-auto px-4 h-full flex items-end pb-8">
                <motion.div
                  className="max-w-lg bg-background/95 backdrop-blur-md rounded-xl p-6 border pointer-events-auto shadow-2xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                  key={currentSection}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{getSectionContent(currentSection).emoji}</span>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      {getSectionContent(currentSection).title}
                    </h2>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {getSectionContent(currentSection).description}
                  </p>
                  
                  {/* Enhanced Section indicator */}
                  <div className="flex gap-2">
                    {sections.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          index === currentSection ? 'bg-primary w-12' : 'bg-muted w-8 hover:bg-muted-foreground/50'
                        }`}
                        onClick={() => setCurrentSection(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
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

      {/* Interactive Terminal */}
      <InteractiveTerminal />

      {/* Enhanced View Mode Indicator */}
      <div className="fixed bottom-4 left-4 z-50">
        <motion.div
          className="flex items-center gap-3 px-4 py-3 bg-background/95 backdrop-blur-md rounded-full border text-sm shadow-lg"
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: view3D || showStory 
              ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 12px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
              : 'none'
          }}
          transition={{ duration: 2, repeat: view3D || showStory ? Infinity : 0 }}
        >
          <Eye className="h-4 w-4 text-primary" />
          <span className="font-medium">
            {showStory ? (t('story.mode') || 'Story Mode') : view3D ? (t('3d.mode') || '3D Mode') : (t('2d.mode') || '2D Mode')}
          </span>
          {view3D && (
            <motion.div
              className="h-2 w-2 bg-green-500 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
