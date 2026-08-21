import { ArrowLink } from './ArrowLink'
import { AnimatedText } from './AnimatedText'
import { LayoutContainer } from './LayoutContainer'
import { ScrollReveal } from './ScrollReveal'

export function IntroSection() {
  return (
    <section className="intro-section" id="estudio" aria-labelledby="intro-title">
      <LayoutContainer className="intro-section__grid">
        <div className="intro-section__copy">
          <p className="eyebrow" data-reveal>El estudio</p>
          <AnimatedText id="intro-title" text="Espacios con carácter, pensados para ser vividos." />
          <ScrollReveal>
            <p className="intro-section__lead">
              Jean Porsche Arquitectura + Interiores crea proyectos donde color, arte, luz y materiales
              construyen una identidad reconocible y profundamente personal.
            </p>
            <ArrowLink href="#proyectos">Explorar proyectos</ArrowLink>
          </ScrollReveal>
          <dl className="studio-meta" data-reveal>
            <div><dt>Estudios</dt><dd>Madrid + Menorca</dd></div>
            <div><dt>Ámbitos</dt><dd>Arquitectura + Interiores</dd></div>
          </dl>
        </div>

        <div className="intro-collage" aria-label="Selección de interiores del estudio">
          <figure className="intro-collage__main" data-image-reveal data-reveal>
            <img src="/images/casa-ve-salon.jpg" alt="Salón de Casa V+E en Madrid" loading="lazy" data-image-inner />
          </figure>
          <figure className="intro-collage__detail" data-image-reveal data-reveal>
            <img src="/images/casa-ve-hero.jpg" alt="Comedor de Casa V+E en Madrid" loading="lazy" data-image-inner />
          </figure>
        </div>
      </LayoutContainer>
    </section>
  )
}
