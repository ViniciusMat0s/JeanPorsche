import type { CategoryProject } from '../data/categories'

export function CategoryProjectCard({ project, index }: { project: CategoryProject; index: number }) {
  return (
    <article className="category-project" data-project-card>
      <figure className="category-project__media" data-image-reveal>
        <img src={project.image} alt={project.alt} loading="lazy" data-image-inner />
      </figure>
      <div className="category-project__meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h3>{project.title}</h3>
      </div>
    </article>
  )
}
