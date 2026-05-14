# Clerk + Supabase Integration Guide

This project integrates Clerk authentication with Supabase, allowing you to use Clerk for user authentication while leveraging Supabase's database, storage, and other features.

## What's Been Set Up

### 1. Configuration Files

- **`supabase/config.toml`**: Contains the Clerk integration configuration for local development
- **`.env.local`**: Updated with Supabase environment variables (you need to fill in your actual values)

### 2. Supabase Client Setup

- **`lib/supabase.ts`**: Contains utilities for creating Supabase clients with Clerk authentication
- **`components/SupabaseClerkExample.tsx`**: A test component to verify the integration works

## Next Steps to Complete the Setup

### 1. Get Your Supabase Project Details

You need to update your `.env.local` file with your actual Supabase project URL and anonymous key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your [Supabase Dashboard](https://supabase.com/dashboard) under Settings > API.

### 2. Configure Clerk for Supabase Compatibility

Follow these steps to configure your Clerk instance:

1. Visit [Clerk's Connect with Supabase page](https://dashboard.clerk.com/setup/supabase)
2. Follow the setup wizard to configure your Clerk instance for Supabase compatibility
3. This will automatically add the required `role` claim to your Clerk session tokens

### 3. Add Third-Party Auth Integration in Supabase

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Third-Party Auth
3. Add a new integration with Clerk
4. Use your Clerk domain: `nearb-redfish-52.clerk.accounts.dev`

### 4. Alternative Manual Configuration

If you can't use the automatic setup, manually configure the `role` claim in Clerk:

1. Go to Clerk Dashboard > Sessions > JWT Templates
2. Create a new template or edit the default one
3. Add the following claims:
```json
{
  "role": "authenticated"
}
```

## How to Use the Integration

### In React Components

```typescript
import { useSupabaseClient } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'

export function MyComponent() {
  const { user } = useUser()
  const supabase = useSupabaseClient()

  const fetchData = async () => {
    if (!user) return
    
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
      
    // Handle data...
  }

  return (
    // Your component JSX
  )
}
```

### Server-Side (API Routes)

For server-side operations, you can use the regular Supabase client, but you'll need to handle authentication differently depending on your use case.

## Row Level Security (RLS) Policies

With Clerk + Supabase integration, you can create RLS policies that use Clerk JWT claims:

```sql
-- Example: Allow users to only access their own data
CREATE POLICY "Users can only access their own data" 
ON your_table 
FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'sub' = user_id::text);

-- Example: Check organization membership
CREATE POLICY "Organization members only" 
ON your_table 
FOR ALL 
TO authenticated 
USING (
  auth.jwt() ->> 'org_id' = organization_id::text
);
```

## Testing the Integration

1. Start your development server: `npm run dev`
2. Sign in through Clerk
3. Use the `SupabaseClerkExample` component to test the connection
4. Check browser console for connection status

## Important Notes

- The `role` claim in Clerk JWTs must be set to `"authenticated"` for Supabase to recognize authenticated users
- JWT tokens are automatically refreshed by the Supabase client when using the `accessToken` function
- This integration works with Supabase's existing RLS policies and authentication system
- For production, make sure to configure your Clerk webhook endpoints if you need to sync user data

## Troubleshooting

1. **Connection fails**: Check your Supabase URL and keys in `.env.local`
2. **Authentication errors**: Verify the `role` claim is properly set in Clerk JWT templates
3. **RLS policy issues**: Make sure your policies are checking the correct JWT claims
4. **Third-party auth not working**: Verify the integration is properly configured in both Clerk and Supabase dashboards
