# Testing Your Clerk + Supabase Integration

## What's Already Set Up

✅ **Supabase Configuration**: `supabase/config.toml` configured with your Clerk domain  
✅ **Environment Variables**: Your Supabase URL and anon key are configured  
✅ **Test Table**: Created `test_table` with sample data and RLS policies  
✅ **Integration Code**: Supabase client with Clerk auth integration  
✅ **Test Component**: Added to your home page to test the connection  

## How to Test

### Step 1: Start Your Development Server
```bash
npm run dev
```

### Step 2: Visit Your App
Go to `http://localhost:3000` and scroll down to find the "Clerk + Supabase Integration Test" section.

### Step 3: Sign In
1. If you're not signed in, click on sign in
2. Use your Clerk authentication (you should see "Please sign in with Clerk to test...")
3. After signing in, you'll see your user info displayed

### Step 4: Test the Connection
1. Click the "Test Supabase Connection" button
2. This will attempt to query the `test_table` in your Supabase database
3. You should see the response in the "Supabase Response" section

## Expected Results

### ✅ Success Case
If everything is configured correctly, you should see:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Test Item 1",
      "description": "This is a test item for Clerk + Supabase integration",
      "created_at": "...",
      "user_id": "test-user-1"
    }
  ]
}
```

### ❌ Common Issues

1. **Connection fails with "role claim missing"**
   - **Solution**: You need to configure Clerk to add the `role` claim
   - Go to https://dashboard.clerk.com/setup/supabase
   - Follow the setup wizard to add the required claims

2. **"Supabase error: relation 'test_table' does not exist"**
   - **Solution**: The test table wasn't created properly
   - Check your Supabase dashboard for the table

3. **Authentication errors**
   - **Solution**: Make sure you're signed in with Clerk first
   - The test component should show your user info before testing

## Next Steps After Testing

1. **Configure Clerk for Production**: Visit https://dashboard.clerk.com/setup/supabase
2. **Add Third-Party Auth in Supabase**: Go to your Supabase dashboard → Authentication → Third-Party Auth
3. **Create Your Own Tables**: Replace the test table with your actual application tables
4. **Remove Test Component**: Once confirmed working, remove the test component from your home page

## Manual Configuration (If Automatic Setup Fails)

If the automatic Clerk setup doesn't work, manually add this to your Clerk JWT template:

```json
{
  "role": "authenticated"
}
```

1. Go to Clerk Dashboard
2. Navigate to Sessions → JWT Templates  
3. Edit the default template or create a new one
4. Add the role claim as shown above

## Troubleshooting Commands

```bash
# Check if Supabase is reachable
curl https://hzyephikvzwuzausudpg.supabase.co/rest/v1/

# Test your environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Look at the network tab to see failed requests
3. Verify your Clerk and Supabase dashboard configurations
4. Check that RLS policies allow your authenticated user to read the test table
