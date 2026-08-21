import type { Project } from '../data/site'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card project-card--${project.tone}`} data-project-card>
      <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Ver ${project.title}, ${project.location}`}>
        <div className="project-card__media" data-image-reveal>
          <img src={project.image} alt={project.alt} loading="lazy" width="900" height="1120" data-image-inner />
          <span className="project-card__view">Ver proyecto ↗</span>
        </div>
        <div className="project-card__meta">
          <span>0{index + 1}</span>
          <div>
            <h3>{project.title}</h3>
            <p>{project.category} · {project.location}</p>
          </div>
        </div>
      </a>
    </article>
  )
}
