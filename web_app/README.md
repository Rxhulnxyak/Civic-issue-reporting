# Crowdsourced Civic Issue Reporting and Resolution System
## 💖 Support This Project(UPI)

If you find this project helpful and want to support open-source development for better governance, consider making a donation:

[![Donate](https://img.shields.io/badge/Donate-Support%20Development-ff69b4?style=for-the-badge&logo=heart&logoColor=white)](https://portfolio.raj.software/donate)

*Your support helps maintain and improve this civic technology platform! 🙏*


A modern, production-ready civic issue reporting platform built with Next.js, Clerk authentication, and Supabase database integration.

## 🚀 Features

- **Secure Authentication**: Complete Clerk + Supabase integration with social login support
- **User Management**: Automatic user data synchronization between Clerk and Supabase
- **Row Level Security**: Production-ready database security with JWT-based policies
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui components
- **Real-time Sync**: Automatic user profile synchronization with error handling
- **Production Ready**: Security-hardened with performance optimizations

## 🛡️ Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Secure JWT-based authentication policies
- ✅ Service role isolation for admin operations
- ✅ Secure database function configurations
- ✅ All security advisors resolved

## 🏗️ Architecture

### Authentication Flow
1. Users sign in/up through Clerk (supports Google, GitHub, email)
2. User data automatically syncs to Supabase database
3. JWT tokens contain user claims for database authorization
4. RLS policies ensure users can only access their own data

### Tech Stack
- **Frontend**: Next.js 14 with TypeScript
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui + Tailwind CSS
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Clerk account
- Supabase project

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd Crowdsourced-Civic-lssue-Reporting-and-Resolution-System
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your keys to `.env.local`:
   ```bash
   # Clerk Configuration
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
   ```

3. **Configure Supabase**
   - Database schema and policies are automatically applied
   - Add Clerk domain to `supabase/config.toml`:
     ```toml
     [auth.third_party.clerk]
     enabled = true
     domain = "your-app.clerk.accounts.dev"
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📱 Usage

### User Authentication
- Visit `/sign-in` or `/sign-up` for authentication
- Supports email/password and social login (Google, GitHub)
- Users are automatically redirected after successful authentication

### User Profile
- Visit `/profile` to view synced user information
- Real-time sync status with error handling
- Displays connected social accounts and verification status

### API Endpoints
- `POST /api/sync-user` - Manually trigger user sync
- `GET /api/sync-user` - Get sync status and user info

## 🔧 Development

### Key Components

- **`UserProfile`** - Production-ready user profile component
- **`useUserSync`** - React hook for automatic user synchronization
- **`syncUserToSupabase`** - Core sync logic with error handling
- **API Routes** - Secure endpoints for user operations

### Database Schema

```sql
CREATE TABLE public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id text NOT NULL UNIQUE,
  email text NOT NULL,
  first_name text,
  last_name text,
  username text,
  image_url text,
  social_accounts jsonb,
  email_verified boolean DEFAULT false,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## 🚀 Production Deployment

### Vercel Deployment (Recommended)
1. Connect GitHub repository to Vercel
2. Add production environment variables
3. Deploy automatically on push to main

### Security Configuration
- Update Clerk domain in Supabase config
- Configure production JWT claims
- Add production domains to Supabase allowed origins

### Performance Features
- Database indexes for optimal query performance
- Automatic user data caching
- Optimized RLS policies

See [Production Deployment Guide](./docs/production-deployment.md) for detailed instructions.

## 📊 Monitoring

The system includes built-in monitoring for:
- User sync success/failure rates
- Authentication errors
- Database performance
- API endpoint response times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `docs/` folder for detailed guides
- **Issues**: Report bugs using GitHub Issues
- **Security**: Follow responsible disclosure for security issues

## 🔗 Related Documentation

- [Clerk + Supabase Integration Guide](./docs/clerk-supabase-integration.md)
- [Production Deployment Guide](./docs/production-deployment.md)
- [API Documentation](./docs/api-documentation.md)

---

Built with ❤️ for civic engagement and community improvement.
