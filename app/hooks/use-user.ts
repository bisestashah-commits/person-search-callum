'use client'

import { useState, useEffect, useCallback } from 'react' // 👈 Import useCallback
import { getUserById } from '@/app/actions/actions'
import { User } from '@/app/actions/schemas'

export function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (userId) {
      getUserById(userId).then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
        } else {
          setUser(null)
        }
      })
    } else {
      setUser(null)
    }
  }, [userId])

  // 👈 Wrap mutate in useCallback
  const mutate = useCallback(() => {
    if (userId) {
      getUserById(userId).then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
        } else {
          setUser(null)
        }
      })
    }
  }, [userId]) // 👈 Dependencies: userId is the only dependency

  return { user, mutate }
}