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
            <a href="https://www.instagram.com/xsche" target="_blank" rel="noreferrer">Instagram ↗</a>
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
