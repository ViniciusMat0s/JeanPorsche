import type { PointerEventHandler } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/site'

type ProjectCardProps = {
  project: Project
  onPointerEnter?: PointerEventHandler<HTMLAnchorElement>
  onPointerMove?: PointerEventHandler<HTMLAnchorElement>
  onPointerLeave?: PointerEventHandler<HTMLAnchorElement>
}

export function ProjectCard({ project, onPointerEnter, onPointerMove, onPointerLeave }: ProjectCardProps) {
  return (
    <article className={`project-card project-card--${project.tone}`} data-project-card>
      <Link
        to={project.href}
        aria-label={`Ver ${project.title}, ${project.location}`}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="project-card__media" data-image-reveal>
          <img src={project.image} alt={project.alt} loading="lazy" width="900" height="1120" data-image-inner />
          <span className="project-card__view">
            Ver proyecto <span aria-hidden="true">↗</span>
          </span>
          <div className="project-card__meta">
            <h3>{project.title}</h3>
            <p>{project.category} · {project.location}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}
