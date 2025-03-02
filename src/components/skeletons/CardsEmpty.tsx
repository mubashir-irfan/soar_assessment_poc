import { useTranslation } from 'react-i18next';
import { MdCreditCardOff } from 'react-icons/md';
import { Link } from 'react-router-dom';

function EmptyCard() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 rounded-[1rem] sm:rounded-[1.5625rem]  bg-white text-secondary border border-border-light text-center">
      <MdCreditCardOff size={48} className="text-gray-400 mb-4" />
      <p className="text-lg font-semibold mb-2">{t('dashboard.emptyCards.unlockFinancialFreedom')}</p>
      <p className="text-sm mb-4">{t('dashboard.emptyCards.experienceSeamlessTransactions')}</p>
      <Link to="/dashboard" className="bg-controls-primary text-white px-4 py-2 rounded-md hover:bg-soar-dark transition-colors">
        {t('dashboard.emptyCards.discoverYourCard')}
      </Link>
    </div>
  );
}

export default EmptyCard;