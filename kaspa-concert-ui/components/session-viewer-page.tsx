'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaCard } from '@/components/kaspa-card'
import { TipFeed } from '@/components/tip-feed'
import { WalletConnect } from '@/components/wallet-connect'
import { TipPanel } from '@/components/tip-panel'
import { getSession } from '@/lib/api'
import { useWallet } from '@/context/wallet-context'
import { useSessionSocket, type TipEvent } from '@/hooks/use-session-socket'

interface Tip {
  id: string
  amount: number
  from: string
  timestamp: Date
  status: 'pending' | 'confirmed'
  txHash?: string
}

interface SessionData {
  id: string
  title: string
  creatorAddress: string
  streamUrl: string
  status: 'live' | 'ended'
  totalTips: number
  tipsCount: number
}

interface SessionViewerPageProps {
  sessionId: string
}

function tipEventToTip(ev: TipEvent): Tip {
  return {
    id: ev.tipId,
    amount: ev.amount,
    from: ev.from,
    timestamp: new Date(ev.timestamp),
    status: ev.status,
    txHash: ev.txHash,
  }
}

export function SessionViewerPage({ sessionId }: SessionViewerPageProps) {
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [sessionError, setSessionError] = useState<string | null>(null)
  const [tips, setTips] = useState<Tip[]>([])
  const [tippingLoading, setTippingLoading] = useState(false)

  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  const wallet = useWallet()

  const handleTipPending = useCallback((ev: TipEvent) => {
    setTips((prev) => {
      const exists = prev.some((t) => t.id === ev.tipId)
      if (exists) return prev.map((t) => (t.id === ev.tipId ? tipEventToTip(ev) : t))
      const optimistic = prev.find((t) => t.status === 'pending' && t.from === 'You' && t.txHash === ev.txHash)
      if (optimistic) {
        return prev.map((t) => (t.id === optimistic.id ? tipEventToTip(ev) : t))
      }
      return [tipEventToTip(ev), ...prev]
    })
  }, [])

  const handleTipConfirmed = useCallback((ev: TipEvent) => {
    setTips((prev) =>
      prev.map((t) => (t.id === ev.tipId ? tipEventToTip(ev) : t))
    )
    setSessionData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        totalTips: (prev.totalTips || 0) + ev.amount,
        tipsCount: (prev.tipsCount || 0) + 1,
      }
    })
  }, [])

  const handleSessionUpdated = useCallback((update: { totalTips: number; tipsCount: number }) => {
    setSessionData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        totalTips: update.totalTips,
        tipsCount: update.tipsCount,
      }
    })
  }, [])

  const { sendTip, connected: socketConnected } = useSessionSocket({
    sessionId,
    onTipPending: handleTipPending,
    onTipConfirmed: handleTipConfirmed,
    onSessionUpdated: handleSessionUpdated,
  })

  // Demo Mode Simu
  const simulateTip = useCallback(() => {
    if (!sessionData) return // Guard against null sessionData

    const amounts = [1, 5, 10, 50, 100, 500]
    const names = ['CryptoFan', 'KaspaKing', 'BlockDAG_Lover', 'Satoshi_N', 'Anon', 'SpeedDemon']

    const amount = amounts[Math.floor(Math.random() * amounts.length)]
    const from = names[Math.floor(Math.random() * names.length)]

    // Check if simulateTip is safe to run

    const fakeTipId = `demo_tip_${Date.now()}`
    const fakeTxHash = Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')

    const newTip: Tip = {
      id: fakeTipId,
      amount,
      from,
      timestamp: new Date(),
      status: 'pending',
      txHash: fakeTxHash
    }

    // 1. Add Pending
    setTips(prev => [newTip, ...prev])

    // 2. Confirm after delay
    setTimeout(() => {
      setTips(prev => prev.map(t => t.id === fakeTipId ? { ...t, status: 'confirmed' } : t))
      setSessionData(prev => {
        if (!prev) return null // If sessionData gone, return null
        return {
          ...prev,
          totalTips: (prev.totalTips || 0) + amount,
          tipsCount: (prev.tipsCount || 0) + 1
        }
      })
    }, 1500)
  }, [sessionData]) // Added sessionData dependency so the guard is valid

  useEffect(() => {
    let cancelled = false
    setSessionError(null)
    getSession(sessionId)
      .then((session) => {
        if (cancelled || !session) {
          if (!session) setSessionError('Session not found')
          return
        }
        setSessionData({
          id: session.id,
          title: session.title,
          creatorAddress: session.creatorAddress,
          streamUrl: session.streamUrl,
          status: session.status as 'live' | 'ended',
          totalTips: session.totalTips ?? 0,
          tipsCount: session.tipsCount ?? 0,
        })
      })
      .catch((err) => {
        if (!cancelled) setSessionError(err instanceof Error ? err.message : 'Failed to load session')
      })
    return () => { cancelled = true }
  }, [sessionId])

  // Fetch persisted tips on page load (newest first)
  useEffect(() => {
    let cancelled = false
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

    fetch(`${apiUrl}/sessions/${sessionId}/tips`)
      .then((res) => res.ok ? res.json() : { tips: [] })
      .then((data) => {
        if (cancelled) return
        if (data.tips && Array.isArray(data.tips)) {
          const persistedTips: Tip[] = data.tips
            .map((tip: { tipId: string; amount: number; from: string; timestamp: string; status: string; txHash?: string }) => ({
              id: tip.tipId,
              amount: tip.amount,
              from: tip.from,
              timestamp: new Date(tip.timestamp),
              status: tip.status as 'pending' | 'confirmed',
              txHash: tip.txHash,
            }))
            .sort((a: Tip, b: Tip) => b.timestamp.getTime() - a.timestamp.getTime())
          setTips(persistedTips)
        }
      })
      .catch((err) => {
        if (!cancelled) console.error('Failed to load persisted tips:', err)
      })

    return () => {
      cancelled = true
    }
  }, [sessionId])

  const handleWalletConnect = useCallback(
    (method: 'extension' | 'manual') => {
      wallet.connect(method)
    },
    [wallet]
  )

  const handleSendTip = useCallback(
    async (amount: number) => {
      if (!sessionData) return
      if (wallet.method !== 'extension') {
        return
      }
      const fromLabel = 'You'
      setTippingLoading(true)
      let txHash: string
      try {
        const res = await wallet.sendTip(amount, sessionData.creatorAddress)
        txHash = res.txHash
      } catch {
        setTippingLoading(false)
        return
      }

      const optimisticTip: Tip = {
        id: `tip_${Date.now()}`,
        amount,
        from: fromLabel,
        timestamp: new Date(),
        status: 'pending',
        txHash,
      }
      setTips((prev) => [optimisticTip, ...prev])

      const result = await sendTip({ txHash, amount, from: fromLabel })
      setTippingLoading(false)

      if (!result.ok) {
        setTips((prev) => prev.filter((t) => t.id !== optimisticTip.id))
        return
      }
      if (result.tipId) {
        setTips((prev) => prev.map((t) => (t.id === optimisticTip.id ? { ...t, id: result.tipId! } : t)))
      }
    },
    [sessionData, wallet, sendTip]
  )

  if (sessionError || !sessionData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <KaspaCard neonAccent="purple">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-foreground">Session not found</h1>
              <p className="text-muted-foreground">{sessionError || 'This session does not exist or has been removed.'}</p>
              <a href="/sessions" className="inline-block text-kaspa-blue hover:underline font-semibold">
                Browse sessions →
              </a>
            </div>
          </KaspaCard>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        showWalletConnect
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{sessionData.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success-green rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-success-green">LIVE NOW</span>
                </div>
                {!socketConnected && (
                  <span className="text-xs text-muted-foreground">Connecting to live feed…</span>
                )}
                <span className="text-sm text-muted-foreground">
                  {sessionData.tipsCount} tips • {sessionData.totalTips} KAS total
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="relative w-full bg-muted rounded-card-radius overflow-hidden aspect-video">
                <iframe
                  src={sessionData.streamUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  title={sessionData.title}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-kaspa bg-card border border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Creator Address</p>
                  <code className="font-mono text-sm text-neon-cyan break-all">{sessionData.creatorAddress}</code>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(sessionData.creatorAddress)}
                  className="p-2 rounded-kaspa bg-kaspa-blue hover:bg-kaspa-blue/80 transition-colors"
                  title="Copy address"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <TipFeed tips={tips} isLive={sessionData.status === 'live'} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            {!wallet.isConnected ? (
              <WalletConnect
                onConnect={handleWalletConnect}
                onConnectManual={wallet.connectManualAddress}
                onDisconnect={wallet.disconnect}
                connected={false}
                isLoading={wallet.isLoading}
                error={wallet.error}
              />
            ) : (
              <>
                <WalletConnect
                  onDisconnect={wallet.disconnect}
                  connected
                  address={wallet.address ?? undefined}
                  balance={wallet.balance}
                  isLoading={wallet.isLoading}
                  error={wallet.error}
                />
                <TipPanel
                  creatorName="Creator"
                  onSendTip={handleSendTip}
                  isLoading={tippingLoading}
                  walletConnected
                  canSend={wallet.method === 'extension'}
                />
              </>
            )}

            <KaspaCard neonAccent="cyan">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Session Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-kaspa bg-muted/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Total Tips</span>
                    <span className="font-bold text-neon-cyan">{sessionData.totalTips} KAS</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-kaspa bg-muted/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Number of Tips</span>
                    <span className="font-bold text-foreground">{sessionData.tipsCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-kaspa bg-muted/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-xs px-2 py-1 rounded-kaspa bg-success-green/20 text-success-green font-semibold">
                      {sessionData.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">Tip Trend</p>
                  <div className="h-8 flex items-end gap-1">
                    {[3, 5, 2, 8, 4, 6, 9, 5, 7].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-kaspa-blue to-neon-cyan rounded-t opacity-70"
                        style={{ height: `${height * 4}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </KaspaCard>

            <KaspaCard>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">💡 Tip Instantly:</strong> Every tip is sent to the backend and
                  confirmed in real time.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">✓ Non-Custodial:</strong> Funds go directly to the creator&apos;s
                  wallet.
                </p>
              </div>
            </KaspaCard>
          </div>
        </div>
      </main>

      {/* Demo Simulation Button */}
      {isDemo && (
        <button
          onClick={simulateTip}
          className="fixed bottom-4 right-4 z-50 bg-neon-purple/80 hover:bg-neon-purple text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-md font-bold text-xs ring-2 ring-white/20 transition-all hover:scale-105 active:scale-95"
          title="Simulate a tip (Demo Mode)"
        >
          🔮 Simulate Tip
        </button>
      )}

      <Footer />
    </div>
  )
}
