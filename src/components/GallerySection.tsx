import { gallery } from '../data/site'
import { LayoutContainer } from './LayoutContainer'

export function GallerySection() {
  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <LayoutContainer>
        <header className="gallery-section__header">
          <p className="eyebrow" data-reveal>Atmósferas</p>
          <h2 id="gallery-title" data-animated-text>
            {['El', 'espacio', 'también', 'se', 'recuerda', 'por', 'cómo', 'nos', 'hace', 'sentir.'].map((word) => (
              <span className="word-mask" key={word}><span data-word>{word}&nbsp;</span></span>
            ))}
          </h2>
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
