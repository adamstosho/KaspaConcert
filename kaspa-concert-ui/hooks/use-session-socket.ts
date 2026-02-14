'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface TipEvent {
  tipId: string
  sessionId: string
  amount: number
  from: string
  txHash: string
  status: 'pending' | 'confirmed'
  timestamp: string
}

export interface SessionUpdatedEvent {
  sessionId: string
  totalTips: number
  tipsCount: number
}

export interface UseSessionSocketOptions {
  sessionId: string | null
  onTipPending?: (tip: TipEvent) => void
  onTipConfirmed?: (tip: TipEvent) => void
  onSession?: (session: { id: string; title: string; streamUrl: string; creatorAddress: string; status: string }) => void
  onSessionUpdated?: (update: SessionUpdatedEvent) => void
}

export function useSessionSocket({
  sessionId,
  onTipPending,
  onTipConfirmed,
  onSession,
  onSessionUpdated,
}: UseSessionSocketOptions) {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const socketRef = useRef<ReturnType<typeof import('socket.io-client').io> | null>(null)
  const callbacksRef = useRef({ onTipPending, onTipConfirmed, onSession, onSessionUpdated })
  callbacksRef.current = { onTipPending, onTipConfirmed, onSession, onSessionUpdated }

  useEffect(() => {
    if (!sessionId) return

    let mounted = true
    const apiUrl = getApiUrl()

    import('socket.io-client').then(({ io }) => {
      if (!mounted || !sessionId) return
      const socket = io(apiUrl, { transports: ['websocket', 'polling'] })
      socketRef.current = socket

      socket.on('connect', () => {
        if (!mounted) return
        setConnected(true)
        setError(null)
        socket.emit('join_session', sessionId, (res: { error?: string; session?: unknown }) => {
          if (res?.error) {
            setError(res.error)
            return
          }
          if (res?.session) callbacksRef.current.onSession?.(res.session as TipEvent & { id: string; title: string; streamUrl: string; creatorAddress: string; status: string })
        })
      })

      socket.on('disconnect', () => {
        if (mounted) setConnected(false)
      })

      socket.on('connect_error', (err: Error) => {
        if (mounted) setError(err.message || 'Connection failed')
      })

      socket.on('TIP_PENDING', (payload: TipEvent) => {
        if (mounted) callbacksRef.current.onTipPending?.(payload)
      })

      socket.on('TIP_CONFIRMED', (payload: TipEvent) => {
        if (mounted) callbacksRef.current.onTipConfirmed?.(payload)
      })

      socket.on('SESSION_UPDATED', (payload: SessionUpdatedEvent) => {
        if (mounted) callbacksRef.current.onSessionUpdated?.(payload)
      })

      return () => {
        socket.removeAllListeners()
        socket.disconnect()
        socketRef.current = null
      }
    })

    return () => {
      mounted = false
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [sessionId])

  const sendTip = useCallback(
    (payload: { txHash: string; amount: number; from?: string }) => {
      return new Promise<{ ok: boolean; tipId?: string; error?: string }>((resolve) => {
        if (!socketRef.current || !sessionId) {
          resolve({ ok: false, error: 'Not connected' })
          return
        }
        socketRef.current.emit(
          'tip_submit',
          {
            sessionId,
            txHash: payload.txHash,
            amount: payload.amount,
            from: payload.from ?? 'Anonymous',
          },
          (res: { error?: string; ok?: boolean; tipId?: string }) => {
            if (res?.error) resolve({ ok: false, error: res.error })
            else resolve({ ok: true, tipId: res?.tipId })
          }
        )
      })
    },
    [sessionId]
  )

  return { connected, error, sendTip }
}
