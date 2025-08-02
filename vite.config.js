import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
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