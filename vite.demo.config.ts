import baseConfig from './vite.config'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  ...baseConfig,
  base: `/${pkg.name}/`,
  build: {
    target: 'es2015',
    outDir: 'demo',
  },
})
