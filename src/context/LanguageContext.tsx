import { createContext, useContext, useState, type ReactNode } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const translations = { en, es };

const t = (key: string): string => {
  const segments = key.split(".");
  let current: unknown = translations[language];

  for (const segment of segments) {
    if (
      current &&
      typeof current === "object" &&
      segment in current
    ) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return key; // fallback for missing keys
    }
  }

  return typeof current === "string" ? current : key;
};

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
