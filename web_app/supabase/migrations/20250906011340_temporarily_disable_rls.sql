-- Temporarily disable RLS for setup purposes
-- This migration was likely used during initial setup to allow data insertion without policies
-- In production, this would be followed by enabling RLS with proper policies

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_table DISABLE ROW LEVEL SECURITY;

-- Add comment for documentation
COMMENT ON TABLE public.users IS 'RLS temporarily disabled for initial setup';
COMMENT ON TABLE public.test_table IS 'RLS temporarily disabled for initial setup';
