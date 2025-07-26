import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // only if using React
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()], // include `react()` if React project
})
