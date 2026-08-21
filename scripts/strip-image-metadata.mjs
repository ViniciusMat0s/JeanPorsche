import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const imageRoot = path.resolve('public/images')
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function listImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return listImages(entryPath)
    return supportedExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : []
  }))

  return nested.flat()
}

function encode(pipeline, extension) {
  if (extension === '.jpg' || extension === '.jpeg') {
    return pipeline.jpeg({ quality: 90, chromaSubsampling: '4:2:0', mozjpeg: true })
  }
  if (extension === '.png') return pipeline.png({ compressionLevel: 9 })
  return pipeline.webp({ quality: 94, effort: 5 })
}

const images = await listImages(imageRoot)
const cleaned = []

for (const imagePath of images) {
  const before = await sharp(imagePath).metadata()
  if (!before.exif && !before.xmp && !before.iptc) continue

  const extension = path.extname(imagePath).toLowerCase()
  const temporaryPath = path.join(
    path.dirname(imagePath),
    `.${path.basename(imagePath, extension)}.metadata-clean${extension}`,
  )

  try {
    await encode(sharp(imagePath).rotate(), extension).toFile(temporaryPath)
    const after = await sharp(temporaryPath).metadata()

    if (!after.width || !after.height || after.exif || after.xmp || after.iptc) {
      throw new Error(`No se pudo validar la imagen optimizada: ${path.relative(imageRoot, imagePath)}`)
    }

    await fs.rename(temporaryPath, imagePath)
    cleaned.push(path.relative(imageRoot, imagePath))
  } catch (error) {
    await fs.rm(temporaryPath, { force: true })
    throw error
  }
}

console.log(`Metadata removed from ${cleaned.length} of ${images.length} public images.`)
