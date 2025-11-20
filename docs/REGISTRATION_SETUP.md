# Registration & WhatsApp Notification Setup

This document describes what was added and the exact manual steps the next developer/agent must follow to finish configuration and deploy the registration flow with WhatsApp notifications.

## Files added

- `edusitepro/src/components/RegistrationForm.jsx` — React component for the public site page to collect registrations. Expects `organizationId` prop.
- `edusitepro/src/app/api/registrations/route.ts` — POST API route that validates and inserts into `registration_requests`, then attempts to notify the centre admin over WhatsApp.
- `edusitepro/src/app/api/registrations/[orgId]/route.ts` — GET API route for internal API bridge to fetch registrations by organization_id.
- `edusitepro/src/lib/notifications.ts` — Helper that tries Twilio first, then Meta WhatsApp Cloud API.
- `db/migrations/2025-11-20-create-registration-requests.sql` — SQL migration to create the table if it does not exist.

## Required environment variables (server only)

- SUPABASE_URL — EduSitePro Supabase URL (https://<project>.supabase.co)
- SUPABASE_SERVICE_ROLE_KEY — Supabase service role key (server-only)
- INTERNAL_API_KEY — (optional) shared API key used by internal bridges to call GET /api/registrations

Optional WhatsApp provider credentials (one of the two options):

Option A - Twilio (recommended if you already use Twilio):
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_WHATSAPP_FROM — example: "whatsapp:+1415xxxxxxx" (the Twilio-enabled WhatsApp number)

Option B - Meta WhatsApp Cloud API:
- WHATSAPP_CLOUD_TOKEN — long-lived token
- WHATSAPP_PHONE_NUMBER_ID — phone number ID from Meta Business Manager

## Supabase schema adjustments (manual steps)

1. Run the SQL migration in the EduSitePro Supabase database (apply `db/migrations/2025-11-20-create-registration-requests.sql`).

2. Add a `whatsapp_number` column to the `centres` table (if you want an explicit field) OR ensure the school admin can set `branding.whatsapp_number` in the `branding` JSONB. Recommended SQL to add a column:

```sql
ALTER TABLE centres ADD COLUMN IF NOT EXISTS whatsapp_number VARCHAR(30);
```

3. Configure RLS and policies (the architecture has examples):

- Enable RLS on `registration_requests`.
- Create a policy to allow public inserts if you plan to submit from client directly (CORS + captcha recommended):

```sql
ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert registrations" ON registration_requests FOR INSERT WITH CHECK (true);
```

- For read access (EduDashPro via API bridge) keep RLS but use the service role key server-side to fetch records.

## Frontend integration

- Render `<RegistrationForm organizationId={centre.organization_id} />` on the public centre landing page where the registration form should appear.
- Ensure the page can resolve the `organization_id` (from centres table). The centre page typically already knows the centre id/slug — pass that.

## WhatsApp number setup (for School Admin)

- Add UI in centre settings where a school admin can set the WhatsApp number (international format, no spaces, e.g. +27831234567). Store in `centres.whatsapp_number` or `centres.branding.whatsapp_number`.
- The next agent should add validation (E.164) and an input field in the Admin > Branding / Contact area.

## Spam protection

Recommended: add reCAPTCHA v3/v2 to the public form to reduce spam. Implement server-side token verification in `POST /api/registrations` before inserting.

## Testing

1. Apply migration and add whatsapp_number to a centre manually.
2. Set env vars on the deployment (SUPABASE_*, TWILIO_* or WHATSAPP_CLOUD_*).
3. Deploy to a preview or staging environment.
4. Submit a registration using the form and verify:
   - The record appears in `registration_requests` table.
   - The GET endpoint (`/api/registrations/:orgId`) returns the record when called with INTERNAL_API_KEY header.
   - A WhatsApp message arrives on the configured school phone number (check Twilio logs or Meta Graph API response if failing).

## Deployment & push instructions for the next agent

1. Create a feature branch from main:

```bash
git checkout -b feat/registration-form-whatsapp
```

2. Add the new files to the repository (they are already provided in this PR). Commit with a clear message:

```bash
git add edusitepro/src/components/RegistrationForm.jsx edusitepro/src/app/api/registrations/edusitepro/src/app/api/registrations/[orgId]/route.ts edusitepro/src/lib/notifications.ts db/migrations/2025-11-20-create-registration-requests.sql docs/REGISTRATION_SETUP.md

git commit -m "feat(edusitepro): add registration form, API routes, WhatsApp notifications and migration"
```

3. Push branch and open a PR to `main`:

```bash
git push origin feat/registration-form-whatsapp
```

4. Deploy after PR is approved; update environment variables on Vercel (or hosting platform) and run the migration against the EduSitePro Supabase instance.

## Security considerations

- The POST route uses the Supabase service role key — keep it server-side only. Rotate keys regularly.
- If using public inserts instead, protect the form with captcha and rate limiting.
- Store WhatsApp credentials in secret manager (Vercel, Supabase, etc.).

## Optional improvements (follow-ups)

- Add email notification to admin and/or auto-create a lead in the Operations DB via the API bridge.
- Add a small dashboard for centre admins to view recent submissions.
- Add retry/queue logic for WhatsApp sends and log failures to Sentry.