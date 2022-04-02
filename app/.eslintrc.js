const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  rules: {
    semi: ['error', 'always'],
    'quote-props': 0,
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
});
