// src/components/Card.tsx

import React from 'react';
import { formatCurrency } from '../utils';
import { SoarCardType, CardVendor } from '../types';
import { RiVisaLine } from 'react-icons/ri';
import { SiMastercard } from 'react-icons/si';

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

  const renderCardLogo = () => {
    if (card.vendor === CardVendor.MASTERCARD) {
      return (
        <SiMastercard
          size={30}
          color={isPremium ? 'white' : '#9199AF80'}
          style={{ opacity: isPremium ? 1 : 0.5 }}
        />
      );
    } else if (card.vendor === CardVendor.VISA) {
      return <RiVisaLine size={30} color={isPremium ? 'white' : '#9199AF'} />;
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col rounded-[1.5625rem] w-[16.5rem] min-w-[16.5rem] sm:w-[21.875rem] sm:min-w-[21.875rem] h-[10.625rem] sm:h-[14.6875rem] ${
        isPremium
          ? 'bg-gradient-to-r from-[#5B5A6F] to-[#000000]'
          : 'bg-white text-[#718EBF] border border-border-light'
      }`}
    >
      <div className="px-[1.625rem] py-[1.5rem] flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className={`text-[0.75rem] font-normal ${isPremium ? 'text-white' : 'text-[#718EBF]'}`}>Balance</div>
            <div
              className={`text-[0.9375rem] font-semibold ${
                isPremium ? 'text-white' : 'text-soar'
              }`}
            >
              {formatCurrency(card.balance)}
            </div>
          </div>
          <div>{/* Placeholder for chip icon */}</div>
        </div>

        <div className="flex justify-between">
          <div>
            <div className={`text-[0.75rem] font-normal ${isPremium ? 'text-white' : 'text-[#718EBF]'}`}>Card Holder</div>
            <div
              className={`text-[0.9375rem] font-semibold ${
                isPremium ? 'text-white' : 'text-soar'
              }`}
            >
              {card.cardHolder}
            </div>
          </div>
          <div>
            <div className={`text-[0.75rem] font-normal ${isPremium ? 'text-white' : 'text-[#718EBF]'}`}>Valid Thru</div>
            <div
              className={`text-[0.9375rem] font-semibold ${
                isPremium ? 'text-white' : 'text-soar'
              }`}
            >
              {card.validThru}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex justify-between px-[1.625rem] ${isPremium ? 'py-[1.5rem]' : 'py-[1.4375rem]'} items-center w-full ${
          isPremium ? 'bg-white/20' : 'border-t border-border-light'
        }`}
      >
        <div
          className={`text-[1.375rem] font-semibold ${
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