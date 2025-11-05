import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to your Express server
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Recommended
      },
      // Proxy /auth requests as well
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
})
