'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullscreen?: boolean
}

export function LoadingSpinner({ size = 'md', text, fullscreen }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className={`${sizeClasses[size]} relative`}>
        <svg className={`${sizeClasses[size]} animate-spin text-kaspa-blue`} fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {text && <p className="text-foreground font-medium">{text}</p>}
    </div>
  )

  if (fullscreen) {
    return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">{spinner}</div>
  }

  return spinner
}
