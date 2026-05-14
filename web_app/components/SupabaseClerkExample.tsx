'use client'

import { useSupabaseClient } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

interface TestData {
  success?: boolean
  data?: unknown[]
  error?: string
}

export function SupabaseClerkExample() {
  const { user } = useUser()
  const supabase = useSupabaseClient()
  const [data, setData] = useState<TestData | null>(null)
  const [loading, setLoading] = useState(false)

  const testSupabaseConnection = async () => {
    if (!user) {
      console.log('No user authenticated')
      return
    }

    setLoading(true)
    try {
      // Test the connection by running a simple query
      const { data, error } = await supabase
        .from('test_table') // Replace with your actual table name
        .select('*')
        .limit(1)

      if (error) {
        console.error('Supabase error:', error)
        setData({ error: error.message })
      } else {
        console.log('Supabase connection successful:', data)
        setData({ success: true, data })
      }
    } catch (error) {
      console.error('Connection error:', error)
      setData({ error: 'Failed to connect to Supabase' })
    }
    setLoading(false)
  }

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Clerk + Supabase Integration Test</h2>
      
      {user ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">User Info (from Clerk):</h3>
            <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
            <p>ID: {user.id}</p>
          </div>

          <button
            onClick={testSupabaseConnection}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Supabase Connection'}
          </button>

          {data && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Supabase Response:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <p>Please sign in with Clerk to test the Supabase integration.</p>
      )}
    </div>
  )
}
