// src/services/mockDataService.ts

import {
    UserData,
    BankingCard,
    ExpenseBreakdown,
    Transaction,
    WeeklyActivity,
    Contact,
    BalanceHistory,
    CardVendor,
    SoarCardType,
  } from '../types';
  
  let mockUserData: UserData = {
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01',
    presentAddress: '123 Main St',
    permanentAddress: '123 Main St',
    city: 'Anytown',
    postalCode: '12345',
    country: 'USA',
    bankingCards: [
      {
        cardNumber: '3778 **** **** 1234',
        expiryDate: '01/25',
        vendor: CardVendor.MASTERCARD, // Updated to vendor
        balance: 5756,
        cardHolder: 'Jane Smith',
        validThru: '01/25',
        logo: '/mastercard.svg',
        type: SoarCardType.SOAR_PREMIUM, // Updated to SoarCardType
      },
      {
        cardNumber: '1234 **** **** 3778',
        expiryDate: '12/24',
        vendor: CardVendor.VISA, // Updated to vendor
        balance: 5756,
        cardHolder: 'John Doe',
        validThru: '12/24',
        logo: '/visa.svg',
        type: SoarCardType.SOAR_STANDARD, // Updated to SoarCardType
      },
    ],
    expenseBreakdown: {
      labels: ['Groceries', 'Entertainment', 'Utilities', 'Travel'],
      data: [30, 20, 25, 15],
    },
    latestTransactions: [
      { id: '1', date: '2023-10-26', description: 'Grocery Store', amount: -50, type: 'withdrawal' },
      { id: '2', date: '2023-10-25', description: 'Salary Deposit', amount: 2000, type: 'deposit' },
      { id: '3', date: '2023-10-24', description: 'Online Purchase', amount: -100, type: 'withdrawal' },
      { id: '4', date: '2023-10-24', description: 'Transfer to Jane', amount: -250, type: 'transfer' },
    ],
    weeklyActivity: [
      { week: 'Week 1', deposits: 651, withdrawals: 500 },
      { week: 'Week 2', deposits: 1500, withdrawals: 750 },
      { week: 'Week 3', deposits: 2000, withdrawals: 651 },
      { week: 'Week 4', deposits: 1200, withdrawals: 600 },
    ],
    quickTransferContacts: [
      { name: 'Jane Smith', accountNumber: '9876543210' },
      { name: 'Bob Johnson', accountNumber: '1234567890' },
      { name: 'Alice Williams', accountNumber: '5678901234' },
    ],
    balanceHistory: [
      { month: 'Apr', balance: 5000 },
      { month: 'May', balance: 5500 },
      { month: 'Jun', balance: 6000 },
      { month: 'Jul', balance: 6800 },
      { month: 'Aug', balance: 7500 },
      { month: 'Sep', balance: 8000 },
      { month: 'Oct', balance: 8500 },
    ],
  };
  
  export const mockDataService = {
    getUserData: (): Promise<UserData> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch user data.'));
          } else {
            resolve({ ...mockUserData });
          }
        }, 651);
      });
    },
    updateUserData: (updatedUserData: Partial<UserData>): Promise<UserData> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to update user data.'));
          } else {
            mockUserData = { ...mockUserData, ...updatedUserData };
            resolve({ ...mockUserData });
          }
        }, 651);
      });
    },
    getBankingCards: (): Promise<BankingCard[]> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch banking cards.'));
          } else {
            resolve(mockUserData.bankingCards);
          }
        }, 651);
      });
    },
    sendAmount: (amount: number, contact: Contact): Promise<Transaction> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to send amount.'));
          } else {
            const newTransaction: Transaction = {
              id: String(Date.now()),
              date: new Date().toISOString().split('T')[0],
              description: `Transfer to ${contact.name}`,
              amount: -amount,
              type: 'transfer',
            };
            mockUserData.latestTransactions.unshift(newTransaction);
            mockUserData = { ...mockUserData };
            resolve(newTransaction);
          }
        }, 651);
      });
    },
    getTransactions: (): Promise<Transaction[]> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch transactions.'));
          } else {
            resolve(mockUserData.latestTransactions);
          }
        }, 651);
      });
    },
    getExpenseBreakdown: (): Promise<ExpenseBreakdown> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch expense breakdown.'));
          } else {
            resolve(mockUserData.expenseBreakdown);
          }
        }, 651);
      });
    },
    getWeeklyActivity: (): Promise<WeeklyActivity[]> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch weekly activity.'));
          } else {
            resolve(mockUserData.weeklyActivity);
          }
        }, 651);
      });
    },
    getQuickTransferContacts: (): Promise<Contact[]> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch quick transfer contacts.'));
          } else {
            resolve(mockUserData.quickTransferContacts);
          }
        }, 651);
      });
    },
    getBalanceHistory: (): Promise<BalanceHistory[]> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Failed to fetch balance history.'));
          } else {
            resolve(mockUserData.balanceHistory);
          }
        }, 651);
      });
    },
  };