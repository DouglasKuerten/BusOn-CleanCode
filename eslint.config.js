import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: eslintParserTs,
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintPluginTs.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];