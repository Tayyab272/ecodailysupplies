# Supabase OTP Configuration Checklist

## Critical Dashboard Settings to Check

### 1. Authentication → Settings → Email Auth

**Enable Email Confirmations**: ✅ MUST BE ENABLED

- Go to: Authentication → Settings → Email Auth
- Ensure "Enable Email Confirmations" is **ON**
- This ensures OTP codes are sent instead of auto-confirming users

### 2. Authentication → Email Templates

**Check the "Confirm signup" template**:

- Go to: Authentication → Email Templates → "Confirm signup"
- **CRITICAL**: The template should ONLY include `{{ .Token }}` (the 6-digit OTP code)
- **DO NOT** include `{{ .ConfirmationURL }}` in the same template
- If both are present, email scanners will prefetch the link and invalidate the OTP token

**Correct Template Example**:

```
Your verification code is: {{ .Token }}

This code will expire in 1 hour.
```

**Incorrect Template (DO NOT USE)**:

```
Your verification code is: {{ .Token }}
Or click here: {{ .ConfirmationURL }}  ← This will cause token invalidation!
```

### 3. Authentication → Settings → Auth Providers → Email

**OTP Expiration Time**:

- Default: 3600 seconds (1 hour)
- If set too short, tokens expire before users can use them
- Recommended: 3600 seconds (1 hour) or longer

### 4. Authentication → Settings → Auth Providers → Email

**Secure Email Change**:

- This should be enabled for security
- Doesn't affect signup OTP flow

### 5. Project Settings → API

**Check your API keys**:

- Ensure `NEXT_PUBLIC_SUPABASE_URL` matches your project URL
- Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set (for profile creation)

## Common Issues and Solutions

### Issue: "Token has expired or is invalid" with fresh tokens

**Possible Causes**:

1. **Email template has both OTP and confirmation URL** → Remove confirmation URL
2. **OTP type mismatch** → Code now tries both "signup" and "email" types
3. **Email provider prefetching** → Use OTP-only template (no links)
4. **OTP expiration too short** → Increase expiration time in settings

### Issue: OTP not being sent

**Check**:

- Email confirmations are enabled
- Email template is configured correctly
- SMTP settings are configured (if using custom SMTP)
- Check Supabase logs for email sending errors

### Issue: 406 Not Acceptable when fetching profile

**Solution**: Already fixed in code - profile fetch removed during signup (user not authenticated yet)

## Testing Checklist

1. ✅ Sign up with a new email
2. ✅ Check email for OTP code (should be 6 digits)
3. ✅ Verify OTP code immediately (within 1 hour)
4. ✅ Check that user profile is created after verification
5. ✅ Verify user can log in after email confirmation

## Code Changes Made

1. **Removed redundant `resend()` call** after signup (was invalidating first OTP)
2. **Removed profile fetch during signup** (was causing 406 error - user not authenticated)
3. **Added OTP type fallback** (tries "signup" first, then "email" if that fails)
4. **Added profile creation retry** after OTP verification
5. **Better error handling** throughout the flow

## Next Steps

1. Check your Supabase dashboard settings (especially email template)
2. Test the signup flow with a fresh email
3. Monitor Supabase logs for any errors
4. If issue persists, check Supabase status page for service issues

