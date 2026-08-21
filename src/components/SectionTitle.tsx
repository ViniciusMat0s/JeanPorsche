import { AnimatedText } from './AnimatedText'

type SectionTitleProps = {
  eyebrow: string
  title: string
  intro?: string
  light?: boolean
}

export function SectionTitle({ eyebrow, title, intro, light = false }: SectionTitleProps) {
  return (
    <header className={`section-title ${light ? 'section-title--light' : ''}`.trim()}>
      <p className="eyebrow" data-reveal>{eyebrow}</p>
      <AnimatedText text={title} className="section-title__heading" />
      {intro ? <p className="section-title__intro" data-reveal>{intro}</p> : null}
    </header>
  )
}
