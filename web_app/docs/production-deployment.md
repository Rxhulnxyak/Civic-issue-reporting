# Production Deployment Guide

## Overview
This guide covers deploying your Clerk + Supabase integrated civic issue reporting system to production.

## Security Checklist ✅

### Database Security
- [x] **Row Level Security (RLS) Enabled** - All tables have RLS policies
- [x] **Secure JWT Claims** - Policies use Clerk JWT claims for authorization
- [x] **Service Role Protection** - Admin operations use service role with proper scoping
- [x] **Function Security** - Database functions have secure search_path

### Authentication Security  
- [x] **Third-party Auth Configured** - Clerk domain properly set in Supabase
- [x] **Environment Variables** - All secrets stored in environment variables
- [x] **API Route Protection** - All API endpoints check authentication
- [x] **Client-side Guards** - Protected pages redirect unauthenticated users

## Environment Variables

### Required Production Variables

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase Configuration  
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Similar process, add environment variables in build settings
- **Railway**: Add environment variables in project settings
- **DigitalOcean App Platform**: Configure via app spec or dashboard

## Supabase Production Configuration

### 1. Update Third-party Auth Settings

In your Supabase dashboard:
```toml
[auth.third_party.clerk]
enabled = true  
domain = "your-production-clerk-domain.clerk.accounts.dev"
```

### 2. Configure Allowed Origins
Add your production domain to allowed origins:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

### 3. Database Policies
All RLS policies are already configured for production use with Clerk JWT claims.

## Clerk Production Configuration

### 1. Production Instance
- Create a production Clerk instance
- Configure social providers (Google, GitHub, etc.)
- Set up custom domains if needed

### 2. JWT Claims
Configure JWT claims to include necessary user data:
```json
{
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address.email_address}}",
  "name": "{{user.first_name}} {{user.last_name}}"
}
```

## Performance Optimizations

### 1. Database Indexing
```sql
-- Add indexes for better query performance
CREATE INDEX idx_users_clerk_id ON public.users(clerk_id);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);
```

### 2. Caching Strategy
- Enable Vercel's Edge Network caching
- Use Next.js static generation where possible
- Implement client-side caching for user data

## Monitoring & Analytics

### 1. Error Tracking
Consider integrating:
- Sentry for error monitoring
- LogRocket for session replay
- Clerk's built-in analytics

### 2. Performance Monitoring
- Vercel Analytics for Core Web Vitals
- Supabase Dashboard for database performance
- Custom logging for sync operations

## Post-Deployment Checklist

### Functionality Testing
- [ ] User registration works with social providers
- [ ] User data syncs to Supabase correctly
- [ ] Database policies prevent unauthorized access
- [ ] Profile page displays user information
- [ ] Sync status updates properly

### Security Testing
- [ ] Unauthenticated users cannot access protected routes
- [ ] Users can only access their own data
- [ ] API endpoints require authentication
- [ ] Environment variables are not exposed to client

### Performance Testing
- [ ] Page load times are acceptable
- [ ] Database queries are optimized
- [ ] User sync operations complete quickly
- [ ] No memory leaks in long-running sessions

## Troubleshooting Common Issues

### Sync Failures
1. Check Supabase service role key is correct
2. Verify Clerk webhook endpoints (if using)
3. Check database connection limits
4. Review error logs in production

### Authentication Issues  
1. Verify Clerk domain configuration in Supabase
2. Check JWT token format and claims
3. Ensure RLS policies match JWT structure
4. Test with different social providers

### CORS Issues
1. Add production domain to Supabase allowed origins
2. Check API route configurations
3. Verify middleware setup

## Support & Documentation

- **Clerk Documentation**: [https://clerk.com/docs](https://clerk.com/docs)
- **Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)  
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)

## Security Contacts

For security issues, please report to:
- Your team's security contact
- Platform-specific security channels
- Follow responsible disclosure practices
