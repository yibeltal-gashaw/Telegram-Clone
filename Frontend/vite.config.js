import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No tailwindcss() here — remove it!

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  }
})
