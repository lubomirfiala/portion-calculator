import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: ['portions.local'],
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    sourcemap: false,
    reportCompressedSize: false
  }
})
