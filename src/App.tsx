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
      let fragmentId = ''

      try {
        fragmentId = decodeURIComponent(location.hash.slice(1))
      } catch {
        fragmentId = ''
      }

      if (fragmentId) {
        window.requestAnimationFrame(() => document.getElementById(fragmentId)?.scrollIntoView())
      }
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

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
