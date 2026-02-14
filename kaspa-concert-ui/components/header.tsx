import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { KaspaButton } from './kaspa-button'
import { useWallet } from '@/context/wallet-context'
import { Modal } from './modal'
import { WalletConnect } from './wallet-connect'
import { Loader2, Wallet, Menu, X, ChevronRight, LogOut, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  showWalletConnect?: boolean
}

export function Header({ showWalletConnect = true }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const isDark = theme !== 'light'
  const pathname = usePathname()
  const { isConnected, address, connect, connectManualAddress, disconnect, isLoading, balance, method, error } = useWallet()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close modal when connected successfully
  useEffect(() => {
    if (isConnected) {
      setIsWalletModalOpen(false)
    }
  }, [isConnected])

  // Close mobile menu on route change & lock scroll
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  // Navigation Items Configuration
  const navItems = [
    { href: '/', label: 'Home', hidden: isConnected },
    { href: '/create', label: 'Create Session', hidden: !isConnected },
    { href: '/sessions', label: 'Browse', hidden: !isConnected }, // Should be visible to everyone or just connected? Assuming just connected based on request context, but commonly Browse is public. Let's stick to "hidden if NOT connected" if that was the previous logic.
    // Wait, previous logic: Browse showWhenConnected: true. It didn't say hideWhenDisconnected. 
    // Previous: !isConnected || item.showWhenConnected. 
    // If NOT connected: true || ... -> Show. 
    // If connected: false || true -> Show.
    // So 'Browse' was shown to BOTH.
    // Let's keep Browse visible to both for now, unless User specifically asked to hide it.
    // User said "go back to home/landing page and maybe the docs ... should not even show the tab".
    // So Home/Docs are hidden when connected.
    // Browse is likely the main app, so it should be visible.
    { href: '/docs', label: 'Docs', hidden: isConnected },
  ].filter(item => {
    if (item.label === 'Browse') return true // Browse is always visible
    return !item.hidden
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-background/70 border-b border-white/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href={isConnected ? '/sessions' : '/'} className="flex items-center gap-3 group z-50 relative">
            <Image
              src={isDark ? "/placeholder-logo.svg" : "/placeholder-logo-light.svg"}
              alt="KaspaConcert Logo"
              width={40}
              height={40}
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {showWalletConnect && (
              <div className="hidden md:flex items-center gap-2">
                {isConnected && address ? (
                  <div className="flex items-center gap-2 group relative">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-full px-4 py-2 cursor-pointer" onClick={disconnect}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success-green rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,100,0.5)]" />
                        <span className="text-sm font-mono font-medium">
                          {address.substring(0, 8)}...{address.substring(address.length - 4)}
                        </span>
                      </div>
                      <div className="h-4 w-px bg-white/10 mx-1" />
                      <span className="text-xs font-bold text-kaspa-blue">
                          {balance != null ? balance.toLocaleString() : method === 'extension' ? '…' : '—'} KAS
                        </span>
                    </div>
                  </div>
                ) : (
                  <KaspaButton
                    variant="primary"
                    size="md"
                    onClick={() => setIsWalletModalOpen(true)}
                    disabled={isLoading}
                    className="min-w-[140px]"
                    icon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                  >
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </KaspaButton>
                )}
              </div>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-kaspa bg-card hover:bg-card/80 transition-colors hidden md:block"
              type="button"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden p-2 rounded-kaspa bg-card hover:bg-card/80 transition-colors z-50 relative"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-[9999] w-full sm:w-[400px] flex flex-col bg-[#09090b] border-l border-white/10 shadow-2xl md:hidden"
              >
                {/* Internal Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <span className="text-lg font-bold text-white">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col">
                  <nav className="flex flex-col gap-2 mb-8">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-all border border-transparent ${pathname === item.href
                            ? 'bg-kaspa-blue/10 text-kaspa-blue border-kaspa-blue/20'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          {item.label}
                          <ChevronRight className={`w-5 h-5 ${pathname === item.href ? 'text-kaspa-blue' : 'text-zinc-600'}`} />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-auto space-y-6"
                  >
                    {/* Theme Toggle in Mobile */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-medium text-zinc-300">Appearance</span>
                      <div className="flex bg-black rounded-lg p-1 border border-white/10">
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-2 rounded-md transition-all ${!isDark ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          <Sun className="w-4 h-4" />
                          <span className="sr-only">Light</span>
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-2 rounded-md transition-all ${isDark ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          <Moon className="w-4 h-4" />
                          <span className="sr-only">Dark</span>
                        </button>
                      </div>
                    </div>

                    {/* Wallet Section */}
                    {showWalletConnect && (
                      <div className="space-y-4">
                        {isConnected && address ? (
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <p className="text-xs text-zinc-500 mb-2">Connected Wallet</p>
                              <p className="text-sm font-mono font-medium break-all text-white">{address}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-zinc-500">Balance</span>
                                <span className="text-sm text-kaspa-blue font-bold">
                                {balance != null ? balance.toLocaleString() : method === 'extension' ? '…' : '—'} KAS
                              </span>
                              </div>
                            </div>
                            <KaspaButton
                              variant="secondary"
                              size="md"
                              fullWidth
                              icon={<LogOut className="w-4 h-4" />}
                              onClick={() => {
                                disconnect()
                                setIsMobileMenuOpen(false)
                              }}
                            >
                              Disconnect
                            </KaspaButton>
                          </div>
                        ) : (
                          <KaspaButton
                            variant="primary"
                            size="lg"
                            fullWidth
                            className="shadow-xl shadow-kaspa-blue/20"
                            onClick={() => {
                              setIsWalletModalOpen(true)
                              setIsMobileMenuOpen(false)
                            }}
                            disabled={isLoading}
                            icon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                          >
                            {isLoading ? 'Connecting...' : 'Connect Wallet'}
                          </KaspaButton>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <Modal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} title="Connect Wallet">
        <WalletConnect
          onConnect={connect}
          onConnectManual={connectManualAddress}
          onDisconnect={disconnect}
          connected={isConnected}
          address={address || undefined}
          balance={balance}
          method={method}
          isLoading={isLoading}
          error={error}
        />
      </Modal>
    </header>
  )
}
