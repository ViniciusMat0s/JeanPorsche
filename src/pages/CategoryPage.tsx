import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatedText } from '../components/AnimatedText'
import { CategoryProjectCard } from '../components/CategoryProjectCard'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { LayoutContainer } from '../components/LayoutContainer'
import { NotFoundPage } from './NotFoundPage'
import { categories, categoryBySlug } from '../data/categories'
import { useGsapPage } from '../hooks/useGsapPage'

export function CategoryPage() {
  const { slug = '' } = useParams()
  const category = categoryBySlug[slug]
  const pageRef = useRef<HTMLDivElement>(null)
  useGsapPage(pageRef)

  useEffect(() => {
    if (!category) return
    const title = `${category.title} — Jean Porsche Arquitectura + Interiores`
    const description = `${category.description} Proyectos de Jean Porsche Arquitectura + Interiores.`
    document.title = title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', `https://www.xsche.es/${category.slug}/`)
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute('content', `https://www.xsche.es${category.hero}`)
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', `https://www.xsche.es/${category.slug}/`)
  }, [category])

  if (!category) return <NotFoundPage />

  const otherCategories = categories.filter((item) => item.slug !== category.slug)

  return (
    <div className={`site category-page category-page--${category.tone}`} ref={pageRef}>
      <Header />
      <main id="contenido">
        <section className="hero category-hero" id="inicio" aria-labelledby="category-title">
          <div className="hero__media" aria-hidden="true">
            <img src={category.hero} alt="" fetchPriority="high" />
          </div>
          <div className="hero__overlay" />
          <LayoutContainer className="category-hero__content">
            <nav className="breadcrumb" aria-label="Migas de pan" data-hero-reveal>
              <Link to="/">Inicio</Link><span aria-hidden="true">/</span><span>{category.title}</span>
            </nav>
            <p className="category-hero__kicker" data-hero-reveal>{category.kicker}</p>
            <h1 id="category-title" data-hero-reveal>{category.title}</h1>
            <p className="category-hero__intro" data-hero-reveal>{category.description}</p>
          </LayoutContainer>
        </section>

        <section className="category-statement" aria-labelledby="category-statement-title">
          <LayoutContainer className="category-statement__grid">
            <p className="eyebrow" data-reveal>Una mirada propia</p>
            <AnimatedText id="category-statement-title" text={category.statement} />
            <p data-reveal>{category.description}</p>
          </LayoutContainer>
          {category.places ? (
            <div className="category-places" data-marquee aria-label={`Proyectos en ${category.places.join(', ')}`}>
              <div className="category-places__track" data-marquee-track>
                {[...category.places, ...category.places].map((place, index) => (
                  <span key={`${place}-${index}`}>{place}<i aria-hidden="true">✦</i></span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="category-projects" id="proyectos" aria-labelledby="category-projects-title">
          <LayoutContainer>
            <header className="category-projects__header">
              <p className="eyebrow" data-reveal>Proyectos seleccionados</p>
              <AnimatedText id="category-projects-title" text={`Explora ${category.title.toLocaleLowerCase('es')}.`} />
              <p data-reveal>{category.projects.length} espacios del archivo del estudio.</p>
            </header>
            <div className="category-projects__grid">
              {category.projects.map((project, index) => (
                <CategoryProjectCard project={project} index={index} key={project.title} />
              ))}
            </div>
          </LayoutContainer>
        </section>

        <section className="category-navigation" aria-labelledby="category-navigation-title">
          <LayoutContainer>
            <p className="eyebrow" data-reveal>Otros ámbitos</p>
            <h2 id="category-navigation-title" data-reveal>Continúa explorando</h2>
            <div className="category-navigation__links">
              {otherCategories.map((item) => (
                <Link to={`/${item.slug}/`} key={item.slug} data-reveal>
                  <span>{item.title}</span><span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </LayoutContainer>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
