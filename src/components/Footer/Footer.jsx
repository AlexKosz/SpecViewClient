import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        © {currentYear} JestView |{' '}
        <a href="https://github.com/AlexKosz/SpecViewClient" className="underline">
          GitHub
        </a>{' '}
        |{' '}
        <a href="/privacy" className="underline">
          Privacy
        </a>
      </div>
      <div>
        <a
          href="https://koszuta.dev"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Alexander Koszuta
        </a>
      </div>
    </footer>
  );
};

export default Footer;
