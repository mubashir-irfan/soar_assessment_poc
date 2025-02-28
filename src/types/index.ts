export enum SoarCardType {
  SOAR_PREMIUM = 'SOAR_PREMIUM',
  SOAR_STANDARD = 'SOAR_STANDARD',
}

export enum CardVendor {
  VISA = 'Visa',
  MASTERCARD = 'MasterCard',
}

export interface BankingCard {
  cardNumber: string;
  expiryDate: string;
  vendor: CardVendor; // Changed to vendor
  balance: number;
  cardHolder: string;
  validThru: string;
  logo: string;
  type: SoarCardType; // Changed to SoarCardType
}

export interface UserData {
    avatar: string;
    name: string;
    username: string;
    email: string;
    password?: string; // Optional for mock data
    dateOfBirth: string;
    presentAddress: string;
    permanentAddress: string;
    city: string;
    postalCode: string;
    country: string;
    bankingCards: BankingCard[];
    expenseBreakdown: ExpenseBreakdown;
    latestTransactions: Transaction[];
    weeklyActivity: WeeklyActivity[];
    quickTransferContacts: Contact[];
    balanceHistory: BalanceHistory[];
  }

  export interface ExpenseBreakdown {
    labels: string[];
    data: number[];
  }
  
  export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
  }
  
  export interface WeeklyActivity {
    week: string;
    deposits: number;
    withdrawals: number;
  }
  
  export interface Contact {
    name: string;
    accountNumber: string;
  }
  
  export interface BalanceHistory {
    month: string;
    balance: number;
  }
  