import type { Service } from '../data/site'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <a className="service-card" href={service.href} data-reveal>
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
      <span className="service-card__arrow" aria-hidden="true">→</span>
    </a>
  )
}
