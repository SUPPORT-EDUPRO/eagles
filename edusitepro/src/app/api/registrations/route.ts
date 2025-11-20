import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWhatsAppNotification } from '../../lib/notifications';

/**
 * Server-side registration endpoint.
 * Expects a JSON payload that maps to the registration_requests table.
 *
 * Environment variables required (server):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * Note: Using the service role key bypasses RLS; this route performs
 * validation server-side and inserts the record. If you'd prefer strict
 * RLS enforcement, you can use the anon key or let the public insert policy
 * handle client-side inserts (but that exposes the anon key on the client).
 */

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request) {
  try {
    const payload = await request.json();

    // Minimal server validation
    const required = ['organization_id', 'student_first_name', 'student_last_name', 'guardian_name', 'guardian_email'];
    for (const key of required) {
      if (!payload[key]) {
        return NextResponse.json({ error: `Missing required field: ${key}` }, { status: 400 });
      }
    }

    const insertPayload = {
      organization_id: payload.organization_id,
      student_first_name: payload.student_first_name,
      student_last_name: payload.student_last_name,
      student_dob: payload.student_dob || null,
      student_gender: payload.student_gender || null,
      guardian_name: payload.guardian_name,
      guardian_email: payload.guardian_email,
      guardian_phone: payload.guardian_phone || null,
      guardian_address: payload.guardian_address || null,
      preferred_class: payload.preferred_class || null,
      preferred_start_date: payload.preferred_start_date || null,
      referral_source: payload.referral_source || null,
      early_bird: payload.early_bird || false,
      message: payload.message || null,
      submission_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('registration_requests').insert([insertPayload]).select().single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch centre's whatsapp number (if set) to notify school admin
    try {
      const { data: centreData, error: centreErr } = await supabase
        .from('centres')
        .select('id, name, organization_id, branding, whatsapp_number')
        .eq('organization_id', payload.organization_id)
        .limit(1)
        .single();

      if (!centreErr && centreData) {
        // Prefer explicit whatsapp_number column, fall back to branding.json
        const whatsappNumber = centreData.whatsapp_number || (centreData.branding && centreData.branding.whatsapp_number);
        if (whatsappNumber) {
          const message = `New registration received for ${centreData.name}: ${data.student_first_name} ${data.student_last_name} (${data.student_dob || 'DOB unknown'})\nGuardian: ${data.guardian_name} - ${data.guardian_phone || data.guardian_email}`;
          await sendWhatsAppNotification(whatsappNumber, message);
        }
      }
    } catch (notifyErr) {
      console.warn('Failed to send whatsapp notification:', notifyErr);
    }

    return NextResponse.json({ success: true, registration: data }, { status: 200 });
  } catch (err) {
    console.error('Registration route error:', err);
    return NextResponse.json({ error: (err && err.message) || 'Unknown error' }, { status: 500 });
  }
}