import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

const sourceHtml = [
  'index.html',
  '404.html',
  'residencial/index.html',
  'restaurantes/index.html',
  'casa-decor/index.html',
  'proyectos/casa-ve/index.html',
  'proyectos/baoli/index.html',
  'proyectos/casa-bb-menorca/index.html',
  'proyectos/coque/index.html',
  'proyectos/gabinete-visconti/index.html',
  'proyectos/toujours-a-madrid/index.html',
]

const headerSource = await fs.readFile(path.join(root, 'public/_headers'), 'utf8')
const requiredHeaders = [
  'Content-Security-Policy:',
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'Permissions-Policy:',
  'X-Frame-Options: DENY',
  'Strict-Transport-Security:',
]

for (const header of requiredHeaders) assert(headerSource.includes(header), `_headers is missing ${header}`)
assert(headerSource.includes("script-src 'self'"), 'CSP must restrict scripts to the same origin')
assert(!/script-src[^;]*(?:'unsafe-inline'|'unsafe-eval')/.test(headerSource), 'CSP must not allow unsafe script execution')
assert(headerSource.includes("frame-ancestors 'none'"), 'CSP must block external framing')
assert(headerSource.includes('frame-src https://maps.google.com https://www.google.com'), 'CSP must restrict the Google Maps frame origins')
assert(headerSource.includes("font-src 'self'"), 'CSP must restrict fonts to the same origin')

const builtHeaders = await fs.readFile(path.join(root, 'dist/_headers'), 'utf8')
assert(builtHeaders === headerSource, 'dist/_headers does not match the versioned source policy')

for (const htmlPath of sourceHtml) {
  const html = await fs.readFile(path.join(root, htmlPath), 'utf8')
  assert(!/fonts\.(?:googleapis|gstatic)\.com/.test(html), `${htmlPath} still loads external fonts`)
}

const fontDirectory = path.join(root, 'public/fonts')
const fontFiles = (await fs.readdir(fontDirectory)).filter((name) => name.endsWith('.woff2'))
assert(fontFiles.length === 3, `Expected 3 local WOFF2 files, found ${fontFiles.length}`)
for (const font of fontFiles) {
  const bytes = await fs.readFile(path.join(fontDirectory, font))
  assert(bytes.toString('ascii', 0, 4) === 'wOF2', `${font} is not a valid WOFF2 resource`)
}

const imageDirectory = path.join(root, 'public/images')
const imageFiles = (await fs.readdir(imageDirectory)).filter((name) => /\.(?:jpe?g|png|webp)$/i.test(name))
for (const image of imageFiles) {
  const metadata = await sharp(path.join(imageDirectory, image)).metadata()
  assert(Boolean(metadata.width && metadata.height), `${image} has invalid dimensions`)
  assert(!metadata.exif && !metadata.xmp && !metadata.iptc, `${image} still contains embedded metadata`)
}

const appSource = await fs.readFile(path.join(root, 'src/App.tsx'), 'utf8')
assert(appSource.includes('document.getElementById(fragmentId)'), 'URL fragments must use getElementById')
assert(!appSource.includes('document.querySelector(location.hash)'), 'Unsafe hash selector is still present')

const contactSource = await fs.readFile(path.join(root, 'src/components/ContactSection.tsx'), 'utf8')
assert(contactSource.includes('maxLength={fieldLimits.name}'), 'Contact name length is not limited')
assert(contactSource.includes('maxLength={fieldLimits.email}'), 'Contact email length is not limited')
assert(contactSource.includes('maxLength={fieldLimits.project}'), 'Contact message length is not limited')
assert(contactSource.includes('referrerPolicy="no-referrer"'), 'Map referrer policy is not restrictive')
assert(contactSource.includes('loading="lazy"'), 'Map must use lazy loading')
assert(contactSource.includes('sandbox="allow-scripts allow-same-origin"'), 'Map sandbox is missing or unexpected')

const viteSource = await fs.readFile(path.join(root, 'vite.config.ts'), 'utf8')
assert(/sourcemap:\s*false/.test(viteSource), 'Production source maps must be explicitly disabled')

const distFiles = await fs.readdir(path.join(root, 'dist'), { recursive: true })
assert(!distFiles.some((file) => file.endsWith('.map')), 'Public source maps were found in dist')

if (failures.length) {
  console.error(`Security validation failed (${failures.length}):\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log(`Security validation passed for ${sourceHtml.length} HTML entries, ${imageFiles.length} images and ${fontFiles.length} local fonts.`)
