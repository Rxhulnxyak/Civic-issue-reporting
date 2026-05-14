import { createClient } from '@supabase/supabase-js'
import type { User } from '@clerk/nextjs/server'

// Use service role client for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export interface UserData {
  id?: string
  clerk_id: string
  email: string
  first_name?: string | null
  last_name?: string | null
  username?: string | null
  image_url?: string | null
  social_accounts?: Array<{
    provider: string
    provider_user_id: string
    email_address?: string
  }>
  email_verified?: boolean
  phone_number?: string | null
  created_at?: string
  updated_at?: string
}

export async function syncUserToSupabase(user: User): Promise<boolean> {
  try {
    // Map social accounts from external accounts
    const socialAccounts = user.externalAccounts?.map(account => ({
      provider: account.provider || 'unknown',
      provider_user_id: account.id || '',
      email_address: account.emailAddress || undefined,
    })) || []

    const userData: UserData = {
      clerk_id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      first_name: user.firstName || null,
      last_name: user.lastName || null,
      username: user.username || null,
      image_url: user.imageUrl || null,
      social_accounts: socialAccounts,
      email_verified: user.emailAddresses[0]?.verification?.status === 'verified',
      phone_number: user.phoneNumbers[0]?.phoneNumber || null,
    }

    // Use upsert to handle both insert and update cases
    const { error } = await supabaseAdmin
      .from('users')
      .upsert(userData, { 
        onConflict: 'clerk_id',
        ignoreDuplicates: false 
      })

    if (error) {
      console.error('Database sync error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('User sync error:', error)
    return false
  }
}
