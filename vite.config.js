import { defineConfig } from 'vite'
import { readFileSync } from 'fs'

// Read package.json to get version
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

export default defineConfig({
  root: 'src',
  base: '/bullishinvoice/',
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version)
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['html2canvas', 'jspdf']
        }
      }
    }
  }
}) 