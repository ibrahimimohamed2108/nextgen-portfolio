
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hello, I\'m',
    'hero.title': 'Computer Engineering Student',
    'hero.subtitle': 'Specialized in DevOps & Cloud Computing',
    'hero.description': 'Computer engineering student passionate about software development and cloud computing, specializing in DevOps practices, CI/CD pipeline automation and cloud technologies.',
    'hero.downloadCV': 'Download CV',
    'hero.contactMe': 'Contact Me',
    
    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.position': 'IT Systems Urbanization Intern',
    'experience.company': 'General Treasury of the Kingdom',
    'experience.duration': 'July 2024 (1 month)',
    'experience.location': 'Rabat, Morocco',
    'experience.description': 'At the General Treasury of the Kingdom, I participated in IT systems urbanization, aimed at structuring and optimizing computer systems architecture for better interoperability and IT resource management.',
    'experience.missions': 'Missions accomplished:',
    
    // Education Section
    'education.title': 'Academic Journey',
    'education.engineering': 'State Engineer, Computer Engineering and Digitalization',
    'education.engineering.school': 'Mohammadia School of Engineers',
    'education.engineering.period': '2023 - 2026',
    'education.engineering.description': 'Specialized in software engineering and cloud computing with focus on DevOps practices.',
    'education.prep': 'Mathematics and Physics',
    'education.prep.school': 'CPGE - Preparatory Classes for Grande Écoles',
    'education.prep.period': '2021 - 2023',
    'education.prep.description': 'Intensive preparation program focusing on advanced mathematics and physics.',
    'education.bac': 'Baccalaureate, Mathematical Sciences A',
    'education.bac.school': 'Mohammed VI High School, Oujda',
    'education.bac.period': 'September 2020 - June 2021',
    'education.bac.description': 'Scientific track with emphasis on mathematics and natural sciences.',
    'education.status.inProgress': 'In Progress',
    'education.status.completed': 'Completed',
    'education.type.engineering': 'Engineering Degree',
    'education.type.preparatory': 'Preparatory Classes',
    'education.type.highSchool': 'High School Diploma',
    
    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Technologies & Tools I Work With',
    'skills.category.frontend': 'Frontend Development',
    'skills.category.backend': 'Backend Development',
    'skills.category.devops': 'DevOps & Cloud',
    'skills.category.databases': 'Databases',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s Build Something Amazing Together',
    'contact.description': 'I\'m always interested in new opportunities and interesting projects. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.sendMessage': 'Send Message'
  },
  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.experience': 'Expérience',
    'nav.education': 'Formation',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Bonjour, je suis',
    'hero.title': 'Étudiant en Génie Informatique',
    'hero.subtitle': 'Spécialisé en DevOps et Cloud Computing',
    'hero.description': 'Élève ingénieur en informatique passionné par le développement logiciel et le cloud computing, je me spécialise dans les pratiques DevOps, l\'automatisation des pipelines CI/CD et les technologies cloud.',
    'hero.downloadCV': 'Télécharger CV',
    'hero.contactMe': 'Me Contacter',
    
    // Experience Section
    'experience.title': 'Expérience Professionnelle',
    'experience.position': 'Stagiaire en Urbanisation des Systèmes d\'Information',
    'experience.company': 'Trésorerie Générale du Royaume',
    'experience.duration': 'Juillet 2024 (1 mois)',
    'experience.location': 'Rabat, Maroc',
    'experience.description': 'Au sein de la Trésorerie Générale du Royaume, j\'ai participé à l\'urbanisation du SI, visant à structurer et optimiser l\'architecture des systèmes informatiques pour une meilleure interopérabilité et gestion des ressources IT.',
    'experience.missions': 'Missions réalisées :',
    
    // Education Section
    'education.title': 'Parcours Académique',
    'education.engineering': 'Ingénieur d\'état, Génie Informatique et Digitalisation',
    'education.engineering.school': 'École Mohammadia d\'Ingénieurs',
    'education.engineering.period': '2023 - 2026',
    'education.engineering.description': 'Spécialisé en génie logiciel et cloud computing avec un focus sur les pratiques DevOps.',
    'education.prep': 'Mathématiques et Physique',
    'education.prep.school': 'CPGE - Classes préparatoires aux grandes écoles',
    'education.prep.period': '2021 - 2023',
    'education.prep.description': 'Programme de préparation intensive axé sur les mathématiques et la physique avancées.',
    'education.bac': 'Baccalauréat, Sciences Mathématiques A',
    'education.bac.school': 'Lycée Mohammed VI, Oujda',
    'education.bac.period': 'Septembre 2020 - Juin 2021',
    'education.bac.description': 'Filière scientifique avec accent sur les mathématiques et sciences naturelles.',
    'education.status.inProgress': 'En Cours',
    'education.status.completed': 'Terminé',
    'education.type.engineering': 'Diplôme d\'Ingénieur',
    'education.type.preparatory': 'Classes Préparatoires',
    'education.type.highSchool': 'Diplôme de Lycée',
    
    // Skills Section
    'skills.title': 'Compétences Techniques',
    'skills.subtitle': 'Technologies et Outils que j\'utilise',
    'skills.category.frontend': 'Développement Frontend',
    'skills.category.backend': 'Développement Backend',
    'skills.category.devops': 'DevOps et Cloud',
    'skills.category.databases': 'Bases de Données',
    
    // Contact Section
    'contact.title': 'Prenons Contact',
    'contact.subtitle': 'Construisons Quelque Chose d\'Extraordinaire Ensemble',
    'contact.description': 'Je suis toujours intéressé par de nouvelles opportunités et des projets intéressants. Que vous ayez une question ou que vous vouliez simplement dire bonjour, je ferai de mon mieux pour vous répondre !',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.sendMessage': 'Envoyer un Message'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as Language;
      if (stored) return stored;
      return navigator.language.startsWith('fr') ? 'fr' : 'en';
    }
    return 'en';
  });

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
