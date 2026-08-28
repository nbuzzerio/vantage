import type { ReactNode } from 'react'

interface StatusPillProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
}

export function StatusPill({ children, tone = 'neutral' }: StatusPillProps) {
  return (
    <span
      className={
        tone === 'accent'
          ? 'inline-flex rounded-full border border-sage-400/30 bg-sage-400/10 px-2.5 py-1 text-xs font-medium text-sage-300'
          : 'inline-flex rounded-full border border-stone-700 bg-stone-900/70 px-2.5 py-1 text-xs font-medium text-stone-300'
      }
    >
      {children}
    </span>
  )
}
