import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, TransactionEntry } from '../components';
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

  const topTransactions = transactions.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Cards Section */}
      <div className='max-w-full overflow-x-auto'>
        <section className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('dashboard.myCards')}</h2>
            <button className="text-soar font-medium">{t('dashboard.seeAll')}</button>
          </div>
          <div className="overflow-x-auto whitespace-nowrap"> {/* Isolate scroll here */}
            {cards.map((card, index) => (
              <div key={index} className="inline-block me-4 last:me-0">
                <Card card={card} />
              </div>
            ))}
          </div>
        </section>
      </div>


      {/* Recent Transactions Section */}
      <section className="p-4">
        <h2 className="text-lg font-semibold">{t('dashboard.recentTransactions')}</h2>
        <div className="mt-4 bg-white rounded-lg p-4">
          {topTransactions.map((transaction, index) => (
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