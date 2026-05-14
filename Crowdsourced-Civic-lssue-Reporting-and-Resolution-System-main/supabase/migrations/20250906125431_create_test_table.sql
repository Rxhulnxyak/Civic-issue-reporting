-- Create test table
CREATE TABLE public.test_table (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id TEXT
);

-- Enable RLS
ALTER TABLE public.test_table ENABLE ROW LEVEL SECURITY;

-- Create index for user_id for faster lookups
CREATE INDEX idx_test_table_user_id ON public.test_table(user_id);
