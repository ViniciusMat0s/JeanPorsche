import type { PropsWithChildren } from 'react'

type LayoutContainerProps = PropsWithChildren<{
  className?: string
  as?: 'div' | 'section'
}>

export function LayoutContainer({ children, className = '', as = 'div' }: LayoutContainerProps) {
  const Tag = as
  return <Tag className={`container ${className}`.trim()}>{children}</Tag>
}
