import React from 'react';
import {Navbar} from '.';
import { useAuth } from '../context/AuthContext';

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="p-4">Please log in.</div>; // Placeholder
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default Layout;