import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { syncUserToSupabase } from '@/lib/user-sync'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const user = await (await clerkClient()).users.getUser(userId)
    const success = await syncUserToSupabase(user)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to sync user' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'User synced successfully' 
    })
  } catch (error) {
    console.error('API sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const user = await (await clerkClient()).users.getUser(userId)
    const success = await syncUserToSupabase(user)
    
    return NextResponse.json({ 
      success,
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim()
      }
    })
  } catch (error) {
    console.error('API sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
