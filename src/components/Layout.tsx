import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { dir } = useI18n();

  if (!isAuthenticated) {
    return <div className="p-4">Please log in.</div>;
  }

  return (
    <div dir={dir} className="min-h-screen flex">
      <Navbar />
      <div className="flex-grow flex flex-col border-b border-gray-200">
        <header className="p-4 border-b border-gray-200">
          {/* Header content here, if needed */}
        </header>
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;