// src/components/Layout.tsx

import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { useLocation } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { dir, i18n, i18nInitialized } = useI18n();
  const location = useLocation();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return <div className="p-4">Please log in</div>;
  }

  const getHeaderTitle = () => {
    if (location.pathname === '/settings') {
      return 'settings.settings';
    }
    return 'dashboard.overview';
  };

  if (!i18nInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div dir={dir} className="min-h-[100vh] flex">
      <div className="hidden sm:block w-[13rem] bg-background-white">
        <Navbar />
      </div>

      <div className="flex-grow flex flex-col bg-background-white max-h-[100vh]">
        <header className="p-4 flex items-center justify-between sm:justify-start sm:border-b sm:border-border-light dark:border-border-dark sm:border-b-0">
          <div className="sm:hidden">
            <AiOutlineMenu size={18} className="text-soar" />
          </div>
          <h1 className="font-[600] text-[28px] text-soar sm:ml-4 sm:text-left text-center flex-grow">
            {t(getHeaderTitle())}
          </h1>
        </header>
        <main className="flex-grow overflow-y-auto">
          <div className='container mx-auto max-w-[100vw] sm:max-w-[calc(100vw-13rem)] overflow-y-auto p-4 md:px-8 bg-background-light h-full' >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;