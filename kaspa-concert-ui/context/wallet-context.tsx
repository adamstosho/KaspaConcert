'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useWallet as useWalletHook, type WalletMethod } from '@/lib/use-wallet'

type WalletContextType = ReturnType<typeof useWalletHook>

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useWalletHook()
  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export type { WalletMethod }
