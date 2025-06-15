
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Code, Rocket, Star, Trophy } from 'lucide-react';

interface StoryChapter {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: string;
  year: string;
  color: string;
}

export const ImmersiveStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { t, language } = useLanguage();
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters: StoryChapter[] = [
    {
      id: 'beginning',
      icon: <Star className="h-8 w-8" />,
      title: language === 'fr' ? 'Le Début' : 'The Beginning',
      subtitle: language === 'fr' ? 'Passion pour la technologie' : 'Passion for Technology',
      content: language === 'fr' 
        ? 'Mon voyage a commencé avec une curiosité insatiable pour comprendre comment les choses fonctionnent. Dès mon plus jeune âge, j\'étais fasciné par la technologie et son potentiel à transformer le monde.'
        : 'My journey began with an insatiable curiosity to understand how things work. From a young age, I was fascinated by technology and its potential to transform the world.',
      year: '2019',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'learning',
      icon: <Code className="h-8 w-8" />,
      title: language === 'fr' ? 'L\'Apprentissage' : 'The Learning',
      subtitle: language === 'fr' ? 'Maîtrise des fondamentaux' : 'Mastering the Fundamentals',
      content: language === 'fr'
        ? 'J\'ai plongé dans le monde de la programmation, apprenant les langages de base et construisant mes premiers projets. Chaque ligne de code était une nouvelle découverte.'
        : 'I dove into the world of programming, learning foundational languages and building my first projects. Every line of code was a new discovery.',
      year: '2020',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'growth',
      icon: <Rocket className="h-8 w-8" />,
      title: language === 'fr' ? 'La Croissance' : 'The Growth',
      subtitle: language === 'fr' ? 'Projets avancés' : 'Advanced Projects',
      content: language === 'fr'
        ? 'Avec une base solide, j\'ai commencé à travailler sur des projets plus complexes, explorant les frameworks modernes et les technologies émergentes.'
        : 'With a solid foundation, I began working on more complex projects, exploring modern frameworks and emerging technologies.',
      year: '2022',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'achievement',
      icon: <Trophy className="h-8 w-8" />,
      title: language === 'fr' ? 'Les Réalisations' : 'The Achievements',
      subtitle: language === 'fr' ? 'Excellence académique et professionnelle' : 'Academic and Professional Excellence',
      content: language === 'fr'
        ? 'Aujourd\'hui, je continue à repousser les limites, combinant excellence académique et expérience pratique pour créer des solutions innovantes.'
        : 'Today, I continue to push boundaries, combining academic excellence with practical experience to create innovative solutions.',
      year: '2024',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      </motion.div>

      {/* Story Chapters */}
      <div className="relative z-10">
        {chapters.map((chapter, index) => (
          <StoryChapter 
            key={chapter.id}
            chapter={chapter}
            index={index}
            isActive={currentChapter === index}
            onInView={() => setCurrentChapter(index)}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-4">
          {chapters.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full border-2 ${
                currentChapter >= index 
                  ? 'bg-primary border-primary' 
                  : 'bg-transparent border-muted-foreground'
              }`}
              animate={{
                scale: currentChapter === index ? 1.5 : 1,
                opacity: currentChapter >= index ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StoryChapter = ({ 
  chapter, 
  index, 
  isActive, 
  onInView 
}: { 
  chapter: StoryChapter; 
  index: number;
  isActive: boolean;
  onInView: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Year Badge */}
        <motion.div
          className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${chapter.color} text-white font-bold text-lg mb-8`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
        >
          {chapter.year}
        </motion.div>

        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${chapter.color} text-white mb-6`}
          initial={{ rotate: -180, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
        >
          {chapter.icon}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {chapter.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.h3
          className="text-xl lg:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {chapter.subtitle}
        </motion.h3>

        {/* Content */}
        <motion.p
          className="text-lg leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {chapter.content}
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          className={`w-32 h-1 bg-gradient-to-r ${chapter.color} mx-auto mt-8 rounded-full`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
      </motion.div>
    </div>
  );
};
