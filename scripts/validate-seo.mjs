import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const siteUrl = 'https://www.xsche.es'
const routes = [
  { file: 'index.html', url: `${siteUrl}/` },
  { file: 'residencial/index.html', url: `${siteUrl}/residencial/` },
  { file: 'restaurantes/index.html', url: `${siteUrl}/restaurantes/` },
  { file: 'casa-decor/index.html', url: `${siteUrl}/casa-decor/` },
  { file: 'proyectos/casa-ve/index.html', url: `${siteUrl}/proyectos/casa-ve/` },
  { file: 'proyectos/baoli/index.html', url: `${siteUrl}/proyectos/baoli/` },
  { file: 'proyectos/casa-bb-menorca/index.html', url: `${siteUrl}/proyectos/casa-bb-menorca/` },
  { file: 'proyectos/coque/index.html', url: `${siteUrl}/proyectos/coque/` },
  { file: 'proyectos/gabinete-visconti/index.html', url: `${siteUrl}/proyectos/gabinete-visconti/` },
  { file: 'proyectos/toujours-a-madrid/index.html', url: `${siteUrl}/proyectos/toujours-a-madrid/` },
]

const errors = []
const assert = (condition, message) => { if (!condition) errors.push(message) }
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const meta = (html, attribute, key) => html.match(new RegExp(`<meta[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i'))?.[1]
const canonical = (html) => html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
const title = (html) => html.match(/<title>([^<]+)<\/title>/i)?.[1].trim()
const count = (html, expression) => [...html.matchAll(expression)].length

assert(fs.existsSync(dist), 'dist/ no existe; ejecuta npm run build antes de check:seo')

for (const route of routes) {
  const filePath = path.join(dist, route.file)
  assert(fs.existsSync(filePath), `${route.file}: archivo generado ausente`)
  if (!fs.existsSync(filePath)) continue

  const html = fs.readFileSync(filePath, 'utf8')
  const pageTitle = title(html)
  const description = meta(html, 'name', 'description')
  const ogImage = meta(html, 'property', 'og:image')

  assert(/<html[^>]*lang=["']es["']/i.test(html), `${route.file}: lang="es" ausente`)
  assert(count(html, /<title>/gi) === 1, `${route.file}: debe existir un único title`)
  assert(Boolean(pageTitle) && pageTitle.length >= 25 && pageTitle.length <= 80, `${route.file}: title ausente o poco claro (${pageTitle?.length ?? 0} caracteres)`)
  assert(Boolean(description) && description.length >= 90 && description.length <= 180, `${route.file}: description ausente o fuera del rango útil (${description?.length ?? 0} caracteres)`)
  assert(meta(html, 'name', 'robots')?.startsWith('index, follow'), `${route.file}: robots index/follow incorrecto`)
  assert(meta(html, 'name', 'author') === 'Jean Porsche', `${route.file}: author ausente`)
  assert(canonical(html) === route.url, `${route.file}: canonical incorrecto`)
  assert(meta(html, 'property', 'og:url') === route.url, `${route.file}: og:url incorrecto`)
  assert(meta(html, 'property', 'og:title') === pageTitle, `${route.file}: og:title no coincide con title`)
  assert(meta(html, 'property', 'og:description') === description, `${route.file}: og:description no coincide con description`)
  assert(meta(html, 'property', 'og:site_name') === 'Jean Porsche Arquitectura + Interiores', `${route.file}: og:site_name ausente`)
  assert(Boolean(ogImage), `${route.file}: og:image ausente`)
  assert(Boolean(meta(html, 'property', 'og:image:alt')), `${route.file}: og:image:alt ausente`)
  assert(meta(html, 'name', 'twitter:card') === 'summary_large_image', `${route.file}: twitter:card incorrecto`)
  assert(meta(html, 'name', 'twitter:title') === pageTitle, `${route.file}: twitter:title no coincide con title`)
  assert(meta(html, 'name', 'twitter:description') === description, `${route.file}: twitter:description no coincide con description`)
  assert(meta(html, 'name', 'twitter:image') === ogImage, `${route.file}: twitter:image no coincide con og:image`)
  assert(Boolean(meta(html, 'name', 'twitter:image:alt')), `${route.file}: twitter:image:alt ausente`)
  assert(/<link[^>]*rel=["']icon["']/i.test(html), `${route.file}: favicon ausente`)
  assert(/<link[^>]*rel=["']apple-touch-icon["']/i.test(html), `${route.file}: apple-touch-icon ausente`)

  if (ogImage?.startsWith(siteUrl)) {
    const imagePath = new URL(ogImage).pathname.replace(/^\//, '')
    assert(fs.existsSync(path.join(dist, imagePath)), `${route.file}: og:image no existe en dist (${imagePath})`)
  }

  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  assert(jsonLdBlocks.length === 1, `${route.file}: debe existir un único bloque JSON-LD`)
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1])
      assert(parsed['@context'] === 'https://schema.org', `${route.file}: @context de JSON-LD incorrecto`)
    } catch (error) {
      errors.push(`${route.file}: JSON-LD inválido (${error.message})`)
    }
  }
}

const notFoundPath = path.join(dist, '404.html')
if (fs.existsSync(notFoundPath)) {
  const html = fs.readFileSync(notFoundPath, 'utf8')
  assert(meta(html, 'name', 'robots') === 'noindex, follow', '404.html: debe usar noindex, follow')
  assert(!canonical(html), '404.html: no debe declarar canonical')
}

const sitemapPath = path.join(dist, 'sitemap.xml')
assert(fs.existsSync(sitemapPath), 'sitemap.xml ausente en dist')
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8')
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  for (const route of routes) assert(sitemapUrls.includes(route.url), `sitemap.xml: falta ${route.url}`)
  assert(new Set(sitemapUrls).size === sitemapUrls.length, 'sitemap.xml: contiene URLs duplicadas')
}

const robotsPath = path.join(dist, 'robots.txt')
assert(fs.existsSync(robotsPath), 'robots.txt ausente en dist')
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8')
  assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots.txt: referencia de sitemap incorrecta')
}

if (errors.length) {
  console.error(`SEO validation failed (${errors.length}):\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`SEO validation passed for ${routes.length} indexable routes and 404.html.`)
