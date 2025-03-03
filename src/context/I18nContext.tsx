// src/context/I18nContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

interface I18nContextType {
  i18n: typeof i18n;
  dir: string;
  changeLanguage: (lang: string) => void;
  i18nInitialized: boolean; // Add this line
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [dir, setDir] = useState('ltr');
  const [i18nInitialized, setI18nInitialized] = useState(false); // Add this line

  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          ar: { translation: ar },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
      })
      .then(() => {
        setI18nInitialized(true); // Update state when initialized
      });

    i18n.on('languageChanged', (lng) => {
      setDir(i18n.dir(lng));
    });
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const value: I18nContextType = { i18n, dir, changeLanguage, i18nInitialized }; // Update this line

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
