#!/bin/bash

# Verification Script for Registration Sync System
# Uses Supabase service role keys instead of postgres passwords

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🔍 Registration Sync Verification Script"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Supabase URLs
EDUSITE_URL="https://lvvvjywrmpcqrpvuptdi.supabase.co"
EDUDASH_URL="https://bppuzibjlxgfwrujzfsz.supabase.co"

# Service role keys from .env.local
EDUSITE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dnZqeXdybXBjcXJwdnVwdGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDg4NDMzNywiZXhwIjoyMDQ2NDYwMzM3fQ.p7-fP_cXJjIrkkzJr0d6aI_8_gFhqRqxuq4zyQZvjbg"
EDUDASH_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcHV6aWJqbHhnZndydWp6ZnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzc0MzczMCwiZXhwIjoyMDY5MzE5NzMwfQ.5zPPaAo1Jj5-SknVMDwvo1DBCXhmS60obAEckJV7o1I"

echo "✅ Using Supabase REST API for verification"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 EDUSITE PRO DATABASE (Website)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "1️⃣  Checking registration_requests table..."
RESPONSE=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?select=id&limit=1" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}")

if echo "$RESPONSE" | grep -q "id"; then
    echo "✅ registration_requests table EXISTS and accessible"
else
    echo "❌ registration_requests table NOT accessible"
    echo "Response: $RESPONSE"
fi
echo ""

echo "2️⃣  Checking registration count..."
COUNT=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?select=count" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}" \
  -H "Prefer: count=exact" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

echo "Total registrations: ${COUNT:-0}"
echo ""

echo "3️⃣  Checking registration by status..."
PENDING=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?status=eq.pending&select=count" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}" \
  -H "Prefer: count=exact" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

APPROVED=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?status=eq.approved&select=count" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}" \
  -H "Prefer: count=exact" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

echo "  Pending: ${PENDING:-0}"
echo "  Approved: ${APPROVED:-0}"
echo ""

echo "4️⃣  Checking Young Eagles organization_id..."
YOUNG_EAGLES=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?select=organization_id&limit=1" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}")

if echo "$YOUNG_EAGLES" | grep -q "organization_id"; then
    ORG_ID=$(echo "$YOUNG_EAGLES" | grep -o '"organization_id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "✅ Found organization_id: $ORG_ID"
else
    echo "❌ No organization_id found in registrations"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 EDUDASH PRO DATABASE (Mobile App)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "5️⃣  Checking Young Eagles organization..."
ORGS=$(curl -s "${EDUDASH_URL}/rest/v1/organizations?select=id,name,type&name=ilike.*Young*Eagles*" \
  -H "apikey: ${EDUDASH_KEY}" \
  -H "Authorization: Bearer ${EDUDASH_KEY}")

if echo "$ORGS" | grep -q "Young Eagles"; then
    echo "✅ Young Eagles organization EXISTS"
    echo "$ORGS" | python3 -m json.tool 2>/dev/null || echo "$ORGS"
else
    echo "❌ Young Eagles NOT FOUND in organizations table"
    echo "Response: $ORGS"
fi
echo ""

echo "6️⃣  Checking registration_requests table in EduDashPro..."
REG_CHECK=$(curl -s "${EDUDASH_URL}/rest/v1/registration_requests?select=id&limit=1" \
  -H "apikey: ${EDUDASH_KEY}" \
  -H "Authorization: Bearer ${EDUDASH_KEY}")

if echo "$REG_CHECK" | grep -q "id\|^\[\]$"; then
    echo "✅ registration_requests table EXISTS"
    
    # Count registrations
    REG_COUNT=$(curl -s "${EDUDASH_URL}/rest/v1/registration_requests?select=count" \
      -H "apikey: ${EDUDASH_KEY}" \
      -H "Authorization: Bearer ${EDUDASH_KEY}" \
      -H "Prefer: count=exact" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')
    
    echo "Total registrations: ${REG_COUNT:-0}"
else
    echo "❌ registration_requests table NOT accessible"
    echo "Response: $REG_CHECK"
fi
echo ""

echo "7️⃣  Checking preschools table..."
PRESCHOOLS=$(curl -s "${EDUDASH_URL}/rest/v1/preschools?select=id,name&name=ilike.*Young*Eagles*&limit=1" \
  -H "apikey: ${EDUDASH_KEY}" \
  -H "Authorization: Bearer ${EDUDASH_KEY}")

if echo "$PRESCHOOLS" | grep -q "Young Eagles"; then
    echo "✅ Young Eagles preschool EXISTS"
    echo "$PRESCHOOLS" | python3 -m json.tool 2>/dev/null || echo "$PRESCHOOLS"
else
    echo "⚠️  Young Eagles not in preschools table (may only be in organizations)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 SYNC STATUS SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "8️⃣  Checking Edge Functions..."
echo ""

# Check if sync-registration-to-edudash exists
if [ -d "/home/king/Desktop/edudashpro/supabase/functions/sync-registration-to-edudash" ]; then
    echo "✅ Forward Sync Function (Website→App): EXISTS"
else
    echo "❌ Forward Sync Function (Website→App): NOT FOUND"
    echo "   Expected: supabase/functions/sync-registration-to-edudash/"
fi

# Check if sync-approval-to-edusite exists
if [ -f "/home/king/Desktop/edudashpro/supabase/functions/sync-approval-to-edusite/index.ts" ]; then
    echo "✅ Reverse Sync Function (App→Website): EXISTS"
else
    echo "❌ Reverse Sync Function (App→Website): NOT FOUND"
fi
echo ""

echo "9️⃣  Checking for deployed Edge Functions..."
# Try to call the forward sync endpoint
SYNC_TEST=$(curl -s -o /dev/null -w "%{http_code}" "${EDUDASH_URL}/functions/v1/sync-registration-to-edudash" \
  -H "Authorization: Bearer ${EDUDASH_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"test": true}')

if [ "$SYNC_TEST" = "200" ] || [ "$SYNC_TEST" = "400" ]; then
    echo "✅ sync-registration-to-edudash is DEPLOYED (HTTP $SYNC_TEST)"
elif [ "$SYNC_TEST" = "404" ]; then
    echo "❌ sync-registration-to-edudash NOT DEPLOYED (HTTP 404)"
else
    echo "⚠️  sync-registration-to-edudash status unknown (HTTP $SYNC_TEST)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 RECOMMENDED NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Based on the results above, you need to:"
echo ""
echo "1. ❌ Create Edge Function: sync-registration-to-edudash"
echo "   cd /home/king/Desktop/edudashpro/supabase/functions"
echo "   mkdir sync-registration-to-edudash"
echo ""
echo "2. ❌ Attach trigger in EduSitePro database (if missing)"
echo "   See: REGISTRATION_SYNC_STATUS.md - Priority 2"
echo ""
echo "3. ❌ Add app user provisioning logic"
echo "   See: REGISTRATION_APP_SYNC_STRATEGY.md - Strategy A"
echo ""
echo "4. ✅ Test end-to-end flow"
echo "   Submit test registration and verify sync"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ Verification Complete!"
echo "═══════════════════════════════════════════════════════════"
