-- जनसेतु Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create issues table
CREATE TABLE IF NOT EXISTS issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  status TEXT DEFAULT 'Reported',
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  address TEXT NOT NULL,
  image_urls TEXT[],
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create issue_votes table
CREATE TABLE IF NOT EXISTS issue_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id UUID REFERENCES issues ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  is_upvote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(issue_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create policies for issues
CREATE POLICY "Users can view all issues" ON issues FOR SELECT USING (true);
CREATE POLICY "Users can create issues" ON issues FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own issues" ON issues FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all issues" ON issues FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create policies for issue_votes
CREATE POLICY "Users can view all votes" ON issue_votes FOR SELECT USING (true);
CREATE POLICY "Users can create votes" ON issue_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own votes" ON issue_votes FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update vote counts
CREATE OR REPLACE FUNCTION update_issue_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.is_upvote THEN
            UPDATE issues SET upvotes = upvotes + 1 WHERE id = NEW.issue_id;
        ELSE
            UPDATE issues SET downvotes = downvotes + 1 WHERE id = NEW.issue_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Remove old vote
        IF OLD.is_upvote THEN
            UPDATE issues SET upvotes = upvotes - 1 WHERE id = OLD.issue_id;
        ELSE
            UPDATE issues SET downvotes = downvotes - 1 WHERE id = OLD.issue_id;
        END IF;
        -- Add new vote
        IF NEW.is_upvote THEN
            UPDATE issues SET upvotes = upvotes + 1 WHERE id = NEW.issue_id;
        ELSE
            UPDATE issues SET downvotes = downvotes + 1 WHERE id = NEW.issue_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.is_upvote THEN
            UPDATE issues SET upvotes = upvotes - 1 WHERE id = OLD.issue_id;
        ELSE
            UPDATE issues SET downvotes = downvotes - 1 WHERE id = OLD.issue_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger to update vote counts
CREATE TRIGGER update_issue_vote_counts_trigger
    AFTER INSERT OR UPDATE OR DELETE ON issue_votes
    FOR EACH ROW EXECUTE FUNCTION update_issue_vote_counts();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_issues_user_id ON issues(user_id);
CREATE INDEX IF NOT EXISTS idx_issues_category ON issues(category);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_created_at ON issues(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_issue_votes_issue_id ON issue_votes(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_votes_user_id ON issue_votes(user_id);

-- Insert sample data (optional)
INSERT INTO issues (title, description, category, priority, latitude, longitude, address, user_id) VALUES
('Pothole on Main Street', 'Large pothole causing traffic issues', 'Road & Infrastructure', 'High', 23.0225, 72.5714, 'Main Street, Ahmedabad', '00000000-0000-0000-0000-000000000000'),
('Broken Street Light', 'Street light not working for 3 days', 'Electricity', 'Medium', 23.0225, 72.5714, 'Park Road, Ahmedabad', '00000000-0000-0000-0000-000000000000'),
('Garbage Not Collected', 'Garbage not collected for a week', 'Waste Management', 'High', 23.0225, 72.5714, 'Residential Area, Ahmedabad', '00000000-0000-0000-0000-000000000000')
ON CONFLICT DO NOTHING;
