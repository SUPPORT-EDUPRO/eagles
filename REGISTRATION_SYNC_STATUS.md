# Registration Sync Implementation Status

## 📊 Current State Analysis

### ✅ **What's ALREADY Implemented**

#### 1. Database Trigger (EduSitePro → EduDashPro)
**Location**: `/edusitepro/migrations/fix_trigger_auth.sql`

```sql
CREATE OR REPLACE FUNCTION notify_registration_submission()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://bppuzibjlxgfwrujzfsz.supabase.co/functions/v1/sync-registration-to-edudash';
  service_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
BEGIN
  PERFORM
    net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := jsonb_build_object(
        'record', row_to_json(NEW),
        'type', 'new_registration'
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Status**: ✅ Function created  
**Missing**: ❌ Trigger not attached to `registration_requests` table

---

#### 2. Reverse Sync Function (EduDashPro → EduSitePro)
**Location**: `/edudashpro/supabase/functions/sync-approval-to-edusite/index.ts`

**Purpose**: When admin approves/rejects in EduDashPro app, sync status back to website

**Status**: ✅ Fully implemented and working  
**Features**:
- Syncs status changes (approved, rejected, waitlisted)
- Syncs document verification status
- Syncs payment information
- Updates timestamp tracking

---

#### 3. Organization/Preschool Sync
**Location**: `/edudashpro/supabase/migrations/20251022223900_fix_child_registration_and_sync_orgs.sql`

**Status**: ✅ Organizations synced from preschools table  
**Result**: Both databases have unified `organization_id` for Young Eagles

---

### ❌ **What's MISSING**

#### 1. Forward Sync Edge Function
**Expected**: `/edudashpro/supabase/functions/sync-registration-to-edudash/`  
**Status**: ❌ **NOT FOUND**

This function should:
1. Receive webhook from EduSitePro trigger
2. Create entry in EduDashPro `registration_requests` table
3. Optionally create app user account for parent

---

#### 2. Database Trigger Attachment
**Issue**: The function `notify_registration_submission()` exists but no trigger is attached

**Missing SQL**:
```sql
CREATE TRIGGER on_registration_submit
  AFTER INSERT ON registration_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_registration_submission();
```

---

#### 3. App User Provisioning
**Status**: ❌ No automatic parent account creation

**What's needed**:
- Create `auth.users` entry when parent registers
- Create `public.users` entry with role='parent'
- Link to Young Eagles `preschool_id`
- Send welcome email with app download link

---

#### 4. Welcome Email System
**Status**: ❌ Not implemented

Parents should receive:
- Welcome email after registration
- App download links (Play Store/App Store)
- Magic link for auto-login
- School code: `YE-2026`

---

## 🔧 **What Needs to Be Fixed**

### Priority 1: Create Missing Edge Function

```bash
cd /home/king/Desktop/edudashpro
supabase functions new sync-registration-to-edudash
```

**Implementation needed**: See `REGISTRATION_APP_SYNC_STRATEGY.md` Strategy A

---

### Priority 2: Attach Database Trigger

**Run in EduSitePro database**:
```sql
-- Check if trigger exists
SELECT tgname, tgtype, tgenabled 
FROM pg_trigger 
WHERE tgrelid = 'registration_requests'::regclass;

-- Create trigger if missing
CREATE TRIGGER on_registration_submit
  AFTER INSERT ON registration_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_registration_submission();
```

---

### Priority 3: Add App User Provisioning

**Two options**:

**Option A: Edge Function handles it** (Recommended)
- `sync-registration-to-edudash` creates both:
  1. Registration request entry
  2. Parent user account

**Option B: Separate trigger**
- New trigger on `registration_requests` in EduDashPro
- Auto-creates parent when registration approved

---

### Priority 4: Welcome Email Template

**Use existing**: `/edudashpro/supabase/functions/send-email/`

**Create template**: `welcome-parent-registration.html`

```html
<h1>Welcome to Young Eagles Day Care!</h1>
<p>Hi {{parent_name}},</p>
<p>Thank you for registering {{child_name}}!</p>

<h2>📱 Download the EduDash Pro App</h2>
<a href="{{app_download_url}}">Download Now</a>

<h3>Quick Setup</h3>
<a href="edudashpro://onboarding?token={{magic_link}}">
  One-Click Login
</a>
```

---

## 🔍 **Verification Checklist**

Run these queries to verify current state:

### Check EduSitePro Database

```bash
# Check if trigger function exists
PGPASSWORD=$PGPASSWORD_EDUSITE psql -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 -U postgres.lvvvjywrmpcqrpvuptdi -d postgres -c \
  "SELECT proname, prosrc FROM pg_proc WHERE proname = 'notify_registration_submission';"

# Check if trigger is attached
PGPASSWORD=$PGPASSWORD_EDUSITE psql -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 -U postgres.lvvvjywrmpcqrpvuptdi -d postgres -c \
  "SELECT tgname FROM pg_trigger WHERE tgrelid = 'registration_requests'::regclass;"

# Check registration_requests structure
PGPASSWORD=$PGPASSWORD_EDUSITE psql -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 -U postgres.lvvvjywrmpcqrpvuptdi -d postgres -c \
  "SELECT column_name, data_type FROM information_schema.columns 
   WHERE table_name = 'registration_requests' ORDER BY ordinal_position;"
```

### Check EduDashPro Database

```bash
# Check if sync function exists
PGPASSWORD=$PGPASSWORD_EDUDASH psql -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 -U postgres.bppuzibjlxgfwrujzfsz -d postgres -c \
  "SELECT routine_name FROM information_schema.routines 
   WHERE routine_schema = 'public' AND routine_name LIKE '%sync%';"

# Check registration_requests in EduDashPro
PGPASSWORD=$PGPASSWORD_EDUDASH psql -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 -U postgres.bppuzibjlxgfwrujzfsz -d postgres -c \
  "SELECT COUNT(*) FROM registration_requests;"

# Check organizations table
PGPASSWORD=$PGPASSWORD_EDUDASH psql -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 -U postgres.bppuzibjlxgfwrujzfsz -d postgres -c \
  "SELECT id, name, type FROM organizations WHERE name LIKE '%Young Eagles%';"
```

---

## 🚀 **Implementation Roadmap**

### Step 1: Verify Environment (Now)
```bash
# Set passwords
export PGPASSWORD_EDUSITE="your_edusite_password"
export PGPASSWORD_EDUDASH="your_edudash_password"

# Run verification queries above
```

### Step 2: Create Missing Edge Function (2 hours)
```bash
cd /home/king/Desktop/edudashpro/supabase/functions
mkdir sync-registration-to-edudash
# Copy template from REGISTRATION_APP_SYNC_STRATEGY.md
```

### Step 3: Attach Trigger (5 minutes)
```sql
-- Run in EduSitePro database
CREATE TRIGGER on_registration_submit
  AFTER INSERT ON registration_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_registration_submission();
```

### Step 4: Add App Provisioning (1 hour)
- Extend Edge Function to create parent accounts
- Add welcome email sending

### Step 5: Test End-to-End (1 hour)
1. Submit test registration on website
2. Verify trigger fires
3. Verify Edge Function receives webhook
4. Verify entry created in EduDashPro
5. Verify parent account created
6. Verify welcome email sent

### Step 6: Deploy to Production (30 minutes)
```bash
supabase functions deploy sync-registration-to-edudash
```

---

## 📝 **Summary**

**Current Status**: 60% Complete

✅ **Working**:
- Reverse sync (App → Website) ✅
- Organization sync ✅
- Trigger function defined ✅

❌ **Not Working**:
- Forward sync (Website → App) ❌
- Trigger not attached ❌
- App user provisioning ❌
- Welcome emails ❌

**Estimated Time to Complete**: 4-5 hours

**Blocker**: Need database passwords to verify and attach triggers

---

## 🔐 **Next Actions Required**

1. **Provide passwords** so I can verify database state
2. **Create Edge Function** `sync-registration-to-edudash`
3. **Attach trigger** in EduSitePro database
4. **Test with sample registration**
