'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KaspaButton } from '@/components/kaspa-button'
import { KaspaCard } from '@/components/kaspa-card'
import { Zap, Shield, Coins, Smartphone, TrendingUp, Radio, CheckCircle2, ArrowRight, Play, Activity, Globe } from 'lucide-react'
import { useWallet } from '@/context/wallet-context'

export default function LandingPage() {
  const { isConnected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/sessions')
    }
  }, [isConnected, router])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative selection:bg-kaspa-blue/30 selection:text-kaspa-dev">
      <div className="fixed inset-0 bg-noise opacity-50 pointer-events-none z-0" />
      {/* Aurora Background */}
      <div className="fixed inset-0 bg-gradient-to-tr from-background via-background to-accent/5 bg-[length:200%_200%] animate-aurora -z-10" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-24 relative">
          {/* Cinematic Grid Background */}
          <div className="absolute inset-0 -z-10 h-[800px] w-full bg-grid-white opacity-[0.15] animate-grid-fade" style={{ backgroundPosition: 'center top' }} />

          {/* Hero Section */}
          <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-32 lg:mb-40">

            {/* Left: Content */}
            <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-1000">

              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-2xl mb-6 shadow-2xl shadow-kaspa-blue/10 animate-in zoom-in-90 duration-700 delay-200 fill-mode-backwards hover:border-kaspa-blue/30 transition-colors cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-green shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                </span>
                <span className="text-xs font-semibold tracking-widest text-foreground/90 uppercase font-mono">Kaspa Mainnet Live</span>
                <div className="w-px h-3 bg-white/20" />
                <span className="text-xs text-muted-foreground font-mono">100ms Block Time</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground leading-[0.95] drop-shadow-2xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-foreground/50 pb-2">Stream</span>
                <span className="block text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-muted-foreground/80 mb-2">at the speed of</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-kaspa-blue via-[#00ccff] to-neon-purple animate-text-shimmer bg-[length:200%_auto]">
                  BlockDAG
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                The world's first <span className="text-foreground font-medium">decentralized streaming economy</span>.
                Accept micro-tips instantly. Zero fees. 100% Non-custodial.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
                <Link href="/create">
                  <KaspaButton variant="primary" size="lg" icon={<Zap className="w-5 h-5 fill-current" />} className="w-full sm:w-auto shadow-kaspa-blue/25 hover:shadow-kaspa-blue/50 shadow-2xl skew-x-0 hover:-skew-x-2 transition-transform">
                    Start Streaming
                  </KaspaButton>
                </Link>
                <Link href="/demo">
                  <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto backdrop-blur-md">
                    <Play className="w-4 h-4 fill-foreground" />
                    <span className="text-foreground">Watch Demo</span>
                  </button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground/60">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] text-foreground font-bold shadow-lg">
                      <Globe className="w-4 h-4 opacity-50" />
                    </div>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-foreground text-base">2,000+ Creators</div>
                  <div className="text-xs uppercase tracking-wide">Joined this week</div>
                </div>
              </div>
            </div>

            {/* Right: Motion Graphic & Glass UI */}
            <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center perspective-1000">
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kaspa-blue/10 rounded-full blur-[120px] animate-pulse-glow -z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[80px] -z-10 mix-blend-screen" />

              {/* Visualizer Container */}
              <div className="relative w-full h-full max-w-2xl mx-auto preserve-3d animate-float">
                <BlockDAGVisualizer />

                {/* Floating Glass Notification Cards - Decorative */}
                <div className="absolute top-[20%] right-[10%] p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 animate-float-delayed z-20 hover:scale-105 transition-transform cursor-default max-w-[240px]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kaspa-blue to-neon-cyan flex items-center justify-center shadow-lg">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-foreground font-bold text-sm">+ 500 KAS</div>
                    <div className="text-xs text-muted-foreground">Just received</div>
                  </div>
                </div>

                <div className="absolute bottom-[20%] left-[5%] p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 animate-float z-20 hover:scale-105 transition-transform cursor-default max-w-[240px]" style={{ animationDelay: '1.5s' }}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-pink-500 flex items-center justify-center shadow-lg">
                    <Radio className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-foreground font-bold text-sm">New Subscriber</div>
                    <div className="text-xs text-muted-foreground">@kaspa_king</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Bar (Floating) */}
          <div className="relative -mt-12 mb-32 z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <StatItem label="Tips Processed" value="$1.2M+" delay="0" />
              <StatItem label="Block Rate" value="1 BPS" delay="100" />
              <StatItem label="Avg. Finality" value="< 1s" delay="200" />
              <StatItem label="Fee" value="$0.0001" delay="300" />
            </div>
          </div>

          {/* Value Props */}
          <section className="mb-32 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">Why KaspaConcert?</h2>
              <p className="text-lg text-muted-foreground font-light">
                Built on the world's fastest, open-source, decentralized & fully scalable Layer-1.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Zap strokeWidth={1.5} />}
                title="Instant Finality"
                description="Don't make your viewers wait. Tips settle instantly, enabling real-time on-screen interactions."
                accent="cyan"
                delay="0"
              />
              <FeatureCard
                icon={<Shield strokeWidth={1.5} />}
                title="Fully Non-Custodial"
                description="We never touch your funds. Transactions go directly from viewer wallet to creator wallet."
                accent="blue"
                delay="150"
              />
              <FeatureCard
                icon={<Activity strokeWidth={1.5} />}
                title="High Frequency"
                description="Kaspa's BlockDAG architecture handles massive transaction throughput without breaking a sweat."
                accent="purple"
                delay="300"
              />
            </div>
          </section>

          {/* How It Works (Scroll Stagger) */}
          <section className="mb-32 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-kaspa-blue/5 to-transparent blur-3xl -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <h2 className="text-4xl font-bold tracking-tight">Seamless Integration</h2>
                <div className="space-y-6">
                  <StepRow number="01" title="Connect Wallet" desc="Use Kasware or any diverse Kaspa wallet." />
                  <StepRow number="02" title="Create Session" desc="Set your stream details and overlay settings." />
                  <StepRow number="03" title="Go Live" desc="Add our widget to your OBS/Streamlabs scene." />
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-[400px] bg-gradient-to-tr from-zinc-900 to-zinc-800 rounded-2xl border border-white/10 shadow-2xl p-6 rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://kaspa.org/wp-content/uploads/2023/10/kaspa-bg-pattern.svg')] opacity-10 bg-repeat" />
                {/* Mock UI for Stream */}
                <div className="h-full w-full bg-black/40 rounded-xl relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-center space-y-2 group-hover:scale-110 transition-transform duration-700">
                    <Radio className="w-16 h-16 text-kaspa-blue mx-auto animate-pulse" />
                    <p className="text-white font-mono text-sm">waiting for signal...</p>
                  </div>
                  {/* Flying Coins Animation Placeholder */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full bg-amber-400 blur-md animate-float-delayed opacity-50" />
                    <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-kaspa-blue blur-md animate-float opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-kaspa-blue to-[#6836c9] px-6 py-20 text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Ready to revolutionize your stream?</h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">Join the fastest growing decentralized streaming economy.</p>
              <div className="pt-4">
                <Link href="/create">
                  <button className="bg-white text-kaspa-blue font-bold py-4 px-10 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    Get Started Now
                  </button>
                </Link>
              </div>
            </div>
          </section>

        </main>
        {!isConnected && <Footer />}
      </div>
    </div>
  )
}

// --- Components ---

function StatItem({ label, value, delay }: { label: string, value: string, delay: string }) {
  return (
    <div className={`text-center space-y-1 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-backwards delay-[${delay}ms]`}>
      <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground uppercase font-medium tracking-wider">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description, accent, delay }: { icon: React.ReactNode, title: string, description: string, accent: 'blue' | 'purple' | 'cyan', delay: string }) {
  return (
    <div className={`h-full animate-in fade-in zoom-in-95 duration-700 fill-mode-backwards delay-[${delay}ms]`}>
      <KaspaCard neonAccent={accent} className="h-full hover:-translate-y-2 transition-transform duration-500 group">
        <div className="space-y-6 p-2">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight mb-2 group-hover:text-kaspa-blue transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">{description}</p>
          </div>
        </div>
      </KaspaCard>
    </div>
  )
}

function StepRow({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <span className="text-3xl font-bold text-muted-foreground/30 group-hover:text-kaspa-blue/50 transition-colors font-mono">{number}</span>
      <div className="space-y-1">
        <h4 className="text-xl font-bold text-foreground group-hover:translate-x-1 transition-transform">{title}</h4>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

// --- BlockDAG Motion Graphic ---
function BlockDAGVisualizer() {
  return (
    <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl opacity-90" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'rgb(79,124,255)', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: 'rgb(79,124,255)', stopOpacity: 0 }} />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connecting Lines (Animates) */}
      <g stroke="url(#grad1)" strokeWidth="1" opacity="0.4">
        <path d="M250 150 L150 250" className="animate-pulse" />
        <path d="M250 150 L350 250" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <path d="M150 250 L200 350" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <path d="M150 250 L100 350" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        <path d="M350 250 L300 350" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
        <path d="M350 250 L400 350" className="animate-pulse" style={{ animationDelay: '1.5s' }} />

        {/* Cross connections simulating DAG */}
        <path d="M200 350 L300 350" className="animate-pulse" style={{ animationDelay: '2s' }} />
        <path d="M100 350 L200 350" className="animate-pulse" style={{ animationDelay: '2.2s' }} />
      </g>

      {/* Nodes (Floating & Pulsing) */}
      <circle cx="250" cy="150" r="12" fill="#4F7CFF" filter="url(#glow)" className="animate-float" />

      <circle cx="150" cy="250" r="8" fill="#0891B2" filter="url(#glow)" className="animate-float-delayed" />
      <circle cx="350" cy="250" r="8" fill="#7C3AED" filter="url(#glow)" className="animate-float" style={{ animationDelay: '1s' }} />

      <circle cx="200" cy="350" r="6" fill="#059669" filter="url(#glow)" className="animate-float-delayed" style={{ animationDelay: '0.5s' }} />
      <circle cx="100" cy="350" r="5" fill="#4F7CFF" filter="url(#glow)" className="animate-float" style={{ animationDelay: '1.5s' }} />
      <circle cx="300" cy="350" r="6" fill="#0891B2" filter="url(#glow)" className="animate-float-delayed" style={{ animationDelay: '2s' }} />
      <circle cx="400" cy="350" r="5" fill="#7C3AED" filter="url(#glow)" className="animate-float" style={{ animationDelay: '2.5s' }} />

      {/* Signals traveling */}
      <circle cx="250" cy="150" r="3" fill="white" className="animate-ping" style={{ animationDuration: '3s' }} />
    </svg>
  )
}
