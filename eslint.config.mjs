import { defineConfig, globalIgnores } from 'eslint/config';
import nx from '@nx/eslint-plugin';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/*', '**/node_modules']),
  {
    plugins: {
      '@nx': nx,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],

          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: compat.extends('plugin:@nx/typescript'),

    rules: {
      'no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    extends: compat.extends('plugin:@nx/javascript'),

    rules: {
      'no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: {},
  },
]);
