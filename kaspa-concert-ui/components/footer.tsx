'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/placeholder-logo.svg"
                alt="KaspaConcert"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">Real-time live-stream tipping on Kaspa blockchain</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Create Session
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Browse Sessions
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-kaspa-blue transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2026 KaspaConcert. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            Powered by <span className="text-neon-cyan font-semibold">Kaspa</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
