-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = clerk_id);

CREATE POLICY "Enable insert for authenticated users" ON public.users
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for test_table
CREATE POLICY "Users can view their own test records" ON public.test_table
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own test records" ON public.test_table
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own test records" ON public.test_table
    FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete their own test records" ON public.test_table
    FOR DELETE USING (user_id = auth.uid()::text);
