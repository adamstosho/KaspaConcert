import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto, Fira_Code } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })



export const metadata: Metadata = {
  title: {
    default: 'KaspaConcert - Real-Time Blockchain Tipping for Live Streams',
    template: '%s | KaspaConcert'
  },
  description: 'Accept instant KAS tips during your live streams. Built on Kaspa BlockDAG for sub-second finality. Zero fees, 100% non-custodial, and fully decentralized streaming economy.',
  keywords: [
    'Kaspa',
    'blockchain tipping',
    'live stream tips',
    'cryptocurrency donations',
    'BlockDAG',
    'instant payments',
    'creator economy',
    'decentralized streaming',
    'KAS tips',
    'real-time payments'
  ],
  authors: [{ name: 'KaspaConcert Team' }],
  creator: 'KaspaConcert',
  publisher: 'KaspaConcert',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://kaspaconcert.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'KaspaConcert',
    title: 'KaspaConcert - Real-Time Blockchain Tipping for Live Streams',
    description: 'Accept instant KAS tips during your live streams. Built on Kaspa BlockDAG for sub-second finality. Zero fees, 100% non-custodial.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KaspaConcert - Instant Live Stream Tipping on Kaspa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KaspaConcert - Real-Time Blockchain Tipping',
    description: 'Accept instant KAS tips during your live streams. Zero fees, sub-second finality.',
    images: ['/og-image.png'],
    creator: '@KaspaConcert',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KaspaConcert',
  },
  verification: {
    // Add your verification tokens when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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
