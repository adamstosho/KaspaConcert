'use client'

import { useState, useCallback, useEffect } from 'react'

export interface Tip {
  id: string
  amount: number
  from: string
  timestamp: Date
  status: 'pending' | 'confirmed'
  txHash?: string
}

export interface SessionData {
  id: string
  title: string
  creatorAddress: string
  streamUrl: string
  status: 'live' | 'ended'
  totalTips: number
  tipsCount: number
  createdAt: Date
}

interface UseSessionReturn {
  session: SessionData | null
  tips: Tip[]
  isLoading: boolean
  error: string | null
  addTip: (tip: Tip) => void
  confirmTip: (tipId: string) => void
  endSession: () => void
  fetchSession: (sessionId: string) => Promise<void>
}

export function useSession(sessionId?: string): UseSessionReturn {
  const [session, setSession] = useState<SessionData | null>(null)
  const [tips, setTips] = useState<Tip[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data generator
  const generateMockSession = (id: string): SessionData => ({
    id,
    title: 'Live Concert - Acoustic Night',
    creatorAddress: 'kaspa1qypc69h6jqg68z5259c23d6czjkl7zemlyjcd6jg6',
    streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    status: 'live',
    totalTips: 15.5,
    tipsCount: 23,
    createdAt: new Date(Date.now() - 30 * 60000),
  })

  const generateMockTips = (): Tip[] => [
    {
      id: '1',
      amount: 1.0,
      from: 'Alice',
      timestamp: new Date(Date.now() - 25 * 60000),
      status: 'confirmed',
      txHash: '0x1234567890abcdef1234567890abcdef',
    },
    {
      id: '2',
      amount: 0.5,
      from: 'Bob',
      timestamp: new Date(Date.now() - 20 * 60000),
      status: 'confirmed',
      txHash: '0xabcdef1234567890abcdef1234567890',
    },
    {
      id: '3',
      amount: 2.0,
      from: 'Charlie',
      timestamp: new Date(Date.now() - 15 * 60000),
      status: 'confirmed',
      txHash: '0x9876543210fedcba9876543210fedcba',
    },
    {
      id: '4',
      amount: 0.3,
      from: 'Diana',
      timestamp: new Date(Date.now() - 10 * 60000),
      status: 'confirmed',
      txHash: '0xfedcba9876543210fedcba9876543210',
    },
    {
      id: '5',
      amount: 1.5,
      from: 'Eve',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'pending',
    },
  ]

  const fetchSession = useCallback(
    async (id: string) => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockSession = generateMockSession(id)
        const mockTips = generateMockTips()

        setSession(mockSession)
        setTips(mockTips)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch session')
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const addTip = useCallback((tip: Tip) => {
    setTips((prev) => [tip, ...prev])
    setSession((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        totalTips: prev.totalTips + tip.amount,
        tipsCount: prev.tipsCount + 1,
      }
    })
  }, [])

  const confirmTip = useCallback((tipId: string) => {
    setTips((prev) => prev.map((tip) => (tip.id === tipId ? { ...tip, status: 'confirmed' } : tip)))
  }, [])

  const endSession = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, status: 'ended' as const } : null))
  }, [])

  // Fetch session on mount if sessionId provided
  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId)
    }
  }, [sessionId, fetchSession])

  return {
    session,
    tips,
    isLoading,
    error,
    addTip,
    confirmTip,
    endSession,
    fetchSession,
  }
}
