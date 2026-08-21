import { CTA } from './CTA'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <img src="/images/hero-jean-porsche.jpg" alt="" fetchPriority="high" />
      </div>
      <div className="hero__overlay" />
      <div className="hero__content container">
        <h1 id="hero-title" data-hero-reveal>Cuando el estilo<br />tiene nombre propio</h1>
        <div className="hero__bottom" data-hero-reveal>
          <CTA className="hero__cta-liquid" href="#proyectos" inverse>Descubrir proyectos</CTA>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
