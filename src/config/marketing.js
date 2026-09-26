export const SITE_ORIGIN = 'https://www.youngeagles.org.za';

export const YOUNG_EAGLES_REGISTRATION_PATH = '/registration/young-eagles';

export function youngEaglesRegistrationUrl() {
  const base = import.meta.env.VITE_EDUSITEPRO_URL || 'https://edusitepro.edudashpro.org.za';
  return `${String(base).replace(/\/$/, '')}${YOUNG_EAGLES_REGISTRATION_PATH}`;
}

/** International form of the public phone already shown on this site (081 523 6000). */
export const WHATSAPP_E164 = '27815236000';

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}`;

export const WHATSAPP_ENQUIRY_MESSAGE =
  'Hello Young Eagles, I would like to enquire about enrolment for 2027.';

/** Keeps every public WhatsApp action on the established Young Eagles number. */
export function youngEaglesWhatsAppUrl(message = WHATSAPP_ENQUIRY_MESSAGE) {
  return `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL_PROFILES = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/youngeaglescare/',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@youngeaglescare',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: WHATSAPP_HREF,
  },
];
