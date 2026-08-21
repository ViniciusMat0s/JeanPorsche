import { type FormEvent, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import { LayoutContainer } from './LayoutContainer'

export function ContactSection() {
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('nombre') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const project = String(form.get('proyecto') ?? '').trim()
    const body = [`Nombre: ${name}`, `Email: ${email}`, '', project].join('\n')
    setMessage('Se abrirá tu aplicación de correo para completar el envío.')
    window.location.href = `mailto:info@xsche.es?subject=${encodeURIComponent(`Nueva consulta de ${name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <LayoutContainer className="contact-section__grid">
        <div className="contact-section__copy">
          <p className="eyebrow" data-reveal>Contacto</p>
          <AnimatedText id="contact-title" text="¿Imaginamos juntos tu próximo espacio?" />
          <p data-reveal>Cuéntanos el punto de partida. El estudio responderá directamente a tu consulta.</p>
          <div className="contact-addresses" data-reveal>
            <address><strong>Madrid</strong><span>Calle de Castelló 59<br />28001 Madrid</span></address>
            <address><strong>Menorca</strong><span>Camí des Castell 57<br />07702 Mahón</span></address>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} data-reveal>
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
          <button className="submit-button" type="submit"><span>Preparar correo</span><span aria-hidden="true">→</span></button>
          <p className="form-note">Este formulario no almacena datos: prepara un correo en tu dispositivo.</p>
          <p className="sr-only" aria-live="polite">{message}</p>
        </form>
      </LayoutContainer>
    </section>
  )
}
