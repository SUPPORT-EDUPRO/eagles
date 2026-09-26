import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

import { youngEaglesRegistrationUrl } from '../config/marketing';

function MyRegisterButton({ className = '', variant = 'primary' }) {
  const variants = {
    primary: 'ye-btn ye-btn-primary',
    secondary: 'ye-btn ye-btn-secondary text-[color:var(--ye-navy)]',
    outline: 'ye-btn ye-btn-ghost-on-dark',
  };

  return (
    <a
      href={youngEaglesRegistrationUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variants[variant] || variants.primary} gap-2 ${className}`}
    >
      <FaCalendarAlt aria-hidden="true" />
      Register for 2027
    </a>
  );
}

export default MyRegisterButton;
