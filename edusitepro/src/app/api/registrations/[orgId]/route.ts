import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(request, { params }) {
  try {
    const { orgId } = params;

    // Verify internal API key header for extra safety (optional)
    const apiKey = request.headers.get('x-internal-api-key');
    if (process.env.INTERNAL_API_KEY && apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('registration_requests')
      .select('*')
      .eq('organization_id', orgId)
      .order('submission_date', { ascending: false });

    if (error) {
      console.error('Error fetching registrations:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ registrations: data }, { status: 200 });
  } catch (err) {
    console.error('GET registrations error:', err);
    return NextResponse.json({ error: (err && err.message) || 'Unknown error' }, { status: 500 });
  }
}