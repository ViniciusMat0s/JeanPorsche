import { AnimatedText } from './AnimatedText'

type SectionTitleProps = {
  title: string
  intro?: string
  light?: boolean
}

export function SectionTitle({ title, intro, light = false }: SectionTitleProps) {
  return (
    <header className={`section-title ${light ? 'section-title--light' : ''}`.trim()}>
      <AnimatedText text={title} className="section-title__heading" />
      {intro ? <p className="section-title__intro" data-reveal>{intro}</p> : null}
    </header>
  )
}
