
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'ar' | 'en' | 'hi' | 'ur';

type Translations = {
  [key: string]: {
    ar: string;
    en: string;
    hi: string;
    ur: string;
  };
};

// Initial translations dictionary
const translations: Translations = {
  welcome: {
    ar: 'مرحبًا بك في موقع مهران للخدمات اللوجستية',
    en: 'Welcome to Mihran Logistics Services',
    hi: 'मिहरान लॉजिस्टिक्स सेवाओं में आपका स्वागत है',
    ur: 'مہران لوجسٹکس سروسز میں خوش آمدید',
  },
  admin: {
    ar: 'الإدارة',
    en: 'Admin',
    hi: 'प्रशासन',
    ur: 'ایڈمن',
  },
  managers: {
    ar: 'المدراء',
    en: 'Managers',
    hi: 'प्रबंधक',
    ur: 'مینیجرز',
  },
  supervisors: {
    ar: 'المشرفين',
    en: 'Supervisors',
    hi: 'पर्यवेक्षक',
    ur: 'سپروائزرز',
  },
  agents: {
    ar: 'المناديب',
    en: 'Agents',
    hi: 'एजेंट्स',
    ur: 'ایجنٹس',
  },
  login: {
    ar: 'تسجيل الدخول',
    en: 'Login',
    hi: 'लॉगिन',
    ur: 'لاگ ان',
  },
  username: {
    ar: 'اسم المستخدم',
    en: 'Username',
    hi: 'उपयोगकर्ता नाम',
    ur: 'صارف نام',
  },
  password: {
    ar: 'كلمة المرور',
    en: 'Password',
    hi: 'पासवर्ड',
    ur: 'پاس ورڈ',
  },
  submit: {
    ar: 'إرسال',
    en: 'Submit',
    hi: 'जमा करें',
    ur: 'جمع کرائیں',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
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
