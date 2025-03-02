import { useTranslation } from 'react-i18next';
import { Tabs } from '../components';
import { useState } from 'react';

function Settings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('editProfile');

  const tabs = [
    { id: 'editProfile', label: t('settings.editProfile.title') },
    { id: 'preferences', label: t('settings.preferences.title') },
    { id: 'security', label: t('settings.security.title') },
  ];
  return (
    <div className="rounded-[1.5rem] p-4 bg-white max-w-[1280px] mx-auto">
     <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4 p-4">
        {activeTab === 'editProfile' && <div>{t('settings.editProfile.title')}</div>}
        {activeTab === 'preferences' && <div>{t('settings.preferences.title')}</div>}
        {activeTab === 'security' && <div>{t('settings.security.title')}</div>}
      </div>
    </div>
  );
}

export default Settings;