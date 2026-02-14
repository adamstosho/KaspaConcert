'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaButton } from '@/components/kaspa-button'
import { KaspaCard } from '@/components/kaspa-card'

import { useWallet } from '@/context/wallet-context'
import { Wallet } from 'lucide-react'
import { createSession } from '@/lib/api'
import { isValidKaspaAddress as validateKaspaAddress, getYouTubeEmbedUrl, getTwitchEmbedUrl } from '@/lib/kaspa-utils'

export default function CreateSessionPage() {
  const { address, isConnected, connect, isLoading: walletConnecting } = useWallet()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [formData, setFormData] = useState({
    sessionTitle: '',
    streamUrl: '',
    kaspaAddress: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [shareableUrl, setShareableUrl] = useState('')

  // Auto-fill address when wallet connects
  React.useEffect(() => {
    if (isConnected && address) {
      setFormData(prev => ({ ...prev, kaspaAddress: address }))
      // Clear error if exists
      if (errors.kaspaAddress) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.kaspaAddress
          return newErrors
        })
      }
    }
  }, [isConnected, address])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.sessionTitle.trim()) {
      newErrors.sessionTitle = 'Session title is required'
    }

    if (!formData.streamUrl.trim()) {
      newErrors.streamUrl = 'Stream URL is required'
    } else if (!isValidUrl(formData.streamUrl)) {
      newErrors.streamUrl = 'Please enter a valid URL'
    }

    if (!formData.kaspaAddress.trim()) {
      newErrors.kaspaAddress = 'Kaspa address is required'
    } else if (!validateKaspaAddress(formData.kaspaAddress)) {
      newErrors.kaspaAddress = 'Please enter a valid Kaspa address (kaspa: or kaspa1, 50+ characters)'
    }

    return newErrors
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    try {
      let finalStreamUrl = formData.streamUrl.trim()
      finalStreamUrl = getYouTubeEmbedUrl(finalStreamUrl)
      finalStreamUrl = getTwitchEmbedUrl(finalStreamUrl)

      const res = await createSession({
        title: formData.sessionTitle.trim(),
        streamUrl: finalStreamUrl,
        creatorAddress: formData.kaspaAddress.trim(),
      })
      setSessionId(res.id)
      setShareableUrl(res.shareableUrl || (typeof window !== 'undefined' ? `${window.location.origin}/session/${res.id}` : ''))
      setStep('success')
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Failed to create session' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-success-green to-neon-cyan rounded-card-radius flex items-center justify-center mx-auto animate-bounce-in">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </div>

            <KaspaCard neonAccent="cyan">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Session Created!</h2>
                  <p className="text-muted-foreground">Your live-stream session is ready for viewers</p>
                </div>

                {/* Session Details */}
                <div className="space-y-4 bg-muted/50 rounded-kaspa p-6 text-left border border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Session Title</p>
                    <p className="text-lg font-bold text-foreground">{formData.sessionTitle}</p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Session ID</p>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-neon-cyan font-semibold flex-1 break-all">{sessionId}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(sessionId)}
                        className="p-2 rounded-kaspa bg-kaspa-blue hover:bg-kaspa-blue/80 transition-colors"
                        title="Copy session ID"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Shareable Link</p>
                    <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-kaspa p-3">
                      <code className="font-mono text-sm text-neon-cyan flex-1 break-all">{shareableUrl || (typeof window !== 'undefined' ? `${window.location.origin}/session/${sessionId}` : '')}</code>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(shareableUrl || (typeof window !== 'undefined' ? `${window.location.origin}/session/${sessionId}` : ''))
                        }
                        className="p-2 rounded-kaspa bg-kaspa-blue hover:bg-kaspa-blue/80 transition-colors"
                        title="Copy link"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Creator Address</p>
                    <code className="font-mono text-sm text-muted-foreground break-all">{formData.kaspaAddress}</code>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href={`/creator/session/${sessionId}`} className="w-full">
                    <KaspaButton variant="primary" size="lg" fullWidth>
                      Go to Dashboard
                    </KaspaButton>
                  </Link>
                  <Link href="/" className="w-full">
                    <KaspaButton variant="secondary" size="lg" fullWidth>
                      Back to Home
                    </KaspaButton>
                  </Link>
                </div>

                <p className="text-sm text-muted-foreground">
                  Share your link on social media or send directly to viewers. You can start receiving tips immediately!
                </p>
              </div>
            </KaspaCard>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Create a Live Session</h1>
            <p className="text-lg text-muted-foreground">Set up your stream and start receiving KAS tips in real-time</p>
          </div>

          {/* Form */}
          <KaspaCard neonAccent="blue">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Session Title */}
              <div className="space-y-3">
                <label htmlFor="sessionTitle" className="block text-sm font-bold text-foreground">
                  Session Title <span className="text-error-red">*</span>
                </label>
                <input
                  id="sessionTitle"
                  type="text"
                  name="sessionTitle"
                  value={formData.sessionTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Live Concert - Acoustic Night"
                  className={`kaspa-input w-full ${errors.sessionTitle ? 'border-error-red focus:ring-error-red' : ''}`}
                />
                {errors.sessionTitle && <p className="text-sm text-error-red">{errors.sessionTitle}</p>}
                <p className="text-xs text-muted-foreground">Give your stream a catchy title that viewers will see</p>
              </div>

              {/* Stream URL */}
              <div className="space-y-3">
                <label htmlFor="streamUrl" className="block text-sm font-bold text-foreground">
                  Stream URL <span className="text-error-red">*</span>
                </label>
                <input
                  id="streamUrl"
                  type="url"
                  name="streamUrl"
                  value={formData.streamUrl}
                  onChange={handleInputChange}
                  placeholder="e.g., https://youtube.com/watch?v=... or custom embed URL"
                  className={`kaspa-input w-full ${errors.streamUrl ? 'border-error-red focus:ring-error-red' : ''}`}
                />
                {errors.streamUrl && <p className="text-sm text-error-red">{errors.streamUrl}</p>}
                <p className="text-xs text-muted-foreground">YouTube Live, Twitch, or custom iframe URL</p>
              </div>

              {/* Kaspa Address */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="kaspaAddress" className="block text-sm font-bold text-foreground">
                    Kaspa Receiving Address <span className="text-error-red">*</span>
                  </label>
                  {!isConnected && (
                    <button
                      type="button"
                      onClick={() => connect('extension')}
                      disabled={walletConnecting}
                      className="text-xs text-kaspa-blue hover:underline font-bold flex items-center gap-1 disabled:opacity-50"
                    >
                      <Wallet className="w-3 h-3" /> {walletConnecting ? 'Connecting…' : 'Connect KasWare Wallet'}
                    </button>
                  )}
                </div>

                <textarea
                  id="kaspaAddress"
                  name="kaspaAddress"
                  value={formData.kaspaAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your Kaspa wallet address (will be public)"
                  rows={3}
                  className={`kaspa-input w-full font-mono text-sm resize-none ${errors.kaspaAddress ? 'border-error-red focus:ring-error-red' : ''} ${isConnected && address === formData.kaspaAddress ? 'bg-success-green/5 border-success-green/20 text-success-green' : ''}`}
                />
                {errors.kaspaAddress && <p className="text-sm text-error-red">{errors.kaspaAddress}</p>}
                {isConnected && address === formData.kaspaAddress && (
                  <p className="text-xs text-success-green flex items-center gap-1">✓ Auto-filled from connected wallet</p>
                )}
                {!isConnected && (
                  <p className="text-xs text-muted-foreground">All tips will be sent directly to this address. Keep it safe!</p>
                )}
              </div>

              {errors.submit && (
                <div className="p-3 rounded-kaspa bg-error-red/20 border border-error-red text-error-red text-sm">
                  {errors.submit}
                </div>
              )}
              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <KaspaButton variant="primary" size="lg" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Session...' : 'Create Session'}
                </KaspaButton>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 rounded-kaspa bg-muted border border-border/50">
                <p className="text-xs text-muted-foreground">
                  <strong>Privacy Note:</strong> Your session title and Kaspa address will be publicly visible. Tips are sent directly to your wallet —
                  we never hold or control funds.
                </p>
              </div>
            </form>
          </KaspaCard>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <KaspaCard neonAccent="purple">
              <div className="space-y-3">
                <p className="text-2xl">🎯</p>
                <h3 className="font-bold text-foreground">What Happens Next?</h3>
                <p className="text-sm text-muted-foreground">
                  Once created, you&apos;ll get a shareable link. Send it to viewers via social media, email, or QR code.
                </p>
              </div>
            </KaspaCard>

            <KaspaCard neonAccent="cyan">
              <div className="space-y-3">
                <p className="text-2xl">⚡</p>
                <h3 className="font-bold text-foreground">Real-Time Tips</h3>
                <p className="text-sm text-muted-foreground">
                  As viewers tip, you&apos;ll see every transaction appear in your dashboard instantly.
                </p>
              </div>
            </KaspaCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
