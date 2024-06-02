import base from './../eslint.config.js'
import globals from 'globals'

export default [
  ...base,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './../tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
]
