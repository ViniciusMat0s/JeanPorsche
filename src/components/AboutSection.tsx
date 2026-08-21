import { ArrowLink } from './ArrowLink'
import { AnimatedText } from './AnimatedText'
import { LayoutContainer } from './LayoutContainer'

export function AboutSection() {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <LayoutContainer className="about-section__grid">
        <figure className="about-section__portrait" data-image-reveal data-reveal>
          <img src="/images/jean-porsche-retrato.jpg" alt="Retrato del arquitecto e interiorista Jean Porsche" loading="lazy" data-image-inner />
          <figcaption>Jean Porsche</figcaption>
        </figure>
        <div className="about-section__copy">
          <p className="eyebrow" data-reveal>Jean Porsche</p>
          <AnimatedText id="about-title" text="Una mirada libre, culta y emocional." />
          <p className="about-section__lead" data-reveal>
            La mezcla de referencias, la intensidad cromática y el cuidado por los detalles convierten
            cada interior en una escena propia, lejos de fórmulas repetidas.
          </p>
          <blockquote data-reveal>
            “La laca brillo es ya nuestra seña de identidad.”
          </blockquote>
          <ArrowLink href="#contacto">Hablar con el estudio</ArrowLink>
        </div>
      </LayoutContainer>
    </section>
  )
}
