module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@stylistic/recommended-extends',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:markdown/recommended-legacy'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@stylistic', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['**/*.md/*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        "no-console": "off",
        "import/no-unresolved": "off",
        'react/jsx-no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'react/jsx-key': 'off'
      }
    },
  ],
}
