import { navigation } from '../data/site'
import { LayoutContainer } from './LayoutContainer'

export function Footer() {
  return (
    <footer className="site-footer">
      <LayoutContainer>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <span>Jean Porsche</span>
          </div>
        </div>
        <div className="site-footer__grid">
          <nav aria-label="Navegación del pie">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <div>
            <p>Escríbenos</p>
            <a href="mailto:info@xsche.es">info@xsche.es</a>
            <a href="tel:+34919905285">+34 91 990 52 85</a>
          </div>
          <div>
            <p>Síguenos</p>
            <a
              className="site-footer__social-link"
              href="https://www.instagram.com/xsche"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Jean Porsche"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Jean Porsche</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </LayoutContainer>
    </footer>
  )
}
