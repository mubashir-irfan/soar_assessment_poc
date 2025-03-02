const APIEndpoints = {
    cards: {
      getCards: () => '/cards',
    },
    transactions: {
      getRecentTransactions: () => '/transactions/recent',
    },
    weeklyActivity: {
      getWeeklyActivity: () => '/weekly-activity',
    },
    expenseStatistics: {
      getExpenseStatistics: () => '/expense-statistics',
    },
    contacts: {
      getContacts: () => '/contacts',
    },
    balanceHistory: {
      getBalanceHistory: () => '/balance-history',
    },
    profile: {
      getUserProfile: () => '/profile',
      updateProfile: () => '/profile',
    },
  };
  
  export default APIEndpoints;