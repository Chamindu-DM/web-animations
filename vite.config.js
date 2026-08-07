import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    // Option 1: Array of specific host strings (Recommended)
    allowedHosts: ['exterritorial-persuadedly-terina.ngrok-free.dev'],
    
    // Option 2: Set to true to bypass all restrictions (Development only)
    // allowedHosts: true, 
  }
})

