module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // Allow console in development
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
  },
};
