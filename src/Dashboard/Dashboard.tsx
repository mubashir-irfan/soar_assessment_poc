import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { Loader } from '../shared/components';
import { useI18n } from '../context/I18nContext';
import { mockDataService } from '../services/mockData';

function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useI18n(); // Use i18n hook

  useEffect(() => {
    setIsLoading(true);
    mockDataService
      .getUserData()
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Data not found.</div>;
  }

  return (
    <div className="p-4">
      <p>Test string</p>
      <h2 className="text-2xl font-bold mb-4">{i18n.t('dashboard')}</h2> {/* Translated title */}
      <p>{i18n.t('welcome', { name: userData.name })}</p> {/* Translated welcome message */}
      <div className="p-4">
        <h2 className="text-3xl text-primary font-bold mb-4">{i18n.t('dashboard')}</h2>
        <p className="text-text-light dark:text-text-dark">{i18n.t('welcome', { name: 'John Doe' })}</p>
        <div className="border border-border-light dark:border-border-dark p-4 mt-4">
          <p className="text-sm text-secondary">This is a box with a border.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;