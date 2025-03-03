import { useTranslation } from 'react-i18next';
import { RiVisaLine } from 'react-icons/ri';
import { SiMastercard } from 'react-icons/si';
import { CardChip } from '.';
import { CardVendor, SoarCardType } from '../types';
import { formatCurrency } from '../utils';

interface CardProps {
  card: {
    type: SoarCardType;
    balance: number;
    cardHolder: string;
    validThru: string;
    cardNumber: string;
    vendor: CardVendor;
  };
}

function Card({ card }: CardProps) {
  const isPremium = card.type === SoarCardType.SOAR_PREMIUM;
  const { t } = useTranslation();

  const renderCardLogo = () => {
    if (card.vendor === CardVendor.MASTERCARD) {
      return (
        <SiMastercard
          size={25}
          color={isPremium ? 'white' : '#9199AF80'}
          style={{ opacity: isPremium ? 1 : 0.5 }}
          data-testid="mastercard-logo" // Add data-testid
        />
      );
    } else if (card.vendor === CardVendor.VISA) {
      return (
        <RiVisaLine
          size={30}
          color={isPremium ? 'text-white' : '#9199AF'}
          data-testid="visa-logo" // Add data-testid
        />
      );
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col rounded-[1rem] sm:rounded-[1.5625rem] w-[16.5rem] min-w-[16.5rem] sm:w-[21.875rem] sm:min-w-[21.875rem] h-[10.625rem] sm:h-[14.6875rem] ${
        isPremium
          ? 'bg-gradient-to-r from-[#5B5A6F] to-[#000000]'
          : 'bg-white text-secondary border border-border-light'
      }`}
    >
      <div className="px-[1.25rem] py-2 sm:py-4 flex-grow flex flex-col justify-around">
        <div className="flex justify-between items-start">
          <div>
            <div
              className={`text-[0.65rem] sm:text-[0.75rem] font-normal ${
                isPremium ? 'text-white' : 'text-secondary'
              }`}
            >
              {t('card.balance')}
            </div>
            <div
              className={`text-base sm:text-[1.25rem] sm:text-base font-semibold ${
                isPremium ? 'text-white' : 'text-soar'
              }`}
            >
              {formatCurrency(card.balance)}
            </div>
          </div>
          <div
            className={`w-[1.8125rem] h-[1.8125rem] sm:w-[2.1875rem] sm:h-[2.1875rem] me-3 ${
              isPremium ? 'text-white' : 'text-active'
            }`}
          >
            <CardChip />
          </div>
        </div>

        <div className="flex gap-[3.35rem] sm:gap-[4.1875rem]">
          <div>
            <div
              className={`text-[0.65rem] sm:text-[0.75rem] font-normal ${
                isPremium ? 'text-white' : 'text-secondary'
              }`}
            >
              {t('card.cardHolder')}
            </div>
            <div
              className={`text-[0.8125rem] sm:text-base font-semibold ${
                isPremium ? 'text-white' : 'text-soar'
              }`}
            >
              {card.cardHolder}
            </div>
          </div>
          <div>
            <div
              className={`text-[0.65rem] sm:text-[0.75rem] font-normal ${
                isPremium ? 'text-white' : 'text-secondary'
              }`}
            >
              {t('card.validThru')}
            </div>
            <div
              className={`text-[0.8125rem] sm:text-base font-semibold ${
                isPremium ? 'text-white' : 'text-soar'
              }`}
            >
              {card.validThru}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex justify-between px-[1.25rem] ${
          isPremium ? 'py-[1rem]' : 'py-[0.75rem] sm:py-[0.9375rem]'
        } items-center w-full ${
          isPremium ? 'bg-white/15' : 'border-t border-border-light border-solid'
        }`}
      >
        <div
          className={`text-base sm:text-[1.25rem] font-semibold ${
            isPremium ? 'text-white' : 'text-soar'
          }`}
        >
          {card.cardNumber}
        </div>
        {renderCardLogo()}
      </div>
    </div>
  );
}

export default Card;
