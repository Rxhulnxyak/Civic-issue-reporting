'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface SyncStatus {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error?: string
}

export function useUserSync() {
  const { user, isLoaded } = useUser()
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isLoading: false,
    isError: false,
    isSuccess: false
  })

  useEffect(() => {
    if (!isLoaded || !user) return

    const syncUser = async () => {
      setSyncStatus({ isLoading: true, isError: false, isSuccess: false })
      
      try {
        const response = await fetch('/api/sync-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Sync failed: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success) {
          setSyncStatus({ isLoading: false, isError: false, isSuccess: true })
        } else {
          throw new Error('Sync failed')
        }
      } catch (error) {
        setSyncStatus({ 
          isLoading: false, 
          isError: true, 
          isSuccess: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    syncUser()
  }, [user, isLoaded])

  return syncStatus
}
