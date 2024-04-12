import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // While adding https remember to change key and cert parameter paths under server -> https to path of your certificate and key.
  server: {
    https: {
      key: '/home/prathamesh-v-kirad/Working_Directory/FinalYearProject/certs/server.key',
      cert: '/home/prathamesh-v-kirad/Working_Directory/FinalYearProject/certs/server.crt',
    },
    proxy: {
      '/backend': {
        target: 'https://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '/api'),
      },
    },
  },
})
