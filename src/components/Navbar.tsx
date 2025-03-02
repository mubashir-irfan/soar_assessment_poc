import { useTranslation } from 'react-i18next';
import { FaTools } from "react-icons/fa";
import {
  FaBuildingColumns,
  FaChartLine,
  FaClipboardCheck,
  FaCreditCard,
  FaGift,
  FaHandHolding,
  FaMoneyBillTransfer,
} from 'react-icons/fa6';
import { IoIosSettings, IoMdHome } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    {
      path: '/',
      label: 'navbar.dashboard',
      icon: <IoMdHome size={25} aria-hidden="true" />,
      ariaLabel: 'Dashboard',
    },
    {
      path: '/transactions',
      label: 'navbar.transactions',
      icon: <FaMoneyBillTransfer size={25} aria-hidden="true" />,
      ariaLabel: 'Transactions',
    },
    {
      path: '/accounts',
      label: 'navbar.accounts',
      icon: <FaBuildingColumns size={25} aria-hidden="true" />,
      ariaLabel: 'Accounts',
    },
    {
      path: '/investments',
      label: 'navbar.investments',
      icon: <FaChartLine size={25} aria-hidden="true" />,
      ariaLabel: 'Investments',
    },
    {
      path: '/credit-cards',
      label: 'navbar.creditCards',
      icon: <FaCreditCard size={25} aria-hidden="true" />,
      ariaLabel: 'Credit Cards',
    },
    {
      path: '/loans',
      label: 'navbar.loans',
      icon: <FaHandHolding size={25} aria-hidden="true" />,
      ariaLabel: 'Loans',
    },
    {
      path: '/services',
      label: 'navbar.services',
      icon: <FaTools size={25} aria-hidden="true" />,
      ariaLabel: 'Services',
    },
    {
      path: '/my-privileges',
      label: 'navbar.myPrivileges',
      icon: <FaGift size={25} aria-hidden="true" />,
      ariaLabel: 'My Privileges',
    },
    {
      path: '/settings',
      label: 'navbar.settings',
      icon: <IoIosSettings size={25} aria-hidden="true" />,
      ariaLabel: 'Settings',
    },
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
      className="flex flex-col h-screen border-e border-border-light dark:border-border-dark bg-background-white"
    >
      <div className="flex items-center p-4">
        <FaClipboardCheck size={35} className="text-soar" aria-hidden="true" />
        <span className="ms-[0.625rem] font-[800] text-[1.5625rem] text-soar">{t('navbar.soarTask')}</span>
      </div>
      <ul className="flex flex-col mb-auto">
        {navItems.map((item) => (
          <li key={item.path} className="relative h-[3.75rem] flex items-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <Link
              to={item.path}
              aria-label={item.ariaLabel}
              className={`w-full h-full flex items-center gap-[1.625rem] font-[500] ${isActive(item.path) ? 'text-active' : 'text-inactive'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-soar focus-visible:ring-offset-1 focus-visible:ring-offset-background-white relative`}
            >
              <div className="flex items-center gap-[1.625rem] ps-5">
                {item.icon}
                <span>{t(item.label)}</span>
              </div>

              {isActive(item.path) && (
                <div
                  className="absolute start-0 w-[6px] rounded-e-[10px] h-[3.75rem] bg-active"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className='md:mt-auto mb-[4rem] md:mb-0'>
        <div className='flex md:flex-row md:justify-between items-center gap-4 p-4 '>
          <div className='flex flex-col gap-2'>
            <LanguageSwitcher />
          </div>
          <div className='flex flex-col gap-2'>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;