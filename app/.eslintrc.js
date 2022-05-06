module.exports = {
  extends: [ '@antfu' ],
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'vue/no-multiple-template-root': 'off',
    'template-curly-spacing': [ 'error', 'always' ],
    'curly': [ 'error', 'multi' ],
    'comma-dangle': [ 'error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'only-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    } ],
    'max-len': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
