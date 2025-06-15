
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Code, Rocket, Star, Trophy, BookOpen, Target, Zap, Crown, GraduationCap, Brain } from 'lucide-react';

interface StoryChapter {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: string;
  achievements: string[];
  year: string;
  color: string;
  period: string;
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
      id: 'foundation',
      icon: <GraduationCap className="h-8 w-8" />,
      title: language === 'fr' ? 'Les Fondations' : 'The Foundation',
      subtitle: language === 'fr' ? 'Baccalauréat Sciences Mathématiques' : 'Mathematical Sciences Baccalaureate',
      content: language === 'fr' 
        ? 'L\'aventure commence au Lycée Mohammed VI avec l\'obtention du Baccalauréat en Sciences Mathématiques. Cette étape cruciale a posé les bases solides de ma pensée analytique et de ma passion pour les sciences exactes.'
        : 'The journey begins at Mohammed VI High School with the Mathematical Sciences Baccalaureate. This crucial milestone laid the solid foundation for analytical thinking and passion for exact sciences.',
      achievements: language === 'fr' 
        ? ['Excellence en mathématiques avancées', 'Développement de la pensée logique', 'Préparation aux études supérieures']
        : ['Excellence in advanced mathematics', 'Development of logical thinking', 'Preparation for higher education'],
      year: '2021',
      period: language === 'fr' ? 'Juin 2021' : 'June 2021',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'preparation',
      icon: <Brain className="h-8 w-8" />,
      title: language === 'fr' ? 'L\'Intensification' : 'The Intensification',
      subtitle: language === 'fr' ? 'Classes Préparatoires CPGE' : 'CPGE Preparatory Classes',
      content: language === 'fr'
        ? 'Deux années intensives de formation d\'élite en mathématiques et physique. Cette période a forgé ma discipline, ma rigueur et ma capacité à résoudre des problèmes complexes sous pression.'
        : 'Two intensive years of elite training in mathematics and physics. This period forged discipline, rigor, and the ability to solve complex problems under pressure.',
      achievements: language === 'fr'
        ? ['Maîtrise des mathématiques supérieures', 'Excellence en physique théorique', 'Développement de la persévérance', 'Préparation aux concours d\'ingénieur']
        : ['Mastery of higher mathematics', 'Excellence in theoretical physics', 'Development of perseverance', 'Preparation for engineering competitions'],
      year: '2021-2023',
      period: language === 'fr' ? '2021 - 2023' : '2021 - 2023',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'breakthrough',
      icon: <Target className="h-8 w-8" />,
      title: language === 'fr' ? 'La Percée' : 'The Breakthrough',
      subtitle: language === 'fr' ? 'Admission à l\'École Mohammadia d\'Ingénieurs' : 'Admission to Mohammadia School of Engineers',
      content: language === 'fr'
        ? 'Réussite au concours national et intégration de l\'une des écoles d\'ingénieurs les plus prestigieuses du Maroc. Le début d\'une spécialisation en génie informatique et digitalisation.'
        : 'Success in the national competition and integration into one of Morocco\'s most prestigious engineering schools. The beginning of specialization in computer engineering and digitalization.',
      achievements: language === 'fr'
        ? ['Réussite au concours CNC', 'Entrée en école d\'élite', 'Choix de spécialisation informatique', 'Début du parcours ingénieur']
        : ['Success in CNC competition', 'Entry into elite school', 'Choice of computer specialization', 'Beginning of engineering journey'],
      year: '2023',
      period: language === 'fr' ? 'Septembre 2023' : 'September 2023',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'development',
      icon: <Code className="h-8 w-8" />,
      title: language === 'fr' ? 'Le Développement' : 'The Development',
      subtitle: language === 'fr' ? 'Formation technique avancée' : 'Advanced Technical Training',
      content: language === 'fr'
        ? 'Immersion dans les technologies de pointe : programmation, systèmes d\'information, intelligence artificielle. Chaque projet est une opportunité d\'innovation et d\'apprentissage.'
        : 'Immersion in cutting-edge technologies: programming, information systems, artificial intelligence. Each project is an opportunity for innovation and learning.',
      achievements: language === 'fr'
        ? ['Maîtrise des langages de programmation', 'Projets d\'envergure', 'Travail en équipe multidisciplinaire', 'Stage en entreprise']
        : ['Mastery of programming languages', 'Large-scale projects', 'Multidisciplinary teamwork', 'Corporate internship'],
      year: '2024',
      period: language === 'fr' ? '2023 - 2024' : '2023 - 2024',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'specialization',
      icon: <Zap className="h-8 w-8" />,
      title: language === 'fr' ? 'La Spécialisation' : 'The Specialization',
      subtitle: language === 'fr' ? 'Expertise en digitalisation' : 'Digitalization Expertise',
      content: language === 'fr'
        ? 'Approfondissement des compétences en transformation digitale, cybersécurité et architectures cloud. Participation à des projets innovants qui façonnent l\'avenir technologique.'
        : 'Deepening skills in digital transformation, cybersecurity, and cloud architectures. Participation in innovative projects that shape the technological future.',
      achievements: language === 'fr'
        ? ['Expertise en transformation digitale', 'Projets cloud et DevOps', 'Leadership technique', 'Innovation continue']
        : ['Digital transformation expertise', 'Cloud and DevOps projects', 'Technical leadership', 'Continuous innovation'],
      year: '2025',
      period: language === 'fr' ? '2024 - 2025' : '2024 - 2025',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'achievement',
      icon: <Crown className="h-8 w-8" />,
      title: language === 'fr' ? 'L\'Accomplissement' : 'The Achievement',
      subtitle: language === 'fr' ? 'Diplôme d\'Ingénieur d\'État' : 'State Engineer Degree',
      content: language === 'fr'
        ? 'Couronnement de cinq années d\'études intensives par l\'obtention du diplôme d\'Ingénieur d\'État. Prêt à révolutionner le monde technologique avec expertise et vision.'
        : 'Culmination of five years of intensive studies with the State Engineer degree. Ready to revolutionize the technological world with expertise and vision.',
      achievements: language === 'fr'
        ? ['Diplôme d\'ingénieur d\'État', 'Expertise technique complète', 'Vision stratégique', 'Prêt pour l\'innovation']
        : ['State engineer degree', 'Complete technical expertise', 'Strategic vision', 'Ready for innovation'],
      year: '2026',
      period: language === 'fr' ? 'Juin 2026' : 'June 2026',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative min-h-[600vh] overflow-hidden">
      {/* Enhanced Parallax Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
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

      {/* Enhanced Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => {
                const element = document.getElementById(`chapter-${index}`);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  currentChapter >= index 
                    ? 'bg-primary border-primary shadow-lg shadow-primary/50' 
                    : 'bg-transparent border-muted-foreground/50 hover:border-primary/50'
                }`}
                animate={{
                  scale: currentChapter === index ? 1.5 : 1,
                  opacity: currentChapter >= index ? 1 : 0.6
                }}
                whileHover={{ scale: 1.3 }}
              />
              
              {/* Year tooltip */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-lg border text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {chapter.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline connector */}
      <div className="fixed right-[38px] top-1/2 transform -translate-y-1/2 z-10">
        <div className="w-0.5 h-64 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 rounded-full" />
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
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <div 
      ref={ref} 
      id={`chapter-${index}`}
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Visual elements */}
          <div className="text-center lg:text-left">
            {/* Period Badge */}
            <motion.div
              className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${chapter.color} text-white font-bold text-lg mb-6 shadow-lg`}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
            >
              {chapter.period}
            </motion.div>

            {/* Icon */}
            <motion.div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${chapter.color} text-white mb-8 shadow-2xl`}
              initial={{ rotate: -180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              {chapter.icon}
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className={`absolute -inset-4 bg-gradient-to-r ${chapter.color} opacity-20 blur-xl rounded-full`} />
              <div className={`w-48 h-2 bg-gradient-to-r ${chapter.color} mx-auto lg:mx-0 rounded-full`} />
            </motion.div>
          </div>

          {/* Right side - Content */}
          <div>
            {/* Title */}
            <motion.h2
              className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {chapter.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.h3
              className="text-xl lg:text-2xl text-muted-foreground mb-6 font-semibold"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {chapter.subtitle}
            </motion.h3>

            {/* Content */}
            <motion.p
              className="text-lg leading-relaxed mb-8 text-foreground/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {chapter.content}
            </motion.p>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-primary">
                {chapter.achievements.length > 0 && (
                  chapter.achievements[0].includes('Excellence') || chapter.achievements[0].includes('Maîtrise') 
                    ? 'Key Achievements' 
                    : 'Réalisations Clés'
                )}
              </h4>
              <div className="grid gap-3">
                {chapter.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border-l-4 border-primary/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.6 + (i * 0.1) }}
                  >
                    <Star className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
