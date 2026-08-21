import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        residencial: 'residencial/index.html',
        restaurantes: 'restaurantes/index.html',
        casaDecor: 'casa-decor/index.html',
      },
    },
  },
})
