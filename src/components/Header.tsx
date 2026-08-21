import { useEffect, useRef, useState } from 'react'
import { navigation } from '../data/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return

    const menu = menuRef.current
    const toggle = toggleRef.current
    const focusable = menu?.querySelectorAll<HTMLElement>('a, button') ?? []
    const focusTimer = window.setTimeout(() => focusable[0]?.focus(), 50)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKeyDown)
      if (menu?.contains(document.activeElement)) toggle?.focus()
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''}`.trim()}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <a className="wordmark" href="/#inicio" aria-label="Jean Porsche, volver al inicio">
        <span>Jean Porsche</span>
        <small>Arquitectura + Interiores</small>
      </a>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>{item.label}</a>
        ))}
        <a className="desktop-nav__social" href="https://www.instagram.com/xsche" target="_blank" rel="noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        ref={toggleRef}
      >
        <span />
        <span />
      </button>

      <div
        className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`.trim()}
        id="mobile-menu"
        aria-hidden={!open}
        ref={menuRef}
      >
        <nav aria-label="Navegación móvil">
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href} onClick={closeMenu} tabIndex={open ? 0 : -1}>
              <small>0{index + 1}</small>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mobile-menu__meta">
          <a href="mailto:info@xsche.es" tabIndex={open ? 0 : -1}>info@xsche.es</a>
          <a href="https://www.instagram.com/xsche" target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Instagram ↗</a>
          <span>Madrid · Menorca</span>
        </div>
      </div>
    </header>
  )
}
