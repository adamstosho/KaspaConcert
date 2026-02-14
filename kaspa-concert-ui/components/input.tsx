'use client'

import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  icon?: ReactNode
  fullWidth?: boolean
}

export function Input({
  label,
  error,
  helper,
  icon,
  fullWidth,
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-bold text-foreground mb-2">
          {label}
          {props.required && <span className="text-error-red ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

        <input
          className={`kaspa-input ${icon ? 'pl-12' : ''} ${error ? 'border-error-red focus:ring-error-red' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
          disabled={disabled}
          {...props}
        />
      </div>

      {error && <p className="mt-2 text-sm text-error-red">{error}</p>}
      {!error && helper && <p className="mt-2 text-xs text-muted-foreground">{helper}</p>}
    </div>
  )
}
