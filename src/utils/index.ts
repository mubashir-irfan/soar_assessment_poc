import dayjs from 'dayjs';

const INPUT_DATE_FORMAT = 'YYYY-MM-DD';
const OUTPUT_DATE_FORMAT = 'DD MMMM YYYY';

export const formatDate = (dateString: string): string => {
  return dayjs(dateString, INPUT_DATE_FORMAT).format(OUTPUT_DATE_FORMAT);
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0, // Set maximum fraction digits to 0
  }).format(amount);
}

export {required, validEmail} from './validators'