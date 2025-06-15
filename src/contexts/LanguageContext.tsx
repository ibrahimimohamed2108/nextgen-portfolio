
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
      position: 'Information System Urbanization Intern',
      company: 'General Treasury of the Kingdom',
      duration: 'Summer Internship',
      location: 'Rabat, Morocco',
      description: "At the General Treasury of the Kingdom, I participated in the urbanization of the information system (IS). In this context, I contributed to the deployment, integration and demonstration of IT solutions.",
      missions: 'Key Achievements',
      mission1: 'Deployment and configuration of GLPI (ITSM), Mercator (SIEM & IS mapping) and OpenProject (agile project management) solutions.',
      mission2: 'Implementation of a virtualized infrastructure.',
      mission3: 'MySQL database management.',
      mission4: 'Integration of centralized authentication with LDAP and Active Directory.',
      mission5: 'Apache2, MySQL & PHP configurations.',
      mission6: 'System performance monitoring and optimization.'
    },
    projects: {
      title: 'Projects',
      description: 'A showcase of innovative solutions and technical implementations.',
      technologies: 'Technologies Used',
      viewProject: 'View Details',
      sourceCode: 'Source Code',
      cicd: {
        title: 'Automated CI/CD Pipeline on AWS',
        description: 'Automated a CI/CD pipeline on AWS using Jenkins, Kubernetes, and Terraform',
        details: 'Built a complete CI/CD pipeline using Jenkins for automation, Kubernetes for container orchestration, and Terraform for infrastructure as code on AWS cloud platform.'
      },
      ecommerce: {
        title: 'E-commerce Application',
        description: 'Developed an e-commerce application using Angular and Firebase',
        details: 'Developed a responsive e-commerce platform using Angular for the frontend and Firebase for backend services, including real-time database and authentication.'
      },
      restaurant: {
        title: 'Restaurant Management System',
        description: 'Built a restaurant management and ticket reservation system in C',
        details: 'Created a comprehensive restaurant management and ticket reservation system in C programming language, featuring inventory management, order processing, and customer reservation handling.'
      }
    },
    education: {
      title: 'Education',
      engineering: 'State Engineer Degree, Computer Engineering and Digitalization',
      'engineering.school': 'Mohammadia School of Engineers',
      'engineering.period': '09/2023 - 06/2026',
      'engineering.description': 'Currently pursuing an engineering degree with a focus on computer engineering and digitalization.',
      prep: 'Mathematics and Physics',
      'prep.school': 'CPGE - Preparatory Classes for Engineering Schools',
      'prep.period': '09/2021 - 06/2023',
      'prep.description': 'Intensive two-year program focused on mathematics and physics to prepare for competitive entrance exams to top engineering schools.',
      bac: 'Baccalaureate, Mathematical Sciences A',
      'bac.school': 'Mohammed VI High School',
      'bac.period': '09/2020 - 06/2021',
      'bac.description': 'High school diploma with a focus on mathematical sciences, providing a strong foundation in analytical thinking.',
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
      languages: 'Languages',
      certifications: 'Certifications'
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
      mission2: 'Mise en place d\'une infrastructure virtualisée.',
      mission3: 'Gestion des bases de données MySQL.',
      mission4: 'Intégration de l\'authentification centralisée avec LDAP et Active Directory.',
      mission5: 'Configurations Apache2, MySQL & PHP.',
      mission6: 'Surveillance et optimisation des performances du système.'
    },
    projects: {
      title: 'Projets',
      description: 'Une vitrine de solutions innovantes et d\'implémentations techniques.',
      technologies: 'Technologies Utilisées',
      viewProject: 'Voir Détails',
      sourceCode: 'Code Source',
      cicd: {
        title: 'Pipeline CI/CD Automatisé sur AWS',
        description: 'Automatisation d\'un pipeline CI/CD sur AWS avec Jenkins, Kubernetes et Terraform',
        details: 'Construction d\'un pipeline CI/CD complet utilisant Jenkins pour l\'automatisation, Kubernetes pour l\'orchestration de conteneurs, et Terraform pour l\'infrastructure en tant que code sur la plateforme cloud AWS.'
      },
      ecommerce: {
        title: 'Application E-commerce',
        description: 'Développement d\'une application e-commerce avec Angular et Firebase',
        details: 'Développement d\'une plateforme e-commerce responsive utilisant Angular pour le frontend et Firebase pour les services backend, incluant une base de données en temps réel et l\'authentification.'
      },
      restaurant: {
        title: 'Système de Gestion de Restaurant',
        description: 'Construction d\'un système de gestion de restaurant et de réservation de tickets en C',
        details: 'Création d\'un système complet de gestion de restaurant et de réservation de tickets en langage C, avec gestion d\'inventaire, traitement des commandes et gestion des réservations clients.'
      }
    },
    education: {
      title: 'Éducation',
      engineering: 'Diplôme d\'Ingénieur d\'État, Génie Informatique et Digitalisation',
      'engineering.school': 'École Mohammadia d\'Ingénieurs',
      'engineering.period': '09/2023 - 06/2026',
      'engineering.description': 'Poursuit actuellement un diplôme d\'ingénieur avec une spécialisation en génie informatique et digitalisation.',
      prep: 'Mathématiques et Physique',
      'prep.school': 'CPGE - Classes Préparatoires aux Grandes Écoles',
      'prep.period': '09/2021 - 06/2023',
      'prep.description': 'Programme intensif de deux ans axé sur les mathématiques et la physique pour préparer aux concours d\'entrée aux grandes écoles d\'ingénieurs.',
      bac: 'Baccalauréat, Sciences Mathématiques A',
      'bac.school': 'Lycée Mohammed VI',
      'bac.period': '09/2020 - 06/2021',
      'bac.description': 'Diplôme de fin d\'études secondaires avec une spécialisation en sciences mathématiques, fournissant une base solide en pensée analytique.',
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
      languages: 'Langues',
      certifications: 'Certifications'
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
