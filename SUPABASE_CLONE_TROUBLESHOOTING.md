# Supabase Clone - Auth Not Working Troubleshooting

## Critical Issue: Schema Cloned But Auth Not Working

When you clone a Supabase project schema, **Auth settings are NOT automatically cloned**. You need to manually configure them.

## Step-by-Step Fix Checklist

### 1. Verify Environment Variables Point to CORRECT Project

**Check your `.env.local` file:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-CLONED-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-cloned-project-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-cloned-project-service-role-key
```

**⚠️ CRITICAL**: Make sure these point to your **NEW/CLONED** project, NOT the old working one!

### 2. Supabase Dashboard - Authentication Settings

Go to your **CLONED** project dashboard:

#### A. Authentication → Settings → Email Auth

- ✅ **Enable Email Confirmations**: MUST BE ON
- ✅ **Secure Email Change**: Can be ON or OFF (doesn't affect signup)
- ✅ **Double Confirm Email Changes**: Can be ON or OFF

#### B. Authentication → Email Templates → "Confirm signup"

**Template should be:**
```
<h2>Confirm your signup</h2>

<p>Your One Time Password is here:</p>
<p>{{ .Token }}</p>
```

**DO NOT include:**
- `{{ .ConfirmationURL }}` - This will cause token invalidation
- Any links that email scanners might prefetch

#### C. Authentication → Settings → Auth Providers → Email

- **OTP Expiration Time**: Set to **3600** seconds (1 hour) or longer
- **Enable Custom SMTP**: Only if you're using custom SMTP (otherwise uses Supabase default)

### 3. Check Supabase Auth Logs

Go to: **Logs → Auth Logs** in your cloned project

Look for:
- OTP generation events
- Email sending status
- Verification attempts and errors

**Check if OTPs are actually being generated and sent!**

### 4. Verify Email Delivery

**Test email delivery:**
1. Try signing up with a test email
2. Check if you receive the email
3. Check spam folder
4. Check Supabase logs for email sending status

**If emails aren't being sent:**
- Check SMTP settings (if using custom SMTP)
- Check Supabase email quota/limits
- Check if email domain is blocked

### 5. Check User Status in Supabase

Go to: **Authentication → Users**

After signup, check:
- Is the user created?
- What's the `email_confirmed_at` status? (should be NULL before verification)
- What's the `confirmation_sent_at` timestamp?

### 6. Compare Working vs Cloned Project Settings

**Manually compare these settings between working and cloned projects:**

1. **Email Templates** - Must be identical
2. **OTP Expiration Time** - Must be identical
3. **Email Confirmation Settings** - Must be identical
4. **SMTP Settings** (if using custom) - Must be identical

### 7. Test OTP Generation Directly

**In Supabase Dashboard → SQL Editor, run:**

```sql
-- Check if OTP was generated (this queries auth schema)
SELECT 
  id,
  email,
  email_confirmed_at,
  confirmation_sent_at,
  created_at
FROM auth.users
WHERE email = 'your-test-email@example.com'
ORDER BY created_at DESC
LIMIT 1;
```

**Check `confirmation_sent_at`** - if it's NULL, OTP wasn't sent!

### 8. Common Clone Issues

#### Issue: Environment variables point to wrong project
**Fix**: Update `.env.local` with cloned project credentials

#### Issue: Email templates not copied
**Fix**: Manually copy email template from working project

#### Issue: OTP expiration time different
**Fix**: Set OTP expiration to match working project (usually 3600 seconds)

#### Issue: SMTP settings not configured
**Fix**: If using custom SMTP, reconfigure in cloned project

#### Issue: Email domain/rate limiting
**Fix**: Check if cloned project has different email limits

### 9. Nuclear Option: Reset Auth Settings

If nothing works:

1. **Delete test users** from cloned project
2. **Reset email template** to default
3. **Set OTP expiration** to 3600 seconds
4. **Enable email confirmations**
5. **Test with completely fresh email**

### 10. Debug Code

Add this temporary debug code to see what's happening:

```typescript
// In verifyOTP function, before verification:
console.log("Verifying OTP:", {
  email: data.email,
  token: data.token.substring(0, 2) + "****", // Don't log full token
  type: data.type,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
});
```

## Most Likely Causes (In Order)

1. **Environment variables point to wrong project** (70% chance)
2. **Email template missing or wrong** (15% chance)
3. **OTP expiration time too short or not set** (10% chance)
4. **SMTP/email delivery issues** (5% chance)

## Quick Test

1. Sign up with a NEW email (never used before)
2. Check Supabase Auth Logs immediately
3. Check if email was sent
4. Try verifying OTP within 30 seconds of receiving it
5. Check console logs for which verification method is attempted

If all three types fail immediately with "expired", it's likely:
- Wrong project URL/key in environment variables
- OTP not being generated at all
- Email template issue causing token invalidation


