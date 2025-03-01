import {
  BankingCard,
  CardVendor,
  SoarCardType,
  Transaction,
  User,
} from '../types';

let mockUserData: User = {
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
      cardNumber: '3778 **** **** 1234',
      validThru: '01/25',
      vendor: CardVendor.MASTERCARD,
      balance: 5756,
      cardHolder: 'Jane Smith',
      logo: '/mastercard.svg',
      type: SoarCardType.SOAR_PREMIUM,
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
};

export const mockDataService = {
  getBankingCards: (): Promise<BankingCard[]> => {
    return delayedPromise(mockUserData.bankingCards);
  },
  getTransactions: (): Promise<Transaction[]> => {
    return delayedPromise(mockUserData.latestTransactions);
  },
};

const delayedPromise = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    },651);
  });
};
