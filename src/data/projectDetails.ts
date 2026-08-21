export type ProjectDetail = {
  slug: string
  title: string
  category: 'Residencial' | 'Restaurante' | 'Casa Decor'
  location: string
  hero: string
  statement: string
  description: string
  quote?: string
  tone: 'sun' | 'coral' | 'blue' | 'cream'
  gallery: Array<{ image: string; alt: string }>
}

const gallery = (slug: string, title: string) => Array.from({ length: 6 }, (_, index) => ({
  image: `/images/project-${slug}-${String(index + 1).padStart(2, '0')}.webp`,
  alt: `Vista ${index + 1} del proyecto ${title}`,
}))

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'casa-ve',
    title: 'Casa V+E',
    category: 'Residencial',
    location: 'Madrid',
    hero: '/images/casa-ve-hero.jpg',
    statement: 'El lujo contemporáneo dialoga con una arquitectura de siempre.',
    description: 'Una intervención en una vivienda del arquitecto Ruiz de la Prada donde geometrías, lacas, textiles, maderas y piezas de distintas épocas construyen una mezcla personal.',
    quote: 'El detalle en las mezclas, aunque a veces parecen imposibles, da los mejores resultados.',
    tone: 'cream',
    gallery: gallery('casa-ve', 'Casa V+E'),
  },
  {
    slug: 'baoli',
    title: 'Baoli',
    category: 'Restaurante',
    location: 'Madrid',
    hero: '/images/baoli.jpg',
    statement: 'Una atmósfera intensa construida desde el color y el reflejo.',
    description: 'El proyecto despliega una secuencia de ambientes donde rojos profundos, acabados dorados, luz puntual y geometrías envolventes definen la experiencia.',
    tone: 'coral',
    gallery: gallery('baoli', 'Baoli'),
  },
  {
    slug: 'casa-bb-menorca',
    title: 'Casa BB',
    category: 'Residencial',
    location: 'Menorca',
    hero: '/images/casa-bb-menorca.jpg',
    statement: 'Una casa entendida como el reflejo vivo de quien la habita.',
    description: 'Arte, cultura, piezas singulares y una relación cercana con el cliente articulan un interior expresivo, conectado con la historia y el color.',
    quote: 'El color siempre es una referencia en nuestros proyectos, símbolo de cultura e historia.',
    tone: 'sun',
    gallery: gallery('casa-bb-menorca', 'Casa BB'),
  },
  {
    slug: 'coque',
    title: 'Restaurante Coque',
    category: 'Restaurante',
    location: 'Madrid',
    hero: '/images/coque.jpg',
    statement: 'Cada sala propone una experiencia distinta dentro de un mismo relato.',
    description: 'Una sucesión de ambientes con identidades cromáticas propias, materiales precisos y una iluminación que acompaña el recorrido gastronómico.',
    tone: 'blue',
    gallery: gallery('coque', 'Restaurante Coque'),
  },
  {
    slug: 'gabinete-visconti',
    title: 'Gabinete Visconti',
    category: 'Casa Decor',
    location: 'Madrid',
    hero: '/images/gabinete-visconti.jpg',
    statement: 'Clasicismo, color y cultura italiana en una escena contemporánea.',
    description: 'El espacio combina arquitectura histórica, azules intensos, geometrías, arte y mobiliario para construir un gabinete de marcada identidad.',
    tone: 'blue',
    gallery: gallery('gabinete-visconti', 'Gabinete Visconti'),
  },
  {
    slug: 'toujours-a-madrid',
    title: 'Toujours à Madrid',
    category: 'Casa Decor',
    location: 'Madrid',
    hero: '/images/toujours-madrid.jpg',
    statement: 'Una cocina que se abre a la conversación, el arte y la memoria.',
    description: 'Verdes profundos, lacas, piedra, piezas decorativas y una cuidada secuencia de perspectivas convierten el espacio funcional en un lugar para permanecer.',
    tone: 'coral',
    gallery: gallery('toujours-a-madrid', 'Toujours à Madrid'),
  },
]

export const projectDetailBySlug = Object.fromEntries(projectDetails.map((project) => [project.slug, project]))
