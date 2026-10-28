import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      // WSL2 sobre /mnt/c (DrvFs) no propaga eventos inotify de forma confiable.
      // Sin polling, Vite no ve los cambios y sigue sirviendo el módulo cacheado:
      // el navegador muestra código viejo aunque el archivo en disco sea el nuevo.
      usePolling: true,
    },
  },
})
