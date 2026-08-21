export type Project = {
  title: string
  location: string
  category: string
  image: string
  alt: string
  href: string
  tone: 'sun' | 'coral' | 'blue' | 'cream'
}

export type Service = {
  index: string
  title: string
  description: string
  href: string
}

export const navigation = [
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Estudio', href: '/#estudio' },
  { label: 'Enfoque', href: '/#enfoque' },
  { label: 'Contacto', href: '/#contacto' },
]

export const services: Service[] = [
  {
    index: '01',
    title: 'Residencial',
    description: 'Viviendas e interiores con identidad propia en Madrid, Menorca y otros destinos.',
    href: '/residencial/',
  },
  {
    index: '02',
    title: 'Restaurantes',
    description: 'Espacios para la hospitalidad donde arquitectura, ambiente y experiencia dialogan.',
    href: '/restaurantes/',
  },
  {
    index: '03',
    title: 'Casa Decor',
    description: 'Espacios especiales que exploran color, materiales, arte y nuevas formas de habitar.',
    href: '/casa-decor/',
  },
]

export const principles = [
  {
    index: '01',
    title: 'El cliente',
    text: 'Escuchar antes de proyectar. Cada espacio comienza en una conversación y en una forma de vivir.',
  },
  {
    index: '02',
    title: 'El espacio',
    text: 'Leer lo que ya existe para descubrir su carácter, sus posibilidades y su propia historia.',
  },
  {
    index: '03',
    title: 'La distribución',
    text: 'Ordenar recorridos, usos y encuentros hasta conseguir una experiencia natural y precisa.',
  },
  {
    index: '04',
    title: 'La luz',
    text: 'Trabajar con la luz como un material más: define atmósferas, volúmenes, color y emoción.',
  },
]

export const projects: Project[] = [
  {
    title: 'Casa V+E',
    location: 'Madrid',
    category: 'Residencial',
    image: '/images/casa-ve-hero.jpg',
    alt: 'Comedor de Casa V+E en Madrid, diseñado por Jean Porsche',
    href: '/proyectos/casa-ve/',
    tone: 'cream',
  },
  {
    title: 'Baoli',
    location: 'Madrid',
    category: 'Restaurante',
    image: '/images/baoli.jpg',
    alt: 'Interior rojo y dorado del restaurante Baoli en Madrid',
    href: '/proyectos/baoli/',
    tone: 'coral',
  },
  {
    title: 'Casa BB',
    location: 'Menorca',
    category: 'Residencial',
    image: '/images/casa-bb-menorca.jpg',
    alt: 'Comedor colorido de Casa BB en Menorca',
    href: '/proyectos/casa-bb-menorca/',
    tone: 'sun',
  },
  {
    title: 'Restaurante Coque',
    location: 'Madrid',
    category: 'Restaurante',
    image: '/images/coque.jpg',
    alt: 'Salón del restaurante Coque diseñado por Jean Porsche',
    href: '/proyectos/coque/',
    tone: 'blue',
  },
  {
    title: 'Gabinete Visconti',
    location: 'Madrid',
    category: 'Casa Decor',
    image: '/images/gabinete-visconti.jpg',
    alt: 'Gabinete Visconti para la Embajada de Italia',
    href: '/proyectos/gabinete-visconti/',
    tone: 'cream',
  },
  {
    title: 'Toujours à Madrid',
    location: 'Madrid',
    category: 'Casa Decor',
    image: '/images/toujours-madrid.jpg',
    alt: 'Cocina y comedor del proyecto Toujours à Madrid',
    href: '/proyectos/toujours-a-madrid/',
    tone: 'coral',
  },
]

export const gallery = [
  {
    image: '/images/the-edge.jpg',
    alt: 'Interior de The Edge frente al mar',
    label: 'The Edge · Marbella',
  },
  {
    image: '/images/sunset.jpg',
    alt: 'Restaurante Sunset en Sancti Petri',
    label: 'Sunset · Sancti Petri',
  },
  {
    image: '/images/casa-ve-salon.jpg',
    alt: 'Salón colorido de Casa V+E en Madrid',
    label: 'Casa V+E · Madrid',
  },
]
