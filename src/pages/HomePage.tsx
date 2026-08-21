import { useRef } from 'react'
import { AboutSection } from '../components/AboutSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { GallerySection } from '../components/GallerySection'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { IntroSection } from '../components/IntroSection'
import { ManifestoSection } from '../components/ManifestoSection'
import { PageLoader } from '../components/PageLoader'
import { ProcessSection } from '../components/ProcessSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { ServicesSection } from '../components/ServicesSection'
import { useGsapPage } from '../hooks/useGsapPage'
import { HOME_DESCRIPTION, HOME_TITLE, homeStructuredData, usePageMetadata } from '../lib/seo'

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useGsapPage(pageRef)
  usePageMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonicalPath: '/',
    image: '/images/hero-jean-porsche.jpg',
    imageAlt: 'Interior diseñado por Jean Porsche con mobiliario, arte y color',
    structuredData: homeStructuredData,
  })

  return (
    <div className="site" ref={pageRef}>
      <PageLoader />
      <Header />
      <main id="contenido">
        <Hero />
        <IntroSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <ManifestoSection />
        <ProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
