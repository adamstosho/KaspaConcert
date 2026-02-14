'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface KaspaCardProps {
  children: ReactNode
  className?: string
  neonAccent?: 'blue' | 'purple' | 'cyan' | 'green'
  hoverable?: boolean
}

export function KaspaCard({ children, className, neonAccent, hoverable = true }: KaspaCardProps) {
  const accentClasses = {
    blue: 'border-kaspa-blue/30 bg-kaspa-blue/10 hover:border-kaspa-blue/50 hover:bg-kaspa-blue/20 hover:shadow-[0_0_30px_-10px_rgba(79,124,255,0.2)]',
    purple: 'border-neon-purple/30 bg-neon-purple/10 hover:border-neon-purple/50 hover:bg-neon-purple/20 hover:shadow-[0_0_30px_-10px_rgba(155,89,255,0.2)]',
    cyan: 'border-neon-cyan/30 bg-neon-cyan/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/20 hover:shadow-[0_0_30px_-10px_rgba(0,255,247,0.2)]',
    green: 'border-success-green/30 bg-success-green/10 hover:border-success-green/50 hover:bg-success-green/20 hover:shadow-[0_0_30px_-10px_rgba(5,150,105,0.2)]',
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border backdrop-blur-sm p-6 sm:p-8 transition-all duration-300",
        neonAccent ? accentClasses[neonAccent] : 'border-border bg-card hover:border-foreground/20',
        hoverable && !neonAccent ? 'hover:shadow-lg' : '',
        !hoverable && 'pointer-events-none',
        className
      )}
    >
      {/* Subtle Gradient Glow in Background - purely decorative */}
      {neonAccent && (
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-current opacity-10 blur-3xl rounded-full pointer-events-none" />
      )}

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
