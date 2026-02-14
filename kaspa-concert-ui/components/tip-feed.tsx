'use client'

import { KaspaCard } from './kaspa-card'

interface Tip {
  id: string
  amount: number
  from: string
  timestamp: Date
  status: 'pending' | 'confirmed'
  txHash?: string
}

interface TipFeedProps {
  tips: Tip[]
  isLive?: boolean
}

export function TipFeed({ tips, isLive = true }: TipFeedProps) {
  return (
    <section className="space-y-4" aria-label="Live tip activity">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          Live Tip Feed
          {isLive && <span className="w-2 h-2 bg-success-green rounded-full animate-pulse" aria-hidden="true" />}
        </h3>
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {tips.length} tips
        </span>
      </div>

      <div
        role="region"
        aria-live="polite"
        aria-label={isLive ? 'Incoming tips in real time' : 'Tip history'}
        className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar px-1"
      >
        {tips.length === 0 ? (
          <KaspaCard className="relative overflow-hidden group border-dashed border-2 border-white/10 bg-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-kaspa-blue/5 via-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-center py-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-muted-foreground group-hover:text-neon-cyan transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-foreground font-bold mb-1">No tips yet</h4>
              <p className="text-sm text-muted-foreground group-hover:text-kaspa-blue transition-colors">
                Be the legend who starts the party! 🚀
              </p>
            </div>
          </KaspaCard>
        ) : (
          tips.map((tip, index) => (
            <KaspaCard
              key={tip.id}
              neonAccent="cyan"
              className={index === 0 ? 'animate-bounce-in' : ''}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-bold text-neon-cyan">
                      {tip.amount} KAS
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-kaspa font-semibold ${tip.status === 'confirmed'
                          ? 'bg-success-green/20 text-success-green'
                          : 'bg-kaspa-blue/20 text-kaspa-blue animate-pulse-glow'
                        }`}
                    >
                      {tip.status === 'confirmed' ? '✓ Confirmed tip' : '⏳ Tip pending'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-foreground font-medium">{tip.from}</p>
                    <p className="text-xs text-muted-foreground">
                      {tip.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                {tip.txHash && (
                  <div className="ml-4">
                    <a
                      href="#"
                      className="text-xs text-neon-cyan hover:text-neon-cyan/80 font-mono transition-colors truncate max-w-24"
                      title={tip.txHash}
                      aria-label={`View transaction ${tip.txHash}`}
                    >
                      {tip.txHash.substring(0, 8)}...
                    </a>
                  </div>
                )}
              </div>
            </KaspaCard>
          ))
        )}
      </div>
    </section>
  )
}
