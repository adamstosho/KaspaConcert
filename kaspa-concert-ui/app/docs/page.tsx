'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaCard } from '@/components/kaspa-card'
import { useWallet } from '@/context/wallet-context'

export default function DocsPage() {
  const { isConnected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/sessions')
    }
  }, [isConnected, router])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Intro */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">How KaspaConcert Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            KaspaConcert is a real-time live-stream tipping platform. Creators host streams, viewers send on-chain KAS
            tips, and every confirmation updates the UI in seconds.
          </p>
        </section>

        {/* Flows */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <KaspaCard neonAccent="blue">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">Creator Flow</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Go to <span className="font-mono text-neon-cyan">/create</span> and fill in your session title, stream
                  URL (YouTube, Twitch, or iframe), and Kaspa address.
                </li>
                <li>Submit the form to get a unique session ID and shareable link.</li>
                <li>
                  Open your creator dashboard to see the embedded stream, real-time tip feed, top supporters, and
                  earnings trend.
                </li>
                <li>End the session when you are done and review the summary of earnings and supporters.</li>
              </ol>
            </div>
          </KaspaCard>

          <KaspaCard neonAccent="purple">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">Viewer Flow</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Open a link like{' '}
                  <span className="font-mono text-neon-cyan">kaspaconcert.app/session/{'{sessionId}'}</span> from
                  social media, QR code, or a direct invite.
                </li>
                <li>Watch the embedded live stream on mobile or desktop with no reloads while tipping.</li>
                <li>Connect a Kaspa wallet and choose a preset or custom tip amount.</li>
                <li>
                  Send the tip and see a pending state, then a confirmed state as the tip appears in the live feed and
                  totals update.
                </li>
              </ol>
            </div>
          </KaspaCard>
        </section>

        {/* Key Concepts */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KaspaCard>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">Kaspa Speed</h3>
              <p className="text-sm text-muted-foreground">
                Kaspa&apos;s ~100ms block times and BlockDAG design enable sub-second feedback, so tips feel as instant
                as likes or comments.
              </p>
            </div>
          </KaspaCard>
          <KaspaCard>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">Non-Custodial UX</h3>
              <p className="text-sm text-muted-foreground">
                Wallets stay in the user&apos;s control. Signing happens client-side, and tips go straight to the
                creator&apos;s address.
              </p>
            </div>
          </KaspaCard>
          <KaspaCard>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">Real-Time Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Pending and confirmed states are clearly visible in the tip feed, stats cards, and toasts, with smooth
                micro-interactions.
              </p>
            </div>
          </KaspaCard>
        </section>

        {/* Links */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Where to go next</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KaspaCard neonAccent="blue">
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Create a Session</h3>
                <p className="text-sm text-muted-foreground">
                  Ready to go live? Start a new session and share your link.
                </p>
                <Link href="/create" className="text-sm text-neon-cyan hover:text-neon-cyan/80">
                  Open create page →
                </Link>
              </div>
            </KaspaCard>
            <KaspaCard neonAccent="cyan">
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Browse Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Explore example sessions and practice joining with a session ID.
                </p>
                <Link href="/sessions" className="text-sm text-neon-cyan hover:text-neon-cyan/80">
                  View sessions →
                </Link>
              </div>
            </KaspaCard>
            <KaspaCard neonAccent="purple">
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Design System</h3>
                <p className="text-sm text-muted-foreground">
                  See how the KaspaConcert design system shapes every color, type scale, and component.
                </p>
                <Link href="/UI_DESIGN_SYSTEM" className="text-sm text-neon-cyan hover:text-neon-cyan/80">
                  View design system (repo) →
                </Link>
              </div>
            </KaspaCard>
          </div>
        </section>
      </main>

      {!isConnected && <Footer />}
    </div>
  )
}

