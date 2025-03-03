import { BankingCard, CardVendor, SoarCardType, Transaction, User, WeeklyActivity } from '../types';

const mockUserData: User = {
  id: 1,
  bankingCards: [
    {
      cardNumber: '3778 **** **** 1234',
      validThru: '01/25',
      vendor: CardVendor.MASTERCARD,
      balance: 5756,
      cardHolder: 'Jane Smith',
      logo: '/mastercard.svg',
      type: SoarCardType.SOAR_PREMIUM,
    },
    {
      cardNumber: '1234 **** **** 3778',
      validThru: '12/24',
      vendor: CardVendor.VISA,
      balance: 5756,
      cardHolder: 'John Doe',
      logo: '/visa.svg',
      type: SoarCardType.SOAR_STANDARD,
    },
    {
      cardNumber: '1234 **** **** 3778',
      validThru: '12/24',
      vendor: CardVendor.VISA,
      balance: 5756,
      cardHolder: 'John Doe',
      logo: '/visa.svg',
      type: SoarCardType.SOAR_STANDARD,
    },
  ],
  latestTransactions: [
    {
      date: '2021-01-28',
      amount: -850,
      type: 'card',
      contactName: '',
      label: 'Withdrawal from card',
    },
    {
      date: '2021-01-27',
      amount: 1200,
      type: 'paypal',
      contactName: '',
      label: 'Deposit from PayPal',
    },
    {
      date: '2021-01-26',
      amount: 500,
      type: 'contact',
      contactName: 'John Doe',
      label: 'Deposit from John Doe',
    },
    {
      date: '2021-01-25',
      amount: 300,
      type: 'card',
      contactName: '',
      label: 'Deposit to card',
    },
    {
      date: '2021-01-24',
      amount: -200,
      type: 'paypal',
      contactName: '',
      label: 'Withdrawal from PayPal',
    },
  ],
  weeklyActivity: {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    deposits: [220, 110, 220, 370, 220, 220, 600],
    withdrawals: [490, 330, 320, 490, 120, 390, 400],
  },
  expenseStatistics: [
    { label: 'Entertainment', value: 30 },
    { label: 'Expense', value: 15 },
    { label: 'Others', value: 35 },
    { label: 'Investment', value: 20 },
  ],
  contacts: [
    {
      id: 1,
      name: 'Ethan Ramirez',
      title: 'Senior Developer',
      avatarURL:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Sophia Chen',
      title: 'Marketing Manager',
      avatarURL:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Liam Patel',
      title: 'UX/UI Designer',
      avatarURL:
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ],
  balanceHistory: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    amounts: [150, 375, 220, 430, 510, 800, 205],
  },
  profile: {
    id: 1,
    avatarURL:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'John Doe',
    userName: 'johndoe123',
    email: 'john.doe@example.com',
    password: 'Password@123',
    dateOfBirth: '1990-01-01',
    presentAddress: '123 Main St',
    permanentAddress: '456 Oak Ave',
    city: 'Anytown',
    postalCode: '12345',
    country: 'USA',
  },
};

export const mockDataService = {
  getBankingCards: (): Promise<BankingCard[]> => {
    return delayedPromise(mockUserData.bankingCards);
  },
  getTransactions: (): Promise<Transaction[]> => {
    return delayedPromise(mockUserData.latestTransactions);
  },
  getWeeklyActivity: () => {
    return delayedPromise(mockUserData.weeklyActivity);
  },
  getExpenseStatistics: () => {
    return delayedPromise(mockUserData.expenseStatistics);
  },
  getContacts: () => {
    return delayedPromise(mockUserData.contacts);
  },
  getBalanceHistory: () => {
    return delayedPromise(mockUserData.balanceHistory);
  },
  getUserProfile: () => {
    return delayedPromise(mockUserData.profile);
  },
  updateTodayActivity: (amount: number, isDeposit: boolean): WeeklyActivity => {
    const weeklyActivity = mockUserData.weeklyActivity;
    const lastIndex = weeklyActivity.labels.length - 1;

    if (isDeposit) {
      weeklyActivity.deposits[lastIndex] += amount;
    } else {
      weeklyActivity.withdrawals[lastIndex] += amount;
    }
    mockUserData.weeklyActivity = weeklyActivity;
    return weeklyActivity;
  },
};

const delayedPromise = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 651);
  });
};

export default mockDataService;
