module.exports = {
  extends: [
    '@antfu',
    '.eslintrc-auto-import.json',
  ],
  rules: {
    'curly': [
      'error',
      'all',
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'TWO_WAY_BINDING',
          'RENDER_MODIFIERS',
          'OTHER_DIRECTIVES',
          'UNIQUE',
          'SLOT',
          'GLOBAL',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'max-len': 'off',
    'no-shadow': [ 'error', { ignoreOnInitialization: true } ],
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
