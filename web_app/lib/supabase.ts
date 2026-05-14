import { createClient } from '@supabase/supabase-js'
import { useSession } from '@clerk/nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Hook to create Supabase client with Clerk authentication
export function useSupabaseClient() {
  const { session } = useSession()
  
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      // Session accessed from Clerk SDK
      accessToken: async () => session?.getToken() ?? null,
    }
  )
}

// Server-side Supabase client (without Clerk integration)
export const supabase = createSupabaseClient()
