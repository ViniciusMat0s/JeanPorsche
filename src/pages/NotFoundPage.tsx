import { useRef } from 'react'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { LayoutContainer } from '../components/LayoutContainer'
import { useGsapPage } from '../hooks/useGsapPage'
import { usePageMetadata } from '../lib/seo'

export function NotFoundPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useGsapPage(pageRef)
  usePageMetadata({
    title: 'Página no encontrada | Jean Porsche',
    description: 'La página solicitada no existe. Vuelve al inicio de Jean Porsche Arquitectura + Interiores.',
    robots: 'noindex, follow',
    themeColor: '#2D2D2A',
    structuredData: null,
  })

  return (
    <div className="site not-found-page" ref={pageRef}>
      <Header />
      <main id="contenido">
        <section className="hero not-found-hero" id="inicio" aria-labelledby="not-found-title">
          <div className="hero__media" aria-hidden="true">
            <img src="/images/hero-jean-porsche.jpg" alt="" />
          </div>
          <div className="not-found-hero__wash" />
          <span className="not-found-hero__code" aria-hidden="true">404</span>
          <LayoutContainer className="not-found-hero__content">
            <p className="not-found-hero__eyebrow" data-hero-reveal>Error 404</p>
            <h1 id="not-found-title" data-hero-reveal>Este espacio aún no existe.</h1>
            <p className="not-found-hero__intro" data-hero-reveal>
              La dirección puede haber cambiado o el enlace ya no está disponible. Puedes volver al inicio o continuar explorando nuestros proyectos.
            </p>
            <div className="not-found-hero__actions" data-hero-reveal>
              <CTA href="/" inverse>Volver al inicio</CTA>
              <a className="arrow-link arrow-link--inverse" href="/#proyectos">Explorar proyectos <span aria-hidden="true">→</span></a>
            </div>
          </LayoutContainer>
        </section>
      </main>
      <Footer />
    </div>
  )
}
