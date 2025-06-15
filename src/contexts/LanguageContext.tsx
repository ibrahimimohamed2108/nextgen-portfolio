
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '../i18n/config';

interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

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
