import { useEffect, useState } from 'react'

type LoaderPhase = 'loading' | 'leaving' | 'hidden'

export function PageLoader() {
  const [phase, setPhase] = useState<LoaderPhase>('loading')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minimumDuration = reducedMotion ? 180 : 1650
    const exitDuration = reducedMotion ? 50 : 1100
    const startedAt = performance.now()
    let exitTimer = 0
    let hideTimer = 0

    document.body.classList.add('page-loading')

    const beginExit = () => {
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt))
      exitTimer = window.setTimeout(() => {
        setPhase('leaving')
        document.body.classList.remove('page-loading')
        hideTimer = window.setTimeout(() => setPhase('hidden'), exitDuration)
      }, remaining)
    }

    if (document.readyState === 'complete') beginExit()
    else window.addEventListener('load', beginExit, { once: true })

    return () => {
      window.removeEventListener('load', beginExit)
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
      document.body.classList.remove('page-loading')
    }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div className={`page-loader ${phase === 'leaving' ? 'page-loader--leaving' : ''}`} role="status" aria-live="polite">
      <div className="page-loader__brand" aria-hidden="true">
        <span className="page-loader__logo page-loader__logo--ghost">
          <img src="/images/logo.png" alt="" />
        </span>
        <span className="page-loader__logo page-loader__logo--fill">
          <img src="/images/logo.png" alt="" />
        </span>
        <span className="page-loader__liquid-edge" />
      </div>
      <span className="sr-only">Cargando Jean Porsche Arquitectura + Interiores</span>
    </div>
  )
}
