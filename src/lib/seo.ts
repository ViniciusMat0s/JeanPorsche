import { useEffect } from 'react'
import type { Category } from '../data/categories'
import type { ProjectDetail } from '../data/projectDetails'

export const SITE_URL = 'https://www.xsche.es'
export const SITE_NAME = 'Jean Porsche Arquitectura + Interiores'
export const HOME_TITLE = 'Jean Porsche | Arquitectura e Interiorismo en Madrid y Menorca'
export const HOME_DESCRIPTION = 'Estudio de arquitectura e interiorismo de Jean Porsche. Proyectos residenciales, restaurantes y espacios de autor en Madrid, Menorca y otros destinos.'

type JsonLd = Record<string, unknown>

type PageMetadata = {
  title: string
  description: string
  canonicalPath?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  robots?: string
  themeColor?: string
  structuredData?: JsonLd | null
}

const absoluteUrl = (path: string) => path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

const organizationReference = { '@id': `${SITE_URL}/#organization` }
const websiteReference = { '@id': `${SITE_URL}/#website` }
const themeColors = {
  sun: '#F0CD5F',
  coral: '#DA5B37',
  blue: '#4277B0',
  cream: '#EAE6DD',
} as const

export const homeStructuredData: JsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
        width: 1500,
        height: 1500,
      },
      image: `${SITE_URL}/images/hero-jean-porsche.jpg`,
      email: 'info@xsche.es',
      telephone: '+34647186603',
      sameAs: ['https://www.instagram.com/xsche'],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Calle de Castelló 59',
          postalCode: '28001',
          addressLocality: 'Madrid',
          addressCountry: 'ES',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Camí des Castell 57',
          postalCode: '07702',
          addressLocality: 'Mahón',
          addressRegion: 'Menorca, Islas Baleares',
          addressCountry: 'ES',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'es-ES',
      publisher: organizationReference,
    },
  ],
}

export function categoryMetadata(category: Category): PageMetadata {
  const canonicalPath = `/${category.slug}/`
  const title = `${category.title} | Jean Porsche Arquitectura e Interiorismo`
  const descriptions: Record<Category['slug'], string> = {
    residencial: 'Proyectos residenciales de Jean Porsche: viviendas con identidad, color, arte y una mirada profundamente personal en Madrid, Menorca y otros destinos.',
    restaurantes: 'Interiorismo para restaurantes de Jean Porsche: espacios donde arquitectura, ambiente, materialidad y experiencia dialogan con identidad propia.',
    'casa-decor': 'Espacios de Jean Porsche para Casa Decor: intervenciones que exploran color, arte, materiales, geometría y nuevas formas de habitar.',
  }
  const description = descriptions[category.slug]
  const canonical = absoluteUrl(canonicalPath)
  const image = absoluteUrl(category.hero)
  const imageAlts: Record<Category['slug'], string> = {
    residencial: 'Residencial: viviendas con identidad',
    restaurantes: 'Restaurantes: espacios para compartir',
    'casa-decor': 'Casa Decor: laboratorio creativo de Jean Porsche',
  }

  return {
    title,
    description,
    canonicalPath,
    image: category.hero,
    imageAlt: imageAlts[category.slug],
    themeColor: themeColors[category.tone],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          inLanguage: 'es-ES',
          isPartOf: websiteReference,
          about: organizationReference,
          primaryImageOfPage: { '@type': 'ImageObject', url: image },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: category.title, item: canonical },
          ],
        },
      ],
    },
  }
}

export function projectMetadata(project: ProjectDetail): PageMetadata {
  const projectType = project.category === 'Residencial'
    ? 'Proyecto residencial'
    : project.category === 'Restaurante'
      ? 'Interiorismo para restaurantes'
      : 'Proyecto Casa Decor'
  const projectTypeSentence = project.category === 'Casa Decor' ? 'proyecto Casa Decor' : projectType.toLocaleLowerCase('es')
  const title = `${project.title} | ${projectType} en ${project.location} | Jean Porsche`
  const description = `${project.title}, ${projectTypeSentence} en ${project.location} de Jean Porsche. ${project.statement}`
  const canonicalPath = `/proyectos/${project.slug}/`
  const canonical = absoluteUrl(canonicalPath)
  const image = absoluteUrl(project.hero)
  const creativeWorkId = `${canonical}#project`

  return {
    title,
    description,
    canonicalPath,
    image: project.hero,
    imageAlt: `${project.title}, ${projectTypeSentence} en ${project.location}`,
    type: 'article',
    themeColor: themeColors[project.tone],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          inLanguage: 'es-ES',
          isPartOf: websiteReference,
          about: organizationReference,
          primaryImageOfPage: { '@type': 'ImageObject', url: image },
          mainEntity: { '@id': creativeWorkId },
        },
        {
          '@type': 'CreativeWork',
          '@id': creativeWorkId,
          name: project.title,
          description: project.description,
          image,
          creator: organizationReference,
          genre: project.category,
          inLanguage: 'es-ES',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: project.title, item: canonical },
          ],
        },
      ],
    },
  }
}

function setMeta(attribute: 'name' | 'property', key: string, value?: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!value) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export function usePageMetadata(metadata: PageMetadata | null) {
  const structuredDataJson = metadata?.structuredData ? JSON.stringify(metadata.structuredData) : ''

  useEffect(() => {
    if (!metadata) return

    const canonical = metadata.canonicalPath ? absoluteUrl(metadata.canonicalPath) : undefined
    const image = metadata.image ? absoluteUrl(metadata.image) : undefined

    document.title = metadata.title
    setMeta('name', 'description', metadata.description)
    setMeta('name', 'robots', metadata.robots ?? 'index, follow, max-image-preview:large')
    setMeta('name', 'author', 'Jean Porsche')
    setMeta('name', 'theme-color', metadata.themeColor ?? '#F0CD5F')
    setMeta('property', 'og:type', metadata.type ?? 'website')
    setMeta('property', 'og:locale', 'es_ES')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', metadata.title)
    setMeta('property', 'og:description', metadata.description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:alt', metadata.imageAlt)
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : undefined)
    setMeta('name', 'twitter:title', metadata.title)
    setMeta('name', 'twitter:description', metadata.description)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:image:alt', metadata.imageAlt)

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.href = canonical
    } else {
      canonicalLink?.remove()
    }

    let jsonLd = document.querySelector<HTMLScriptElement>('script[data-seo-structured-data]')
    if (structuredDataJson) {
      if (!jsonLd) {
        jsonLd = document.createElement('script')
        jsonLd.type = 'application/ld+json'
        jsonLd.dataset.seoStructuredData = 'true'
        document.head.appendChild(jsonLd)
      }
      jsonLd.textContent = structuredDataJson
    } else {
      jsonLd?.remove()
    }
  }, [metadata, structuredDataJson])
}
