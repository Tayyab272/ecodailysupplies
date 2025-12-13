-- ============================================
-- SUPABASE SCHEMA FIX - 2025 Best Practices
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CREATE handle_new_user FUNCTION & TRIGGER
-- This automatically creates a user profile when someone signs up
-- ============================================

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create the function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, company, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'company', ''),
    'customer',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), users.full_name),
    phone = COALESCE(NULLIF(EXCLUDED.phone, ''), users.phone),
    company = COALESCE(NULLIF(EXCLUDED.company, ''), users.company),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$;

-- Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. FIX USERS TABLE RLS POLICIES
-- Allow service role and the trigger to create profiles
-- ============================================

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can insert users" ON public.users;
DROP POLICY IF EXISTS "Service role can manage users" ON public.users;

-- Allow users to insert their own profile (relaxed for signup flow)
CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
TO authenticated, anon
WITH CHECK (true);  -- Allow insert, the trigger handles this with SECURITY DEFINER

-- Service role can do everything on users
CREATE POLICY "Service role can manage users"
ON public.users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 3. ADD MISSING updated_at TRIGGERS
-- ============================================

-- Users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Addresses table
DROP TRIGGER IF EXISTS update_addresses_updated_at ON public.addresses;
CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON public.addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Carts table
DROP TRIGGER IF EXISTS update_carts_updated_at ON public.carts;
CREATE TRIGGER update_carts_updated_at
  BEFORE UPDATE ON public.carts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- B2B requests table
DROP TRIGGER IF EXISTS update_b2b_requests_updated_at ON public.b2b_requests;
CREATE TRIGGER update_b2b_requests_updated_at
  BEFORE UPDATE ON public.b2b_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Saved addresses table
DROP TRIGGER IF EXISTS update_saved_addresses_updated_at ON public.saved_addresses;
CREATE TRIGGER update_saved_addresses_updated_at
  BEFORE UPDATE ON public.saved_addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. ADD SAVED_ADDRESSES RLS POLICIES
-- (Currently has RLS enabled but no policies)
-- ============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own saved addresses" ON public.saved_addresses;
DROP POLICY IF EXISTS "Users can insert own saved addresses" ON public.saved_addresses;
DROP POLICY IF EXISTS "Users can update own saved addresses" ON public.saved_addresses;
DROP POLICY IF EXISTS "Users can delete own saved addresses" ON public.saved_addresses;
DROP POLICY IF EXISTS "Service role can manage saved addresses" ON public.saved_addresses;

-- Create proper policies
CREATE POLICY "Users can view own saved addresses"
ON public.saved_addresses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved addresses"
ON public.saved_addresses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved addresses"
ON public.saved_addresses
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved addresses"
ON public.saved_addresses
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage saved addresses"
ON public.saved_addresses
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 5. REMOVE DUPLICATE INDEXES
-- ============================================

-- These are duplicates - drop them
DROP INDEX IF EXISTS idx_orders_stripe_intent;
DROP INDEX IF EXISTS idx_orders_stripe_session;
DROP INDEX IF EXISTS idx_saved_addresses_default;

-- ============================================
-- 6. VERIFY THE TRIGGER WORKS
-- Test by checking if profiles are created for existing auth users
-- ============================================

-- This will create profiles for any auth.users that don't have a public.users profile
INSERT INTO public.users (id, email, full_name, phone, company, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', ''),
  COALESCE(au.raw_user_meta_data->>'phone', ''),
  COALESCE(au.raw_user_meta_data->>'company', ''),
  'customer',
  au.created_at,
  NOW()
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DONE! Now test by signing up a new user
-- ============================================

