import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';

import { youngEaglesRegistrationUrl, youngEaglesWhatsAppUrl } from '../config/marketing';

const pageLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/programs', label: 'Programmes' },
  { to: '/about', label: 'Our Story' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const renderLinks = (mobile = false) => pageLinks.map((item) => (
    <li key={item.to}>
      <NavLink
        to={item.to}
        end={item.end}
        onClick={mobile ? () => setIsMenuOpen(false) : undefined}
        className={({ isActive }) => [
          'ye-nav-link',
          isActive ? 'is-active' : '',
        ].filter(Boolean).join(' ')}
      >
        {item.label}
      </NavLink>
    </li>
  ));

  return (
    <header className="ye-header">
      <div className="ye-header__inner">
        <Link className="ye-brand" to="/" aria-label="Young Eagles home">
          <img src="/app-icons/yehc_logo.png" alt="" width="48" height="48" />
          <span>Young Eagles</span>
        </Link>

        <nav className="ye-desktop-nav" aria-label="Main navigation">
          <ul>{renderLinks()}</ul>
        </nav>

        <div className="ye-header__actions">
          <a
            className="ye-btn ye-btn-header-chat"
            href={youngEaglesWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <a
            className="ye-btn ye-btn-primary ye-header__enquire"
            href={youngEaglesRegistrationUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register for 2027
          </a>
        </div>

        <button
          ref={menuButtonRef}
          className="ye-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="ye-mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="ye-mobile-navigation"
        className="ye-mobile-nav"
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
      >
        <ul>{renderLinks(true)}</ul>
        <div className="ye-mobile-nav__actions">
          <a
            className="ye-btn ye-btn-header-chat"
            href={youngEaglesWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaWhatsapp aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <a
            className="ye-btn ye-btn-primary"
            href={youngEaglesRegistrationUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            Register for 2027
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
