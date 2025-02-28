import React, { useState, useEffect } from 'react';
import { BankingCard, UserData } from '../types';
import { Loader } from '../shared/components';
import { useI18n } from '../context/I18nContext';
import { mockDataService } from '../services/mockData';
import { useTranslation } from 'react-i18next';
import { Card } from '../components';

function Dashboard() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<BankingCard[]>([]);

  useEffect(() => {
    mockDataService.getBankingCards().then(setCards);
  }, []);


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
    <div className="flex flex-col bg-background-white sm:bg-background-light">
      {/* Cards Section */}
      <section className="overflow-x-auto whitespace-nowrap p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('dashboard.myCards')}</h2>
          <button className="text-soar font-medium">{t('dashboard.seeAll')}</button>
        </div>

        {cards.map((card, index) => (
          <div key={index} className="inline-block me-4 last:me-0">
            <Card card={card} />
          </div>
        ))}
      </section>

      {/* Other sections will go here */}
    </div>
  );
}

export default Dashboard;