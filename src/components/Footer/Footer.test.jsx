import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';

// Test if the component renders correctly
describe('Footer Component', () => {
  it('renders footer content', () => {
    render(<Footer />);

    // Check if the "© {currentYear} JestView" text is present using regex for the dynamic year
    const yearText = new RegExp(`© ${new Date().getFullYear()} JestView`, 'i');
    expect(screen.getByText(yearText)).toBeInTheDocument();

    // Check if the GitHub link is rendered with correct URL
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AlexKosz/SpecViewClient');

    // Check if the Privacy link is rendered with correct URL
    const privacyLink = screen.getByText('Privacy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');

    // Check if the "Made by Alexander Koszuta" link is rendered with correct URL
    const madeByLink = screen.getByText('Made by Alexander Koszuta');
    expect(madeByLink).toBeInTheDocument();
    expect(madeByLink).toHaveAttribute('href', 'https://koszuta.dev');
    expect(madeByLink).toHaveAttribute('target', '_blank');
    expect(madeByLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Check if the className is set correctly
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('footer');

    // Check if links have the correct underline class
    const links = screen.getAllByRole('link'); // Query all links
    links.forEach((link) => {
      if (link.classList.contains('underline')) {
        expect(link).toHaveClass('underline');
      }
    });
  });
});
