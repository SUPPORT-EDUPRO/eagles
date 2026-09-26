import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { youngEaglesRegistrationUrl } from '../config/marketing';
import SocialLinks from './SocialLinks';

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src="/app-icons/yehc_logo.png" alt="Young Eagles Logo" className="h-12 w-12 rounded-full" />
            <div>
              <h3 className="text-xl font-bold">Young Eagles</h3>
              <p className="text-blue-300">Education Platform</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4 max-w-md">
            Where learning meets love. We nurture little minds with big dreams through play, care,
            and creativity with cutting-edge Society 5.0 integration.
          </p>
          <p className="text-blue-200 text-sm font-semibold mb-2">Follow us</p>
          <SocialLinks
            linkClassName="text-blue-200 hover:text-white focus-visible:outline-white"
            iconClassName="text-lg"
          />
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4 text-blue-300">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            <li>
              <a
                href={youngEaglesRegistrationUrl()}
                className="text-gray-300 hover:text-white transition-colors font-semibold"
              >
                Register for 2027
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4 text-blue-300">Contact Info</h4>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300">
              <FaPhone className="mr-3 text-blue-400" />
              <a href="tel:+27815236000" className="hover:text-white">081 523 6000</a>
            </li>
            <li className="flex items-center text-gray-300">
              <FaEnvelope className="mr-3 text-blue-400" />
              <a href="mailto:info@youngeagles.org.za" className="hover:text-white">info@youngeagles.org.za</a>
            </li>
            <li className="flex items-start text-gray-300">
              <FaMapMarkerAlt className="mr-3 text-blue-400 mt-1" />
              <span>7118 Section U Shabangu Street<br />Mamelodi Pretoria 0122</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Young Eagles Education Platform. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
