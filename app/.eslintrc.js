const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@douglasblnk'],
  rules: {
    semi: ['error', 'always'],
    'quote-props': 0,
  },
});