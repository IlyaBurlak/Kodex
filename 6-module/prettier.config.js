/** @type {import('prettier').Config} */
const config = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  bracketSameLine: false,
  endOfLine: 'auto',
  importOrder: [
    '^react',
    '^@reduxjs/toolkit',
    '^react-redux',
    '^react-router-dom',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx'],
  importOrderTypeScriptVersion: '4.4.0',
};

export default config;