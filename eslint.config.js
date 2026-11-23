import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'src/prisma/contract.d.ts'
    ]
  },
  {
    files: ['**/*.{js,ts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended
    ]
  }
]);