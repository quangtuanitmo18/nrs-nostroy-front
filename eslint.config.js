import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import * as espree from 'espree';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  js.configs.recommended,

  // JavaScript files configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: espree,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },

  // Vue files specific configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: espree,
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue,
    },
    processor: vue.processors['.vue'],
    rules: {
      'vue/comment-directive': 0,
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      'no-debugger': 'warn',
    },
  },
];
