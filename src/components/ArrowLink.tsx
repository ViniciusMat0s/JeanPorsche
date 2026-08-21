import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type ArrowLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { inverse?: boolean }>

export function ArrowLink({ children, className = '', inverse = false, ...props }: ArrowLinkProps) {
  return (
    <a className={`arrow-link ${inverse ? 'arrow-link--inverse' : ''} ${className}`.trim()} {...props}>
      <span>{children}</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
        <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </a>
  )
}
