import type { Project } from '../data/site'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.tone}`} data-project-card>
      <a href={project.href} aria-label={`Ver ${project.title}, ${project.location}`}>
        <div className="project-card__media" data-image-reveal>
          <img src={project.image} alt={project.alt} loading="lazy" width="900" height="1120" data-image-inner />
          <span className="project-card__view">Ver proyecto ↗</span>
          <div className="project-card__meta">
            <h3>{project.title}</h3>
            <p>{project.category} · {project.location}</p>
          </div>
        </div>
      </a>
    </article>
  )
}
