'use client'

import { useState } from 'react'
import { KaspaButton } from './kaspa-button'
import { KaspaCard } from './kaspa-card'

interface TipPanelProps {
  creatorName?: string
  minAmount?: number
  maxAmount?: number
  onSendTip?: (amount: number) => void
  isLoading?: boolean
  walletConnected?: boolean
  /** When false (e.g. view-only address), send is disabled and a message is shown. */
  canSend?: boolean
}

const PRESET_AMOUNTS = [0.1, 0.5, 1, 5]

export function TipPanel({ creatorName = 'Creator', minAmount = 0.01, maxAmount = 1000, onSendTip, isLoading, walletConnected = true, canSend = true }: TipPanelProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState('')

  const tipAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : null)

  const handleSendTip = () => {
    if (!tipAmount) {
      setError('Please select or enter an amount')
      return
    }

    if (tipAmount < minAmount) {
      setError(`Minimum tip is ${minAmount} KAS`)
      return
    }

    if (tipAmount > maxAmount) {
      setError(`Maximum tip is ${maxAmount} KAS`)
      return
    }

    setError('')
    onSendTip?.(tipAmount)
  }

  if (!walletConnected) {
    return (
      <KaspaCard neonAccent="purple" className="w-full">
        <div className="text-center py-6">
          <p className="text-foreground font-semibold mb-4">Connect wallet to tip</p>
          <KaspaButton variant="primary" fullWidth>
            Connect Now
          </KaspaButton>
        </div>
      </KaspaCard>
    )
  }

  return (
    <KaspaCard neonAccent="blue" className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Tip {creatorName}</h3>
          <p className="text-sm text-muted-foreground">Send KAS directly to support the stream</p>
        </div>

        {/* Preset Amounts */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Tips</p>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount('')
                  setError('')
                }}
                className={`py-3 rounded-kaspa font-semibold transition-all text-sm ${
                  selectedAmount === amount
                    ? 'bg-kaspa-blue text-white shadow-kaspa-hover scale-105'
                    : 'bg-card border border-border text-foreground hover:border-kaspa-blue hover:text-kaspa-blue'
                }`}
              >
                {amount} <span className="text-xs">KAS</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">Custom Amount</label>
          <div className="relative">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                if (selectedAmount !== null) setSelectedAmount(null)
                setError('')
              }}
              placeholder="0.00"
              min={minAmount}
              max={maxAmount}
              step="0.01"
              className="kaspa-input w-full pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">KAS</span>
          </div>
        </div>

        {/* Amount Display */}
        {tipAmount && (
          <div className="bg-kaspa-dark rounded-kaspa p-4 border border-neon-cyan/30">
            <p className="text-xs text-muted-foreground mb-1">Tip Amount</p>
            <p className="text-2xl font-bold text-neon-cyan">{tipAmount.toFixed(4)} KAS</p>
          </div>
        )}

        {/* Error */}
        {error && <div className="p-3 rounded-kaspa bg-error-red/20 border border-error-red text-error-red text-sm">{error}</div>}

        {!canSend && (
          <div className="p-3 rounded-kaspa bg-muted border border-border text-muted-foreground text-sm">
            Connect KasWare Wallet extension above to send real tips.
          </div>
        )}

        {/* Send Button */}
        <KaspaButton variant="primary" fullWidth isLoading={isLoading} disabled={!tipAmount || isLoading || !canSend} onClick={handleSendTip}>
          {isLoading ? 'Sending...' : 'Send Tip'}
        </KaspaButton>

        {/* Info */}
        <p className="text-xs text-center text-muted-foreground">{canSend ? 'Transaction will be confirmed in seconds' : 'View-only address cannot sign transactions.'}</p>
      </div>
    </KaspaCard>
  )
}
