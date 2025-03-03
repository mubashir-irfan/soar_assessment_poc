import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import Navbar from './Navbar';
import { Header } from '.';

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { dir, i18n, i18nInitialized } = useI18n();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!i18nInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-4">Please log in</div>;
  }

  const getHeaderTitle = () => {
    if (location.pathname === '/settings') {
      return 'settings.settings';
    }
    return 'dashboard.overview';
  };

  return (
    <div dir={dir} className="min-h-[100vh] flex">
      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[15rem] bg-background-white z-50 transition-transform transform ${
          isMenuOpen
            ? dir === 'rtl'
              ? 'translate-x-0'
              : 'translate-x-0'
            : dir === 'rtl'
              ? 'translate-x-full'
              : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex justify-end p-4 md:shadow-none shadow-2xl">
          <AiOutlineClose
            size={24}
            className="text-soar cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        <Navbar />
      </div>

      {/* Navbar on Desktop */}
      <div className="hidden lg:block w-[13rem] bg-background-white lg:flex-shrink-0">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col bg-background-white max-h-[100vh] w-full">
        <Header title={i18n.t(getHeaderTitle())} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-grow overflow-y-auto no-scrollbar">
          <div className="container mx-auto max-w-[100vw] lg:max-w-[calc(100vw-13rem)] overflow-y-auto no-scrollbar p-4 lg:px-8 bg-background-light h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
