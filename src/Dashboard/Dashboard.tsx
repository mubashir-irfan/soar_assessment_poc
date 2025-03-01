import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, SlicedPieChart, TextButton, TransactionEntry } from '../components';
import { mockDataService } from '../services/mockData';
import { BankingCard, ExpenseStatistic, Transaction, WeeklyActivity } from '../types';
import WeeklyActivitBarChart from './WeeklyActivityBarChart';
import ExpenseStatistics from './ExpenseStatistics';

function Dashboard() {
  const { t } = useTranslation();
  const [cards, setCards] = useState<BankingCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity>()
  const [expenseStatistics, setExpenseStatistics] = useState<ExpenseStatistic[]>([]);


  useEffect(() => {
    mockDataService.getBankingCards().then(setCards);
    mockDataService.getTransactions().then(setTransactions);
    mockDataService.getWeeklyActivity().then(setWeeklyActivity);
    mockDataService.getExpenseStatistics().then(setExpenseStatistics);
  }, []);

  const data = [
    { label: "Entertainment", value: 30 },
    { label: "Bill Expense", value: 25 },
    { label: "Others", value: 20 },
    { label: "Investment", value: 25 }
  ];

  return (
    <div className="h-full flex flex-col gap-4">

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        {/* Cards Section */}
        {!!cards.length && <section className='h-fit overflow-x-scroll'>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-soar font-semibold">{t('dashboard.myCards')}</h2>
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
          <h2 className="text-soar text-lg font-semibold">{t('dashboard.recentTransactions')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 max-h-[13.375rem] sm:max-h-[14.6875rem] overflow-y-auto no-scrollbar">
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

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        {/* Weekly Activity Section */}
        <section className='flex-grow'>
          <h2 className="text-soar text-lg font-semibold">{t('weeklyActivity.title')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 border-box h-[17.8125rem] sm:h-[20.125rem] sm:max-h-[20.125rem]">
            {weeklyActivity ? <div className='h-full'><WeeklyActivitBarChart data={weeklyActivity} /></div> : <div className='text-text-secondary mx-auto'>
              No Weekly Data available.</div>}
          </div>
        </section>

        <section className='sm:min-w-[21.875rem]'>
        <h2 className="text-lg font-semibold text-soar">{t('expenseStatistics.title')}</h2>
        <div className="mt-4 bg-white rounded-[1.5rem] p-4 flex items-center justify-center sm:h-[20.125rem] sm:max-h-[20.125rem]">
          {/* <ExpenseStatistics data={expenseStatistics} /> */}
          <SlicedPieChart data={expenseStatistics} />
        </div>
      </section>
      </div>

      

    </div>
  );
}

export default Dashboard;