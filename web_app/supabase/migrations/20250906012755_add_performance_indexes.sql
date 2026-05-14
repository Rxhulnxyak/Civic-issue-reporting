-- Add performance indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_updated_at ON public.users(updated_at);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username) WHERE username IS NOT NULL;

-- Add performance indexes for test_table
CREATE INDEX IF NOT EXISTS idx_test_table_created_at ON public.test_table(created_at);
CREATE INDEX IF NOT EXISTS idx_test_table_name ON public.test_table(name);
