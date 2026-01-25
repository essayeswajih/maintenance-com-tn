'use client'

import { useUser } from '@clerk/nextjs'

export function useAuth() {
  const { user, isLoaded } = useUser()
  
  return {
    user: user ? {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || '',
      name: user.firstName || 'User',
      image: user.imageUrl,
    } : null,
    isLoading: !isLoaded,
    isAuthenticated: !!user,
  }
}
