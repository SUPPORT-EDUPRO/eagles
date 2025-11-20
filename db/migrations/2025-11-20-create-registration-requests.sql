-- Migration: create registration_requests table for EduSitePro
-- Matches the schema in EDUDASH_ECOSYSTEM_ARCHITECTURE.md

CREATE TABLE IF NOT EXISTS registration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL, -- Links to DB1 organizations
  student_first_name VARCHAR(100) NOT NULL,
  student_last_name VARCHAR(100) NOT NULL,
  student_dob DATE,
  student_gender VARCHAR(20),
  guardian_name VARCHAR(255) NOT NULL,
  guardian_email VARCHAR(255) NOT NULL,
  guardian_phone VARCHAR(50),
  guardian_address TEXT,
  preferred_class VARCHAR(100),
  preferred_start_date DATE,
  request_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  approval_notes TEXT,
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  early_bird BOOLEAN DEFAULT FALSE,
  referral_source VARCHAR(100),
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS + policies should be added as in the architecture file when configuring Supabase.
-- Example: allow public insert (if you want direct client insert)
-- ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public can insert registrations" ON registration_requests FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_registration_requests_org ON registration_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_registration_requests_status ON registration_requests(request_status);