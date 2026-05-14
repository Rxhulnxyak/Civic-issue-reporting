'use client'

import { useState } from 'react'
import { useUserSync } from '@/lib/hooks/useUserSync'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, XCircle, Loader2, User, Mail, Phone, Calendar, Edit2 } from 'lucide-react'

export function UserProfile() {
  // Clerk is disabled in this local setup. Stub minimal user state.
  const isLoaded = true
  const user = undefined as unknown as any
  const syncStatus = useUserSync()
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [usernameSuccess, setUsernameSuccess] = useState('')

  const handleEditUsername = () => {
    setNewUsername(user?.username || '')
    setIsEditingUsername(true)
    setUsernameError('')
    setUsernameSuccess('')
  }

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) {
      setUsernameError('Username cannot be empty')
      return
    }

    setUsernameLoading(true)
    setUsernameError('')

    try {
      const response = await fetch('/api/update-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update username')
      }

      setUsernameSuccess('Username updated successfully!')
      setIsEditingUsername(false)
      
      // Reload user data from Clerk
      await user?.reload()
    } catch (error) {
      setUsernameError(error instanceof Error ? error.message : 'Failed to update username')
    } finally {
      setUsernameLoading(false)
    }
  }

  const handleCancelUsername = () => {
    setIsEditingUsername(false)
    setNewUsername('')
    setUsernameError('')
    setUsernameSuccess('')
  }

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading user profile...</span>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
        </CardContent>
      </Card>
    )
  }

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No name provided'
  const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)
  const primaryPhone = user.phoneNumbers.find(phone => phone.id === user.primaryPhoneNumberId)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Sync Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            Database Sync Status
            {syncStatus.isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {syncStatus.isSuccess && <CheckCircle className="h-4 w-4 text-green-500" />}
            {syncStatus.isError && <XCircle className="h-4 w-4 text-red-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {syncStatus.isLoading && (
            <Badge variant="outline" className="bg-blue-50">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Syncing...
            </Badge>
          )}
          {syncStatus.isSuccess && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Synced Successfully
            </Badge>
          )}
          {syncStatus.isError && (
            <div className="space-y-2">
              <Badge variant="outline" className="bg-red-50 text-red-700">
                <XCircle className="h-3 w-3 mr-1" />
                Sync Failed
              </Badge>
              {syncStatus.error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  Error: {syncStatus.error}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.imageUrl} alt={fullName} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{fullName}</CardTitle>
              <CardDescription>
                {primaryEmail?.emailAddress}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Username</span>
                </div>
                
                {!isEditingUsername ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-muted px-2 py-1 rounded">
                      {user.username || 'Not set'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditUsername}
                      className="h-6 px-2"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter username"
                        className="max-w-xs"
                        disabled={usernameLoading}
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveUsername}
                        disabled={usernameLoading}
                      >
                        {usernameLoading ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          'Save'
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelUsername}
                        disabled={usernameLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                    {usernameError && (
                      <p className="text-xs text-red-600">{usernameError}</p>
                    )}
                    {usernameSuccess && (
                      <p className="text-xs text-green-600">{usernameSuccess}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Email Verified:</strong>{' '}
                  {primaryEmail?.verification?.status === 'verified' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
                      Unverified
                    </Badge>
                  )}
                </span>
              </div>

              {primaryPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Phone:</strong> {primaryPhone.phoneNumber}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Joined:</strong>{' '}
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Accounts */}
          {user.externalAccounts && user.externalAccounts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Connected Accounts</h3>
              <div className="flex flex-wrap gap-2">
                {user.externalAccounts.map((account) => (
                  <Badge key={account.id} variant="outline" className="capitalize">
                    {account.provider}
                    {account.emailAddress && (
                      <span className="ml-1 text-muted-foreground">
                        ({account.emailAddress})
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Account Details */}
          <div>
            <h3 className="font-semibold mb-3">Account Details</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>User ID:</strong> <code className="bg-muted px-1 rounded">{user.id}</code></p>
              <p><strong>Last Updated:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'Unknown'}</p>
              <p><strong>Total Email Addresses:</strong> {user.emailAddresses.length}</p>
              {user.phoneNumbers.length > 0 && (
                <p><strong>Total Phone Numbers:</strong> {user.phoneNumbers.length}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
