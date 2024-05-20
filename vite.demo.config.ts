import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import baseConfig from './vite.config'
import pkg from './package.json'

export default defineConfig({
  ...baseConfig,
  base: `/${pkg.name}/`,
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    legacy({
      targets: ['defaults'],
    }),
  ],
  build: {
    target: 'es2015',
    outDir: 'demo',
  },
})
