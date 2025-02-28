import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { Loader } from '../shared/components';
import { useI18n } from '../context/I18nContext';
import { mockDataService } from '../services/mockData';

function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useI18n(); 

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
      <p>Dashboard TBD</p>
      <p>{i18n.t('welcome', { name: userData.name })}</p> {/* Translated welcome message */}
    </div>
  );
}

export default Dashboard;