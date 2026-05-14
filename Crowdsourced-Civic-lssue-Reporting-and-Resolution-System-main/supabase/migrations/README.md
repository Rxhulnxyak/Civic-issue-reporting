# Supabase Migrations

This directory contains local migration files that replicate the database structure of your Supabase project. These migrations allow others to recreate the same database schema in their own Supabase projects.

## Migration Files

1. **20250906010629_update_users_rls_policies.sql** - Updates RLS policies for users table with better security
2. **20250906011340_temporarily_disable_rls.sql** - Temporarily disables RLS for initial setup
3. **20250906012328_enable_rls_and_fix_security.sql** - Enables RLS and creates security policies
4. **20250906012755_add_performance_indexes.sql** - Adds performance indexes for better query performance
5. **20250906020951_add_username_editing_function.sql** - Creates function for updating usernames with validation
6. **20250906125431_create_test_table.sql** - Creates test table for development
7. **20250906125951_create_users_table.sql** - Creates main users table with Clerk integration

## How to Use

### For New Projects

1. Install Supabase CLI:
   ```bash
   brew install supabase/tap/supabase
   ```

2. Initialize Supabase in your project:
   ```bash
   supabase init
   ```

3. Copy these migration files to your `supabase/migrations/` directory

4. Apply migrations to your local development database:
   ```bash
   supabase db reset
   ```

5. Link to your Supabase project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

6. Push migrations to production:
   ```bash
   supabase db push
   ```

### For Existing Projects

If you want to apply these migrations to an existing Supabase project:

1. Copy the migration files to your `supabase/migrations/` directory
2. Run `supabase db push` to apply them to your remote database

## Database Schema

### Users Table
- Integrated with Clerk authentication
- Contains user profile information
- Has RLS policies for security
- Includes performance indexes

### Test Table
- Simple table for development and testing
- Has user_id foreign key relationship
- Includes RLS policies

## Professional Approach

These migration files follow Supabase best practices:
- Proper timestamped naming convention
- Incremental changes for better version control
- Security-first approach with RLS policies
- Performance optimizations with indexes
- Documentation and comments for clarity

## Sharing Your Database Schema

When sharing your project, include the entire `supabase/migrations/` directory. This allows other developers to:
1. Recreate your exact database schema
2. Understand the evolution of your database structure
3. Apply the same migrations to their development environment
4. Maintain consistency across different environments

## Environment Variables

Make sure to set up your environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
