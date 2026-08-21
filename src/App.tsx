import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CategoryPage } from './pages/CategoryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'

function RouteEffects() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView())
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (location.pathname !== '/') return
    document.title = 'Jean Porsche — Arquitectura + Interiores'
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute(
      'content',
      'Jean Porsche Arquitectura + Interiores. Proyectos residenciales, restaurantes y espacios de autor desde Madrid y Menorca.',
    )
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', 'https://www.xsche.es/')
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', 'Jean Porsche — Arquitectura + Interiores')
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', 'Cuando el estilo tiene nombre propio. Arquitectura e interiores desde Madrid y Menorca.')
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', 'https://www.xsche.es/')
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute('content', 'https://www.xsche.es/images/hero-jean-porsche.jpg')
  }, [location.pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyectos/:slug" element={<ProjectPage />} />
        <Route path="/:slug" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
