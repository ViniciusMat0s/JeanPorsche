import { gallery } from '../data/site'
import { AnimatedText } from './AnimatedText'
import { LayoutContainer } from './LayoutContainer'

export function GallerySection() {
  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <LayoutContainer>
        <header className="gallery-section__header">
          <p className="eyebrow" data-reveal>Atmósferas</p>
          <AnimatedText id="gallery-title" text="El espacio también se recuerda por cómo nos hace sentir." />
        </header>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure className={`gallery-grid__item gallery-grid__item--${index + 1}`} key={item.image} data-image-reveal data-reveal>
              <img src={item.image} alt={item.alt} loading="lazy" data-image-inner />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </LayoutContainer>
    </section>
  )
}
