import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto, Fira_Code } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })



export const metadata: Metadata = {
  title: 'KaspaConcert - Real-Time Live-Stream Tipping',
  description: 'Instant, on-chain live-stream tipping powered by Kaspa blockchain. Tip creators in real time during live events.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KaspaConcert',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark light',
}

import { WalletProvider } from '@/context/wallet-context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased bg-noise selection:bg-kaspa-blue/30 selection:text-kaspa-blue">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <WalletProvider>
            {children}
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
