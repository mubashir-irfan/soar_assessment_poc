import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '../components';
import EditProfile from './EditProfile';
import Preferences from './Preferences';

function Settings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('editProfile');

  const tabs = [
    { id: 'editProfile', label: t('settings.editProfile.title') },
    { id: 'preferences', label: t('settings.preferences.title') },
    { id: 'security', label: t('settings.security.title') },
  ];

  const tabContent: { [key: string]: ReactNode } = {
    editProfile: <EditProfile />,
    preferences: <Preferences />,
    security: <p>Security TBD</p>,
  };

  return (
    <div className="rounded-[1.5rem] p-4 bg-white max-w-[1280px] mx-auto">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4 p-4">{tabContent[activeTab]}</div>
    </div>
  );
}

export default Settings;
