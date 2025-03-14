
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '@/translations';

interface LanguageContextType {
  language: Language;
  currentLanguage: Language; // Add this property
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void; // Add this function
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  // Toggle between Arabic and English
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
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
      currentLanguage: language, // Provide currentLanguage as an alias for language
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
