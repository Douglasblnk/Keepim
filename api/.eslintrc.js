module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@antfu'],
  rules: {
    'antfu/top-level-function': 'off',
  },
}
