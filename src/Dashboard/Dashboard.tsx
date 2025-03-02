import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardChip, SlicedPieChart, TextButton, TransactionEntry } from '../components';
import { mockDataService } from '../services/mockData';
import { BalanceHistory, BankingCard, Contact, ExpenseStatistic, Transaction, WeeklyActivity } from '../types';
import BalanceHistoryChart from './BalanceHistoryChart';
import QuickTransferWidget from './QuickTransferWidget';
import WeeklyActivitBarChart from './WeeklyActivityBarChart';
import { CardsEmpty, CardSkeleton } from '../components/skeletons';

function Dashboard() {
  const { t } = useTranslation();

  // In actual production, I would use react query. The data and isLoading would come from a single source
  const [cards, setCards] = useState<BankingCard[]>([]);
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity>();
  const [expenseStatistics, setExpenseStatistics] = useState<ExpenseStatistic[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [balanceHistory, setBalanceHistory] = useState<BalanceHistory>();

  useEffect(() => {
    mockDataService.getBankingCards().then((cards: BankingCard[]) => {
      setCards(cards);
      setIsCardsLoading(false);
    });
    mockDataService.getTransactions().then(setTransactions);
    mockDataService.getWeeklyActivity().then(setWeeklyActivity);
    mockDataService.getExpenseStatistics().then(setExpenseStatistics);
    mockDataService.getContacts().then(setContacts);
    mockDataService.getBalanceHistory().then(setBalanceHistory);
  }, []);

  return (
    <div className="h-full grid grid-rows-[auto,auto,1fr] gap-4 p-4">
      {/* First row: Cards and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        {/* Cards Section */}
        {(
          <section className="overflow-x-auto max-w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-soar font-semibold">{t('dashboard.myCards')}</h2>
              <TextButton ariaLabel={t('dashboard.seeAll')}>{t('dashboard.seeAll')}</TextButton>
            </div>
            <div className="flex overflow-x-auto max-w-full no-scrollbar-h-[13.375rem] lg:h-[14.6875rem]">
              {!isCardsLoading ?
                cards.length ?
                  cards.map((card, index) => (
                    <div key={index} className="inline-block me-4 last:me-0 max-w-full">
                      <Card card={card} />
                    </div>
                  )) : <CardsEmpty />
                : <CardSkeleton />}
            </div>
          </section>
        )}

        {/* Recent Transactions Section */}
        <section className="">
          <h2 className="text-soar text-lg font-semibold">{t('dashboard.recentTransactions')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 max-h-[13.375rem] lg:max-h-[14.6875rem] overflow-y-auto no-scrollbar max-w-full">
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
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <section className="max-w-full">
          <h2 className="text-soar text-lg font-semibold">{t('weeklyActivity.title')}</h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 border-box h-[17.8125rem] lg:h-[20.125rem] lg:max-h-[20.125rem] max-w-full">
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
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 flex items-center justify-center lg:h-[20.125rem] lg:max-h-[20.125rem] max-w-full">
            <SlicedPieChart data={expenseStatistics} />
          </div>
        </section>
      </div>

      {/* Third row: Quick Send and Balance History (Flexbox) */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="rounded-[1.5rem]">
          <h2 className="text-lg font-semibold text-soar">{t('quickTransfer.title')}</h2>
          <div className='mt-4 h-[14rem] max-w-full lg:h-[17.25rem] bg-white rounded-[1.5rem]'>
            <QuickTransferWidget contacts={contacts} />
          </div>
        </div>


        <section className="lg:flex-grow">
          <h2 className="text-lg font-semibold text-soar">Balance History</h2>
          <div className='mt-4 p-4 bg-white rounded-[1.5rem] h-[14rem] lg:h-[17.25rem]'>
            <BalanceHistoryChart history={balanceHistory} />
          </div>
        </section>
      </div>
    </div>
  );
}


export default Dashboard;