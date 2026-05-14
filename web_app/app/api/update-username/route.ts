import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

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

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const { username } = await request.json()

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' }, 
        { status: 400 }
      )
    }

    // First, update the username in Clerk
    try {
      const clerk = await clerkClient()
      await clerk.users.updateUser(userId, {
        username: username
      })
    } catch (clerkError) {
      console.error('Clerk update error:', clerkError)
      return NextResponse.json(
        { error: 'Failed to update username in Clerk' }, 
        { status: 500 }
      )
    }

    // Then, update the username in Supabase
    const { data, error } = await supabaseAdmin
      .rpc('update_user_username', {
        user_clerk_id: userId,
        new_username: username
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update username in Supabase' }, 
        { status: 500 }
      )
    }

    if (!data.success) {
      return NextResponse.json(
        { error: data.error }, 
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Username updated successfully in both Clerk and Supabase'
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
