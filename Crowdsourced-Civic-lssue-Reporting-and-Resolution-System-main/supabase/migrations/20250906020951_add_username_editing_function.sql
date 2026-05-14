-- Function to update username with validation
CREATE OR REPLACE FUNCTION update_username(user_clerk_id TEXT, new_username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Validate username (optional: add your validation logic here)
    IF LENGTH(new_username) < 3 OR LENGTH(new_username) > 50 THEN
        RAISE EXCEPTION 'Username must be between 3 and 50 characters';
    END IF;
    
    -- Update username
    UPDATE public.users 
    SET username = new_username, 
        updated_at = now()
    WHERE clerk_id = user_clerk_id;
    
    -- Return success if row was updated
    RETURN FOUND;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_username(TEXT, TEXT) TO authenticated;
