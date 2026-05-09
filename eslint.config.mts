import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  // Allow require() in webpack and config files
  {
    files: ['config/**/*.js', 'webpack*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Modern React doesn't require React import with new JSX transform
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
