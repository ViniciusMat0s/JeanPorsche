import { useRef } from 'react'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { GallerySection } from './components/GallerySection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { IntroSection } from './components/IntroSection'
import { ManifestoSection } from './components/ManifestoSection'
import { ProcessSection } from './components/ProcessSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ServicesSection } from './components/ServicesSection'
import { useGsapPage } from './hooks/useGsapPage'

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  useGsapPage(pageRef)

  return (
    <div className="site" ref={pageRef}>
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

export default App
