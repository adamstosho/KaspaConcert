'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaButton } from '@/components/kaspa-button'
import { KaspaCard } from '@/components/kaspa-card'
import { TipFeed } from '@/components/tip-feed'
import { Modal } from '@/components/modal'
import { getSession, endSession } from '@/lib/api'
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
  startTime: Date
}

interface CreatorDashboardPageProps {
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

export function CreatorDashboardPage({ sessionId }: CreatorDashboardPageProps) {
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [sessionError, setSessionError] = useState<string | null>(null)
  const [tips, setTips] = useState<Tip[]>([])
  const [showEndModal, setShowEndModal] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [showShareQr, setShowShareQr] = useState(false)
  const [ending, setEnding] = useState(false)

  const handleTipPending = useCallback((ev: TipEvent) => {
    setTips((prev) => {
      if (prev.some((t) => t.id === ev.tipId)) return prev.map((t) => (t.id === ev.tipId ? tipEventToTip(ev) : t))
      return [tipEventToTip(ev), ...prev]
    })
  }, [])

  const handleTipConfirmed = useCallback((ev: TipEvent) => {
    setTips((prev) => prev.map((t) => (t.id === ev.tipId ? tipEventToTip(ev) : t)))
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

  useSessionSocket({
    sessionId,
    onTipPending: handleTipPending,
    onTipConfirmed: handleTipConfirmed,
    onSessionUpdated: handleSessionUpdated,
  })

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
          startTime: new Date(session.createdAt),
        })
      })
      .catch((err) => {
        if (!cancelled) setSessionError(err instanceof Error ? err.message : 'Failed to load session')
      })
    return () => { cancelled = true }
  }, [sessionId])

  const handleEndSession = async () => {
    setEnding(true)
    try {
      await endSession(sessionId)
      setSessionEnded(true)
      setSessionData((prev) => (prev ? { ...prev, status: 'ended' } : null))
      setShowEndModal(false)
    } catch {
      setEnding(false)
    }
  }

  if (sessionError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-destructive mb-4">{sessionError}</p>
          <Link href="/sessions" className="text-neon-cyan hover:underline">
            Browse sessions
          </Link>
        </main>
      </div>
    )
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading session…</p>
        </main>
      </div>
    )
  }

  const topTippers = tips
    .filter((t) => t.status === 'confirmed')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  const sessionDuration = Math.floor((Date.now() - sessionData.startTime.getTime()) / 60000)
  const averageTip = sessionData.tipsCount ? sessionData.totalTips / sessionData.tipsCount : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{sessionData.title}</h1>
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-kaspa ${sessionData.status === 'live' ? 'bg-success-green/20' : 'bg-muted'
                    }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${sessionData.status === 'live' ? 'bg-success-green animate-pulse' : 'bg-muted-foreground'
                      }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase ${sessionData.status === 'live' ? 'text-success-green' : 'text-muted-foreground'
                      }`}
                  >
                    {sessionData.status}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">Session ID: {sessionData.id}</span>
              </div>
            </div>

            {sessionData.status === 'live' && (
              <KaspaButton variant="secondary" size="md" onClick={() => setShowEndModal(true)}>
                End Session
              </KaspaButton>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Tips" value={`${sessionData.totalTips} KAS`} icon="💰" accent="blue" />
          <MetricCard label="Number of Tips" value={sessionData.tipsCount.toString()} icon="📊" accent="purple" />
          <MetricCard label="Duration" value={`${sessionDuration} min`} icon="⏱️" accent="cyan" />
          <MetricCard label="Avg Tip" value={`${averageTip.toFixed(2)} KAS`} icon="📈" accent="purple" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Stream & Tip Feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">Live Stream</h2>
              <div className="relative w-full bg-muted rounded-card-radius overflow-hidden aspect-video">
                <iframe
                  src={sessionData.streamUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  title={sessionData.title}
                />
              </div>
            </div>

            {/* Tip Feed */}
            <TipFeed tips={tips} isLive={sessionData.status === 'live'} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Creator Address */}
            <KaspaCard neonAccent="blue">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Your Kaspa Address</h3>
                <div className="bg-muted/50 rounded-kaspa p-3 border border-border/50">
                  <code className="font-mono text-xs text-neon-cyan break-all">{sessionData.creatorAddress}</code>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(sessionData.creatorAddress)}
                  className="w-full py-2 rounded-kaspa bg-kaspa-blue hover:bg-kaspa-blue/80 transition-colors text-white text-sm font-semibold"
                >
                  Copy Address
                </button>
                <p className="text-xs text-muted-foreground">All tips are sent directly to this address</p>
              </div>
            </KaspaCard>

            {/* Share Session */}
            <KaspaCard neonAccent="purple">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Share Session</h3>
                <div className="bg-muted/50 rounded-kaspa p-3 flex items-center gap-2 border border-border/50">
                  <code className="font-mono text-xs text-neon-cyan flex-1 break-all">
                    {`${typeof window !== 'undefined' ? window.location.origin : ''}/session/${sessionData.id}`}
                  </code>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${typeof window !== 'undefined' ? window.location.origin : ''}/session/${sessionData.id}`,
                      )
                    }
                    className="p-2 rounded-kaspa bg-neon-purple hover:bg-neon-purple/80 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <KaspaButton
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setShowShareQr(true)}
                    className="sm:flex-1"
                  >
                    Show QR Code
                  </KaspaButton>
                </div>
                <p className="text-xs text-muted-foreground">
                  Share this link on social media, chat, or as a QR code so viewers can join instantly.
                </p>
              </div>
            </KaspaCard>

            {/* Top Tippers */}
            <KaspaCard neonAccent="cyan">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Top Supporters</h3>

                {topTippers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No confirmed tips yet</p>
                ) : (
                  <div className="space-y-3">
                    {topTippers.map((tipper, index) => (
                      <div key={tipper.id} className="flex items-center justify-between p-3 rounded-kaspa bg-muted/50 border border-border/50">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-kaspa-blue to-neon-purple flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium text-foreground truncate">{tipper.from}</span>
                        </div>
                        <span className="text-sm font-bold text-neon-cyan ml-2 flex-shrink-0">
                          {tipper.amount} KAS
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </KaspaCard>

            {/* Earnings Chart */}
            <KaspaCard>
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Earnings Trend</h3>
                <div className="h-16 flex items-end gap-1">
                  {[1, 3, 2, 5, 3, 7, 4, 6, 8, 5, 9, 7].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-kaspa-blue to-neon-cyan rounded-t opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                      style={{ height: `${height * 6}px` }}
                      title={`${height} tips`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">Last 12 minutes</p>
              </div>
            </KaspaCard>
          </div>
        </div>
      </main>

      {/* End Session Modal */}
      <Modal isOpen={showEndModal} onClose={() => setShowEndModal(false)} title="End Session?" size="md">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Your earnings will be frozen. Tips already confirmed are in your wallet.
          </p>

          <div className="bg-muted/50 rounded-kaspa p-4 space-y-3 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Final Earnings</span>
              <span className="text-lg font-bold text-neon-cyan">{sessionData.totalTips} KAS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tips Received</span>
              <span className="text-lg font-bold text-foreground">{sessionData.tipsCount}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <KaspaButton variant="secondary" type="button" onClick={() => setShowEndModal(false)}>
              Cancel
            </KaspaButton>
            <KaspaButton variant="primary" type="button" onClick={handleEndSession} disabled={ending}>
              {ending ? 'Ending…' : 'End Session'}
            </KaspaButton>
          </div>
        </div>
      </Modal>

      {/* Session Ended Message */}
      {sessionEnded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <KaspaCard className="max-w-md w-full">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success-green/20 rounded-card-radius flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-success-green" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Session Ended</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Thank you for streaming! Your earnings are now in your wallet.
                </p>

                <div className="bg-muted/50 rounded-kaspa p-4 mb-6 border border-border/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                    <p className="text-3xl font-bold text-neon-cyan">{sessionData.totalTips} KAS</p>
                  </div>
                </div>
              </div>

              <Link href="/" className="w-full">
                <KaspaButton variant="primary" fullWidth>
                  Back to Home
                </KaspaButton>
              </Link>
            </div>
          </KaspaCard>
        </div>
      )}

      {/* Share QR Modal */}
      <Modal
        isOpen={showShareQr}
        onClose={() => setShowShareQr(false)}
        title="Share Session via QR"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Scan this QR-style code or share the link so viewers can open your session on any device.
          </p>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-card-radius bg-[radial-gradient(circle_at_0_0,#4F7CFF,transparent_60%),radial-gradient(circle_at_100%_0,#9B59FF,transparent_55%),radial-gradient(circle_at_0_100%,#00FFF7,transparent_55%)] border border-border flex items-center justify-center">
              <span className="text-xs font-mono text-white/80 text-center px-4">
                QR preview for
                <br />
                /session/{sessionData.id}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Session link</p>
            <div className="bg-muted/50 rounded-kaspa p-3 flex items-center gap-2 border border-border/50">
              <code className="font-mono text-xs text-neon-cyan flex-1 break-all">
                {`${typeof window !== 'undefined' ? window.location.origin : ''}/session/${sessionData.id}`}
              </code>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${typeof window !== 'undefined' ? window.location.origin : ''}/session/${sessionData.id}`,
                  )
                }
                className="p-2 rounded-kaspa bg-kaspa-blue hover:bg-kaspa-blue/80 transition-colors"
                aria-label="Copy session link"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  icon: string
  accent: 'blue' | 'purple' | 'cyan'
}

function MetricCard({ label, value, icon, accent }: MetricCardProps) {
  return (
    <KaspaCard neonAccent={accent}>
      <div className="space-y-3">
        <p className="text-2xl">{icon}</p>
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </KaspaCard>
  )
}

