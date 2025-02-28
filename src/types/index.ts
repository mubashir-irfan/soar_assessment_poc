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
  
  export interface BankingCard {
    cardNumber: string;
    expiryDate: string;
    cardType: 'Visa' | 'MasterCard' | 'Amex';
    // Add other card details
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
  