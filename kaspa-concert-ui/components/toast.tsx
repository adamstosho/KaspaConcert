'use client'

import { ReactNode } from 'react'

interface ToastProps {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  icon?: ReactNode
}

export function Toast({ type, message, icon }: ToastProps) {
  const typeStyles = {
    success: 'bg-success-green/20 border-success-green text-success-green',
    error: 'bg-error-red/20 border-error-red text-error-red',
    info: 'bg-kaspa-blue/20 border-kaspa-blue text-kaspa-blue',
  }

  const defaultIcons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  }

  return (
    <div className={`animate-slide-in-from-top rounded-kaspa border px-4 py-3 flex items-center gap-3 min-w-sm max-w-md ${typeStyles[type]}`}>
      {icon || defaultIcons[type]}
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastProps[]
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
