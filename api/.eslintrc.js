const { defineConfig } = require('eslint-define-config');
const { resolve } = require('path');

module.exports = defineConfig({
  extends: [
    '@douglasblnk/eslint-config-js',
    'plugin:import/recommended',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: resolve(__dirname, './webpack.config.js'),
      },
    },
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
  },
});
