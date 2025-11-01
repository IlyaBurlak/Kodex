const eslint = require('@eslint/js');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: ['dist/', 'coverage/', 'eslint.config.js'],
  },
  {
    files: ['**/*.{ts,tsx}'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx', '.jsx'],
        },
      ],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'ignore',
        },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
);