-- Create users table with Clerk integration
CREATE TABLE public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    image_url TEXT,
    social_accounts JSONB DEFAULT '[]'::jsonb,
    email_verified BOOLEAN DEFAULT false,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create index on clerk_id for faster lookups
CREATE INDEX idx_users_clerk_id ON public.users(clerk_id);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON public.users(email);
