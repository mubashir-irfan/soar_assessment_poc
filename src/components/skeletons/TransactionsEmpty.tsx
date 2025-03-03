import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiFileListLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function TransactionsEmpty() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 rounded-[1rem] sm:rounded-[1.5625rem] bg-white text-secondary border border-border-light text-center">
      <RiFileListLine size={48} className="text-gray-400 mb-4" />
      <p className="text-lg font-medium mb-2">{t('dashboard.transactionsEmpty.noTransactions')}</p>
      <p className="text-sm mb-4 text-text-secondary">
        {t('dashboard.transactionsEmpty.transactionsWillShowHere')}
      </p>
      <Link
        to="/dashboard"
        className="bg-controls-primary text-white px-4 py-2 rounded-md hover:bg-soar-dark transition-colors"
      >
        {t('dashboard.transactionsEmpty.sendMoney')}
      </Link>
    </div>
  );
}

export default TransactionsEmpty;
