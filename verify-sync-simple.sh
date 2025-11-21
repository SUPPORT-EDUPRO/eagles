#!/bin/bash

# Simple Registration Sync Verification
# Uses Supabase REST API

echo "═══════════════════════════════════════════════════════════"
echo "🔍 Registration Sync Verification"
echo "═══════════════════════════════════════════════════════════"
echo ""

# URLs and Keys
EDUSITE_URL="https://lvvvjywrmpcqrpvuptdi.supabase.co"
EDUDASH_URL="https://bppuzibjlxgfwrujzfsz.supabase.co"
EDUSITE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dnZqeXdybXBjcXJwdnVwdGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDg4NDMzNywiZXhwIjoyMDQ2NDYwMzM3fQ.p7-fP_cXJjIrkkzJr0d6aI_8_gFhqRqxuq4zyQZvjbg"
EDUDASH_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcHV6aWJqbHhnZndydWp6ZnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzc0MzczMCwiZXhwIjoyMDY5MzE5NzMwfQ.5zPPaAo1Jj5-SknVMDwvo1DBCXhmS60obAEckJV7o1I"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 EDUSITE PRO (Website Registration Database)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check table access
echo -n "1. registration_requests table: "
RESULT=$(curl -s -w "\n%{http_code}" "${EDUSITE_URL}/rest/v1/registration_requests?select=id&limit=1" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}")
HTTP_CODE=$(echo "$RESULT" | tail -n1)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ ACCESSIBLE"
else
    echo "❌ ERROR (HTTP $HTTP_CODE)"
fi

# Count registrations
echo -n "2. Total registrations: "
RESULT=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?select=*" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}" \
  -H "Range: 0-0")
if echo "$RESULT" | grep -q "\["; then
    COUNT=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests" \
      -H "apikey: ${EDUSITE_KEY}" \
      -H "Authorization: Bearer ${EDUSITE_KEY}" \
      -H "Prefer: count=exact" \
      -I 2>/dev/null | grep -i "content-range" | grep -o "[0-9]*$")
    echo "${COUNT:-unknown}"
else
    echo "unknown"
fi

# Get sample registration
echo -n "3. Sample organization_id: "
SAMPLE=$(curl -s "${EDUSITE_URL}/rest/v1/registration_requests?select=organization_id&limit=1" \
  -H "apikey: ${EDUSITE_KEY}" \
  -H "Authorization: Bearer ${EDUSITE_KEY}")
ORG_ID=$(echo "$SAMPLE" | grep -o '"organization_id":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$ORG_ID" ]; then
    echo "✅ $ORG_ID"
else
    echo "⚠️  Not found"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 EDUDASH PRO (Mobile App Database)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check organizations table
echo -n "4. Young Eagles in organizations: "
ORGS=$(curl -s "${EDUDASH_URL}/rest/v1/organizations?select=id,name&name=ilike.*Young*Eagles*" \
  -H "apikey: ${EDUDASH_KEY}" \
  -H "Authorization: Bearer ${EDUDASH_KEY}")
if echo "$ORGS" | grep -q "Young Eagles"; then
    ORG_ID=$(echo "$ORGS" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "✅ $ORG_ID"
else
    echo "❌ NOT FOUND"
fi

# Check registration_requests table
echo -n "5. registration_requests table: "
RESULT=$(curl -s -w "\n%{http_code}" "${EDUDASH_URL}/rest/v1/registration_requests?select=id&limit=1" \
  -H "apikey: ${EDUDASH_KEY}" \
  -H "Authorization: Bearer ${EDUDASH_KEY}")
HTTP_CODE=$(echo "$RESULT" | tail -n1)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ ACCESSIBLE"
else
    echo "❌ ERROR (HTTP $HTTP_CODE)"
fi

# Check preschools table
echo -n "6. Young Eagles in preschools: "
PRESCHOOLS=$(curl -s "${EDUDASH_URL}/rest/v1/preschools?select=id,name&name=ilike.*Young*Eagles*" \
  -H "apikey: ${EDUDASH_KEY}" \
  -H "Authorization: Bearer ${EDUDASH_KEY}")
if echo "$PRESCHOOLS" | grep -q "Young Eagles"; then
    PRESCHOOL_ID=$(echo "$PRESCHOOLS" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "✅ $PRESCHOOL_ID"
else
    echo "⚠️  Not found (may only be in organizations)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 SYNC FUNCTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Edge Function files
echo -n "7. Forward sync function (Website→App): "
if [ -d "/home/king/Desktop/edudashpro/supabase/functions/sync-registration-to-edudash" ]; then
    echo "✅ EXISTS (not deployed yet)"
else
    echo "❌ NOT FOUND"
fi

echo -n "8. Reverse sync function (App→Website): "
if [ -f "/home/king/Desktop/edudashpro/supabase/functions/sync-approval-to-edusite/index.ts" ]; then
    echo "✅ EXISTS"
else
    echo "❌ NOT FOUND"
fi

# Test if deployed
echo -n "9. Forward sync deployment status: "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  "${EDUDASH_URL}/functions/v1/sync-registration-to-edudash" \
  -H "Authorization: Bearer ${EDUDASH_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"test": true}')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "400" ]; then
    echo "✅ DEPLOYED (HTTP $HTTP_CODE)"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "❌ NOT DEPLOYED (HTTP 404)"
else
    echo "⚠️  Unknown (HTTP $HTTP_CODE)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 SUMMARY & NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ = Working"
echo "❌ = Missing/Broken"
echo "⚠️  = Warning/Optional"
echo ""
echo "TO-DO:"
echo "1. Create sync-registration-to-edudash Edge Function"
echo "2. Deploy the Edge Function to Supabase"
echo "3. Test registration flow end-to-end"
echo ""
echo "See: REGISTRATION_SYNC_STATUS.md for details"
echo ""
echo "═══════════════════════════════════════════════════════════"
