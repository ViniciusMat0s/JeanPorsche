import { projects } from '../data/site'
import { LayoutContainer } from './LayoutContainer'
import { ProjectCard } from './ProjectCard'
import { SectionTitle } from './SectionTitle'

export function ProjectsSection() {
  return (
    <section className="projects-section" id="proyectos" aria-labelledby="projects-title">
      <LayoutContainer>
        <div id="projects-title">
          <SectionTitle
            eyebrow="Proyectos seleccionados"
            title="Lugares con memoria, color y una voz propia."
            intro="Una selección de proyectos residenciales, restaurantes y espacios creados para Casa Decor."
          />
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </LayoutContainer>
    </section>
  )
}
