'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaCard } from '@/components/kaspa-card'
import { KaspaButton } from '@/components/kaspa-button'
import { useWallet } from '@/context/wallet-context'
import { Play, Zap, Share2, MousePointer } from 'lucide-react'

export default function DemoPage() {
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-sm font-medium text-neon-purple">
            <Play className="w-4 h-4" />
            Try without a wallet
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Watch Demo Mode</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            See real-time tipping in action without connecting a wallet or spending KAS. Perfect for judges and quick verification.
          </p>
        </section>

        <KaspaCard neonAccent="purple" className="space-y-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-neon-purple" />
            How to run the demo
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>
              <Link href="/create" className="text-kaspa-blue hover:underline font-medium">
                Create a session
              </Link>
              {' '}
              (title, stream URL, any Kaspa address for receiving tips).
            </li>
            <li>
              Copy the <strong className="text-foreground">shareable session link</strong> and open it in this browser.
            </li>
            <li>
              <strong className="text-foreground">Add <code className="px-1.5 py-0.5 rounded bg-muted text-neon-cyan">?demo=true</code></strong> to the end of the URL in the address bar.
              <br />
              <span className="text-sm">Example: <code className="text-neon-cyan break-all">.../session/sess_abc123?demo=true</code></span>
            </li>
            <li>
              Click the floating <strong className="text-foreground">Simulate Tip</strong> button (bottom-right). Tips will appear in the feed as pending, then confirmed after ~1.5s.
            </li>
          </ol>
        </KaspaCard>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create">
            <KaspaButton variant="primary" size="lg" icon={<Zap className="w-4 h-4" />} className="w-full sm:w-auto">
              Create a session
            </KaspaButton>
          </Link>
          <Link href="/sessions">
            <KaspaButton variant="secondary" size="lg" icon={<Share2 className="w-4 h-4" />} className="w-full sm:w-auto">
              Browse sessions
            </KaspaButton>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          For full testing steps (including real wallet + testnet), see{' '}
          <a href="https://github.com/your-org/kaspa-project/blob/main/TESTING.md" className="text-kaspa-blue hover:underline" target="_blank" rel="noopener noreferrer">
            TESTING.md
          </a>
          {' '}in the repo.
        </p>
      </main>

      <Footer />
    </div>
  )
}
