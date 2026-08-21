import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        notFound: '404.html',
        residencial: 'residencial/index.html',
        restaurantes: 'restaurantes/index.html',
        casaDecor: 'casa-decor/index.html',
        projetoCasaVe: 'proyectos/casa-ve/index.html',
        projetoBaoli: 'proyectos/baoli/index.html',
        projetoCasaBb: 'proyectos/casa-bb-menorca/index.html',
        projetoCoque: 'proyectos/coque/index.html',
        projetoGabineteVisconti: 'proyectos/gabinete-visconti/index.html',
        projetoToujours: 'proyectos/toujours-a-madrid/index.html',
      },
    },
  },
})
