export interface User {
  id: number;
  bankingCards: BankingCard[];
  latestTransactions: Transaction[];
  weeklyActivity: WeeklyActivity;
  expenseStatistics: ExpenseStatistic[];
  contacts: Contact[];
  balanceHistory: BalanceHistory;
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  name: string;
  userName: string;
  email: string;
  password: string;
  avatarURL?: string;
  dateOfBirth?: string;
  presentAddress?: string;
  permanentAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export enum SoarCardType {
  SOAR_PREMIUM = 'SOAR_PREMIUM',
  SOAR_STANDARD = 'SOAR_STANDARD',
}
export enum CardVendor {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
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

export interface Transaction {
  date: string;
  amount: number;
  type: 'card' | 'paypal' | 'contact';
  contactName: string;
  label: string;
}

export interface WeeklyActivity {
  labels: string[];
  deposits: number[];
  withdrawals: number[];
}

export interface ExpenseStatistic {
  label: string;
  value: number;
}

export type Contact = {
  id: number;
  name: string;
  title: string;
  avatarURL: string;
};

export interface BalanceHistory {
  labels: string[];
  amounts: number[];
}
