
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
