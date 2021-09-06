const { defineConfig } = require('eslint-define-config');
const path = require('path');

module.exports = defineConfig({
  extends: [
    '@douglasblnk/eslint-config-js',
    'plugin:import/recommended',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './webpack.config.js'),
      },
    },
  },
});
