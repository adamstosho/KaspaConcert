'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  connectKasWare,
  getKasWareBalance,
  sendKasTip,
  isValidKaspaAddress,
  type KasWareConnection
} from '@/lib/kasware-wallet'

/** 1 KAS = 100,000,000 sompi (Kaspa smallest unit). */
export type WalletMethod = 'extension' | 'manual' | null

interface UseWalletReturn {
  isConnected: boolean
  address: string | null
  balance: number | null
  method: WalletMethod
  isLoading: boolean
  isSending: boolean
  error: string | null
  connect: (method: WalletMethod) => Promise<void>
  connectManualAddress: (address: string) => void
  disconnect: () => void
  sendTip: (amount: number, recipientAddress: string) => Promise<{ txHash: string; status: 'pending' | 'confirmed' }>
  getBalance: () => Promise<number>
}

const STORAGE_KEY = 'kaspa-wallet-connection'

export function useWallet(): UseWalletReturn {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [method, setMethod] = useState<WalletMethod>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const persistConnection = useCallback((m: WalletMethod, addr: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ method: m, address: addr }))
  }, [])

  const clearPersisted = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  /** Restore connection from localStorage and refresh balance if extension */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      const { method: storedMethod, address: storedAddress } = JSON.parse(stored) as {
        method: WalletMethod
        address: string
      }
      if (!storedMethod || !storedAddress) return

      if (storedMethod === 'extension') {
        // Set state immediately to show "connected" UI (balance stays null until fetched)
        setMethod('extension')
        setAddress(storedAddress)
        setIsConnected(true)

        // Retry: wait for KasWare injection, then fetch balance with backoff
        const delays = [0, 200, 500, 1000, 2000, 3000]
        let attempt = 0
        let zeroRetried = false
        const tryBalance = () => {
          if (!window.kasware) {
            if (attempt < delays.length - 1) {
              setTimeout(tryBalance, delays[attempt])
              attempt++
            }
            return
          }
          getKasWareBalance()
            .then((b) => {
              // Extension sometimes returns 0 before sync; retry once after 2s
              if (b === 0 && !zeroRetried) {
                zeroRetried = true
                setTimeout(() => {
                  getKasWareBalance()
                    .then((b2) => setBalance(b2))
                    .catch(() => setBalance(0))
                }, 2000)
                return
              }
              setBalance(b)
            })
            .catch((err) => {
              console.warn('Failed to refresh balance on init:', err)
              if (attempt < delays.length - 1) {
                attempt++
                setTimeout(tryBalance, delays[Math.min(attempt, delays.length - 1)])
              }
            })
        }
        tryBalance()
        return
      }

      if (storedMethod === 'manual' && isValidKaspaAddress(storedAddress)) {
        setMethod('manual')
        setAddress(storedAddress.trim())
        setBalance(null)
        setIsConnected(true)
      }
    } catch {
      clearPersisted()
    }
  }, [clearPersisted])

  const connect = useCallback(
    async (walletMethod: WalletMethod) => {
      if (!walletMethod) return

      setIsLoading(true)
      setError(null)

      try {
        if (walletMethod === 'extension') {
          // Use our robust helper
          const connection = await connectKasWare()

          setAddress(connection.address)
          setBalance(connection.balance)
          setMethod('extension')
          setIsConnected(true)
          persistConnection('extension', connection.address)
        }
        // Manual connection is handled via connectManualAddress
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect wallet')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [persistConnection]
  )

  const connectManualAddress = useCallback(
    (rawAddress: string) => {
      const addr = rawAddress.trim()
      if (!isValidKaspaAddress(addr)) {
        setError('Please enter a valid Kaspa address (kaspa: or kaspa1, at least 50 characters)')
        return
      }
      setError(null)
      setAddress(addr)
      setBalance(null)
      setMethod('manual')
      setIsConnected(true)
      persistConnection('manual', addr)
    },
    [persistConnection]
  )

  const disconnect = useCallback(async () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
    setMethod(null)
    setError(null)
    clearPersisted()
  }, [clearPersisted])

  const getBalance = useCallback(async (): Promise<number> => {
    if (!address) throw new Error('Wallet not connected')

    if (method === 'extension') {
      const b = await getKasWareBalance()
      setBalance(b)
      return b
    }

    if (method === 'manual') throw new Error('Balance not available for view-only address')
    if (balance === null) throw new Error('Wallet not connected')
    return balance
  }, [address, method, balance])

  const sendTip = useCallback(
    async (amount: number, recipientAddress: string): Promise<{ txHash: string; status: 'pending' | 'confirmed' }> => {
      if (!isConnected || !address) {
        throw new Error('Wallet not connected')
      }

      if (method === 'manual') {
        throw new Error('Connect KasWare Wallet extension to send real tips. View-only address cannot sign transactions.')
      }

      if (method === 'extension') {
        setIsSending(true)
        setError(null)
        try {
          const txHash = await sendKasTip(recipientAddress, amount)

          // Delay balance refresh so wallet/network has time to update, then retry once on failure
          const refreshBalance = (delayMs: number) => {
            setTimeout(() => {
              getKasWareBalance()
                .then((newBalance) => {
                  if (typeof newBalance === 'number') setBalance(newBalance)
                })
                .catch(() => {
                  setTimeout(() => {
                    getKasWareBalance()
                      .then((b) => typeof b === 'number' && setBalance(b))
                      .catch(() => {})
                  }, 1500)
                })
            }, delayMs)
          }
          refreshBalance(1500)

          return { txHash, status: 'pending' }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to send tip')
          throw err
        } finally {
          setIsSending(false)
        }
      }

      throw new Error('Connect KasWare Wallet to send tips')
    },
    [isConnected, address, method]
  )

  return {
    isConnected,
    address,
    balance,
    method,
    isLoading,
    isSending,
    error,
    connect,
    connectManualAddress,
    disconnect,
    sendTip,
    getBalance,
  }
}
