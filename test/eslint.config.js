import base from './../eslint.config.js'

export default [
  ...base,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
]
