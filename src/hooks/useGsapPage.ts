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
        gsap.set('[data-reveal], [data-word], [data-image-inner]', {
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
            y: 52,
            opacity: 0,
            duration: 1.05,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          })
      })

      gsap.utils.toArray<HTMLElement>('[data-animated-text]').forEach((element) => {
        const words = element.querySelectorAll('[data-word]')
        gsap.from(words, {
            yPercent: 115,
            opacity: 0,
            duration: 0.9,
            stagger: 0.045,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              once: true,
            },
          })
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

      gsap.to('[data-marquee-track]', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-marquee]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((card, index) => {
        gsap.from(card, {
            y: index % 2 === 0 ? 80 : 140,
            opacity: 0,
            duration: 1.15,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true,
            },
          })
      })
    }, root)

    return () => context.revert()
  }, [root])
}
