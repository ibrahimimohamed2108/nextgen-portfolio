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
      projects: 'Projects',
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
      position: 'Information Systems Urbanization Intern',
      company: 'Trésorerie Générale du Royaume',
      duration: 'Summer Internship',
      location: 'Rabat, Morocco',
      description: "At the General Treasury of the Kingdom, I participated in the urbanization of the information system (IS). In this context, I contributed to the deployment, integration and demonstration of IT solutions.",
      missions: 'Key Achievements',
      mission1: 'Deployment and configuration of GLPI (ITSM), Mercator (SIEM & IS mapping) and OpenProject (agile project management) solutions.',
      mission2: 'Implementation of a virtualized infrastructure to optimize system performance and resource management.',
      mission3: 'MySQL database management including optimization, backup strategies, and performance tuning.',
      mission4: 'Integration of centralized authentication with LDAP and Active Directory for enhanced security.',
      mission5: 'Apache2, MySQL & PHP configurations for web application deployment and maintenance.',
      mission6: 'Collaboration with multidisciplinary teams to ensure seamless system integration and user training.'
    },
    projects: {
      title: 'Technical Projects',
      description: 'A showcase of innovative solutions and technical implementations.',
      technologies: 'Technologies Used',
      viewProject: 'View Details',
      sourceCode: 'Source Code',
      cicd: {
        title: 'CI/CD Pipeline Automation',
        description: 'Automated deployment pipeline on AWS infrastructure',
        details: 'Built a complete CI/CD pipeline using Jenkins for automation, Kubernetes for container orchestration, and Terraform for infrastructure as code on AWS cloud platform.'
      },
      ecommerce: {
        title: 'E-commerce Application',
        description: 'Full-stack web application with modern frontend',
        details: 'Developed a responsive e-commerce platform using Angular for the frontend and Firebase for backend services, including real-time database and authentication.'
      },
      restaurant: {
        title: 'Restaurant Management System',
        description: 'Desktop application for restaurant operations',
        details: 'Created a comprehensive restaurant management and ticket reservation system in C programming language, featuring inventory management, order processing, and customer reservation handling.'
      }
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
      projects: 'Projets',
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
      position: 'Stagiaire en Urbanisation des Systèmes d\'Information',
      company: 'Trésorerie Générale du Royaume',
      duration: 'Stage d\'été',
      location: 'Rabat, Maroc',
      description: "Au sein de la Trésorerie Générale du Royaume, j'ai participé à l'urbanisation du système d'information (SI). Dans ce cadre, j'ai contribué au déploiement, à l'intégration et à la démonstration de solutions informatiques.",
      missions: 'Réalisations Clés',
      mission1: 'Déploiement et configuration des solutions GLPI (ITSM), Mercator (SIEM & cartographie SI) et OpenProject (gestion de projet agile).',
      mission2: 'Mise en place d\'une infrastructure virtualisée pour optimiser les performances système et la gestion des ressources.',
      mission3: 'Gestion des bases de données MySQL incluant l\'optimisation, les stratégies de sauvegarde et l\'ajustement des performances.',
      mission4: 'Intégration de l\'authentification centralisée avec LDAP et Active Directory pour une sécurité renforcée.',
      mission5: 'Configurations Apache2, MySQL & PHP pour le déploiement et la maintenance d\'applications web.',
      mission6: 'Collaboration avec des équipes multidisciplinaires pour assurer une intégration système fluide et la formation des utilisateurs.'
    },
    projects: {
      title: 'Projets Techniques',
      description: 'Une vitrine de solutions innovantes et d\'implémentations techniques.',
      technologies: 'Technologies Utilisées',
      viewProject: 'Voir Détails',
      sourceCode: 'Code Source',
      cicd: {
        title: 'Automatisation Pipeline CI/CD',
        description: 'Pipeline de déploiement automatisé sur infrastructure AWS',
        details: 'Construction d\'un pipeline CI/CD complet utilisant Jenkins pour l\'automatisation, Kubernetes pour l\'orchestration de conteneurs, et Terraform pour l\'infrastructure en tant que code sur la plateforme cloud AWS.'
      },
      ecommerce: {
        title: 'Application E-commerce',
        description: 'Application web full-stack avec frontend moderne',
        details: 'Développement d\'une plateforme e-commerce responsive utilisant Angular pour le frontend et Firebase pour les services backend, incluant une base de données en temps réel et l\'authentification.'
      },
      restaurant: {
        title: 'Système de Gestion de Restaurant',
        description: 'Application desktop pour les opérations de restaurant',
        details: 'Création d\'un système complet de gestion de restaurant et de réservation de tickets en langage C, avec gestion d\'inventaire, traitement des commandes et gestion des réservations clients.'
      }
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
    const result = i18n.t(key, { ...params });
    return String(result);
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
