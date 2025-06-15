import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hello, I'm",
      title: 'Software Engineer',
      subtitle: 'MSc. Engineering Student',
      description: "I'm a passionate engineering student dedicated to innovation and technology. Explore my portfolio to see how I'm shaping the future.",
      downloadCV: 'Download CV',
      contactMe: 'Contact Me'
    },
    experience: {
      title: 'Experience',
      position: 'Software Development Intern',
      company: 'OCP Group',
      duration: 'June 2024 - August 2024',
      location: 'Khouribga, Morocco',
      description: "Software development intern at OCP Group, working on innovative solutions to improve industrial processes and optimize resource management.",
      missions: 'Missions',
      mission1: 'Development of a web application for real-time monitoring of industrial data using React and TypeScript.',
      mission2: 'Implementation of RESTful APIs using Node.js and Express to ensure seamless data exchange between the front-end and back-end.',
      mission3: 'Integration of real-time data visualization tools using libraries such as Chart.js and D3.js.',
      mission4: 'Optimization of database queries using MongoDB to improve application performance and reduce latency.',
      mission5: 'Collaboration with a multidisciplinary team to design and implement new features based on user needs.',
      mission6: 'Application of Agile methodologies to manage projects and ensure on-time delivery of deliverables.',
      mission7: 'Participation in code reviews and testing to ensure code quality and application reliability.'
    },
    education: {
      title: 'Education',
      engineering: 'Engineering Degree',
      'engineering.school': 'National School of Applied Sciences',
      'engineering.period': '2022 - 2025',
      'engineering.description': 'Currently pursuing an engineering degree with a focus on software development and data science.',
      prep: 'Preparatory Classes for Engineering Schools',
      'prep.school': 'CPGE Lycée Moulay Youssef',
      'prep.period': '2020 - 2022',
      'prep.description': 'Intensive two-year program focused on mathematics, physics, and engineering sciences to prepare for competitive entrance exams to top engineering schools.',
      bac: 'Baccalaureate Degree in Physics and Chemistry',
      'bac.school': 'Lycée Mohamed V',
      'bac.period': '2019 - 2020',
      'bac.description': 'High school diploma with a focus on physics and chemistry, providing a strong foundation in scientific principles and analytical thinking.',
      type: {
        engineering: 'Engineering School',
        preparatory: 'Preparatory Classes',
        highSchool: 'High School'
      },
      status: {
        inProgress: 'In Progress',
        completed: 'Completed'
      }
    },
    skills: {
      title: 'Skills',
      description: 'Technical expertise and professional competencies.',
      technical: 'Technical Skills',
      professional: 'Professional Skills',
      languages: 'Languages'
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch for collaborations and opportunities.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.'
    },
    '3d': {
      enter: 'Enter 3D',
      exit: 'Exit 3D',
      mode: '3D Mode',
      controls: 'Controls',
      click: 'Click sections to navigate',
      drag: 'Drag to rotate view',
      terminal: 'Use terminal for interactions'
    },
    story: {
      enter: 'Story Mode',
      exit: 'Exit Story',
      mode: 'Story Mode'
    },
    '2d': {
      mode: '2D Mode'
    }
  },
  fr: {
    nav: {
      about: 'À propos',
      experience: 'Expérience',
      education: 'Éducation',
      skills: 'Compétences',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Bonjour, je suis',
      title: 'Ingénieur Logiciel',
      subtitle: 'Étudiant en Ingénierie (MSc.)',
      description: "Étudiant en ingénierie passionné par l'innovation et la technologie. Explorez mon portfolio pour voir comment je façonne l'avenir.",
      downloadCV: 'Télécharger CV',
      contactMe: 'Contactez-moi'
    },
    experience: {
      title: 'Expérience',
      position: 'Stagiaire en Développement Logiciel',
      company: 'OCP Group',
      duration: 'Juin 2024 - Août 2024',
      location: 'Khouribga, Maroc',
      description: "Stagiaire en développement logiciel chez OCP Group, travaillant sur des solutions innovantes pour améliorer les processus industriels et optimiser la gestion des ressources.",
      missions: 'Missions',
      mission1: 'Développement d\'une application web pour la surveillance en temps réel des données industrielles en utilisant React et TypeScript.',
      mission2: 'Implémentation d\'APIs RESTful en utilisant Node.js et Express pour assurer un échange de données fluide entre le front-end et le back-end.',
      mission3: 'Intégration d\'outils de visualisation de données en temps réel en utilisant des bibliothèques telles que Chart.js et D3.js.',
      mission4: 'Optimisation des requêtes de base de données en utilisant MongoDB pour améliorer les performances de l\'application et réduire la latence.',
      mission5: 'Collaboration avec une équipe multidisciplinaire pour concevoir et implémenter de nouvelles fonctionnalités basées sur les besoins des utilisateurs.',
      mission6: 'Application des méthodologies Agile pour gérer les projets et assurer la livraison des livrables dans les délais.',
      mission7: 'Participation aux revues de code et aux tests pour assurer la qualité du code et la fiabilité de l\'application.'
    },
    education: {
      title: 'Éducation',
      engineering: 'Diplôme d\'Ingénieur',
      'engineering.school': 'École Nationale des Sciences Appliquées',
      'engineering.period': '2022 - 2025',
      'engineering.description': 'Poursuit actuellement un diplôme d\'ingénieur avec une spécialisation en développement logiciel et science des données.',
      prep: 'Classes Préparatoires aux Grandes Écoles d\'Ingénieurs',
      'prep.school': 'CPGE Lycée Moulay Youssef',
      'prep.period': '2020 - 2022',
      'prep.description': 'Programme intensif de deux ans axé sur les mathématiques, la physique et les sciences de l\'ingénieur pour préparer aux concours d\'entrée aux grandes écoles d\'ingénieurs.',
      bac: 'Baccalauréat en Physique-Chimie',
      'bac.school': 'Lycée Mohamed V',
      'bac.period': '2019 - 2020',
      'bac.description': 'Diplôme de fin d\'études secondaires avec une spécialisation en physique-chimie, fournissant une base solide en principes scientifiques et en pensée analytique.',
      type: {
        engineering: 'École d\'Ingénieur',
        preparatory: 'Classes Préparatoires',
        highSchool: 'Lycée'
      },
      status: {
        inProgress: 'En Cours',
        completed: 'Terminé'
      }
    },
    skills: {
      title: 'Compétences',
      description: 'Expertise technique et compétences professionnelles.',
      technical: 'Compétences Techniques',
      professional: 'Compétences Professionnelles',
      languages: 'Langues'
    },
    contact: {
      title: 'Contact',
      description: 'Contactez-moi pour des collaborations et opportunités.',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer Message',
      success: 'Message envoyé avec succès!',
      error: 'Échec de l\'envoi du message. Veuillez réessayer.'
    },
    '3d': {
      enter: 'Mode 3D',
      exit: 'Quitter 3D',
      mode: 'Mode 3D',
      controls: 'Contrôles',
      click: 'Cliquez sur les sections pour naviguer',
      drag: 'Faites glisser pour faire pivoter',
      terminal: 'Utilisez le terminal pour les interactions'
    },
    story: {
      enter: 'Mode Histoire',
      exit: 'Quitter Histoire',
      mode: 'Mode Histoire'
    },
    '2d': {
      mode: 'Mode 2D'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      fr: { translation: translations.fr }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      setLanguage(lng);
    });

    return () => {
      i18n.off('languageChanged');
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  }, [language]);

  const t = useCallback((key: string, params?: Record<string, any>) => {
    return i18n.t(key, { ...params });
  }, []);

  const value: LanguageContextProps = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
