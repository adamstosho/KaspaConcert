'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaButton } from '@/components/kaspa-button'
import { KaspaCard } from '@/components/kaspa-card'

interface SummaryData {
  sessionId: string
  title: string
  thumbnail: string
  totalEarnings: number
  tipCount: number
  duration: number
  topTippers: Array<{ name: string; amount: number }>
}

interface SessionSummaryPageProps {
  sessionId: string
}

export function SessionSummaryPageClient({ sessionId }: SessionSummaryPageProps) {
  const summaryData: SummaryData = {
    sessionId,
    title: 'Live Concert - Acoustic Night',
    thumbnail: '🎸',
    totalEarnings: 47.85,
    tipCount: 34,
    duration: 65,
    topTippers: [
      { name: 'eve_vip', amount: 10.0 },
      { name: 'charlie_king', amount: 8.5 },
      { name: 'alice_fan', amount: 7.2 },
      { name: 'bob_supporter', amount: 6.0 },
      { name: 'dave_music', amount: 5.15 },
    ],
  }

  const avgTip = (summaryData.totalEarnings / summaryData.tipCount).toFixed(2)
  const impressiveMetric = summaryData.totalEarnings > 40

  return (
    <div className="min-h-screen bg-gradient-to-b from-kaspa-dark to-[#0f0f0f]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Success Section */}
        <div className="text-center space-y-8 mb-12">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-success-green to-neon-cyan rounded-card-radius flex items-center justify-center text-6xl animate-bounce-in">
              {summaryData.thumbnail}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance">{summaryData.title}</h1>
            <p className="text-lg text-muted-foreground">Your session is complete. Here&apos;s how it went.</p>
          </div>
        </div>

        {/* Main Stats Card */}
        <KaspaCard neonAccent="cyan" className="mb-8">
          <div className="space-y-8">
            {/* Earnings Display */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Total Earnings</p>
              <p className="text-6xl font-bold text-neon-cyan">{summaryData.totalEarnings}</p>
              <p className="text-lg text-foreground mt-2">
                <span className="text-neon-cyan">KAS</span> from {summaryData.tipCount} tips
              </p>

              {impressiveMetric && (
                <div className="mt-6 inline-block px-4 py-2 rounded-kaspa bg-success-green/20 border border-success-green">
                  <p className="text-sm font-bold text-success-green">
                    🔥 Amazing stream! That&apos;s impressive earnings.
                  </p>
                </div>
              )}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2 uppercase">Duration</p>
                <p className="text-2xl font-bold text-foreground">{summaryData.duration}m</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2 uppercase">Avg Tip</p>
                <p className="text-2xl font-bold text-kaspa-blue">{avgTip}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2 uppercase">Supporters</p>
                <p className="text-2xl font-bold text-neon-purple">{summaryData.tipCount}</p>
              </div>
            </div>
          </div>
        </KaspaCard>

        {/* Top Tippers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Top Supporters</h2>

          <div className="space-y-3">
            {summaryData.topTippers.map((tipper, index) => (
              <KaspaCard key={tipper.name} neonAccent="blue" className="hover:scale-102 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kaspa-blue to-neon-purple flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">#{index + 1}</span>
                    </div>

                    <div>
                      <p className="font-semibold text-foreground">{tipper.name}</p>
                      <p className="text-xs text-muted-foreground">Top supporter</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-neon-cyan">{tipper.amount}</p>
                    <p className="text-xs text-muted-foreground">KAS</p>
                  </div>
                </div>
              </KaspaCard>
            ))}
          </div>
        </div>

        {/* Earnings Breakdown */}
        <KaspaCard className="mb-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Earnings Breakdown</h3>

            {/* Mini Bar Chart */}
            <div className="space-y-3">
              {[
                { label: 'Confirmed Tips', value: summaryData.totalEarnings, percent: 100 },
                { label: 'Pending Confirmation', value: 0, percent: 0 },
                { label: 'Platform Fee', value: 0, percent: 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span
                      className={`text-sm font-bold ${
                        item.value > 0 ? 'text-neon-cyan' : 'text-muted-foreground'
                      }`}
                    >
                      {item.value > 0 ? `${item.value} KAS` : 'None'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-kaspa-dark overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-kaspa-blue to-neon-cyan rounded-full transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-kaspa bg-kaspa-dark border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Zero platform fees:</strong> 100% of tips go directly to your
                wallet. That&apos;s the Kaspa difference!
              </p>
            </div>
          </div>
        </KaspaCard>

        {/* Recommendations */}
        <KaspaCard neonAccent="purple" className="mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">💡 Tips for Your Next Stream</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-neon-purple font-bold mt-0.5">✓</span>
                <span>Share your session link early and often on social media to drive more viewers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple font-bold mt-0.5">✓</span>
                <span>Mention the low fees and instant blockchain confirmation to encourage tipping</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple font-bold mt-0.5">✓</span>
                <span>Create tip milestones or rewards to incentivize higher support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple font-bold mt-0.5">✓</span>
                <span>Thank your top tippers during the stream to build community</span>
              </li>
            </ul>
          </div>
        </KaspaCard>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/create" className="w-full">
            <KaspaButton variant="primary" size="lg" fullWidth>
              Create Another Session
            </KaspaButton>
          </Link>
          <Link href="/" className="w-full">
            <KaspaButton variant="secondary" size="lg" fullWidth>
              Back to Home
            </KaspaButton>
          </Link>
        </div>

        {/* Share Stats */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Share your success on social media</p>
          <div className="flex gap-4 justify-center">
            <button className="p-3 rounded-kaspa bg-card hover:bg-card/80 transition-colors" title="Share on Twitter">
              <span className="text-lg">𝕏</span>
            </button>
            <button className="p-3 rounded-kaspa bg-card hover:bg-card/80 transition-colors" title="Share on Facebook">
              <span className="text-lg">f</span>
            </button>
            <button className="p-3 rounded-kaspa bg-card hover:bg-card/80 transition-colors" title="Copy link">
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </main>

      <Footer />
    </div>
  )
}

