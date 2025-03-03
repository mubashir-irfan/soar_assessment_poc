// src/components/QuickTransferWidget.tsx

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward, IoMdPaperPlane } from 'react-icons/io';
import { Contact } from '../types';

interface QuickTransferWidgetProps {
  contacts: Contact[];
}

function QuickTransferWidget({ contacts }: QuickTransferWidgetProps) {
  const { t, i18n } = useTranslation();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contactListRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);

  const isRTL = i18n.dir() === 'rtl';

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleScrollRight = () => {
    if (contactListRef.current) {
      const scrollAmount = contactListRef.current.offsetWidth;
      const newScrollPosition = isRTL
        ? contactListRef.current.scrollLeft - scrollAmount
        : contactListRef.current.scrollLeft + scrollAmount;
      contactListRef.current.scroll({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleSend = () => {
    if (amountInputRef.current && selectedContact) {
      setIsSending(true);
      setTimeout(() => {
        console.info(`Sending ${amountInputRef.current?.value} to ${selectedContact.name}`);
        if (amountInputRef.current) {
          amountInputRef.current.value = '';
        }
        setIsSending(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (contactListRef.current) {
      contactListRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div className="px-3 py-6 sm:px-6 sm:py-9 flex flex-col justify-between gap-6 max-w-full">
      {/* Contacts Section */}
      <section aria-label="Contacts">
        <div className="flex items-center whitespace-nowrap mb-4">
          <div
            ref={contactListRef}
            className="overflow-x-auto scroll-smooth no-scrollbar" // removed flex-grow and added overflow-x-auto
            role="listbox"
            aria-label="Contact List"
          >
            <div className="flex max-w-[60vw]">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`flex flex-col items-center me-2 last:me-0 cursor-pointer p-1`} // reduced margins and padding
                  onClick={() => handleContactClick(contact)}
                  role="option"
                  aria-selected={selectedContact?.id === contact.id}
                >
                  <img
                    src={contact.avatarURL}
                    alt={contact.name}
                    className="rounded-full w-[40px] h-[40px] object-cover" // smaller image size
                  />
                  <div
                    className={`text-[10px] text-[#232323] mt-1 text-center`} // smaller font and added text-center
                  >
                    {contact.name}
                  </div>
                  <div
                    className={`text-[10px] text-text-secondary text-center`} // smaller font and added text-center
                  >
                    {contact.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="ms-auto shrink-0">
            <button
              className="rounded-full w-[50px] h-[50px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center cursor-pointer shadow-[0px_0px_18px_-2px_#E7E4E8CC]"
              onClick={handleScrollRight}
              aria-label="Scroll Contacts Right"
            >
              <IoIosArrowForward
                className={`w-6 h-6 sm:w-[1rem] sm:h-[1rem] text-text-secondary ${
                  isRTL ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Amount Section */}
      <section aria-label="Amount Transfer">
        <div className="flex items-center gap-4 max-w-[24rem] mx-auto">
          <label
            htmlFor="amountInput"
            className="min-w-max  me-2 text-text-secondary text-[12px] sm:text-[16px] font-normal"
          >
            {t('quickTransfer.writeAmount')}
          </label>
          <div className="relative flex-grow">
            <input
              ref={amountInputRef}
              type="number"
              id="amountInput"
              placeholder={t('quickTransfer.enterAmount')}
              className={`w-full bg-[#EDF1F7] rounded-[50px] p-3 pe-20 text-text-secondary text-[12px] sm:text-[16px] font-normal focus:outline-none focus:ring-2 focus:ring-soar`}
              aria-label="Enter Amount to Send"
            />
            <button
              className={`absolute inline-end-1 ${!isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 bg-[#232323] rounded-[50px] p-3 pe-4 ps-4 flex items-center justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.2)] ${
                selectedContact ? '' : 'opacity-50 cursor-not-allowed'
              } ${isSending ? 'bg-gray-600' : ''}`}
              onClick={handleSend}
              disabled={!selectedContact || isSending}
              aria-label="Send Amount"
            >
              <span className="text-white text-[13px] sm:text-[16px] font-medium me-2">
                {isSending ? t('quickTransfer.sending') : t('quickTransfer.send')}
              </span>
              <IoMdPaperPlane className={`w-5 h-5 text-white ${isRTL ? 'scale-x-[-1]' : ''}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuickTransferWidget;
