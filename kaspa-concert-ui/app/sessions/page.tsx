'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaCard } from '@/components/kaspa-card'
import { KaspaButton } from '@/components/kaspa-button'
import { listSessions, type Session } from '@/lib/api'

export default function SessionsPage() {
  const router = useRouter()
  const [joinId, setJoinId] = useState('')
  const [error, setError] = useState('')
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setListError(null)
    listSessions({ limit: 50 })
      .then((list) => {
        if (!cancelled) setSessions(list)
      })
      .catch((err) => {
        if (!cancelled) setListError(err instanceof Error ? err.message : 'Failed to load sessions')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const handleJoin = (id?: string) => {
    const targetId = id ?? joinId.trim()

    if (!targetId) {
      setError('Enter a session ID to join')
      return
    }

    setError('')
    router.push(`/session/${targetId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Page Header */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">Browse Live Sessions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover live KaspaConcert streams or join directly with a session ID shared by a creator, social post, or QR code.
          </p>
        </section>

        {/* Join by Session ID */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 items-start">
          <KaspaCard neonAccent="blue">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Join by Session ID</h2>
              <p className="text-sm text-muted-foreground">
                Paste the session ID from a link, QR code, or invite to jump straight into a live stream.
              </p>

              <div className="space-y-3">
                <label htmlFor="sessionId" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Session ID
                </label>
                <input
                  id="sessionId"
                  type="text"
                  value={joinId}
                  onChange={(e) => {
                    setJoinId(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="e.g. sess_abc123..."
                  className="kaspa-input w-full font-mono text-sm"
                />
                {error && <p className="text-sm text-error-red">{error}</p>}
              </div>

              <KaspaButton
                variant="primary"
                size="md"
                fullWidth
                type="button"
                onClick={() => handleJoin()}
              >
                Join Session
              </KaspaButton>

              <p className="text-xs text-muted-foreground">
                Tip: Creators can also share direct links like{' '}
                <span className="font-mono text-neon-cyan">kaspaconcert.app/session/{'{sessionId}'}</span>.
              </p>
            </div>
          </KaspaCard>

          {/* Sessions List */}
          <section aria-label="Sessions from API" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Sessions</h2>
              {!loading && (
                <span className="text-xs text-muted-foreground">
                  {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {loading && (
              <div className="py-8 text-center text-muted-foreground text-sm">Loading sessions…</div>
            )}

            {!loading && listError && (
              <KaspaCard>
                <p className="text-destructive text-sm">{listError}</p>
                <p className="text-muted-foreground text-xs mt-2">
                  You can still join by session ID above if you have a link.
                </p>
              </KaspaCard>
            )}

            {!loading && !listError && sessions.length === 0 && (
              <KaspaCard>
                <p className="text-muted-foreground text-sm text-center py-6">
                  No sessions yet. Create one from the Create page to get started.
                </p>
              </KaspaCard>
            )}

            {!loading && !listError && sessions.length > 0 && (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <KaspaCard
                    key={session.id}
                    neonAccent={session.status === 'live' ? 'cyan' : 'purple'}
                    hoverable
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground">{session.title}</h3>
                        <p className="text-xs font-mono text-muted-foreground break-all">{session.id}</p>

                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span
                            className={`px-2 py-1 rounded-kaspa font-semibold ${session.status === 'live'
                              ? 'bg-success-green/20 text-success-green'
                              : 'bg-muted text-muted-foreground'
                              }`}
                          >
                            {session.status === 'live' ? 'LIVE' : 'ENDED'}
                          </span>
                          <span className="text-muted-foreground">
                            {(session.tipsCount ?? 0)} tip{(session.tipsCount ?? 0) !== 1 ? 's' : ''} •{' '}
                            <span className="text-neon-cyan font-semibold">
                              {(session.totalTips ?? 0).toFixed(1)} KAS
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-2">
                        <KaspaButton
                          variant="secondary"
                          size="sm"
                          type="button"
                          onClick={() => handleJoin(session.id)}
                        >
                          Join Stream
                        </KaspaButton>
                      </div>
                    </div>
                  </KaspaCard>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}

