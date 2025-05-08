// PrivacyPolicy.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';
import '@testing-library/jest-dom';

describe('PrivacyPolicy component', () => {
  beforeEach(() => {
    render(<PrivacyPolicy />);
  });

  it('renders the main heading', () => {
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('displays the effective date', () => {
    expect(screen.getByText(/Effective Date:/i)).toBeInTheDocument();
    // expect(screen.getByText(/05\/08\/2025/)).toBeInTheDocument();
  });

  it('renders all main section headings', () => {
    const sectionTitles = [
      '1. Information We Collect',
      '2. How We Use Your Information',
      '3. Data Sharing and Disclosure',
      '4. Cookies and Tracking Technologies',
      '5. Data Security',
      '6. Your Rights',
      '7. Third-Party Links',
      '8. Children’s Privacy',
      '9. Changes to This Privacy Policy',
      '10. Contact Us',
    ];

    sectionTitles.forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });
  });

  it('renders usage purposes', () => {
    const usageItems = [
      'To provide and maintain our services',
      'To personalize your experience and improve our website and services',
      'To send you updates, promotions, and other communications related to our service',
      'To respond to your inquiries and provide customer support',
      'To comply with legal obligations and protect our rights',
    ];

    usageItems.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('includes sharing and disclosure conditions', () => {
    const disclosureItems = [
      'With your consent',
      'With service providers who assist in the operation of our website and services (e.g., hosting, email services)',
      'To comply with legal requirements, such as responding to a subpoena or other legal process',
      'To protect the rights, property, or safety of JestView, our users, or the public',
    ];

    disclosureItems.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders the contact email correctly', () => {
    expect(screen.getByText(/alexander@koszuta\.dev/i)).toBeInTheDocument();
  });

  it('mentions rights of the user', () => {
    expect(
      screen.getByText(/access, correct, or delete your personal information/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/withdraw consent for the processing of your data/i)
    ).toBeInTheDocument();
  });

  it('mentions children’s privacy disclaimer', () => {
    expect(screen.getByText(/not intended for children under the age of 13/i)).toBeInTheDocument();
  });

  it('mentions policy update disclaimer', () => {
    expect(
      screen.getByText(/we may update this privacy policy from time to time/i)
    ).toBeInTheDocument();
  });
});
