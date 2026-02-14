'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface KaspaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

export function KaspaButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  icon,
  fullWidth,
  className,
  disabled,
  ...props
}: KaspaButtonProps) {
  const baseClasses = 'font-sans font-medium rounded-kaspa transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-kaspa-blue to-[#3b66e6] text-white shadow-lg shadow-kaspa-blue/25 hover:shadow-kaspa-blue/40 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'border border-neon-purple/50 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple/10 hover:border-neon-purple shadow-lg shadow-neon-purple/10 hover:shadow-neon-purple/20',
    ghost: 'text-kaspa-blue hover:bg-kaspa-blue/5',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base font-semibold tracking-wide',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
      {icon}
      {children}
    </button>
  )
}
