// Card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import {Card} from '../src/components/Card'
import { CardVendor, SoarCardType } from '../src/types';
import { I18nextProvider } from 'react-i18next';
// import i18n from '../src/i18n'; // Adjust the path to your i18n configuration

describe('Card Component', () => {
  const mockCard = {
    type: SoarCardType.SOAR_STANDARD,
    balance: 1000,
    cardHolder: 'John Doe',
    validThru: '12/24',
    cardNumber: '1234567890123456',
    vendor: CardVendor.VISA,
  };

  const renderComponent = (card = mockCard) => {
    render(
      // <I18nextProvider i18n={i18n}>
        <Card card={card} />
      // </I18nextProvider>
    );
  };

  it('should render standard card with VISA logo', () => {
    renderComponent();
    expect(screen.getByText('1234567890123456')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('12/24')).toBeInTheDocument();
    expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    expect(screen.getByTestId('visa-logo')).toBeInTheDocument(); // Assuming you add data-testid="visa-logo" to RiVisaLine
  });

  it('should render premium card with MASTERCARD logo', () => {
    renderComponent({
      ...mockCard,
      type: SoarCardType.SOAR_PREMIUM,
      vendor: CardVendor.MASTERCARD,
    });
    expect(screen.getByText('1234567890123456')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('12/24')).toBeInTheDocument();
    expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    expect(screen.getByTestId('mastercard-logo')).toBeInTheDocument(); // Assuming you add data-testid="mastercard-logo" to SiMastercard
  });

  it('should render correct balance', () => {
    renderComponent({ ...mockCard, balance: 5000 });
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
  });

  it('should render correct card holder', () => {
    renderComponent({ ...mockCard, cardHolder: 'Jane Smith' });
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render correct valid thru', () => {
    renderComponent({ ...mockCard, validThru: '01/25' });
    expect(screen.getByText('01/25')).toBeInTheDocument();
  });

  it('should render correct card number', () => {
    renderComponent({ ...mockCard, cardNumber: '9876543210987654' });
    expect(screen.getByText('9876543210987654')).toBeInTheDocument();
  });
});