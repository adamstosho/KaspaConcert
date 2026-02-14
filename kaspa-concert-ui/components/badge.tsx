'use client'

import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variantClasses = {
    default: 'bg-kaspa-blue/20 text-kaspa-blue border-kaspa-blue/30',
    success: 'bg-success-green/20 text-success-green border-success-green/30',
    error: 'bg-error-red/20 text-error-red border-error-red/30',
    warning: 'bg-neon-purple/20 text-neon-purple border-neon-purple/30',
    info: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span className={`inline-flex items-center rounded-kaspa border font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}>
      {children}
    </span>
  )
}
