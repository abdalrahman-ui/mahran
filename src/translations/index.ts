
import arTranslations from './ar';
import enTranslations from './en';
import hiTranslations from './hi';
import urTranslations from './ur';

// Export all translations
export const translations = {
  ar: arTranslations,
  en: enTranslations,
  hi: hiTranslations,
  ur: urTranslations
};

// Export types
export type Language = 'ar' | 'en' | 'hi' | 'ur';

export type TranslationKey = keyof typeof enTranslations;
