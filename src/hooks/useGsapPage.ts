import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapPage(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-reveal], [data-letter], [data-image-inner]', {
          clearProps: 'all',
          opacity: 1,
          transform: 'none',
        })
        return
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTimeline
        .fromTo('.hero__media img', { scale: 1.12 }, { scale: 1, duration: 1.8 })
        .fromTo('[data-hero-reveal]', { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, '-=1.1')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
            y: 20,
            opacity: 0.68,
            duration: 1.35,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          })
      })

      gsap.utils.toArray<HTMLElement>('[data-animated-text]').forEach((element) => {
        const letters = element.querySelectorAll('[data-letter]')
        gsap.fromTo(
          letters,
          {
            x: (index) => 48 + Math.min(index * 1.8, 90),
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            stagger: 0.035,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              end: 'top 38%',
              scrub: 0.65,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach((element) => {
        const image = element.querySelector<HTMLElement>('[data-image-inner]')
        if (!image) return
        gsap.fromTo(
          image,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })

      const marquee = root.current?.querySelector('[data-marquee]')
      const marqueeTrack = root.current?.querySelector('[data-marquee-track]')
      if (marquee && marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: marquee,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((card, index) => {
        gsap.from(card, {
            y: index % 2 === 0 ? 26 : 38,
            opacity: 0.72,
            duration: 1.45,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: 'top 89%',
              once: true,
            },
          })
      })
    }, root)

    return () => context.revert()
  }, [root])
}
