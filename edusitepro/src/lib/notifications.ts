import fetch from 'node-fetch';

/**
 * sendWhatsAppNotification - tries Twilio WhatsApp first if Twilio env vars are set,
 * otherwise falls back to Meta WhatsApp Cloud API if WHATSAPP_CLOUD_TOKEN is set.
 *
 * Environment variables supported:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_WHATSAPP_FROM (e.g., "whatsapp:+1415xxxxxxx")
 *
 * OR
 *
 * - WHATSAPP_CLOUD_TOKEN (Meta Graph API token)
 * - WHATSAPP_PHONE_NUMBER_ID (the phone number id for the business account)
 */

export async function sendWhatsAppNotification(toNumber, message) {
  // Normalize number to E.164 if possible; caller should provide full number.
  // Try Twilio first
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM; // must be like 'whatsapp:+1415...'

    const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
    const body = new URLSearchParams();
    body.append('From', from);
    body.append('To', `whatsapp:${toNumber}`);
    body.append('Body', message);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Twilio send failed: ${res.status} ${txt}`);
    }

    return true;
  }

  // Fallback to WhatsApp Cloud API
  if (process.env.WHATSAPP_CLOUD_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    const token = process.env.WHATSAPP_CLOUD_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      to: toNumber,
      type: 'text',
      text: { body: message },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`WhatsApp Cloud API send failed: ${res.status} ${txt}`);
    }

    return true;
  }

  // No provider configured
  throw new Error('No WhatsApp provider configured. Set TWILIO_* or WHATSAPP_CLOUD_* env vars.');
}