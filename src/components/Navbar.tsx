import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import {LanguageSwitcher} from '.';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <AiOutlineHome size={20} /> },
    { path: '/settings', label: 'Settings', icon: <AiOutlineSetting size={20} /> },
  ];

  return (
    <nav className="flex flex-col h-screen border-r border-gray-200 p-4">
      <ul className="space-y-4 mb-auto">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center space-x-2 ${
                location.pathname === item.path ? 'text-black' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
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