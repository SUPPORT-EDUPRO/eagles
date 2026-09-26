import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

import { youngEaglesRegistrationUrl } from '../config/marketing';
import SocialLinks from './SocialLinks';

const Footer = () => (
  <footer className="ye-footer">
    <div className="ye-wrap">
      <div className="ye-footer__main">
        <div className="ye-footer__identity">
          <Link className="ye-brand ye-brand--footer" to="/" aria-label="Young Eagles home">
            <img src="/app-icons/yehc_logo.png" alt="" width="48" height="48" />
            <span>Young Eagles</span>
          </Link>
          <p className="ye-footer__tagline">Where learning meets love.</p>
          <p className="ye-footer__copy">Day care in Mamelodi, Pretoria.</p>
          <SocialLinks
            linkClassName="ye-footer__social-link"
            iconClassName="text-lg"
          />
        </div>

        <div className="ye-footer__column">
          <h2>Explore</h2>
          <ul>
            <li><Link to="/programs">Programmes</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <a href={youngEaglesRegistrationUrl()} target="_blank" rel="noopener noreferrer">
                Register for 2027
              </a>
            </li>
          </ul>
        </div>

        <div className="ye-footer__column ye-footer__contact">
          <h2>Find us</h2>
          <a href="tel:+27815236000">
            <FaPhone aria-hidden="true" />
            <span>081 523 6000</span>
          </a>
          <a href="mailto:info@youngeagles.org.za">
            <FaEnvelope aria-hidden="true" />
            <span>info@youngeagles.org.za</span>
          </a>
          <p>
            <FaMapMarkerAlt aria-hidden="true" />
            <span>7118 Section U Shabangu Street,<br />Mamelodi, Pretoria, 0122</span>
          </p>
        </div>
      </div>

      <div className="ye-footer__legal">
        <p>&copy; {new Date().getFullYear()} Young Eagles Day Care.</p>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
