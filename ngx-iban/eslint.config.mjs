import { defineConfig } from 'eslint/config';
import parser from 'jsonc-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  ...baseConfig,
  {
    ignores: ['!**/*'],
  },
  {
    files: ['**/*.ts'],

    extends: compat.extends(
      'plugin:@nx/angular',
      'plugin:@angular-eslint/template/process-inline-templates',
    ),

    rules: {
      '@angular-eslint/directive-selector': [
        'warn',
        {
          type: 'attribute',
          prefix: 'ngxIban',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'warn',
        {
          type: 'element',
          prefix: 'ngx-iban',
          style: 'kebab-case',
        },
      ],

      '@angular-eslint/prefer-standalone': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: compat.extends('plugin:@nx/angular-template'),
    rules: {},
  },
  {
    files: ['**/*.json'],

    languageOptions: {
      parser: parser,
    },

    rules: {
      '@nx/dependency-checks': 'warn',
    },
  },
]);
