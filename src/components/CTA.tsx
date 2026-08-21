import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type CTAProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { inverse?: boolean }>

export function CTA({ children, className = '', inverse = false, ...props }: CTAProps) {
  return (
    <a className={`cta ${inverse ? 'cta--inverse' : ''} ${className}`.trim()} {...props}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  )
}
