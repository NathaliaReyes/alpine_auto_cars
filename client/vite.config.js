import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext', 
    sourcemap: false,
  },
  server: {
    host: true, 
    port: 5174, 
    proxy: {
      '/graphql': {
        target: 'https://usa.alpineauto.xyz',
        changeOrigin: true,
        secure: false, // Si tienes un certificado autofirmado, de lo contrario, ponlo en true
      },
    },
  },
})
