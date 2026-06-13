import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    allowedHosts: true
  },
    build: {
    outDir: 'build', // Changes the output folder from 'dist' to 'build'
  },
})
