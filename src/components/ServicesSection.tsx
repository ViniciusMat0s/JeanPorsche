import { services } from '../data/site'
import { LayoutContainer } from './LayoutContainer'
import { SectionTitle } from './SectionTitle'
import { ServiceCard } from './ServiceCard'

export function ServicesSection() {
  return (
    <section className="services-section" aria-labelledby="services-title">
      <LayoutContainer>
        <div id="services-title">
          <SectionTitle
            eyebrow="Ámbitos de trabajo"
            title="Cada proyecto pide una respuesta distinta."
            intro="Una mirada común aplicada a escalas y contextos diferentes."
          />
        </div>
        <div className="services-list">
          {services.map((service) => <ServiceCard key={service.index} service={service} />)}
        </div>
      </LayoutContainer>
    </section>
  )
}
