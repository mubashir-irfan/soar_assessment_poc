import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, SlicedPieChart, TextButton, TransactionEntry } from '../components';
import { mockDataService } from '../services/mockData';
import { BankingCard, Contact, ExpenseStatistic, Transaction, WeeklyActivity } from '../types';
import WeeklyActivitBarChart from './WeeklyActivityBarChart';
import QuickTransferWidget from './QuickTransferWidget';

function Dashboard() {
  const { t } = useTranslation();
  const [cards, setCards] = useState<BankingCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity>();
  const [expenseStatistics, setExpenseStatistics] = useState<ExpenseStatistic[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    mockDataService.getBankingCards().then(setCards);
    mockDataService.getTransactions().then(setTransactions);
    mockDataService.getWeeklyActivity().then(setWeeklyActivity);
    mockDataService.getExpenseStatistics().then(setExpenseStatistics);
    mockDataService.getContacts().then(setContacts);
  }, []);

  return (
    <div className="h-full grid grid-rows-[auto,auto,1fr] gap-4 p-4">
      {/* First row: Cards and Recent Transactions */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr] gap-4">
        {/* Cards Section */}
        {!!cards.length && (
          <section className="overflow-x-auto max-w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-soar font-semibold">{t('dashboard.myCards')}</h2>
              <TextButton ariaLabel={t('dashboard.seeAll')}>{t('dashboard.seeAll')}</TextButton>
            </div>
            <div className="flex overflow-x-auto max-w-full no-scrollbar">
              {cards.slice(0, 3).map((card, index) => (
                <div key={index} className="inline-block me-4 last:me-0 max-w-full">
                  <Card card={card} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Transactions Section */}
        <section className="">
          <h2 className="text-soar text-lg font-semibold">{t('dashboard.recentTransactions')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 max-h-[13.375rem] sm:max-h-[14.6875rem] overflow-y-auto no-scrollbar max-w-full">
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

      {/* Second row: Weekly Activity and Expense Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr] gap-4">
        <section className="max-w-full">
          <h2 className="text-soar text-lg font-semibold">{t('weeklyActivity.title')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 border-box h-[17.8125rem] sm:h-[20.125rem] sm:max-h-[20.125rem] max-w-full">
            {weeklyActivity ? (
              <div className="h-full">
                <WeeklyActivitBarChart data={weeklyActivity} />
              </div>
            ) : (
              <div className="text-text-secondary mx-auto">No Weekly Data available.</div>
            )}
          </div>
        </section>

        <section className="max-w-full">
          <h2 className="text-lg font-semibold text-soar">{t('expenseStatistics.title')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 flex items-center justify-center sm:h-[20.125rem] sm:max-h-[20.125rem] max-w-full">
            <SlicedPieChart data={expenseStatistics} />
          </div>
        </section>
      </div>

      {/* Third row: Quick Send and Balance History (Flexbox) */}
      <div className="w-full max-w-[90vw] sm:flex gap-4">
        <section className="rounded-[1.5rem] sm:w-[40%]">
          <h2 className="text-lg font-semibold text-soar">{t('quickTransfer.title')}</h2>
          <div className='mt-4'>
            <QuickTransferWidget contacts={contacts} />
          </div>
        </section>


        <section className="sm:flex-grow">
        <h2 className="text-lg font-semibold text-soar">Balance History</h2>
          <div className='mt-4 p-4 bg-white rounded-[1.5rem]'></div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;