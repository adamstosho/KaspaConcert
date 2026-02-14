'use client'

import { useState } from 'react'
import { KaspaButton } from './kaspa-button'
import { KaspaCard } from './kaspa-card'

interface WalletConnectProps {
  onConnect?: (method: 'extension' | 'manual') => void
  onConnectManual?: (address: string) => void
  onDisconnect?: () => void
  connected?: boolean
  address?: string
  balance?: number | null
  method?: 'extension' | 'manual' | null
  isLoading?: boolean
  error?: string | null
}

export function WalletConnect({
  onConnect,
  onConnectManual,
  onDisconnect,
  connected,
  address,
  balance,
  method,
  isLoading,
  error,
}: WalletConnectProps) {
  const [showMethods, setShowMethods] = useState(false)
  const [manualMode, setManualMode] = useState(false)
  const [manualInput, setManualInput] = useState('')

  const handleUseManualAddress = () => {
    if (!manualInput.trim()) return
    onConnectManual?.(manualInput.trim())
    setManualMode(false)
    setManualInput('')
    setShowMethods(false)
  }

  if (connected && address) {
    return (
      <KaspaCard neonAccent="blue" className="w-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Wallet Connected</h3>
            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
          </div>

          <div className="space-y-3">
            <div className="bg-kaspa-dark rounded-kaspa p-3">
              <p className="text-xs text-muted-foreground mb-1">Address</p>
              <p className="font-mono text-sm text-neon-cyan break-all">{address}</p>
            </div>

            {balance !== undefined && balance !== null ? (
              <div className="bg-kaspa-dark rounded-kaspa p-3">
                <p className="text-xs text-muted-foreground mb-1">Balance</p>
                <p className="text-lg font-bold text-foreground">
                  {balance.toFixed(4)} <span className="text-xs text-neon-cyan">KAS</span>
                </p>
              </div>
            ) : (
              <div className="bg-kaspa-dark rounded-kaspa p-3">
                <p className="text-xs text-muted-foreground mb-1">Balance</p>
                <p className="text-sm text-muted-foreground">
                  {method === 'extension' ? 'Loading…' : '— (view-only address)'}
                </p>
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <KaspaButton variant="secondary" size="sm" fullWidth onClick={onDisconnect} disabled={isLoading}>
            {isLoading ? 'Disconnecting…' : 'Disconnect'}
          </KaspaButton>
        </div>
      </KaspaCard>
    )
  }

  if (manualMode) {
    return (
      <KaspaCard neonAccent="purple" className="w-full">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">Enter your Kaspa address</h3>
          <p className="text-sm text-muted-foreground">View-only: you can see the feed but need KasWare extension to send tips.</p>
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="kaspa:... or kaspa1..."
            className="kaspa-input w-full font-mono text-sm"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <KaspaButton variant="ghost" fullWidth onClick={() => { setManualMode(false); setManualInput('') }}>
              Back
            </KaspaButton>
            <KaspaButton variant="primary" fullWidth onClick={handleUseManualAddress} disabled={!manualInput.trim()}>
              Use this address
            </KaspaButton>
          </div>
        </div>
      </KaspaCard>
    )
  }

  return (
    <div className="space-y-4">
      <KaspaCard neonAccent="purple">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground">Use KasWare extension to send real tips, or enter your address to view only.</p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {!showMethods ? (
            <KaspaButton variant="primary" fullWidth onClick={() => setShowMethods(true)} disabled={isLoading}>
              {isLoading ? 'Connecting…' : 'Choose Wallet Method'}
            </KaspaButton>
          ) : (
            <div className="space-y-3">
              <WalletMethodButton
                icon="🦊"
                name="KasWare Wallet (Extension)"
                description="Connect to send real KAS tips"
                onClick={() => onConnect?.('extension')}
              />
              <WalletMethodButton
                icon="📝"
                name="Enter address (view only)"
                description="Paste your Kaspa address — cannot send tips"
                onClick={() => setManualMode(true)}
              />

              <KaspaButton variant="ghost" fullWidth onClick={() => setShowMethods(false)}>
                Cancel
              </KaspaButton>
            </div>
          )}
        </div>
      </KaspaCard>
    </div>
  )
}

interface WalletMethodButtonProps {
  icon: string
  name: string
  description: string
  onClick: () => void
}

function WalletMethodButton({ icon, name, description, onClick }: WalletMethodButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-kaspa border border-border bg-transparent hover:bg-card transition-all text-left group"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-foreground group-hover:text-kaspa-blue transition-colors">{name}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <svg className="w-5 h-5 text-muted-foreground group-hover:text-kaspa-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}
