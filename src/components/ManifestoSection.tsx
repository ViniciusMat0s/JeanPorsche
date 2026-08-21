export function ManifestoSection() {
  return (
    <>
      <section className="manifesto" aria-label="Manifiesto del estudio">
        <div className="manifesto__media" data-image-reveal aria-hidden="true">
          <img src="/images/casa-ve-salon.jpg" alt="" loading="lazy" data-image-inner />
        </div>
        <div className="manifesto__shade" />
        <blockquote data-reveal>
          <span>“</span>
          El detalle en las mezclas, que aunque a veces parecen imposibles, da los mejores resultados.
        </blockquote>
      </section>
      <div className="marquee" data-marquee aria-hidden="true">
        <div className="marquee__track" data-marquee-track>
          <span>Arquitectura + Interiores</span><i>✦</i><span>Madrid + Menorca</span><i>✦</i>
          <span>Arquitectura + Interiores</span><i>✦</i><span>Madrid + Menorca</span>
        </div>
      </div>
    </>
  )
}
