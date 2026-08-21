import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatedText } from '../components/AnimatedText'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { LayoutContainer } from '../components/LayoutContainer'
import { projectDetailBySlug, projectDetails } from '../data/projectDetails'
import { useGsapPage } from '../hooks/useGsapPage'

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = projectDetailBySlug[slug]
  const pageRef = useRef<HTMLDivElement>(null)
  useGsapPage(pageRef)

  useEffect(() => {
    if (!project) return
    const title = `${project.title} — Jean Porsche Arquitectura + Interiores`
    const canonical = `https://www.xsche.es/proyectos/${project.slug}/`
    document.title = title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', project.description)
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', project.description)
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute('content', `https://www.xsche.es${project.hero}`)
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical)
  }, [project])

  if (!project) return <Navigate to="/" replace />

  const projectIndex = projectDetails.findIndex((item) => item.slug === project.slug)
  const previous = projectDetails[(projectIndex - 1 + projectDetails.length) % projectDetails.length]
  const next = projectDetails[(projectIndex + 1) % projectDetails.length]

  return (
    <div className={`site project-page project-page--${project.tone}`} ref={pageRef}>
      <Header />
      <main id="contenido">
        <section className="hero project-hero" id="inicio" aria-labelledby="project-title">
          <div className="hero__media" aria-hidden="true">
            <img src={project.hero} alt="" fetchPriority="high" />
          </div>
          <div className="hero__overlay" />
          <LayoutContainer className="project-hero__content">
            <nav className="breadcrumb" aria-label="Migas de pan" data-hero-reveal>
              <Link to="/">Inicio</Link><span aria-hidden="true">/</span><a href="/#proyectos">Proyectos</a><span aria-hidden="true">/</span><span>{project.title}</span>
            </nav>
            <p className="project-hero__meta" data-hero-reveal>{project.category} · {project.location}</p>
            <h1 id="project-title" data-hero-reveal>{project.title}</h1>
          </LayoutContainer>
        </section>

        <section className="project-overview" aria-labelledby="project-statement-title">
          <LayoutContainer className="project-overview__grid">
            <div className="project-overview__meta" data-reveal>
              <span>Tipo</span><strong>{project.category}</strong>
              <span>Localización</span><strong>{project.location}</strong>
            </div>
            <AnimatedText id="project-statement-title" text={project.statement} />
            <p data-reveal>{project.description}</p>
          </LayoutContainer>
        </section>

        <section className="project-gallery" aria-label={`Galería de ${project.title}`}>
          <LayoutContainer className="project-gallery__grid">
            {project.gallery.map((item, index) => (
              <figure className={`project-gallery__item project-gallery__item--${index + 1}`} key={item.image} data-image-reveal data-reveal>
                <img src={item.image} alt={item.alt} loading={index < 2 ? 'eager' : 'lazy'} data-image-inner />
                <figcaption>{String(index + 1).padStart(2, '0')} / {String(project.gallery.length).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </LayoutContainer>
        </section>

        {project.quote ? (
          <section className="project-quote" aria-label="Concepto del proyecto">
            <LayoutContainer>
              <blockquote data-reveal>“{project.quote}”</blockquote>
            </LayoutContainer>
          </section>
        ) : null}

        <nav className="project-navigation" aria-label="Navegación entre proyectos">
          <Link to={`/proyectos/${previous.slug}/`}>
            <small>← Proyecto anterior</small><span>{previous.title}</span>
          </Link>
          <Link to={`/proyectos/${next.slug}/`}>
            <small>Proyecto siguiente →</small><span>{next.title}</span>
          </Link>
        </nav>

        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
