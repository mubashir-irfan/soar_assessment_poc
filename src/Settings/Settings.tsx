import React from 'react';
import { useI18n } from '../context/I18nContext';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { i18n } = useTranslation();

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">{i18n.t('settings')}</h2>
      <p>This is the settings page.</p>
    </div>
  );
}

export default Settings;