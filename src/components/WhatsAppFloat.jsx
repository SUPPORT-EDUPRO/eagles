import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';

import {
  WHATSAPP_ENQUIRY_MESSAGE,
  youngEaglesWhatsAppUrl,
} from '../config/marketing';

const predefinedMessages = [
  WHATSAPP_ENQUIRY_MESSAGE,
  'Please tell me about the programmes.',
  'I would like to arrange a visit.',
];

function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const welcomeMessage = WHATSAPP_ENQUIRY_MESSAGE;

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <div className="ye-whatsapp">
      <button
        ref={triggerRef}
        className="ye-whatsapp__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="ye-whatsapp-options"
        aria-label={isOpen ? 'Close WhatsApp contact options' : 'Contact Young Eagles on WhatsApp'}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <FaTimes aria-hidden="true" /> : <FaWhatsapp aria-hidden="true" />}
      </button>

      <section
        id="ye-whatsapp-options"
        className="ye-whatsapp__panel"
        aria-labelledby="ye-whatsapp-heading"
        hidden={!isOpen}
      >
        <div className="ye-whatsapp__panel-heading">
          <div>
            <h2 id="ye-whatsapp-heading">Message Young Eagles</h2>
            <p>Choose a prompt to start a WhatsApp message.</p>
          </div>
          <button
            className="ye-whatsapp__close"
            type="button"
            aria-label="Close WhatsApp options"
            onClick={() => {
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>
        <ul>
          {predefinedMessages.map((message) => (
            <li key={message}>
              <a
                href={youngEaglesWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                {message}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="ye-whatsapp__start"
          href={youngEaglesWhatsAppUrl(welcomeMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setIsOpen(false);
            triggerRef.current?.focus();
          }}
        >
          <FaWhatsapp aria-hidden="true" />
          Start a message
        </a>
      </section>
    </div>
  );
}

export default WhatsAppFloat;
