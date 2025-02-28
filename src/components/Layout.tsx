// src/components/Layout.tsx

import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { useLocation } from 'react-router-dom';

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { dir, i18n, i18nInitialized } = useI18n(); // Update this line
  const location = useLocation();

  if (!isAuthenticated) {
    return <div className="p-4">Please log in.</div>;
  }

  const getHeaderTitle = () => {
    if (location.pathname === '/settings') {
      return 'settings';
    }
    return 'overview';
  };

  if (!i18nInitialized) {
    return <div>Loading layout...</div>;
  }

  return (
    <div dir={dir} className="min-h-screen flex">
      <Navbar />
      <div className="flex-grow flex flex-col border-b border-border-light dark:border-border-dark bg-background-light">
        <header className="p-4 border-b border-border-light dark:border-border-dark bg-background-light">
          <h1 className="font-[600] text-[28px] text-soar">{i18n.t(getHeaderTitle())}</h1>
        </header>
        <main className="flex-grow p-4 bg-background-lightContent">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;