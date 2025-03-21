
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKey } from '@/translations';

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get user's preferred language from browser or localStorage
const getUserPreferredLanguage = (): Language => {
  const savedLang = localStorage.getItem('preferred-language') as Language | null;
  if (savedLang && Object.keys(translations).includes(savedLang)) {
    return savedLang;
  }
  
  // Try to detect from browser
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'ar') return 'ar';
  if (browserLang === 'en') return 'en';
  if (browserLang === 'hi') return 'hi';
  if (browserLang === 'ur') return 'ur';
  
  // Default to Arabic
  return 'ar';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getUserPreferredLanguage());

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  // Toggle between Arabic and English
  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'ar' ? 'en' : 'ar');
  };
  
  // Set language explicitly
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string, params?: Record<string, any>): string => {
    // @ts-ignore - We know this might not be a valid key, but we handle it gracefully
    const translation = translations[language][key];
    
    if (translation) {
      // Handle simple string replacement if params provided
      if (params) {
        return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
          return acc.replace(`{${paramKey}}`, String(paramValue));
        }, translation);
      }
      return translation;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      currentLanguage: language,
      setLanguage, 
      toggleLanguage,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
