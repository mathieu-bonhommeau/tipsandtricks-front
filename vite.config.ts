import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseFloat(process.env.LISTEN_PORT)
  },
  preview: {
    port: parseFloat(process.env.LISTEN_PORT)
  }
})
