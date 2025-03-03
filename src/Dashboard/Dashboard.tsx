import { useTranslation } from 'react-i18next';
import { Card, SlicedPieChart, TextButton, TransactionEntry } from '../components';
import {
  AreaChartSkeleton,
  BarChartSkeleton,
  CardsEmpty,
  CardSkeleton,
  PieChartSkeleton,
  QuickTransferWidgetSkeleton,
  TransactionEntrySkeleton,
  TransactionsEmpty,
} from '../components/skeletons';
import { useGet } from '../shared/hooks/apiQueryHooks';
import { APIEndpoints } from '../shared/services';
import {
  BalanceHistory,
  BankingCard,
  Contact,
  ExpenseStatistic,
  Transaction,
  WeeklyActivity,
} from '../types';
import BalanceHistoryChart from './BalanceHistoryChart';
import QuickTransferWidget from './QuickTransferWidget';
import WeeklyActivitBarChart from './WeeklyActivityBarChart';

function Dashboard() {
  const { t } = useTranslation();

  const { data: cards = [], isLoading: isCardsLoading } = useGet<BankingCard[]>(
    APIEndpoints.cards.getCards(),
    APIEndpoints.cards.getCards()
  );

  const { data: transactions = [], isLoading: isTransactionsLoading } = useGet<Transaction[]>(
    APIEndpoints.transactions.getRecentTransactions(),
    APIEndpoints.transactions.getRecentTransactions()
  );

  const { data: weeklyActivity, isLoading: isWeeklyActivityLoading } = useGet<WeeklyActivity>(
    APIEndpoints.weeklyActivity.getWeeklyActivity(),
    APIEndpoints.weeklyActivity.getWeeklyActivity()
  );

  const { data: expenseStatistics = [], isLoading: isExpenseStatisticsLoading } = useGet<
    ExpenseStatistic[]
  >(
    APIEndpoints.expenseStatistics.getExpenseStatistics(),
    APIEndpoints.expenseStatistics.getExpenseStatistics()
  );

  const { data: contacts = [], isLoading: isLoadingContacts } = useGet<Contact[]>(
    APIEndpoints.contacts.getContacts(),
    APIEndpoints.contacts.getContacts()
  );

  const { data: balanceHistory, isLoading: isLoadingBalanceHistory } = useGet<BalanceHistory>(
    APIEndpoints.balanceHistory.getBalanceHistory(),
    APIEndpoints.balanceHistory.getBalanceHistory()
  );

  return (
    <div className="h-full grid grid-rows-[auto,auto,1fr] gap-4 p-4 pb-[4rem] mb-[4rem]">
      {/* First row: Cards and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        {/* Cards Section */}
        {
          <section className="overflow-x-auto max-w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-soar dark:text-white font-semibold">
                {t('dashboard.myCards')}
              </h2>
              <TextButton ariaLabel={t('dashboard.seeAll')}>{t('dashboard.seeAll')}</TextButton>
            </div>
            <div className="flex overflow-x-auto max-w-full no-scrollbar-h-[13.375rem] lg:h-[14.6875rem] no-scrollbar">
              {!isCardsLoading ? (
                cards.length ? (
                  cards.map((card, index) => (
                    <div key={index} className="inline-block me-4 last:me-0 max-w-full">
                      <Card card={card} />
                    </div>
                  ))
                ) : (
                  <CardsEmpty />
                )
              ) : (
                <CardSkeleton />
              )}
            </div>
          </section>
        }

        {/* Recent Transactions Section */}
        <section className="">
          <h2 className="text-soar dark:text-white text-lg font-semibold">
            {t('dashboard.recentTransactions')}
          </h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 h-[13.375rem] max-h-[13.375rem] lg:h-[14.6875rem] lg:max-h-[14.6875rem] overflow-y-auto no-scrollbar max-w-full">
            {!isTransactionsLoading ? (
              transactions.length ? (
                transactions.map((transaction, index) => (
                  <TransactionEntry
                    key={index}
                    date={transaction.date}
                    label={transaction.label}
                    amount={transaction.amount}
                    type={transaction.type}
                  />
                ))
              ) : (
                <TransactionsEmpty />
              )
            ) : (
              <div className="flex flex-col justify-between h-full">
                <TransactionEntrySkeleton />
                <TransactionEntrySkeleton />
                <TransactionEntrySkeleton />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Second row: Weekly Activity and Expense Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <section className="max-w-full">
          <h2 className="text-soar dark:text-white text-lg font-semibold">
            {t('weeklyActivity.title')}
          </h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 border-box h-[17.8125rem] lg:h-[20.125rem] lg:max-h-[20.125rem] max-w-full">
            {!isWeeklyActivityLoading ? (
              weeklyActivity ? (
                <div className="h-full">
                  <WeeklyActivitBarChart data={weeklyActivity} />
                </div>
              ) : (
                <div className="text-text-secondary mx-auto h-full flex justify-center items-center">
                  {t('dashboard.noWeeklyActivityDataAvailable')}
                </div>
              )
            ) : (
              <BarChartSkeleton />
            )}
          </div>
        </section>

        <section className="max-w-full">
          <h2 className="text-lg font-semibold text-soar dark:text-white">
            {t('expenseStatistics.title')}
          </h2>
          <div className="mt-4 bg-white rounded-[1.5rem] p-4 flex items-center justify-center lg:h-[20.125rem] lg:max-h-[20.125rem] max-w-full">
            {!isExpenseStatisticsLoading ? (
              expenseStatistics ? (
                <SlicedPieChart data={expenseStatistics} />
              ) : (
                <div className="text-text-secondary mx-auto flex justify-center items-center">
                  {t('dashboard.noExpensesStatisticsAvailable')}
                </div>
              )
            ) : (
              <PieChartSkeleton />
            )}
          </div>
        </section>
      </div>

      {/* Third row: Quick Send and Balance History (Flexbox) */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="">
          <h2 className="text-lg font-semibold text-soar dark:text-white">
            {t('quickTransfer.title')}
          </h2>
          <div className="mt-4 h-[14rem] max-w-[full] lg:h-[17.25rem] bg-white rounded-[1.5rem]">
            {!isLoadingContacts ? (
              contacts.length ? (
                <QuickTransferWidget contacts={contacts} />
              ) : (
                <div className="text-text-secondary mx-auto flex justify-center items-center">
                  {t('dashboard.noContactsAvailable')}
                </div>
              )
            ) : (
              <QuickTransferWidgetSkeleton />
            )}
          </div>
        </div>

        <section className="lg:flex-grow min-w-[60%]">
          <h2 className="text-lg font-semibold text-soar dark:text-white">Balance History</h2>
          <div className="mt-4 p-4 bg-white rounded-[1.5rem] h-[14rem] lg:h-[17.25rem]">
            {!isLoadingBalanceHistory ? (
              balanceHistory ? (
                <BalanceHistoryChart history={balanceHistory} />
              ) : (
                <div className="text-text-secondary mx-auto flex justify-center items-center">
                  {t('dashboard.noContactsAvailable')}
                </div>
              )
            ) : (
              <AreaChartSkeleton />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
