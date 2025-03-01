// src/components/QuickTransferWidget.tsx

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward, IoMdPaperPlane } from 'react-icons/io';
import { Contact } from '../types';

interface QuickTransferWidgetProps {
  contacts: Contact[];
}

function QuickTransferWidget({ contacts }: QuickTransferWidgetProps) {
  const { t } = useTranslation();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contactListRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleScrollRight = () => {
    if (contactListRef.current) {
      const scrollAmount = contactListRef.current.offsetWidth;
      contactListRef.current.scrollLeft += scrollAmount;
      setScrollPosition(contactListRef.current.scrollLeft);
    }
  };

  const handleSend = () => {
    if (amountInputRef.current && selectedContact) {
      setIsSending(true);
      setTimeout(() => {
        // Logic to send amount
        console.info(`Sending ${amountInputRef.current?.value} to ${selectedContact.name}`);
        // Clear input
        if (amountInputRef.current) { // Added null check
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
    <div className="bg-white rounded-[1.5rem] px-6 py-9">
      {/* Contacts Section */}
      <section aria-label="Contacts">
        <div className="flex items-center whitespace-nowrap mb-4">
          <div ref={contactListRef} className="flex flex-grow overflow-x-auto scroll-smooth no-scrollbar" role="listbox" aria-label="Contact List">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`flex flex-col items-center me-4 last:me-0 cursor-pointer ${selectedContact?.id === contact.id ? 'font-bold' : 'font-medium'
                  }`}
                onClick={() => handleContactClick(contact)}
                role="option"
                aria-selected={selectedContact?.id === contact.id}
              >
                <img
                  src={contact.avatarURL}
                  alt={contact.name}
                  className="rounded-full w-[70px] h-[70px] sm:w-[50px] sm:h-[50px] object-cover"
                />
                <div
                  className={`text-[16px] sm:text-[12px] text-[#232323] mt-3 ${selectedContact?.id === contact.id ? 'font-bold' : 'font-medium'
                    }`}
                >
                  {contact.name}
                </div>
                <div
                  className={`text-[15px] sm:text-[12px] text-text-secondary ${selectedContact?.id === contact.id ? 'font-bold' : 'font-medium'
                    }`}
                >
                  {contact.title}
                </div>
              </button>
            ))}
          </div>
          <div className="ms-4 shrink-0">
            <button
              className="rounded-full w-[50px] h-[50px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center cursor-pointer shadow-[0px_0px_18px_-2px_#E7E4E8CC]"
              onClick={handleScrollRight}
              aria-label="Scroll Contacts Right"
            >
              <IoIosArrowForward className="w-6 h-6 sm:w-[1rem] sm:h-[1rem] text-text-secondary" />
            </button>
          </div>
        </div>
      </section>

      {/* Amount Section */}
      <section aria-label="Amount Transfer">
        <div className="flex items-center gap-4">
          <label htmlFor="amountInput" className="text-text-secondary text-[16px] sm:text-[12px] font-normal me-2">
            {t('quickTransfer.writeAmount')}
          </label>
          <div className="relative flex-grow">
            <input
              ref={amountInputRef}
              type="text"
              id="amountInput"
              placeholder="Enter Amount"
              className={`w-full bg-[#EDF1F7] rounded-[50px] p-3 pe-20 text-text-secondary text-[16px] sm:text-[12px] font-normal focus:outline-none focus:ring-2 focus:ring-soar`} // Added focus styles
              aria-label="Enter Amount to Send"
            />
            <button
              className={`absolute end-1 right-0 top-1/2 -translate-y-1/2 bg-[#232323] rounded-[50px] p-3 pe-4 ps-4 flex items-center justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.2)] ${selectedContact ? '' : 'opacity-50 cursor-not-allowed'
                } ${isSending ? 'bg-gray-600' : ''}`} // Added visual feedback
              onClick={handleSend}
              disabled={!selectedContact || isSending} // Disabled during sending
              aria-label="Send Amount"
            >
              <span className="text-white text-[16px] sm:text-[13px] font-medium me-2">
                {isSending ? t('quickTransfer.sending') : t('quickTransfer.send')}
              </span>
              <IoMdPaperPlane className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuickTransferWidget;