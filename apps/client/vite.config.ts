import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['ec2-13-201-226-233.ap-south-1.compute.amazonaws.com'],
    port: 80
  }
})
