// src/components/ThemeSwitcher.tsx

import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '../context/index';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex items-center justify-center p-2 cursor-pointer rounded-full transition-colors duration-300 hover:bg-gray-200 dark:text-white"
    >
      {theme === 'light' ? <MdOutlineDarkMode size={24} /> : <MdOutlineLightMode size={24} />}
    </button>
  );
}

export default ThemeSwitcher;
