import { principles } from '../data/site'
import { LayoutContainer } from './LayoutContainer'
import { SectionTitle } from './SectionTitle'

export function ProcessSection() {
  return (
    <section className="process-section" id="enfoque" aria-labelledby="process-title">
      <LayoutContainer className="process-section__layout">
        <div className="process-section__heading" id="process-title">
          <SectionTitle eyebrow="Nuestra forma de mirar" title="Un proyecto empieza mucho antes del dibujo." />
        </div>
        <ol className="principles-list">
          {principles.map((principle) => (
            <li key={principle.index} data-reveal>
              <span>{principle.index}</span>
              <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
            </li>
          ))}
        </ol>
      </LayoutContainer>
    </section>
  )
}
