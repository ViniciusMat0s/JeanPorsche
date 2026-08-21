import { type FormEvent, type PointerEvent, useEffect, useRef, useState } from 'react'
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
  const [activeStudio, setActiveStudio] = useState<(typeof studios)[number] | null>(null)
  const mapPreviewRef = useRef<HTMLDivElement>(null)
  const pointerPosition = useRef({ x: 0, y: 0 })
  const pointerFrame = useRef<number | null>(null)

  useEffect(() => () => {
    if (pointerFrame.current !== null) window.cancelAnimationFrame(pointerFrame.current)
  }, [])

  const moveMapPreview = (x: number, y: number) => {
    pointerPosition.current = { x, y }
    if (pointerFrame.current !== null) return

    pointerFrame.current = window.requestAnimationFrame(() => {
      const preview = mapPreviewRef.current
      if (preview) {
        const size = preview.offsetWidth
        const safeEdge = size / 2 + 16
        const safeX = Math.min(window.innerWidth - safeEdge, Math.max(safeEdge, pointerPosition.current.x))
        const safeY = Math.min(window.innerHeight - safeEdge, Math.max(safeEdge, pointerPosition.current.y))
        preview.style.transform = `translate3d(${safeX - size / 2}px, ${safeY - size / 2}px, 0)`
      }
      pointerFrame.current = null
    })
  }

  const showMapPreview = (studio: (typeof studios)[number], event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch') return
    setActiveStudio(studio)
    moveMapPreview(event.clientX, event.clientY)
  }

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
                <a
                  className="contact-address"
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir la ubicación de ${studio.city} en Google Maps`}
                  key={studio.city}
                  onPointerEnter={(event) => showMapPreview(studio, event)}
                  onPointerMove={(event) => moveMapPreview(event.clientX, event.clientY)}
                  onPointerLeave={() => setActiveStudio(null)}
                  onFocus={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect()
                    setActiveStudio(studio)
                    moveMapPreview(bounds.right, bounds.top + bounds.height / 2)
                  }}
                  onBlur={() => setActiveStudio(null)}
                >
                  <span className="contact-address__index" aria-hidden="true">0{index + 1}</span>
                  <address>
                    <strong>{studio.city}</strong>
                    <span>{studio.lines[0]}<br />{studio.lines[1]}</span>
                  </address>
                  <span className="contact-address__arrow" aria-hidden="true">↗</span>
                </a>
              )
            })}
          </div>
          <div
            className={`contact-map-preview ${activeStudio ? 'contact-map-preview--visible' : ''}`.trim()}
            ref={mapPreviewRef}
            aria-hidden="true"
          >
            <div className="contact-map-preview__inner">
              {activeStudio ? (
                <iframe
                  title={`Vista previa del mapa de ${activeStudio.city}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeStudio.query)}&z=16&output=embed`}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                />
              ) : null}
            </div>
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
