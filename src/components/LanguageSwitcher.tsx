import React from 'react';
import { Menu } from '@mantine/core';
import { GrLanguage } from 'react-icons/gr';
import { useI18n } from '../context/I18nContext';
import { Button, TextButton } from '../components';

interface Language {
  code: string;
  label: string;
}

function LanguageSwitcher() {
  const { i18n, changeLanguage } = useI18n();

  const languages: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <button>
          <div className="flex gap-2 items-center text-sm">
            <GrLanguage size={16} />
            {languages.find((lang) => lang.code === i18n.language)?.label || 'Language'}
          </div>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {languages.map(({ code, label }) => (
          <Menu.Item
            key={code}
            onClick={() => changeLanguage(code)}
            style={{ fontWeight: i18n.language === code ? 'bold' : 'normal' }}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default LanguageSwitcher;
