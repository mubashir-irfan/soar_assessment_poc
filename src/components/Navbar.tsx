import { ReactNode } from 'react'; //Import ReactNode
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <IoMdHome size={20} /> as ReactNode }, //Explicitly type the icon
    { path: '/settings', label: 'Settings', icon: <IoIosSettings size={20} /> as ReactNode }, //Explicitly type the icon
  ];

  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex space-x-6">
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
    </nav>
  );
}

export default Navbar;