export type CategoryProject = {
  title: string
  image: string
  alt: string
}

export type Category = {
  slug: 'residencial' | 'restaurantes' | 'casa-decor'
  title: string
  kicker: string
  statement: string
  description: string
  hero: string
  tone: 'sun' | 'coral' | 'blue'
  places?: string[]
  projects: CategoryProject[]
}

export const categories: Category[] = [
  {
    slug: 'residencial',
    title: 'Residencial',
    kicker: 'Viviendas con identidad',
    statement: 'Casas que cuentan la historia de quienes las habitan.',
    description: 'Interiores concebidos desde la escucha, la distribución, la luz y una mezcla personal de color, arte y materiales.',
    hero: '/images/category-residencial-01.jpg',
    tone: 'sun',
    places: ['Madrid', 'París', 'Barcelona', 'Ciudad de México', 'Londres', 'Oporto', 'Menorca', 'Marbella'],
    projects: [
      { title: 'Casa J+J', image: '/images/category-residencial-01.jpg', alt: 'Interior residencial del proyecto Casa J+J' },
      { title: 'Casa A+S', image: '/images/category-residencial-02.jpg', alt: 'Interior residencial del proyecto Casa A+S' },
      { title: 'Casa B+L', image: '/images/category-residencial-03.jpg', alt: 'Interior residencial del proyecto Casa B+L' },
      { title: 'Casa BB', image: '/images/category-residencial-04.jpg', alt: 'Interior residencial de Casa BB en Menorca' },
      { title: 'Casa M+S', image: '/images/category-residencial-05.jpg', alt: 'Interior residencial del proyecto Casa M+S' },
      { title: 'Casa Torre', image: '/images/category-residencial-06.jpg', alt: 'Interior residencial del proyecto Casa Torre' },
      { title: 'Casa J+A', image: '/images/category-residencial-07.jpg', alt: 'Interior residencial del proyecto Casa J+A' },
      { title: 'The Edge', image: '/images/category-residencial-08.jpg', alt: 'Interior residencial del proyecto The Edge' },
    ],
  },
  {
    slug: 'restaurantes',
    title: 'Restaurantes',
    kicker: 'Espacios para compartir',
    statement: 'Escenarios donde arquitectura y experiencia se encuentran.',
    description: 'Restaurantes con atmósferas propias, construidas mediante luz, color, ritmo, materialidad y atención a cada recorrido.',
    hero: '/images/category-restaurantes-01.jpg',
    tone: 'coral',
    projects: [
      { title: 'Baoli', image: '/images/category-restaurantes-01.jpg', alt: 'Interior rojo y dorado del restaurante Baoli' },
      { title: 'Chez Lumière', image: '/images/category-restaurantes-02.jpg', alt: 'Interior del restaurante Chez Lumière' },
      { title: 'Lelong', image: '/images/category-restaurantes-03.jpg', alt: 'Interior del restaurante Lelong' },
      { title: 'Beach', image: '/images/category-restaurantes-04.jpg', alt: 'Interior del restaurante Beach en Sancti Petri' },
      { title: 'Coque', image: '/images/category-restaurantes-05.jpg', alt: 'Salón del restaurante Coque' },
      { title: 'Club de Mar', image: '/images/category-restaurantes-06.jpg', alt: 'Interior del proyecto Club de Mar' },
      { title: 'Sunset', image: '/images/category-restaurantes-07.jpg', alt: 'Interior del restaurante Sunset en Sancti Petri' },
      { title: 'Lú', image: '/images/category-restaurantes-08.jpg', alt: 'Interior del restaurante Lú Cocina y Alma' },
    ],
  },
  {
    slug: 'casa-decor',
    title: 'Casa Decor',
    kicker: 'Laboratorio creativo',
    statement: 'Espacios para explorar sin miedo a lo inesperado.',
    description: 'Intervenciones donde el estudio experimenta con referencias, arte, superficies brillantes, geometría y combinaciones cromáticas.',
    hero: '/images/category-casa-decor-06.jpg',
    tone: 'blue',
    projects: [
      { title: 'Gabinete de dibujo', image: '/images/category-casa-decor-01.jpg', alt: 'Gabinete de dibujo creado para Casa Decor' },
      { title: 'Cocinando en los Hamptons', image: '/images/category-casa-decor-02.jpg', alt: 'Espacio Cocinando en los Hamptons para Casa Decor' },
      { title: 'Dr. Jekyll', image: '/images/category-casa-decor-03.jpg', alt: 'Espacio Dr. Jekyll creado para Casa Decor' },
      { title: 'Baño Hollywood', image: '/images/category-casa-decor-04.jpg', alt: 'Baño Hollywood creado para Casa Decor' },
      { title: 'Mr. Hyde', image: '/images/category-casa-decor-05.jpg', alt: 'Espacio Mr. Hyde creado para Casa Decor' },
      { title: 'Gabinete Visconti', image: '/images/category-casa-decor-06.jpg', alt: 'Gabinete Visconti creado para Casa Decor' },
      { title: 'El Gran Salón', image: '/images/category-casa-decor-07.jpg', alt: 'El Gran Salón creado para Casa Decor' },
      { title: 'Toujours à Madrid', image: '/images/category-casa-decor-08.jpg', alt: 'Toujours à Madrid creado para Casa Decor' },
    ],
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]))
