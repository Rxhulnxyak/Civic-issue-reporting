-- Update RLS policies for users table with better security
-- This migration improves the initial RLS setup

-- Re-enable RLS if it was disabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;

-- Create updated RLS policies with better security
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "users_update_own" ON public.users  
    FOR UPDATE USING (auth.uid()::text = clerk_id)
    WITH CHECK (auth.uid()::text = clerk_id);

CREATE POLICY "users_insert_own" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = clerk_id);

-- Allow service role to manage users (for server-side operations)
CREATE POLICY "service_role_all_users" ON public.users
    FOR ALL USING (current_setting('role') = 'service_role');
