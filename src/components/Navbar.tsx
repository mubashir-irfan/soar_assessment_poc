import { FaClipboardCheck } from 'react-icons/fa6';
import { IoIosSettings, IoMdHome } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import designSystem from '../design-system';

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useI18n();

  const navItems = [
    { path: '/', label: 'navbar.dashboard', icon: <IoMdHome size={25} aria-hidden="true" />, ariaLabel: 'Dashboard' },
    { path: '/settings', label: 'navbar.settings', icon: <IoIosSettings size={25} aria-hidden="true" />, ariaLabel: 'Settings' },
  ];

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="flex flex-col h-screen border-e border-border-light dark:border-border-dark p-4 w-[15.625rem] bg-background-white"
    >
      <div className="flex items-center mb-8">
        <FaClipboardCheck size={35} className="text-soar" aria-hidden="true" />
        <span className="ms-[0.625rem] font-[800] text-[1.5625rem] text-soar">{t('navbar.soarTask')}</span>
      </div>
      <ul className="flex flex-col gap-[2.4375rem] mb-auto">
        {navItems.map((item) => (
          <li key={item.path} className="relative h-[3.75rem] flex items-center">
            <Link
              to={item.path}
              aria-label={item.ariaLabel}
              className={`w-full flex items-center gap-[1.625rem] font-[500] text-[1.125rem] ${isActive(item.path) ? 'text-active' : 'text-inactive'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-soar focus-visible:ring-offset-1 focus-visible:ring-offset-background-white relative`} // Added focus-visible
            >
              <div className='mx-auto flex items-center gap-[1.625rem]'>
                {item.icon}
                <span>{t(item.label)}</span>
              </div>

              {isActive(item.path) && (
                <div
                  className="absolute start-0 w-[6px] rounded-e-[10px]"
                  style={{ backgroundColor: designSystem.colors.active, height: '60px' }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;