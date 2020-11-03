module.exports = {
  extends: [
    'airbnb'
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    'import',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: false,
      modules: true,
    },
  },
  rules: {
    // Browser environment requires them.
    'import/extensions': ['error', 'ignorePackages'],
    // Allow warnings and errors; logs are debugging
    'no-console': ['error', { allow: ['warn', 'error'] }],
  }
};
