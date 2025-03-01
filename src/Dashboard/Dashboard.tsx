import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, TextButton, TransactionEntry } from '../components';
import { mockDataService } from '../services/mockData';
import { BankingCard, Transaction } from '../types';

function Dashboard() {
  const { t } = useTranslation();
  const [cards, setCards] = useState<BankingCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    mockDataService.getBankingCards().then(setCards);
    mockDataService.getTransactions().then(setTransactions);
  }, []);

  return (
    <div className="h-full flex flex-col sm:flex-row sm:justify-between gap-4">
      {/* Cards Section */}

    {!!cards.length && <section className='h-fit overflow-x-scroll'>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('dashboard.myCards')}</h2>
          <TextButton ariaLabel={t('dashboard.seeAll')}>
            {t('dashboard.seeAll')}
          </TextButton>
        </div>
        <div className="whitespace-nowrap overflow-x-auto max-w-full no-scrollbar">
          {cards.slice(0, 3).map((card, index) => (
            <div key={index} className="inline-block me-4 last:me-0">
              <Card card={card} />
            </div>
          ))}
        </div>
      </section>}


      {/* Recent Transactions Section */}
      <section className='sm:min-w-[21.875rem]'>
        <h2 className="text-lg font-semibold">{t('dashboard.recentTransactions')}</h2>
        <div className="mt-4 bg-white rounded-lg p-4 max-h-[13.375rem] sm:max-h-[14.6875rem] overflow-y-auto no-scrollbar">
          {transactions.map((transaction, index) => (
            <TransactionEntry
              key={index}
              date={transaction.date}
              label={transaction.label}
              amount={transaction.amount}
              type={transaction.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;