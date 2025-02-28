import React from 'react';
import { useI18n } from '../context/I18nContext';

function LanguageSwitcher() {
  const { i18n, changeLanguage } = useI18n();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  return (
    <div className="flex space-x-2 text-sm">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded ${
          i18n.language === 'en' ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ar')}
        className={`px-2 py-1 rounded ${
          i18n.language === 'ar' ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        AR
      </button>
    </div>
  );
}

export default LanguageSwitcher;