import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { projectDetailBySlug } from '../data/projectDetails'
import { projects } from '../data/site'
import { LayoutContainer } from './LayoutContainer'
import { ProjectCard } from './ProjectCard'
import { SectionTitle } from './SectionTitle'

const projectsWithGalleries = projects.map((project) => {
  const slug = project.href.split('/').filter(Boolean).at(-1) ?? ''
  const detail = projectDetailBySlug[slug]
  const gallery = detail
    ? [{ image: detail.hero, alt: `Vista principal de ${detail.title}` }, ...detail.gallery]
    : [{ image: project.image, alt: project.alt }]

  return { project, gallery }
})

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<(typeof projectsWithGalleries)[number] | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [previewVisible, setPreviewVisible] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const pointerPosition = useRef({ x: 0, y: 0 })
  const pointerFrame = useRef<number | null>(null)
  const previewTimer = useRef<number | null>(null)
  const activeImageRef = useRef(0)

  useEffect(() => () => {
    if (pointerFrame.current !== null) window.cancelAnimationFrame(pointerFrame.current)
    if (previewTimer.current !== null) window.clearTimeout(previewTimer.current)
  }, [])

  const movePreview = (x: number, y: number) => {
    pointerPosition.current = { x, y }
    if (pointerFrame.current !== null) return

    pointerFrame.current = window.requestAnimationFrame(() => {
      const preview = previewRef.current
      if (preview) {
        const bounds = preview.getBoundingClientRect()
        const safeX = Math.min(window.innerWidth - bounds.width / 2 - 16, Math.max(bounds.width / 2 + 16, pointerPosition.current.x))
        const safeY = Math.min(window.innerHeight - bounds.height / 2 - 16, Math.max(bounds.height / 2 + 16, pointerPosition.current.y))
        preview.style.transform = `translate3d(${safeX - bounds.width / 2}px, ${safeY - bounds.height / 2}px, 0)`
      }
      pointerFrame.current = null
    })
  }

  const updateGallery = (
    item: (typeof projectsWithGalleries)[number],
    event: PointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const progress = Math.min(0.999, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const imageIndex = Math.floor(progress * item.gallery.length)
    if (imageIndex !== activeImageRef.current) {
      activeImageRef.current = imageIndex
      setActiveImage(imageIndex)
    }
    movePreview(event.clientX, event.clientY)
  }

  const showPreview = (
    item: (typeof projectsWithGalleries)[number],
    event: PointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType === 'touch') return
    if (previewTimer.current !== null) window.clearTimeout(previewTimer.current)
    activeImageRef.current = 0
    setActiveImage(0)
    setActiveProject(item)
    setPreviewVisible(true)
    updateGallery(item, event)
  }

  const hidePreview = () => {
    setPreviewVisible(false)
    if (previewTimer.current !== null) window.clearTimeout(previewTimer.current)
    previewTimer.current = window.setTimeout(() => {
      setActiveProject(null)
      previewTimer.current = null
    }, 440)
  }

  return (
    <section className="projects-section" id="proyectos" aria-labelledby="projects-title">
      <LayoutContainer>
        <div id="projects-title">
          <SectionTitle
            title="Lugares con memoria, color y una voz propia."
            intro="Una selección de proyectos residenciales, restaurantes y espacios creados para Casa Decor."
          />
        </div>
      </LayoutContainer>
      <div className="projects-grid">
        {projectsWithGalleries.map((item) => (
          <ProjectCard
            key={item.project.title}
            project={item.project}
            onPointerEnter={(event) => showPreview(item, event)}
            onPointerMove={(event) => updateGallery(item, event)}
            onPointerLeave={hidePreview}
          />
        ))}
      </div>
      <div
        className={`project-gallery-preview ${previewVisible ? 'project-gallery-preview--visible' : ''}`.trim()}
        ref={previewRef}
        aria-hidden="true"
      >
        <div className="project-gallery-preview__inner">
          {activeProject?.gallery.map((image, index) => (
            <img
              className={index === activeImage ? 'project-gallery-preview__image--active' : ''}
              src={image.image}
              alt=""
              loading="eager"
              decoding="async"
              key={image.image}
            />
          ))}
          <div className="project-gallery-preview__progress">
            {activeProject?.gallery.map((image, index) => (
              <span className={index === activeImage ? 'is-active' : ''} key={image.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
