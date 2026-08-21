import type { PropsWithChildren } from 'react'

export function ScrollReveal({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={className} data-reveal>
      {children}
    </div>
  )
}
