import { BsCreditCard } from 'react-icons/bs';
import { RiMoneyDollarCircleLine, RiPaypalLine } from 'react-icons/ri';

import { formatCurrency, formatDate } from '../utils';


interface TransactionEntryProps {
  date: string;
  label: string;
  amount: number;
  type: 'card' | 'paypal' | 'contact';
}

function TransactionEntry({ date, label, amount, type }: TransactionEntryProps) {
  const getIcon = () => {
    switch (type) {
      case 'card':
        return <BsCreditCard color="#FFBB38" />;
      case 'paypal':
        return <RiPaypalLine color="#396AFF" />;
      case 'contact':
        return <RiMoneyDollarCircleLine color="#16DBCC" />;
      default:
        return null;
    }
  };

  const getCircleColor = () => {
    switch (type) {
      case 'card':
        return '#FFF5D9';
      case 'paypal':
        return '#E7EDFF';
      case 'contact':
        return '#DCFAF8';
      default:
        return 'transparent';
    }
  };

  const isWithdrawal = amount < 0;

  const amountColor = isWithdrawal ? '#FF4B4A' : '#41D4A8';

  return (
    <div className="flex items-center gap-4 py-2">
      <div
        className="w-[3.4375rem] h-[3.4375rem] sm:w-[3.125rem] sm:h-[3.125rem] rounded-full flex items-center justify-center"
        style={{ backgroundColor: getCircleColor() }}
      >
        <div className="w-[1.75rem] h-[1.75rem] sm:w-[1.5625rem] sm:h-[1.5625rem] flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      <div>
        <div className="font-medium text-[0.875rem] sm:text-[1rem]">{label}</div>
        <div className="font-normal text-[0.75rem] sm:text-[0.9375rem] text-text-secondary">
          {formatDate(date)}
        </div>
      </div>
      <div
        className="ms-auto font-medium text-[0.6875rem] sm:text-[1rem]" // Replaced ml-auto with ms-auto
        style={{ color: amountColor }}
      >
        {formatCurrency(amount)}
      </div>
    </div>
  );
}

export default TransactionEntry;