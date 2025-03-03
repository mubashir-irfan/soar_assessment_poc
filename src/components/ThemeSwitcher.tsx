// src/components/ThemeSwitcher.tsx

import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={handleThemeToggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex items-center justify-center p-2 cursor-pointer rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? (
        <MdOutlineDarkMode size={24} />
      ) : (
        <MdOutlineLightMode size={24} />
      )}
    </button>
  );
}

export default ThemeSwitcher;