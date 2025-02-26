import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:"/cover_letter_generator/"

  // define: {
  //   "import.meta.env.VITE_LAMBDA": JSON.stringify(process.env.VITE_LAMBDA),
  // },
})
