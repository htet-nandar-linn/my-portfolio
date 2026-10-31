import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site works from any folder or sub-path
  // (e.g. GitHub Pages project sites, or opening dist via a local server).
  base: './',
  plugins: [react(), viteSingleFile()],
})
