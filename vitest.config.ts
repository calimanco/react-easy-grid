/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['test/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['test/common.test.tsx'],
    coverage: {
      include: ['lib'],
    },
  },
})
