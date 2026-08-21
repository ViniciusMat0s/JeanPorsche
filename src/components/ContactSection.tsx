import { type FormEvent, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { LayoutContainer } from './LayoutContainer'

type ContactChannel = 'email' | 'whatsapp'

const studios = [
  {
    city: 'Madrid',
    lines: ['Calle de Castelló 59', '28001 Madrid'],
    query: 'Calle de Castelló 59, 28001 Madrid, España',
  },
  {
    city: 'Menorca',
    lines: ['Camí des Castell 57', '07702 Mahón'],
    query: 'Camí des Castell 57, 07702 Maó, Illes Balears, España',
  },
]

export function ContactSection() {
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState<ContactChannel>('email')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('nombre') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const project = String(form.get('proyecto') ?? '').trim()
    const body = [
      'Hola, equipo de Jean Porsche.',
      '',
      `Mi nombre es ${name}.`,
      `Mi email es ${email}.`,
      '',
      'Quisiera consultar sobre este proyecto:',
      project,
    ].join('\n')

    if (channel === 'whatsapp') {
      setMessage('Se abrirá WhatsApp con tu mensaje preparado.')
      const whatsappLink = document.createElement('a')
      whatsappLink.href = `https://wa.me/34919905285?text=${encodeURIComponent(body)}`
      whatsappLink.target = '_blank'
      whatsappLink.rel = 'noopener noreferrer'
      whatsappLink.click()
      return
    }

    setMessage('Se abrirá tu aplicación de correo con el mensaje preparado.')
    window.location.href = `mailto:info@xsche.es?subject=${encodeURIComponent(`Nueva consulta de ${name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <LayoutContainer className="contact-section__grid">
        <div className="contact-section__copy">
          <AnimatedText id="contact-title" text="¿Imaginamos juntos tu próximo espacio?" />
          <p data-reveal>Cuéntanos el punto de partida. El estudio responderá directamente a tu consulta.</p>
          <div className="contact-locations" data-reveal>
            {studios.map((studio, index) => {
              const query = encodeURIComponent(studio.query)
              const mapLink = `https://www.google.com/maps/search/?api=1&query=${query}`

              return (
                <article className="studio-map" key={studio.city}>
                  <div className="studio-map__viewport">
                    <iframe
                      title={`Mapa del estudio de Jean Porsche en ${studio.city}`}
                      src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      tabIndex={-1}
                    />
                    <span className="studio-map__wash" aria-hidden="true" />
                    <a
                      className="studio-map__surface"
                      href={mapLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Abrir el mapa del estudio de ${studio.city}`}
                    />
                    <div className="studio-map__details">
                      <span className="studio-map__index" aria-hidden="true">0{index + 1}</span>
                      <address>
                        <strong>{studio.city}</strong>
                        <span>{studio.lines[0]}<br />{studio.lines[1]}</span>
                      </address>
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Abrir la ubicación de ${studio.city} en Google Maps`}
                      >
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} data-reveal>
          <fieldset className="contact-channel">
            <legend>¿Cómo prefieres contactar?</legend>
            <div className="contact-channel__options">
              <label>
                <input
                  type="radio"
                  name="canal"
                  value="email"
                  checked={channel === 'email'}
                  onChange={() => setChannel('email')}
                />
                <span>Email</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="canal"
                  value="whatsapp"
                  checked={channel === 'whatsapp'}
                  onChange={() => setChannel('whatsapp')}
                />
                <span>WhatsApp</span>
              </label>
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="proyecto">Háblanos de tu proyecto</label>
            <textarea id="proyecto" name="proyecto" rows={4} required />
          </div>
          <button className="submit-button" type="submit">
            <span>{channel === 'whatsapp' ? 'Abrir WhatsApp' : 'Preparar correo'}</span>
            <span aria-hidden="true">→</span>
          </button>
          <p className="form-note">
            Este formulario no almacena datos: prepara {channel === 'whatsapp' ? 'un mensaje en WhatsApp' : 'un correo en tu dispositivo'}.
          </p>
          <p className="sr-only" aria-live="polite">{message}</p>
        </form>
      </LayoutContainer>
    </section>
  )
}
