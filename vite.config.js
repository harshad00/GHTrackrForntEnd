import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward /api calls to backend at port 8000
      '/api': {
        target: 'https://gh-trackr-fornt-end.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
