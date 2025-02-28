export interface User {
  id: number;
  bankingCards: BankingCard[];
  latestTransactions: Transaction[];
}

export enum SoarCardType {
  SOAR_PREMIUM = 'SOAR_PREMIUM',
  SOAR_STANDARD = 'SOAR_STANDARD',
}

export enum CardVendor {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
}

export interface Transaction {
  date: string;
  amount: number;
  type: 'card' | 'paypal' | 'contact';
  contactName: string;
  label: string;
}

export interface BankingCard {
  cardNumber: string;
  vendor: CardVendor; // Changed to vendor
  balance: number;
  cardHolder: string;
  validThru: string;
  logo: string;
  type: SoarCardType; // Changed to SoarCardType
}
